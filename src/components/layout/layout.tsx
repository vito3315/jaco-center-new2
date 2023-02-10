import { Header } from '../header/header';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1, overflow: 'auto' }}>
          <CssBaseline />
          <Header />
          <Container
            maxWidth={false}
            style={{ paddingTop: 32, paddingBottom: 32, width: '100%' }}
          >
            {children}
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}
