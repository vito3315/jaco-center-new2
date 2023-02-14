'use client';

import { Header } from '../components/header/header';
import Loading from './loading';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';

import '../styles/globals.css';
import '../styles/general.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c03',
    },
    // def: {
    //   main: '#353b48',
    //   secondary: '#fff',
    // },
    secondary: {
      main: '#6ab04c',
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <div style={{ display: 'flex' }}>
            <main style={{ flexGrow: 1, overflow: 'auto' }}>
              <CssBaseline />
              <Header />
              <Suspense fallback={<Loading />} />
              <Container
                maxWidth={false}
                style={{ paddingTop: 32, paddingBottom: 32, width: '100%' }}
              >
                {children}
              </Container>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
