import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';
import { tryLoginWithToken } from '../api/admin';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();

  const tryLogin = async () => {
    try {
      const res = await tryLoginWithToken();
      // TODO : AUTO CONNECT
      // if (res.status === 200) navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tryLogin();
  });

  return (
    <>
      <Helmet>
        <title> Sign to WeDelivery </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              Sign in to WeDelivery
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
