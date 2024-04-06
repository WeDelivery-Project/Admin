// routes
import { useState } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { SigninContext } from './contexts/SigninContext';

// ----------------------------------------------------------------------

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userInformations, setUserInformations] = useState({});

  return (
    <ThemeProvider>
      <SigninContext.Provider value={{ isLogged, setIsLogged, userInformations, setUserInformations }}>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </SigninContext.Provider>
    </ThemeProvider>
  );
}
