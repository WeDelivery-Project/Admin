import React, { useContext, useState } from 'react';
import { Stack, IconButton, InputAdornment, TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import Iconify from '../../../components/iconify';
import { SigninContext } from '../../../contexts/SigninContext';
import { login } from '../../../api/admin';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInformations, setUserInformations } = useContext(SigninContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Instantiate useHistory hook

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await login({ email, password });
      if (res.status !== 200) throw new Error('Invalid');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      setUserInformations(res.data.admin);
      navigate('/dashboard', { replace: true }); // Redirect to dashboard page
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <>
      <Stack spacing={3} onKeyDown={handleKeyDown}>
        <img src="/assets/illustrations/wd.png" alt="login" />
        <TextField name="email" label="Email" value={email} onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Box style={{ marginTop: '1rem' }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          onKeyDown={handleKeyDown}
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
    </>
  );
}
