import { Router } from "next/router";

interface ProtectRoutesProps {
  children: any;
  router: Router;
}

const ProtectRoutes: React.FC<ProtectRoutesProps> = ({ children, router }) => {
  //   if (auth.matches("LOGGED_OUT") && !auth.matches("LOGGED_OUT.IDLE")) {
  //     return null;
  //   }
  //   if (isPublic(router.route) || auth.matches("LOGGED_IN")) {
  //     return children;
  //   }
  //   // serverside routing is handled differently
  //   if (typeof window !== "undefined" && auth.matches("LOGGED_OUT.IDLE")) {
  //     const query = router.asPath === "/" ? null : { redirect: router.asPath };
  //     router.push({
  //       pathname: "/login",
  //       query,
  //     });
  //   }

  // check permisson
  // if (router.route === PATH.HOME) {
  //   router.push(PATH.Login);
  // }

  // if (isPublic(router.route)) {
  //   return children;
  // }

  // // serverside routing is handled differently
  // if (typeof window !== "undefined") {
  //   const query = router.asPath === "/" ? null : { redirect: router.asPath };
  //   router.push({
  //     pathname: "/login",
  //     query,
  //   });
  // }

  return children;
};
export default ProtectRoutes;

function isPublic(route: string) {
  switch (route) {
    case "/login":
      return true;
    default:
      return false;
  }
}

const PATH = Object.freeze({
  HOME: "/",
  Login: "/login",
});
