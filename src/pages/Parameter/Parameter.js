import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { getAdminById, updateAdmin } from '../../api/admin';

export default function UpdateRole() {
  const [admin, setAdmin] = useState({ firstname: '', lastname: '', phonenumber: '' });
  const idAdmin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin'))._id : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!idAdmin) {
      alert('Erreur innatendu!');
    } else {
      getAdminById(idAdmin)
        .then((data) => setAdmin(admin))
        .catch(() => alert('Erreur innatendu!'));
    }
  }, [idAdmin]);

  const handleSubmit = async () => {
    try {
      await updateAdmin(
        { firstname: admin.firstname, lastname: admin.lastname, phonenumber: admin.phonenumber },
        idAdmin
      );
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Profile
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Firstname"
              variant="outlined"
              value={admin?.firstname}
              onChange={(event) => {
                setAdmin({ ...admin, firstname: event.target.value });
              }}
              name="firstname"
              type="text"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Lastname"
              variant="outlined"
              value={admin?.lastname}
              onChange={(event) => {
                setAdmin({ ...admin, lastname: event.target.value });
              }}
              name="lastname"
              type="text"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Phone Number"
              variant="outlined"
              value={admin?.phonenumber}
              onChange={(event) => {
                setAdmin({ ...admin, phonenumber: event.target.value });
              }}
              name="phonenumber"
              type="text"
              fullWidth
              required
            />
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
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
