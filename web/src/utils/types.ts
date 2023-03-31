export interface ConsumerDetail {
  CID: number;
  Name: string;
  Addr: String;
  Tel: string;
  IPAddr: string;
  Remotes: Remote[];
}

export interface Remote {
  ID: number;
  IP: string;
  Port: number;
  Comment: string;
  LoginAcc: string;
  LoginPwd: string;
}
