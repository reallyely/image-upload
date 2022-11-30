import "@fontsource/roboto/300.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import type { AppProps } from "next/app";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import localFont from "@next/font/local";

// Font files can be colocated inside of `pages`
const headerFont = localFont({ src: "../styles/Maghfirea.ttf" });
const bodyFont = localFont({ src: "../styles/CabinetGrotesk-Variable.woff2" });
const darkTheme = createTheme({
  typography: {
    button: bodyFont.style,
    body1: bodyFont.style,
    body2: bodyFont.style,
    h2: headerFont.style,
  },
  palette: {
    primary: {
      main: "#733824",
    },
    secondary: {
      main: "#605139",
    },
    text: {
      primary: "#733824",
    },
    background: {
      default: "#efdec6",
      paper: "#efdec6",
    },
    mode: "light",
  },
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: "1em" }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
