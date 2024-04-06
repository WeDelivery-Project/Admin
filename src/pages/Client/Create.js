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
  Modal,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createClient } from '../../api/client';

export default function CreateClient() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState(true);
  const [entreprise, setEntreprise] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [servicestock, setServicestock] = useState(false);
  const [serviceemballage, setServiceemballage] = useState(false);
  const [servicecallcenter, setServicecallcenter] = useState(false);

  const clearTextBox = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setBirthdate(new Date());
    setPhone('');
    setGender(false);
    setStatus(false);
    setEntreprise('');
    setCardnumber('');
    setServicestock(false);
    setServiceemballage(false);
    setServicecallcenter(false);
  };

  const handleActivationChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = async (event) => {
    // prevent the default form submit behavior
    event.preventDefault();

    const client = {
      firstname,
      lastname,
      email,
      password,
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

    // send the client object to the server using axios or fetch API

    try {
      const data = await createClient(client);

      // clear the form fields after submitting the form
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'firstname':
        setFirstname(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'birthdate':
        setBirthdate(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'status':
        setStatus(value);
        break;
      case 'entreprise':
        setEntreprise(value);
        break;
      case 'cardnumber':
        setCardnumber(value);
        break;
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

  // Modal config
  const [openModalSucces, setOpenModalSucces] = React.useState(false);
  const handleOpen = () => setOpenModalSucces(true);
  const handleCloseModalSucces = () => {
    clearTextBox();
    setOpenModalSucces(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container onSubmit={handleSubmit} component="form" sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {' '}
        Create a Client
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="firstname"
              label="First Name"
              variant="outlined"
              value={firstname}
              onChange={handleInputChange}
              name="firstname"
              fullWidth
              required
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 2 }}
            id="lastname"
            label="Last Name"
            variant="outlined"
            value={lastname}
            onChange={handleInputChange}
            name="lastname"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 2 }}
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value={email}
            onChange={handleInputChange}
            type="email"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 2 }}
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleInputChange}
            name="password"
            fullWidth
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
            id="phone"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={handleInputChange}
            type="tel"
            name="phone"
            fullWidth
            required
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            name="cardnumber"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender :</FormLabel>
          <RadioGroup sx={{ mb: 3 }} aria-label="gender" name="gender" value={gender} onChange={handleInputChange}>
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
          sx={{ mb: 2 }}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ marginTop: 16 }}
          // onClick={handleSubmit}
        >
          Create Client
        </Button>
      </Grid>

      <Modal
        open={openModalSucces}
        onClose={handleCloseModalSucces}
        aria-labelledby="Client created modal"
        aria-describedby="Client created modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Client crée!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Le client <strong>{`${firstname} ${lastname}`}</strong> a été ajouté à la base de donnée.
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}
