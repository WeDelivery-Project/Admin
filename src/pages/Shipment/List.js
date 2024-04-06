import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// @mui

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

import { getEnvois, deleteEnvoi, deleteManyEnvoi, updateEtatsOfEnvoi } from '../../api/envoi';
import { getEtats } from '../../api/etat';
import Label from '../../components/label/Label';
import { Request } from '../../api/config';
import { getWilayas } from '../../api/wilaya';
import { getClients } from '../../api/client';
import { getLivreurs } from '../../api/livreur';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'infos', label: 'Infos', alignRight: false },
  { id: 'produit', label: 'Produit', alignRight: false },
  { id: 'wilaya', label: 'Wilaya', alignRight: false },
  { id: 'commune', label: 'Commune', alignRight: false },
  { id: 'etat', label: 'Etat', alignRight: false },
  { id: 'numcommand', label: 'Numcommand', alignRight: false },
  { id: 'telephone1', label: 'Telephone1', alignRight: false },
  { id: 'telephone2', label: 'Telephone2', alignRight: false },
  { id: 'quantite', label: 'Quantite', alignRight: false },
  { id: 'prixtotal', label: 'Prixtotal', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  // { id: 'edit', label: '', alignRight: true },
  // { id: 'delete', label: '', alignRight: true },
];

const LABEL_COLOR = {
  1: 'primary', // Nouvel Envoi
  2: 'primary', // Envoi Déposé
  3: 'secondary', // Envoi En Route
  4: 'secondary', // Envoi En Attente
  5: 'success', // Envoi Livré
  6: 'warning', // Envoi Retour
  7: 'error', // Envoi Annulé
  8: 'warning', // Envoi Récupéré
  9: 'success', // Envoi Encaissé
  10: 'success', // Envoi Payé
};

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, { etat, wilaya, client, livreur }) {
  let stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  stabilizedThis = stabilizedThis.map((el) => el[0]);

  if (query) {
    return filter(array, (envoi) =>
      Object.values(envoi).some((value) => String(value).toLowerCase().indexOf(String(query).toLowerCase()) !== -1)
    );
  }

  // Filter
  // ------
  // ------
  // ------

  if (etat) {
    stabilizedThis = stabilizedThis.filter((e) => {
      let status =
        e.etats.length > 0 &&
        e.etats.reduce((a, b) => {
          if (!b.date) return a;
          return a.date > b.date ? a : b;
        });
      if (e.etats.length > 0 && !status.date) status = e.etats.length > 0 && e.etats.find((e) => e.etat.code === 1);
      return etat === status.etat._id;
    });
  }

  console.log('s ===');
  console.log(stabilizedThis);
  if (wilaya) {
    stabilizedThis = stabilizedThis.filter((e) => wilaya === e.wilaya._id);
  }

  if (client) {
    stabilizedThis = stabilizedThis.filter((e) => e.client && client === e.client._id);
  }

  if (livreur) {
    console.log(livreur);
    stabilizedThis = stabilizedThis.filter((e) => e.livreur && livreur === e.livreur._id);
  }

  // Return ----
  return stabilizedThis;
}

export default function EnvoiPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('firstname');

  const [filterName, setFilterName] = useState('');

  const [envois, setEnvois] = useState([]);

  const [selectedEtat, setSelectedEtat] = useState([]);

  const [selectedEtatID, setSelectedEtatID] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

  const [sousetats, setSousetats] = useState([]);

  const [filters, setFilters] = useState({ etat: '', wilaya: '', client: '', livreur: '' });

  const [etatsList, setEtatList] = useState([]);
  const [wilayas, setWilayas] = useState([]);
  const [clients, setClients] = useState([]);
  const [livreurs, setLivreurs] = useState([]);

  useEffect(() => {
    getEnvois()
      .then((res) => {
        setEnvois(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = envois.map((e) => e._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const fetchEnvois = async () => {
    try {
      const res = await getEnvois();
      setEnvois(res.data);
      setSelected([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDelete = (envoiId) => {
    deleteEnvoi(envoiId)
      .then(() => {
        const updatedEnvois = envois.filter((e) => e._id !== envoiId);
        setEnvois(updatedEnvois);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteSelected = async () => {
    try {
      await deleteManyEnvoi(selected);
      const res = await getEnvois();
      setEnvois(res.data);
      setSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - envois.length) : 0;

  const filteredEnvois = applySortFilter(envois, getComparator(order, orderBy), filterName, filters);

  const isNotFound = !filteredEnvois.length && !!filterName;

  const [openModalEditEtat, setOpenModalEditEtat] = useState(false);
  const [openModalFilter, setOpenModalFilter] = useState(false);

  const getSousetats = async () => {
    try {
      const res = await Request.get('/sousetat/');
      setSousetats(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalEditEtat = (e, id) => {
    setSelectedEtat(e);
    setSelectedEtatID(id);
    getSousetats();
    setOpenModalEditEtat(true);
  };

  const handleCloseModalUpdateEtat = () => {
    fetchEnvois();
    setOpenModalEditEtat(false);
  };
  const handleCloseModalModalFilter = () => {
    setOpenModalFilter(false);
  };

  const handleOpenModalFilter = async () => {
    setOpenModalFilter(true);
    try {
      if (!etatsList.length > 0) {
        console.log('HERE');
        const e = await getEtats();
        setEtatList(e.data);
      }

      if (!wilayas.length > 0) {
        const w = await getWilayas();
        setWilayas(w.data);
      }

      if (!clients.length > 0) {
        const c = await getClients();
        setClients(c.data);
      }

      if (!livreurs.length > 0) {
        const l = await getLivreurs();
        setLivreurs(l.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFilterForm = (event) => {
    const { name, value } = event.target;
    const newFilter = { ...filters };
    newFilter[name] = value;
    setFilters({ ...newFilter });
  };

  const handleRestaureFilter = () => {
    setFilters({ etat: '', wilaya: '', client: '', livreur: '' });
  };

  const handleSubmitUpdateEtat = async () => {
    try {
      const selectedEnvoiToEditEtat = envois.filter((e) => e._id === selectedEtatID);
      if (!selectedEnvoiToEditEtat[0].livreur) {
        const etatFilter = selectedEtat.filter((e) => e.etat.code > 1 && !!e.date);
        if (etatFilter.length > 0) {
          alert("Vous devez d'abord choisir un livreur");
          return;
        }
      }
      await updateEtatsOfEnvoi(selectedEtatID, selectedEtat);
      const res = await getEnvois();
      setEnvois(res.data);
      setSelected([]);
      handleCloseModalUpdateEtat();
    } catch (error) {
      console.log(error);
    }
  };

  // Modal update manu status
  const [openModalUpdateManyEtats, setOpenModalUpdateManyEtats] = useState(false);
  const [selectedEtatToMany, setSelectedEtatToMany] = useState('');

  const handleModalUpdateManyStatus = async () => {
    setOpenModalUpdateManyEtats(true);
    try {
      if (!etatsList.length > 0) {
        const e = await getEtats();
        setEtatList(e.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalUpdateManyEtats = () => {
    setOpenModalUpdateManyEtats(false);
  };

  const verifyIsHavingLivreur = (idEtat, selectedEnvoi) => {
    const et = etatsList.filter((e) => e._id === idEtat);
    if (et.code === 1) return true;

    const en = envois.filter((e) => selectedEnvoi.includes(e._id));
    console.log(en);
    const isValid = en.filter((e) => !e.livreur).length === 0;
    console.log('is valid = ', isValid);
    return isValid;
  };

  const handleUpdateManyEtats = async () => {
    try {
      const isHavingLivreur = verifyIsHavingLivreur(selectedEtatToMany, selected);
      if (!isHavingLivreur) {
        alert("Il faut d'abord selectionner un livreur");
        return;
      }
      await Request.put(`/envoi/update/${selectedEtatToMany}`, selected);
      const res = await getEnvois();
      handleCloseModalUpdateManyEtats();
      setEnvois(res.data);
    } catch (error) {
      alert('Erreur lors de la modification');
      console.log(error);
    } finally {
      setSelectedEtatToMany('');
    }
  };

  const navigate = useNavigate();
  const openPdfManySelected = () => {
    navigate('/impression/many', { state: selected });
  };

  return (
    <>
      <Helmet>
        <title> Shipments List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Shipments
          </Typography>
          <Link to="/dashboard/shipment/create">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Shipment
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar
            deleteSelected={deleteSelected}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleOpenModalFilter={handleOpenModalFilter}
            openPdfManySelected={openPdfManySelected}
            updateManyStatus={handleModalUpdateManyStatus}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, maxHeight: 440 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={envois.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : isNotFound ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No matching records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEnvois.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((envoi) => {
                      const {
                        _id,
                        name,
                        infos,
                        produit,
                        wilaya,
                        commune,
                        etats,
                        numcommand,
                        telephone1,
                        telephone2,
                        quantite,
                        prixtotal,
                        address,
                        client,
                        livreur,
                      } = envoi;
                      const isItemSelected = selected.indexOf(_id) !== -1;

                      let status =
                        etats?.length > 0 &&
                        etats.reduce((a, b) => {
                          if (!b.date) return a;
                          return a.date > b.date ? a : b;
                        });

                      if (etats.length > 0 && !status.date)
                        status = etats.length > 0 && etats.find((e) => e.etat.code === 1);

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
                          </TableCell>

                          <TableCell align="left">
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Avatar />
                              &nbsp;&nbsp;&nbsp;
                              {name}
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{infos}</TableCell>

                          <TableCell align="left">{produit}</TableCell>

                          <TableCell align="left">{wilaya.name}</TableCell>

                          <TableCell align="left">{commune.name}</TableCell>

                          {/* <TableCell align="left">{etat?.name || '/'}</TableCell> */}

                          <TableCell align="left">
                            <Label
                              onClick={() => handleOpenModalEditEtat(etats, _id)}
                              color={LABEL_COLOR[status.etat.code] || 'success'}
                            >
                              {status.etat.name}
                            </Label>
                          </TableCell>

                          <TableCell align="left">{numcommand}</TableCell>

                          <TableCell align="left">{telephone1}</TableCell>

                          <TableCell align="left">{telephone2}</TableCell>

                          <TableCell align="left">{quantite}</TableCell>

                          <TableCell align="left">{prixtotal}</TableCell>

                          <TableCell align="left">{address}</TableCell>

                          <TableCell align="left">{client ? `${client.firstname} ${client.lastname}` : ''}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              sx={{ color: '##FF0000', '&:hover': { bgcolor: '##FF0000', color: '#FF0000' } }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this Shipment?')) {
                                  handleDelete(_id);
                                }
                              }}
                            >
                              <Iconify icon="feather:trash-2" width={20} height={20} stroke="red" />
                            </IconButton>

                            <Link
                              // to="/impression"
                              to="/dashboard/Shipment/Update"
                              state={{
                                id: _id,
                                Name: name,
                                Infos: infos,
                                Produit: produit,
                                Wilaya: wilaya,
                                Commune: commune,
                                Etats: etats,
                                Numcommand: numcommand,
                                Telephone1: telephone1,
                                Telephone2: telephone2,
                                Quantite: quantite,
                                Prixtotal: prixtotal,
                                Address: address,
                                Client: client,
                                Livreur: livreur,
                              }}
                            >
                              <IconButton sx={{ color: '#4CAF50', '&:hover': { bgcolor: '#4CAF50', color: '#fff' } }}>
                                <Iconify icon="feather:edit-2" width={20} height={20} stroke="green" />
                              </IconButton>
                            </Link>

                            <Link to={`/impression/many`} state={envois}>
                              <IconButton sx={{ color: '#4287f5', '&:hover': { bgcolor: '#4287f5', color: '#fff' } }}>
                                <Iconify icon="feather:printer" width={20} height={20} stroke="green" />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={envois.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Dialog open={openModalEditEtat} onClose={handleCloseModalUpdateEtat}>
        <DialogTitle>Modifier l'état de l'envoi</DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez appliquez les modification, puis appuyez sur Valider</DialogContentText>
          <Container disableGutters sx={{ width: '100%', mt: 5 }}>
            <Grid container spacing={3}>
              {selectedEtat.length > 0 &&
                selectedEtat.map((e, index) => {
                  const date = e.date && new Date(e.date);
                  return (
                    <Grid item key={e._id} xs={12} sm={12}>
                      <Typography sx={{ mb: 1, fontWeight: 'bold' }}>{e.etat.name}</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                          <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ mb: 1 }}>
                              <DatePicker
                                // sx={{ mb: 2 }}
                                // width="20%"
                                id="date"
                                slotProps={{ textField: { size: 'small' } }}
                                label="Date"
                                format="yyyy-MM-dd"
                                value={date || ''}
                                onChange={(d) => {
                                  const newEtat = [...selectedEtat];
                                  newEtat[index].date = d;
                                  setSelectedEtat(newEtat);
                                }}
                                name="date"
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>
                        {[1, 2, 5, 7, 8].includes(e.etat.code) ? (
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <TextField
                                label="Note d'information"
                                size="small"
                                placeholder="Note d'information"
                                variant="outlined"
                                name="info"
                                disabled={!date}
                                value={e.information ? e.information : ''}
                                onChange={(event) => {
                                  const newEtat = [...selectedEtat];
                                  newEtat[index].information = event.target.value || '';
                                  setSelectedEtat(newEtat);
                                }}
                                type="text"
                                fullWidth
                              />
                            </FormControl>
                          </Grid>
                        ) : [3, 4, 6].includes(e.etat.code) ? (
                          <Grid item xs={6} sm={6}>
                            <FormControl size="small" fullWidth>
                              <InputLabel id="sousetatlabel" sx={{ mb: 1 }}>
                                Sous-état
                              </InputLabel>
                              <Select
                                disabled={!date}
                                labelId="sousetat"
                                id="sousetat"
                                value={e.sousetat ? e.sousetat : ''}
                                label="Sous état"
                                onChange={(event) => {
                                  const newEtat = [...selectedEtat];
                                  newEtat[index].sousetat = event.target.value;
                                  setSelectedEtat(newEtat);
                                }}
                              >
                                {sousetats.map(
                                  (s) =>
                                    s.etat._id === e.etat._id && (
                                      <MenuItem key={s._id} value={s._id}>
                                        {s.name}
                                      </MenuItem>
                                    )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalUpdateEtat}>Annuler</Button>
          <Button onClick={handleSubmitUpdateEtat}>Valider</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModalFilter} onClose={handleCloseModalModalFilter}>
        <DialogTitle>Filtrage des envois</DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez appliquez les modification, puis appuyez sur Valider</DialogContentText>
          <Container disableGutters sx={{ width: '100%', mt: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="etatlabel" sx={{ mb: 1 }}>
                    Etat
                  </InputLabel>
                  <Select
                    labelId="etat"
                    id="etatfilter"
                    value={filters.etat}
                    label="Etat"
                    name="etat"
                    onChange={handleChangeFilterForm}
                  >
                    <MenuItem sx={{ color: 'gray' }} key={0} value={''}>
                      Aucune selection
                    </MenuItem>
                    {etatsList.map((s) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="wilaya" sx={{ mb: 1 }}>
                    Wilaya
                  </InputLabel>
                  <Select
                    labelId="wilaya"
                    id="wilaya"
                    name="wilaya"
                    value={filters.wilaya}
                    label="Wilaya"
                    onChange={handleChangeFilterForm}
                  >
                    <MenuItem sx={{ color: 'gray' }} key={0} value={''}>
                      Aucune selection
                    </MenuItem>
                    {wilayas.map((s) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="client" sx={{ mb: 1 }}>
                    Client
                  </InputLabel>
                  <Select
                    labelId="client"
                    id="client"
                    name="client"
                    value={filters.client}
                    label="client"
                    onChange={handleChangeFilterForm}
                  >
                    <MenuItem sx={{ color: 'gray' }} key={0} value={''}>
                      Aucune selection
                    </MenuItem>
                    {clients.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {`${c.firstname} ${c.lastname}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="livreur" sx={{ mb: 1 }}>
                    Livreur
                  </InputLabel>
                  <Select
                    labelId="livreur"
                    id="livreur"
                    name="livreur"
                    value={filters.livreur}
                    label="livreur"
                    onChange={handleChangeFilterForm}
                  >
                    <MenuItem sx={{ color: 'gray' }} key={0} value={''}>
                      Aucune selection
                    </MenuItem>
                    {livreurs.map((l) => (
                      <MenuItem key={l._id} value={l._id}>
                        {`${l.firstname} ${l.lastname}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestaureFilter}>Restaurer</Button>
          <Button onClick={handleCloseModalModalFilter}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Modal update many etat */}
      <Dialog open={openModalUpdateManyEtats} onClose={handleCloseModalUpdateManyEtats}>
        <DialogTitle>
          Changer l'état des envoi selectionné | {selected.length || 'Aucun envoi'} selectionnés
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Veuillez appliquez les modification, puis appuyez sur Valider</DialogContentText>
          <Container disableGutters sx={{ width: '100%', mt: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="etatlabel" sx={{ mb: 1 }}>
                    Etat
                  </InputLabel>
                  <Select
                    labelId="etat"
                    id="etatfilter"
                    value={selectedEtatToMany}
                    label="Etat"
                    name="etat"
                    onChange={(event) => setSelectedEtatToMany(event.target.value)}
                  >
                    <MenuItem sx={{ color: 'gray' }} key={0} value={''}>
                      Aucune selection
                    </MenuItem>
                    {etatsList.map((s) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalUpdateManyEtats}>Cancel</Button>
          <Button onClick={handleUpdateManyEtats}>Confirme</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
