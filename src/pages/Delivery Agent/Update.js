import React, { useState, useEffect } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Select,
  Radio,
  FormLabel,
  MenuItem,
  Checkbox,
  Grid,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { updateLivreur } from '../../api/livreur';

export default function UpdateLivreur() {
  const { id, Firstname, Lastname, Email, Birthdate, Phonenumber, Gender, Licencenumber, Bloodtype, Isactivated } =
    useLocation().state;
  const [firstname, setFirstname] = useState(Firstname);
  const [lastname, setLastname] = useState(Lastname);
  const [email, setEmail] = useState(Email);
  const [birthdate, setBirthdate] = useState(Birthdate);
  const [phonenumber, setPhonenumber] = useState(Phonenumber);
  const [gender, setGender] = useState(Gender);
  const [licencenumber, setLicencenumber] = useState(Licencenumber);
  const [bloodtype, setBloodtype] = useState(Bloodtype);
  const [isactivated, setIsactivated] = useState(Isactivated);

  const handleActivationChange = (event) => {
    setIsactivated(event.target.checked);
  };

  const handleSubmit = async () => {
    const livreur = {
      firstname,
      lastname,
      email,
      birthdate,
      phonenumber,
      gender,
      licencenumber,
      bloodtype,
      isactivated,
    };
    if (window.confirm('Are you sure you want to update this delivery agent?')) {
      updateLivreur(livreur, id)
        .then((res) => {
          console.log(res);
          window.alert('Delivery Agent Updated Successfully!');
        })
        .catch((error) => {
          window.alert("Delivery Agent  didn't get updated !!!");
          console.error(error);
        });
    }
  };
  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Delivery Agent
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Firstname"
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
              label="lastname"
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

        <Grid item xs={6}>
          <div>
            <TextField
              id="birthdate"
              label="Birthdate"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={birthdate}
              onChange={(event) => {
                setBirthdate(event.target.value);
              }}
              name="birthdate"
              required
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              label="Phonenumber"
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
            <TextField
              sx={{ mb: 2 }}
              label="Licence number"
              variant="outlined"
              value={licencenumber}
              onChange={(event) => {
                setLicencenumber(event.target.value);
              }}
              name="licencenumber"
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth style={{ width: '150px' }}>
            <label htmlFor="bloodtype">{`Bloodtype`}</label>
            <Select
              labelId="bloodtype-label"
              id="bloodtype"
              type="bloodtype"
              value={bloodtype}
              onChange={(event) => {
                setBloodtype(event.target.value);
              }}
              name="bloodtype"
              required
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox checked={isactivated} onChange={handleActivationChange} name="isactivated" color="primary" />
              }
              label="Activate Account"
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
            Update Delivery Agent
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
