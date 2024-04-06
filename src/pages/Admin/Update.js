import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  InputLabel,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getRoles } from '../../api/role';
import { updateAdmin } from '../../api/admin';

export default function UpdateAdmin() {
  const { id, Email, Firstname, Lastname, Phonenumber, Role } = useLocation().state;
  const [email, setEmail] = useState(Email);
  const [firstname, setFirstname] = useState(Firstname);
  const [lastname, setLastname] = useState(Lastname);
  const [phonenumber, setPhonenumber] = useState(Phonenumber);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(Role);

  const handleSubmit = async () => {
    const admin = {
      email,
      firstname,
      lastname,
      phonenumber,
      role,
    };
    if (window.confirm('Are you sure you want to update this admin?')) {
      updateAdmin(admin, id)
        .then((res) => {
          console.log(res);
          window.alert('Admin Updated Successfully!');
        })
        .catch((error) => {
          window.alert("Admin didn't get updated !!!");
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getRoles()
      .then((res) => setRoles(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Admin
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="First Name"
              variant="outlined"
              value={firstname}
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
              name="firstname"
              type="firstname"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="lastname"
              label="Lastname"
              variant="outlined"
              value={lastname}
              onChange={(event) => {
                setLastname(event.target.value);
              }}
              name="lastname"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              name="email"
              required
            />
          </FormControl>
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              name="password"
              required
            />
          </FormControl>
        </Grid> */}

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phonenumber}
              onChange={(event) => {
                setPhonenumber(event.target.value);
              }}
              name="phonenumber"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="Roles" sx={{ mb: 1 }}>
              Role
            </InputLabel>
            <Select
              labelId="Roles"
              id="Role"
              value={role}
              label="Role"
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              {roles.map((r) => (
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
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
            style={{ marginTop: 16 }}
          >
            Update Admin
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
