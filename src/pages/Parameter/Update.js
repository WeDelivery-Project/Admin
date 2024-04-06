import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getParemeters, updateParameter } from '../../api/parameters'; // assuming these functions are in a separate api.js file

const ParameterUpdate = () => {
  const [parameters, setParameters] = useState({});
  const [website, setWebsite] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [address, setAddress] = useState('');
  const [mail, setMail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');

  useEffect(() => {
    getParemeters().then((res) => {
      setParameters(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const handleUpdate = () => {
    const updatedParameters = {
      website,
      entreprise,
      address,
      mail,
      phonenumber,
    };
    updateParameter(updatedParameters).then((res) => {
      console.log(res.data);
      // do something with the updated data, e.g. display a success message
    }).catch((err) => {
      console.error(err);
      // display an error message
    });
  };

  const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: '10px',
      width: '300px',
    },
  });

  const StyledButton = styled(Button)({
    margin: '10px',
    width: '300px',
  });

  return (
    <Grid container justifyContent="center" alignItems="center">
      <StyledForm noValidate autoComplete="off">
        <TextField
          id="website"
          label="Website"
          variant="outlined"
          value={website || parameters.website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          id="entreprise"
          label="Entreprise"
          variant="outlined"
          value={entreprise || parameters.entreprise}
          onChange={(e) => setEntreprise(e.target.value)}
        />
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          value={address || parameters.address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          id="mail"
          label="Mail"
          variant="outlined"
          value={mail || parameters.mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <TextField
          id="phonenumber"
          label="Phone Number"
          variant="outlined"
          value={phonenumber || parameters.phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <StyledButton variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </StyledButton>
      </StyledForm>
    </Grid>
  );
};

export default ParameterUpdate;
