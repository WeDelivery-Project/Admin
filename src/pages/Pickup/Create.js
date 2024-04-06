import React, { useEffect, useState } from 'react';

import {
  Container,
  Grid,
  TextField,
  FormControl,
  Button,
  Typography,
  Select,
  Box,
  InputLabel,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getWilayas } from '../../api/wilaya';
import { getClients } from '../../api/client';
import { getCommunes } from '../../api/commune';
import { createRamassage } from '../../api/ramassage';

export default function CreateRamassage() {
  const [wilaya, setWilaya] = useState([]);
  const [adresse, setAdresse] = useState('');
  const [date, setDate] = useState(new Date());
  const [client, setClient] = useState([]);
  const [commune, setCommune] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(false);
  const [selectedCommune, setSelectedCommune] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [filteredCommunes, setFilteredCommunes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const clearTextBox = () => {
    setDate(new Date());
    setComment('');
    setSelectedWilaya('');
    setSelectedCommune('');
    setSelectedClient('');
  };

  const getPrix = (id) => {
    const w = wilaya.find((w) => w._id === id);
    if (w) return w.tarifs[0].price;
    return 300;
  };

  const handleSubmit = () => {
    const ramassage = {
      wilaya: selectedWilaya,
      adresse,
      date,
      client: selectedClient,
      commune: selectedCommune,
      comment,
      prix: getPrix(selectedWilaya),
    };
    clearTextBox();

    createRamassage(ramassage)
      .then((res) => {
        console.log(res);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'adresse':
        setAdresse(value);
        break;
      case 'date':
        setDate(new Date(value));
        break;
      case 'comment':
        setComment(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getWilayas()
      .then((res) => setWilaya(res.data))
      .catch((err) => console.error(err));

    getClients()
      .then((res) => setClient(res.data))
      .catch((err) => console.error(err));

    getCommunes()
      .then((res) => {
        setCommune(res.data);
        setFilteredCommunes(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedWilaya) {
      getCommunes(selectedWilaya)
        .then((res) => setCommune(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedWilaya]);

  const handleWilayaChange = (event) => {
    const selectedWilaya = event.target.value;
    setSelectedWilaya(selectedWilaya);
    const filteredCommunes = commune.filter((commune) => commune.wilaya === selectedWilaya);
    setFilteredCommunes(filteredCommunes);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleCommuneChange = (event) => {
    setSelectedCommune(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Pickup
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="Wilayas" sx={{ mb: 1 }}>
              Wilaya
            </InputLabel>
            <Select labelId="Wilayas" id="Wilaya" value={selectedWilaya} label="Wilaya" onChange={handleWilayaChange}>
              {wilaya.map((w) => (
                <MenuItem key={w._id} value={w._id}>
                  {w.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 1 }}
              label="Adresse"
              variant="outlined"
              name="adresse"
              value={adresse}
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ mb: 1 }}>
              <DatePicker
                sx={{ mb: 2 }}
                width="20%"
                id="date"
                label="Date"
                format="yyyy-MM-dd"
                value={date}
                onChange={setDate}
                name="date"
                required
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="Clients" sx={{ mb: 1 }}>
              Client
            </InputLabel>
            <Select labelId="Clients" id="Client" value={selectedClient} label="Client" onChange={handleClientChange}>
              {client.map((cl) => (
                <MenuItem key={cl._id} value={cl._id}>
                  {cl.firstname} {cl.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="commune" sx={{ mb: 1 }}>
                Commune
              </InputLabel>
              <Select
                labelId="commune"
                id="commune"
                value={selectedCommune}
                label="Commune"
                onChange={handleCommuneChange}
              >
                {filteredCommunes.map((commune) => (
                  <MenuItem key={commune._id} value={commune._id}>
                    {commune.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 1 }}
              label="Comment"
              variant="outlined"
              name="comment"
              value={comment}
              onChange={handleInputChange}
              required
            />
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
            Create Pickup
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle sx={{ mr: 1 }} />
            <span>Pickup Added Successfully</span>
          </div>
        }
        autoHideDuration={2000}
      />
    </Container>
  );
}
