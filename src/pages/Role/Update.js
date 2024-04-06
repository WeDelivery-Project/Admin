import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Container,
  Typography,
  FormLabel,
} from '@mui/material';

import { useLocation } from 'react-router-dom';
import { updateRole } from '../../api/role';

export default function UpdateRole() {
  const { id, Name, Envois, Clients, Livreurs, Paiements, Tarifs, Parameters, Administrateurs } = useLocation().state;
  const [name, setName] = useState(Name);
  const [envois, setEnvois] = useState(Envois);
  const [clients, setClients] = useState(Clients);
  const [livreurs, setLivreurs] = useState(Livreurs);
  const [paiements, setPaiements] = useState(Paiements);
  const [tarifs, setTarifs] = useState(Tarifs);
  const [parameters, setParameters] = useState(Parameters);
  const [administrateurs, setAdministrateurs] = useState(Administrateurs);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'envois':
        setEnvois(event.target.checked);
        break;
      case 'clients':
        setClients(event.target.checked);
        break;
      case 'livreurs':
        setLivreurs(event.target.checked);
        break;
      case 'paiements':
        setPaiements(event.target.checked);
        break;
      case 'tarifs':
        setTarifs(event.target.checked);
        break;
      case 'parameters':
        setParameters(event.target.checked);
        break;
      case 'administrateurs':
        setAdministrateurs(event.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
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
    if (window.confirm('Are you sure you want to update this role?')) {
      updateRole(role, id)
        .then((res) => {
          console.log(res);
          window.alert('Role Updated Successfully!');
        })
        .catch((error) => {
          window.alert("Role didn't get updated !!!");
          console.error(error);
        });
    }
  };
  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Role
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              name="name"
              type="name"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={envois} onChange={handleInputChange} name="envois" color="primary" />}
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
              control={<Checkbox checked={parameters} onChange={handleInputChange} name="parameters" color="primary" />}
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
              label="Paiements"
              labelPlacement="end"
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
            Update Role
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
