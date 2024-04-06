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
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Checkbox,
} from '@mui/material';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

import { getClients, deleteClient } from '../../api/client';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstname', label: 'Firstname', alignRight: false },
  { id: 'lastname', label: 'Lastname', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'birthdate', label: 'Birthdate', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'entreprise', label: 'Entreprise', alignRight: false },
  { id: 'cardnumber', label: 'Cardnumber', alignRight: false },
  { id: 'servicestock', label: 'Servicestock', alignRight: false },
  { id: 'serviceemballage', label: 'Serviceemballage', alignRight: false },
  { id: 'servicecallcenter', label: 'Servicecallcenter', alignRight: false },
  { id: 'edit', label: '', alignRight: true },
  { id: 'delete', label: '', alignRight: true },
];

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
    return filter(stabilizedThis, ([client]) =>
      Object.values(client).some((value) => String(value).toLowerCase().indexOf(String(query).toLowerCase()) !== -1)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ClientPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('firstname');

  const [filterName, setFilterName] = useState('');

  const [client, setClients] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getClients()
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = client.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleDelete = (clientId) => {
    console.log(clientId);
    deleteClient(clientId)
      .then(() => {
        const updatedClients = client.filter((a) => a._id !== clientId);
        setClients(updatedClients);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - client.length) : 0;

  const filteredClients = applySortFilter(
    client.filter((client) => client.firstname.toLowerCase().includes(filterName.toLowerCase())),
    getComparator(order, orderBy)
  );

  const isNotFound = !filteredClients.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Client List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Clients
          </Typography>
          <Link to="/dashboard/client/create">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Client
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer component={Paper}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={client.length}
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
                    filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => {
                      const {
                        _id,
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
                      } = client;
                      const isItemSelected = selected.indexOf(_id) !== -1;
                      console.log(isItemSelected);

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
                              {firstname}
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{lastname}</TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{new Date(birthdate).toISOString().split('T')[0]}</TableCell>

                          <TableCell align="left">{phone}</TableCell>

                          <TableCell align="left">{gender}</TableCell>

                          <TableCell align="left">{status ? 'Yes' : 'No'}</TableCell>

                          <TableCell align="left">{entreprise}</TableCell>

                          <TableCell align="left">{cardnumber}</TableCell>

                          <TableCell align="left">{servicestock ? 'Yes' : 'No'}</TableCell>

                          <TableCell align="left">{serviceemballage ? 'Yes' : 'No'}</TableCell>

                          <TableCell align="left">{servicecallcenter ? 'Yes' : 'No'}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              sx={{ color: '##FF0000', '&:hover': { bgcolor: '##FF0000', color: '#FF0000' } }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this Client?')) {
                                  handleDelete(_id);
                                }
                              }}
                            >
                              <Iconify icon="feather:trash-2" width={20} height={20} stroke="red" />
                            </IconButton>

                            <Link
                              to={`/dashboard/Client/Update/${_id}`}
                              state={{
                                id: _id,
                                Firstname: firstname,
                                Lastname: lastname,
                                Email: email,
                                Password: password,
                                Birthdate: birthdate,
                                Phone: phone,
                                Gender: gender,
                                Status: status,
                                Entreprise: entreprise,
                                Cardnumber: cardnumber,
                                Servicestock: servicestock,
                                Serviceemballage: serviceemballage,
                                Servicecallcenter: servicecallcenter,
                              }}
                            >
                              <IconButton sx={{ color: '#4CAF50', '&:hover': { bgcolor: '#4CAF50', color: '#fff' } }}>
                                <Iconify icon="ant-design:edit-filled" width={20} height={20} />
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
            count={client.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
