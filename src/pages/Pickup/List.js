import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
// components
import Label from '../../components/label';

import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock

import { getRamassages, deleteRamassage } from '../../api/ramassage';
import { Request } from '../../api/config';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'adresse', label: 'Adresse', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'wilaya', label: 'Wilaya', alignRight: false },
  { id: 'commune', label: 'Commune', alignRight: false },
  { id: 'comment', label: 'Comment', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'isPayed', label: 'Payé', alignRight: false },
  { id: 'edit', label: '', alignRight: true },
  { id: 'delete', label: '', alignRight: true },
];

const STATUS_COLOR = {
  Nouveau: 'error',
  Valider: 'secondary',
  Terminer: 'success',
};

const RAMASSAGE_STATUS = ['Nouveau', 'Valider', 'Terminer'];

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (pickup) =>
      Object.values(pickup).some((value) => String(value).toLowerCase().indexOf(String(query).toLowerCase()) !== -1)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PickupPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('wilaya');

  const [filterName, setFilterName] = useState('');

  const [ramassage, setRamassage] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

  const [openModalUpdateStatus, setOpenModalUpdateStatus] = useState(false);

  const [isFetchingIsPayed, setIsFetchingIsPayed] = useState(false);

  const [selectedToUpdateStatus, setSelectedToUpdateStatus] = useState(0);

  useEffect(() => {
    getRamassages()
      .then((res) => {
        setRamassage(res.data);
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
      const newSelecteds = ramassage.map((r) => r._id);
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

  const updateIsPayed = async (id, isPayed) => {
    if (isFetchingIsPayed) return;
    try {
      setIsFetchingIsPayed(true);
      await Request.put(`/ramassage/ispayed/${id}`, { isPayed });
      const res = await getRamassages();
      setRamassage(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingIsPayed(false);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ramassage.length) : 0;

  const filteredRamassages = applySortFilter(ramassage, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredRamassages.length && !!filterName;

  // modal
  // Modal
  const handleCloseModalUpdateStatus = () => {
    setOpenModalUpdateStatus(false);
  };

  const handleOpenModalUpdateStatus = (id) => {
    const index = ramassage.findIndex((r) => r._id === id);
    setSelectedToUpdateStatus(index);
    setOpenModalUpdateStatus(true);
  };

  const handleListItemClick = async (status) => {
    try {
      const id = ramassage[selectedToUpdateStatus]?._id;
      await Request.put(`/ramassage/status/${id}`, { status });
      const res = await getRamassages();
      setRamassage(res.data);
      handleCloseModalUpdateStatus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title> Pickups List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pickups
          </Typography>
          <Link to="/dashboard/Pickup/Create">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Pickup
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, maxHeight: 440 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ramassage.length}
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
                    filteredRamassages
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((ramassage, index) => {
                        const { _id, client, adresse, date, wilaya, commune, comment, isPayed, status } = ramassage;
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        console.log(index, ramassage);

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
                                {client ? `${client.firstname} ${client.lastname}` : ''}
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{adresse}</TableCell>

                            <TableCell align="left">
                              {new Date(date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </TableCell>

                            <TableCell align="left">{wilaya.name}</TableCell>

                            <TableCell align="left">{commune.name}</TableCell>

                            <TableCell align="left">{comment}</TableCell>

                            <TableCell
                              onClick={() => {
                                handleOpenModalUpdateStatus(_id);
                              }}
                              align="left"
                            >
                              <Label color={STATUS_COLOR[status] || 'success'}>{status}</Label>
                            </TableCell>

                            <TableCell align="left">
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => updateIsPayed(_id, !isPayed)}
                                sx={
                                  isPayed
                                    ? { backgroundColor: 'green', color: 'white' }
                                    : { backgroundColor: 'black', margin: 'auto' }
                                }
                              >
                                {isPayed ? 'Payé' : 'Non payé'}
                              </Button>
                            </TableCell>

                            {/* <TableCell align="right">
                            <IconButton
                              sx={{ color: '##FF0000', '&:hover': { bgcolor: '##FF0000', color: '#FF0000' } }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this Pickup?')) {
                                  handleDelete(_id);
                                }
                              }}
                            >
                              <Iconify icon="feather:trash-2" width={20} height={20} stroke="red" />
                            </IconButton>

                            <Link
                              to="/dashboard/Pickup/Update"
                              state={{
                                id: _id,
                                Client: client,
                                Adresse: adresse,
                                Date: date,
                                Wilaya: wilaya,
                                Commune: commune,
                                Comment: comment,
                              }}
                            >
                              <IconButton sx={{ color: '#4CAF50', '&:hover': { bgcolor: '#4CAF50', color: '#fff' } }}>
                                <Iconify icon="ant-design:edit-filled" width={20} height={20} />
                              </IconButton>
                            </Link>
                          </TableCell> */}
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
            count={ramassage.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Dialog onClose={handleCloseModalUpdateStatus} open={openModalUpdateStatus}>
        <DialogTitle>Modifier le status</DialogTitle>
        <List sx={{ pt: 0 }}>
          {RAMASSAGE_STATUS.map((s, index) => (
            <ListItem key={index} disableGutters>
              <ListItemButton
                disabled={ramassage[selectedToUpdateStatus]?.status === s}
                onClick={() => handleListItemClick(s)}
              >
                <ListItemText primary={s} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
