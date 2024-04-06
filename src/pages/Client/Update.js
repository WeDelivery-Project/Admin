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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { updateClient } from '../../api/client';

export default function UpdateClient() {
  const {
    id,
    Firstname,
    Lastname,
    Email,
    Birthdate,
    Phone,
    Gender,
    Status,
    Entreprise,
    Cardnumber,
    Servicestock,
    Serviceemballage,
    Servicecallcenter,
  } = useLocation().state;
  console.log(useLocation().state);
  const [firstname, setFirstname] = useState(Firstname);
  const [lastname, setLastname] = useState(Lastname);
  const [email, setEmail] = useState(Email);
  const [birthdate, setBirthdate] = useState(new Date(Birthdate));
  const [phone, setPhone] = useState(Phone);
  const [gender, setGender] = useState(Gender);
  const [status, setStatus] = useState(Status);
  const [entreprise, setEntreprise] = useState(Entreprise);
  const [cardnumber, setCardnumber] = useState(Cardnumber);
  const [servicestock, setServicestock] = useState(Servicestock);
  const [serviceemballage, setServiceemballage] = useState(Serviceemballage);
  const [servicecallcenter, setServicecallcenter] = useState(Servicecallcenter);

  const handleActivationChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'servicestock':
        setServicestock(event.target.checked);
        break;
      case 'serviceemballage':
        setServiceemballage(event.target.checked);
        break;
      case 'servicecallcenter':
        setServicecallcenter(event.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const client = {
      firstname,
      lastname,
      email,
      birthdate,
      phone,
      gender,
      status,
      entreprise,
      cardnumber,
      servicestock,
      serviceemballage,
      servicecallcenter,
    };
    if (window.confirm('Are you sure you want to update this client?')) {
      updateClient(client, id)
        .then((res) => {
          console.log(res);
          window.alert('Client Updated Successfully!');
        })
        .catch((error) => {
          window.alert("Client didn't get updated !!!");
          console.error(error);
        });
    }
  };
  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Client
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={{ mb: 2 }}
                  width="20%"
                  id="birthdate"
                  label="Birthdate"
                  format="yyyy-MM-dd"
                  value={birthdate}
                  onChange={setBirthdate}
                  name="birthdate"
                  required
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              name="phone"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender :</FormLabel>
            <RadioGroup
              sx={{ mb: 3 }}
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  id="status"
                  checked={status}
                  onChange={handleActivationChange}
                  inputProps={{ 'aria-label': 'activate account checkbox' }}
                />
              }
              label="Activate Account"
              htmlFor="status"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-basic"
              label="Entreprise"
              variant="outlined"
              sx={{ mb: 2 }}
              value={entreprise}
              onChange={(event) => {
                setEntreprise(event.target.value);
              }}
              name="entreprise"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-basic"
              sx={{ mb: 2 }}
              label="Cardnumber"
              variant="outlined"
              value={cardnumber}
              onChange={(event) => {
                setCardnumber(event.target.value);
              }}
              name="cardnumber"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox checked={servicestock} onChange={handleInputChange} name="servicestock" color="primary" />
              }
              label="Service Stock"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={serviceemballage}
                  onChange={handleInputChange}
                  name="serviceemballage"
                  color="primary"
                />
              }
              label="Service Emballage"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ mb: 2 }}
                  checked={servicecallcenter}
                  onChange={handleInputChange}
                  name="servicecallcenter"
                  color="primary"
                />
              }
              label="Service Call Center"
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
            Update Client
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
