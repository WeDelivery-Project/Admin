import React, { useState } from 'react';
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  Grid,
  Container,
  FormLabel,
  Typography,
  TextField,
  Button,
  Snackbar 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CheckCircle } from '@mui/icons-material';
import { createLivreur } from '../../api/livreur';

export default function CreateLivreur() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [phonenumber, setPhonenumber] = useState('');
  const [gender, setGender] = useState('');
  const [licencenumber, setLicencenumber] = useState('');
  const [bloodtype, setBloodtype] = useState('');
  const [isactivated, setIsactivated] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const clearTextBox = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setBirthdate('');
    setPhonenumber('');
    setGender('');
    setLicencenumber('');
    setBloodtype('');
    setIsactivated(false);
  };

  const handleActivationChange = (e) => {
    const { checked } = e.target;
    setIsactivated(checked)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const livreur = {
      firstname,
      lastname,
      email,
      password,
      birthdate,
      phonenumber,
      gender,
      licencenumber,
      bloodtype,
      isactivated,
    };
    clearTextBox();  

    // send the FormData object to the server using axios
    createLivreur(livreur)
      .then((res) => {
        console.log(res);
          clearTextBox();
      setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error(error);
      });

    clearTextBox();
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create a Delivery Agent
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="firstname"
              label="First name"
              variant="outlined"
              value={firstname}
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
              name="firstname"
              required
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
            label="Last name"
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

      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
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

      <Grid item xs={12}>
        <FormControl>
          <TextField
            sx={{ mb: 2 }}
            id="standard-basic"
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
            sx={{ mb: 2 }}
            id="phonenumber"
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
            aria-label="gender"
            sx={{ mb: 2 }}
            name="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <FormControlLabel value="Man" control={<Radio />} label="Man" />
            <FormControlLabel value="Woman" control={<Radio />} label="Woman" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 2 }}
            id="licencenumber"
            label="Licencenumber"
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
              <Checkbox checked={isactivated} onChange={handleActivationChange} name="isactivated" 
              color="primary" />
            }
            label="Activate Account"
            labelPlacement="end"
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
          Create Delivery Agent
        </Button>
        <Snackbar
      open={openSnackbar}
      onClose={handleSnackbarClose}
      message={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircle sx={{ mr: 1 }} />
          <span>Delivery Agent Added Successfully</span>
        </div>
      }
      autoHideDuration={2000}
    />
      </Grid>
    </Container>
  );
}
