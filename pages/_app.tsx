// import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";
import '@fontsource/roboto/300.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Container maxWidth="lg" sx={{ marginTop: "1em" }}>
      <Component {...pageProps} />
    </Container>
  </ThemeProvider>
}
