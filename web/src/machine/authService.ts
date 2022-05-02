import { createMachine, interpret, assign } from "xstate";
import { Manager } from "../types";
import { BaseURL } from "../constants";

//#HACK import methods are different from mobile
var Buffer = require("buffer").Buffer;
function toBase64(input: string) {
  return Buffer.from(input, "utf-8").toString("base64");
}

interface CredentialStore {
  loadAuthAsync(): Promise<AuthState>;
  saveAuthAsync(value: AuthState): Promise<void>;
  saveAuthRawAsync(value: any): Promise<void>;
  updateAuthAsync(value: AuthState): Promise<void>;
  clearAuthAsync(): Promise<void>;
  shareCredentialAsync(): Promise<void>;
  requestCredentialAsync(): Promise<void>;
  broadcastLogoutAsync(): Promise<void>;
}

interface AuthState {
  user: Manager;
  jwt: string;
  refreshToken: string;
}

interface Context {
  values?: AuthState;
  error?: string;
}

type Event =
  | { type: "LOAD_AUTH" }
  | { type: "LOGIN"; account: string; password: string }
  | { type: "LOGOUT" }
  | { type: "REFRESH" }
  | { type: "LOGOUT_WITHOUT_API" }
  | { type: "REQUEST_CREDENTIAL" }
  | { type: "RECEIVE_CREDENTIAL"; cred: any };

type State =
  | {
      value: "LOADING_STORED_AUTH";
      context: Context & {
        values?: undefined;
        error?: undefined;
      };
    }
  | {
      value: "LOGGED_IN";
      context: Context & {
        values?: AuthState;
        error?: undefined;
      };
    }
  | {
      value: "LOGGED_OUT";
      context: Context & {
        values?: undefined;
        error?: Error;
      };
    }
  | {
      value: "SIGNING_IN";
      context: Context & {
        values?: undefined;
        error?: undefined;
      };
    };

let store: CredentialStore = {
  loadAuthAsync: async function () {
    throw new Error("stub storage has no values");
  },
  saveAuthAsync: async function (_value: AuthState) {},
  saveAuthRawAsync: async function (_value: any) {},
  updateAuthAsync: async function (_value: AuthState) {},
  clearAuthAsync: async function (): Promise<void> {
    logout();
  },
  shareCredentialAsync: async function (): Promise<void> {},
  requestCredentialAsync: async function (): Promise<void> {},
  broadcastLogoutAsync: async function (): Promise<void> {},
};

const authMachine = createMachine<Context, Event, State>(
  {
    id: "auth",
    initial: "LOGGED_OUT",
    context: {
      values: undefined,
      error: undefined,
    },
    states: {
      LOGGED_OUT: {
        id: "logged_out",
        initial: "INIT",
        states: {
          INIT: {
            on: {
              LOAD_AUTH: "LOADING_STORED_AUTH",
              RECEIVE_CREDENTIAL: "RECEIVE_CREDENTIAL",
            },
          },
          IDLE: {
            on: {
              LOGIN: "SIGNING_IN",
              LOAD_AUTH: "LOADING_STORED_AUTH",
              RECEIVE_CREDENTIAL: "RECEIVE_CREDENTIAL",
            },
          },
          SIGNING_IN: {
            invoke: {
              src: (_, event) => signIn(event),
              onDone: [
                {
                  target: "#logged_in",
                  actions: assign((context, event) => ({
                    ...context,
                    values: event.data,
                    error: undefined,
                  })),
                },
              ],
              onError: {
                target: "IDLE",
                actions: assign({
                  error: (_, event) => event.data,
                }),
              },
            },
          },
          RECEIVE_CREDENTIAL: {
            invoke: {
              src: (_, event) => storeSharedAuth(event),
              onDone: [
                {
                  target: "#logged_in",
                  actions: assign((context, event) => ({
                    ...context,
                    values: event.data,
                    error: undefined,
                  })),
                },
              ],
              onError: {
                target: "IDLE",
                actions: assign({
                  error: (_, event) => event.data,
                }),
              },
            },
          },
          LOADING_STORED_AUTH: {
            invoke: {
              src: () => loadStoredAuth(),
              onDone: [
                {
                  cond: (_, event) => event.data === null,
                  target: "IDLE",
                  actions: "CLEAR_AUTH_DATA",
                },
                {
                  target: "TOKEN_SIGNIN",
                  actions: assign((context, event) => ({
                    ...context,
                    values: event.data,
                  })),
                },
              ],
              onError: {
                target: "IDLE",
                actions: "CLEAR_AUTH_DATA",
              },
            },
            on: {
              RECEIVE_CREDENTIAL: "RECEIVE_CREDENTIAL",
            },
          },
          TOKEN_SIGNIN: {
            invoke: {
              src: () => refreshJWT(),
              onDone: [
                {
                  target: "#logged_in",
                  actions: assign((context, event) => ({
                    ...context,
                    values: event.data,
                  })),
                },
              ],
              onError: {
                target: "IDLE",
                actions: "CLEAR_AUTH_DATA",
              },
            },
          },
          LOGGING_OUT: {
            invoke: {
              src: () => logout(),
              onDone: {
                target: "IDLE",
              },
              onError: {
                target: "IDLE",
                actions: assign({
                  error: (_, event) => event.data,
                }),
              },
            },
          },
        },
      },
      LOGGED_IN: {
        id: "logged_in",
        initial: "READY",
        states: {
          READY: {
            on: {
              REFRESH: {
                target: "REFRESHING",
              },
              RECEIVE_CREDENTIAL: {
                target: "REFRESH_CREDENTIAL",
              },
            },
          },
          REFRESHING: {
            invoke: {
              id: "refreshAuth",
              src: () => refreshJWT(),
              onDone: [
                {
                  target: "READY",
                  actions: assign((context, event) => ({
                    ...context,
                    values: event.data,
                  })),
                },
              ],
              onError: {
                target: "#logged_out.IDLE",
                actions: "CLEAR_AUTH_DATA",
              },
            },
          },
          REFRESH_CREDENTIAL: {
            invoke: {
              src: (_, event) => storeSharedAuth(event),
              onDone: [
                {
                  target: "READY",
                  actions: assign((context, event) => ({
                    ...context,
                    values: event.data,
                    error: undefined,
                  })),
                },
              ],
              onError: {
                target: "READY",
                actions: assign({
                  error: (_, event) => event.data,
                }),
              },
            },
          },
        },
        on: {
          LOGOUT: {
            target: "#logged_out.LOGGING_OUT",
          },
          LOGOUT_WITHOUT_API: {
            target: "#logged_out.IDLE",
            actions: "CLEAR_AUTH_DATA",
          },
          REQUEST_CREDENTIAL: {
            actions: "SHARE_CREDENTIAL",
          },
        },
      },
    },
  },
  {
    actions: {
      CLEAR_AUTH_DATA: assign((context) => {
        store.clearAuthAsync();
        return {
          ...context,
          values: undefined,
          error: undefined,
        };
      }),
      SHARE_CREDENTIAL: assign((context) => {
        store.shareCredentialAsync();
        return context;
      }),
    },
  }
);

async function loadStoredAuth() {
  await store.requestCredentialAsync();

  let authState = await store.loadAuthAsync();

  if (authState && authState.refreshToken) {
    return authState;
  }

  return null;
}

async function refreshJWT() {
  try {
    let auth = await store.loadAuthAsync();
    const resp = await fetch(`${BaseURL}/manager/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: auth.user.id,
        token: auth.refreshToken,
      }),
    });
    if (!resp.ok) {
      throw Error(`refresh failed: ${resp.status}`);
    }
    const authState: AuthState = await resp.json();
    authState.user.id = authState.user.id.toString();
    authState.refreshToken = auth.refreshToken;
    await store.updateAuthAsync(authState);
    return authState;
  } catch (e) {
    throw Error(`refresh failed: ${e}`);
  }
}

async function signIn(event: Event) {
  switch (event.type) {
    case "LOGIN":
      const basic = createBasicAuth(event.account, event.password);
      const resp = await fetch(`${BaseURL}/manager/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: basic,
        },
      });
      if (!resp.ok) {
        throw Error("login failed");
      }

      const authState: AuthState = await resp.json();
      authState.user.id = authState.user.id.toString();
      await store.saveAuthAsync(authState);
      await store.shareCredentialAsync();
      return authState;
    default:
      throw Error("invalid event type for signIn");
  }
}

async function storeSharedAuth(event: Event) {
  switch (event.type) {
    case "RECEIVE_CREDENTIAL":
      await store.saveAuthRawAsync(event.cred);
      const authState: AuthState = JSON.parse(event.cred);
      return authState;
    default:
      throw Error("invalid event type for store auth");
  }
}

async function logout() {
  const resp = await fetch(`${BaseURL}/manager/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  await store.clearAuthAsync();
  await store.broadcastLogoutAsync();

  if (!resp.ok) {
    //we use a throw here explicitly to follow the "invoke machine" pattern of onError
    throw Error("logout failed");
  }
}

function createBasicAuth(acc: string, pwd: string) {
  return "Basic " + toBase64(`${acc}:${pwd}`);
}

function getCurrentJwt() {
  return authService.state.context.values?.jwt;
}

function initStoreAndLoad(newStore: CredentialStore) {
  store = newStore;
  authService.send("LOAD_AUTH");
}

const authService = interpret(authMachine).start();
export default authService;
export { getCurrentJwt, initStoreAndLoad };
