import React, { useState } from 'react';

import {
  Container,
  Grid,
  TextField,
  FormControl,
  Button,
  Typography,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { createRole } from '../../api/role';

export default function CreateRole() {
  const [name, setName] = useState('');
  const [envois, setEnvois] = useState(false);
  const [clients, setClients] = useState(false);
  const [livreurs, setLivreurs] = useState(false);
  const [paiements, setPaiements] = useState(false);
  const [tarifs, setTarifs] = useState(false);
  const [parameters, setParameters] = useState(false);
  const [administrateurs, setAdministrateurs] = useState(false);
  const [roleCreated, setRoleCreated] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const clearTextBox = () => {
    setName('');
    setEnvois(false);
    setClients(false);
    setLivreurs(false);
    setPaiements(false);
    setTarifs(false);
    setParameters(false);
    setAdministrateurs(false);
    setRoleCreated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const role = {
      name,
      envois,
      clients,
      livreurs,
      paiements,
      tarifs,
      parameters,
      administrateurs,
    };

    createRole(role)
      .then((res) => {
        console.log(res);
        clearTextBox();
        setOpenSnackbar(true);
        setRoleCreated(true); // open the snackbar
      })
      .catch((error) => {
        console.error(error);
      });

 // clear text boxes only after the API call has finished executing
  };
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value); // set the state directly with value
  };

  const handleInputChange = (e) => {
    const { name, checked } = e.target;

    switch (name) {
      case 'envois':
        setEnvois(checked);
        break;
      case 'clients':
        setClients(checked);
        break;
      case 'livreurs':
        setLivreurs(checked);
        break;
      case 'paiements':
        setPaiements(checked);
        break;
      case 'tarifs':
        setTarifs(checked);
        break;
      case 'parameters':
        setParameters(checked);
        break;
      case 'administrateurs':
        setAdministrateurs(checked);
        break;
      default:
        break;
    }
  };

  
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Role
      </Typography>
      {roleCreated && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          Role added successfully
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleNameChange}
              type="name"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={envois} onChange={handleInputChange} name="envois"
               color="primary" />}
              label="Envois"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={clients} onChange={handleInputChange} name="clients" color="primary" />}
              label="Clients"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={livreurs} onChange={handleInputChange} name="livreurs" color="primary" />}
              label="Livreurs"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={paiements} onChange={handleInputChange} name="paiements" color="primary" />}
              label="Paiements"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={tarifs} onChange={handleInputChange} name="tarifs" color="primary" />}
              label="Tarifs"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>
        

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox checked={parameters} onChange={handleInputChange} name="parameters" 
                color="primary" />
              }
              label="Parameters"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={administrateurs}
                  onChange={handleInputChange}
                  name="administrateurs"
                  color="primary"
                />
              }
              label="Administrateurs"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            sx={{ mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
            style={{ marginTop: 16 }}
          >
            Create Role
          </Button>
          <Snackbar
  open={openSnackbar}
  onClose={handleSnackbarClose}
  message={
    <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
      <CheckCircle sx={{ mr: 1, color: '#28a745' }} />
      <span>Delivery Agent Added Successfully</span>
    </div>
  }
  autoHideDuration={2000}
  style={{ backgroundColor: '#6c757d' }}
/>

        </Grid>
      </Grid>
    </Container>
  );
}
