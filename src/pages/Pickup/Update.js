import React, { useState, useEffect } from 'react';
  import {

    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    Checkbox,
    Grid,
    Container,
    Typography,
    TextField,
    Button,

  } from '@mui/material';
  import { useLocation } from 'react-router-dom';
  import { updateEnvoi } from '../../api/envoi';


    export default function UpdateShipment() {
      const { id, Name, Infos, Produit, Wilaya, Commune, Etat, Numcommand,Telephone1, Telephone2, Quantité, Prixtotal, Address, Client} = useLocation().state
      const [name, setName] = useState(Name);
      const [infos, setInfos] = useState(Infos);
      const [produit, setProduit] = useState(Produit);
      const [wilaya, setWilaya] = useState(Wilaya);
      const [commune, setCommune] = useState(Commune);
      const [etat, setEtat] = useState(Etat);
      const [numcommand, setNumcommand] = useState(Numcommand);
      const [telephone1, setTelephone1] = useState(Telephone1);
      const [telephone2, setTelephone2] = useState(Telephone2);
      const [quantité, setQuantité] = useState(Quantité);
      const [prixtotal, setPrixtotal] = useState(Prixtotal);
      const [address, setAddress] = useState(Address)
      const [client, setClient] = useState(Client)



    const handleSubmit = async () => {
      const envoi = {
        name,
        infos,
        produit,
        wilaya,
        commune,
        etat, 
        numcommand,
        telephone1,
        telephone2,
        quantité,
        prixtotal,
        address,
        client      
      };
      if (window.confirm("Are you sure you want to update this shipment?")) {
        updateEnvoi(envoi, id)
            .then((res) => {
                console.log(res)
                window.alert("Shipment Updated Successfully!");
            })
            .catch((error) => {
                window.alert("Shipment didn't get updated !!!");
                console.error(error);
            });
    }
      
    };
    return (

      <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Shipment
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth >
            <TextField
              sx={{ mb: 2 }}
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
            }} name="name" 
              type="name"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="infos"
              label="Infos"
              variant="outlined"
              value={infos}
              onChange={(event) => {
                setInfos(event.target.value)
            }} name="infos" required
              
          />
          </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="product"
              label="Product"
              variant="outlined"
              value={produit}
              onChange={(event) => {
                setProduit(event.target.value)
            }} name="product" required
          
          />
          </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="wilaya"
              label="Wilaya"
              variant="outlined"
              value={wilaya}
              onChange={(event) => {
                setWilaya(event.target.value)
            }} name="password" required
           
          />
          </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Commune"
              variant="outlined"
              value={commune}
              onChange={(event) => {
                setCommune(event.target.value)
            }} name="commune" required
             
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Command Numero"
              variant="outlined"
              value={numcommand}
              onChange={(event) => {
                setNumcommand(event.target.value)
            }} name="numcommand" required
             
            />
          </FormControl>
        </Grid>

        
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Etat"
              variant="outlined"
              value={etat}
              onChange={(event) => {
                setEtat(event.target.value)
            }} name="etat" required
             
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Telephone1"
              variant="outlined"
              value={telephone1}
              onChange={(event) => {
                setTelephone1(event.target.value)
            }} name="telephone1" required
             
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Telephone2"
              variant="outlined"
              value={telephone1}
              onChange={(event) => {
                setTelephone2(event.target.value)
            }} name="telephone2" required
             
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="quantité"
              variant="outlined"
              value={quantité}
              onChange={(event) => {
                setQuantité(event.target.value)
            }} name="quantité" required
             
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Prixtotal"
              variant="outlined"
              value={prixtotal}
              onChange={(event) => {
                setPrixtotal(event.target.value)
            }} name="prixtotal" required
             
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Address"
              variant="outlined"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value)
            }} name="address" required
             
            />
          </FormControl>
        </Grid>

        
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Client"
              variant="outlined"
              value={client}
              onChange={(event) => {
                setClient(event.target.value)
            }} name="client" required  
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
                            handleSubmit()
                        }}
                        style={{ marginTop: 16 }}>Update Shipment</Button>
                        </Grid>
                        </Grid>
      </Container>
    );
  }