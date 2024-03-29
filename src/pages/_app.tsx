import Script from 'next/script';
import { Header } from '@/components/header';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/general.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    },
    secondary: {
      main: '#6ab04c',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const showHeader = router.pathname === '/auth' ? false : true;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1, overflow: 'auto' }}>
          <CssBaseline />
          {showHeader && <Header />}
          <Container maxWidth={false} style={{ paddingTop: 32, paddingBottom: 32, width: '100%' }}>
            <Script src="https://api-maps.yandex.ru/2.1/?apikey=ae2bad1f-486e-442b-a9f7-d84fff6296db&lang=ru_RU" />
            <Component {...pageProps} />
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}
