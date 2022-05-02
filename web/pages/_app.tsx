import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import "../src/utils/i18n";
import { ThemeProvider } from "styled-components";
import ProtectRoutes from "../src/router/protectRoutes";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ProtectRoutes router={router}>
        <Component {...pageProps} />
      </ProtectRoutes>
    </ThemeProvider>
  );
}

export default MyApp;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};
