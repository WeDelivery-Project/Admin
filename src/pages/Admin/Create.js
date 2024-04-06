import React, { useState, useEffect } from 'react';

import {
  Container,
  Grid,
  TextField,
  FormControl,
  Button,
  Typography,
  Snackbar,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { getRoles } from '../../api/role';
import { createAdmin } from '../../api/admin';

export default function CreateAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const clearTextBox = () => {
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setPhonenumber('');
    setRole([]);
    setSelectedRole('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const admin = {
      email,
      password,
      firstname,
      lastname,
      phonenumber,
      role: selectedRole,
    };
    clearTextBox();

    createAdmin(admin)
      .then((res) => {
        console.log(res);
        setOpenSnackbar(true); // open the snackbar
      })
      .catch((error) => {
        console.error(error);
      });

    clearTextBox();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'firstName':
        setFirstname(value);
        break;
      case 'lastName':
        setLastname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'phoneNumber':
        setPhonenumber(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getRoles()
      .then((res) => setRole(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleReset = () => {
    clearTextBox();
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <Container sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Admin
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="First Name"
              variant="outlined"
              name="firstName"
              value={firstname}
              onChange={handleInputChange}
              type="firstname"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Lastname"
              variant="outlined"
              name="lastName"
              value={lastname}
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={email}
              onChange={handleInputChange}
              type="email"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              name="password"
              value={password}
              onChange={handleInputChange}
              type="password"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={phonenumber}
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="Roles" sx={{ mb: 1 }}>
              Role
            </InputLabel>
            <Select labelId="Roles" id="Role" value={selectedRole} label="Role" onChange={handleRoleChange}>
              {role.map((r) => (
                <MenuItem key={r._id} value={r._id}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
            style={{ marginTop: 16 }}
          >
            Create Admin
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginTop: 16 }}
            fullWidth
            onClick={handleReset}
          >
            Cancel
          </Button>
          <Snackbar
            open={openSnackbar}
            onClose={handleSnackbarClose}
            message={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 1 }} />
                <span>Admin Added Successfully</span>
              </div>
            }
            autoHideDuration={2000}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
