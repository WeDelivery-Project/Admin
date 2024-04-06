import React, { useState, useEffect } from 'react';

import {
  Container,
  Grid,
  TextField,
  FormControl,
  Button,
  Typography,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { getClients } from '../../api/client';
import { getEtats } from '../../api/etat';
import { getCommunes } from '../../api/commune';
import { getWilayas } from '../../api/wilaya';
import { getLivreurs } from '../../api/livreur';
import { createEnvoi } from '../../api/envoi';

export default function CreateEnvoi() {
  const [name, setName] = useState('');
  const [produit, setProduit] = useState('');
  const [infos, setInfos] = useState('');
  const [numcommand, setNumcommand] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixtotal, setPrixtotal] = useState('');
  const [address, setAddress] = useState('');
  const [telephone1, setTelephone1] = useState('');
  const [telephone2, setTelephone2] = useState('');
  const [client, setClient] = useState([]);
  const [etat, setEtat] = useState([]);
  const [wilaya, setWilaya] = useState([]);
  const [commune, setCommune] = useState([]);
  const [livreur, setLivreur] = useState([]);
  const [tarifs, setTarifs] = useState([]);
  const [selectedEtat, setSelectedEtat] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedCommune, setSelectedCommune] = useState(false);
  const [selectedLivreur, setSelectedLivreur] = useState(null);
  const [selectedWilaya, setSelectedWilaya] = useState(false);
  const [filteredCommunes, setFilteredCommunes] = useState([]);
  const [selectedTarifs, setSelectedTarifs] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const clearTextBox = () => {
    setName('');
    setProduit('');
    setInfos('');
    setNumcommand('');
    setQuantite();
    setPrixtotal('');
    setAddress('');
    setTelephone1('');
    setTelephone2('');
    setClient([]);
    setEtat([]);
    setCommune([]);
    setLivreur([]);
    setWilaya([]);
    setTarifs('');
  };

  const handleSubmit = () => {
    const envoi = {
      name,
      produit,
      infos,
      numcommand,
      quantite,
      prixtotal,
      address,
      telephone1,
      telephone2,
      commune: selectedCommune,
      livreur: selectedLivreur,
      client: selectedClient,
      etat: selectedEtat,
      wilaya: selectedWilaya,
    };
    console.log(quantite);
    createEnvoi(envoi)
      .then((res) => {
        console.log(res);
        clearTextBox();
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'produit':
        setProduit(value);
        break;
      case 'infos':
        setInfos(value);
        break;
      case 'numcommand':
        setNumcommand(value);
        break;
      case 'quantite':
        setQuantite(value);
        break;
      case 'prixtotal':
        setPrixtotal(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'telephone1':
        setTelephone1(value);
        break;
      case 'telephone2':
        setTelephone2(value);
        break;
      case 'tarifs':
        setTarifs(value);
        break;

      default:
        break;
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    getWilayas()
      .then((res) => setWilaya(res.data))
      .catch((err) => console.error(err));

    getCommunes()
      .then((res) => setCommune(res.data))
      .catch((err) => console.error(err));

    getClients()
      .then((res) => setClient(res.data))
      .catch((err) => console.error(err));

    getEtats()
      .then((res) => setEtat(res.data))
      .catch((err) => console.error(err));

    getLivreurs()
      .then((res) => setLivreur(res.data))
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
    const selectedTarifs = wilaya.find((w) => w._id === selectedWilaya)?.tarifs ?? [];
    setSelectedTarifs(selectedTarifs);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleEtatChange = (event) => {
    setSelectedEtat(event.target.value);
  };

  const handleCommuneChange = (event) => {
    setSelectedCommune(event.target.value);
  };

  const handleLivreurChange = (event) => {
    setSelectedLivreur(event.target.value);
  };

  return (
    <Container sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Shipment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="name"
              placeholder="Enter the full name of the receiver"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleInputChange}
              type="name"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Product"
              placeholder="Name of your product"
              variant="outlined"
              name="produit"
              value={produit}
              onChange={handleInputChange}
              type="produit"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Telephone1"
              placeholder="Receiver's Phonenumber"
              variant="outlined"
              name="telephone1"
              value={telephone1}
              onChange={handleInputChange}
              type="telephone1"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Telephone2"
              placeholder="Shiper's Phonenumber"
              variant="outlined"
              name="telephone2"
              value={telephone2}
              onChange={handleInputChange}
              type="telephone2"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Infos"
              placeholder="Comment"
              variant="outlined"
              name="infos"
              value={infos}
              onChange={handleInputChange}
              type="infos"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Order Number"
              variant="outlined"
              name="numcommand"
              value={numcommand}
              onChange={handleInputChange}
              type="numcommand"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Quantité"
              variant="outlined"
              name="quantite"
              value={quantite}
              onChange={handleInputChange}
              type="text"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Total Price"
              placeholder="Package's price"
              variant="outlined"
              name="prixtotal"
              value={prixtotal}
              onChange={handleInputChange}
              type="prixtotal"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              value={address}
              onChange={handleInputChange}
              type="address"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="Wilayas" sx={{ mb: 1 }}>
              Wilaya
            </InputLabel>
            <Select
              labelId="Wilayas"
              id="Wilaya"
              name="wilaya"
              value={selectedWilaya}
              onChange={handleWilayaChange}
              label="Wilaya"
              style={{ color: 'black' }}
            >
              {wilaya.map((w) => (
                <MenuItem key={w._id} value={w._id}>
                  {w.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="commune" sx={{ mb: 1 }}>
              Commune
            </InputLabel>
            <Select
              labelId="Commune"
              id="commune"
              name="commune"
              value={selectedCommune}
              onChange={handleCommuneChange}
              label="Commune"
              disabled={!selectedWilaya}
              required
            >
              {filteredCommunes.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="livreur" sx={{ mb: 1 }}>
              Livreur
            </InputLabel>
            <Select
              labelId="Livreur"
              id="livreur"
              name="livreur"
              value={selectedLivreur}
              onChange={handleLivreurChange}
              label="Livreur"
              required
            >
              {livreur.map((l) => (
                <MenuItem key={l._id} value={l._id}>
                  {l.lastname} {l.firstname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="etat" sx={{ mb: 1 }}>
              States
            </InputLabel>
            <Select
              labelId="etat"
              id="etat"
              value={selectedEtat}
              label="etat"
              placeholder="Etat"
              onChange={handleEtatChange}
            >
              {etat.map((et) => (
                <MenuItem key={et._id} value={et._id}>
                  {et.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="client" sx={{ mb: 1 }}>
              Client
            </InputLabel>
            <Select
              labelId="Select Client"
              id="client"
              value={selectedClient}
              label="Client"
              onChange={handleClientChange}
            >
              {client.map((cli) => (
                <MenuItem key={cli._id} value={cli._id}>
                  {cli.firstname} {cli.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              id="tarifs"
              variant="outlined"
              disabled
              value={selectedTarifs[0]?.price ?? ''}
              InputProps={{
                endAdornment: <InputAdornment position="end">DA</InputAdornment>,
              }}
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
            Create Shipment
          </Button>
        </Grid>

        <Snackbar
          open={openSnackbar}
          onClose={handleSnackbarClose}
          message={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ mr: 1 }} />
              <span>Shipment Added Successfully</span>
            </div>
          }
          autoHideDuration={2000}
        />
      </Grid>
    </Container>
  );
}
