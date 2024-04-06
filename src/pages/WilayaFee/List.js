import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { getWilayas, modifyWilaya } from '../../api/wilaya';

const styles = {
  table: {
    minWidth: 650,
  },
  search: {
    margin: '1rem 0',
  },
};

const TarifsTable = () => {
  const [wilayas, setWilayas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEnabled, setEditingEnabled] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalUpdating = (w) => {
    setSelectedWilaya(w);
    handleClickOpen();
  };

  useEffect(() => {
    getWilayas()
      .then((res) => {
        setWilayas(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleActivateEdit = () => {
    setEditingEnabled(true);
  };

  const handleDisableEdit = () => {
    setEditingEnabled(false);
  };

  const handleChangeEnvoi = (event) => {
    const w = { ...selectedWilaya };
    w.tarifs[0].price = event.target.value;
    setSelectedWilaya({ ...w });
  };

  const handleChangeRetour = (event) => {
    const w = { ...selectedWilaya };
    w.tarifs[1].price = event.target.value;
    setSelectedWilaya({ ...w });
  };

  const onSubmit = async () => {
    try {
      const res = await modifyWilaya(selectedWilaya);
      console.log(res.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const filteredWilayas =
    wilayas && wilayas.filter((wilaya) => wilaya?.name?.toLowerCase().includes(searchQuery?.toLowerCase()));

  return (
    <>
      <TextField
        className="search"
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table className="table" aria-label="tarifs table">
          <TableHead>
            <TableRow>
              <TableCell>Wilaya Code</TableCell>
              <TableCell>Wilaya Name</TableCell>
              <TableCell>Livraison</TableCell>
              <TableCell>Retour</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWilayas.map((wilaya, index) => (
              <TableRow key={wilaya._id}>
                <TableCell>{wilaya.code}</TableCell>
                <TableCell>{wilaya.name}</TableCell>
                <TableCell>{wilaya?.tarifs[0].price}</TableCell>
                <TableCell>{wilaya?.tarifs[1].price}</TableCell>
                <TableCell>
                  <Button onClick={() => modalUpdating(wilaya)} variant="text">
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editingEnabled ? (
        <Button onClick={handleDisableEdit}>Disable Editing</Button>
      ) : (
        <Button onClick={handleActivateEdit}>Activate Editing</Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`${selectedWilaya?.code} - ${selectedWilaya?.name}`}</DialogTitle>
        <DialogContent component="form" onSubmit={onSubmit}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="envoi"
            label="Prix envoi"
            value={selectedWilaya?.tarifs[0].price}
            onChange={handleChangeEnvoi}
            type="number"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="retour"
            label="Prix retour"
            value={selectedWilaya?.tarifs[1].price}
            onChange={handleChangeRetour}
            type="number"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmit}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TarifsTable;
