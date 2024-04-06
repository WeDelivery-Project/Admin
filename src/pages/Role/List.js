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

import { getRoles, deleteRole } from '../../api/role';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'envois', label: 'Envois', alignRight: false },
  { id: 'clients', label: 'Clients', alignRight: false },
  { id: 'livreurs', label: 'Livreurs', alignRight: false },
  { id: 'paiements', label: 'Paiements', alignRight: false },
  { id: 'tarifs', label: 'Tarifs', alignRight: false },
  { id: 'parameters', label: 'Parameters', alignRight: false },
  { id: 'administrateurs', label: 'Administrateurs', alignRight: false },
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
    return filter(array, (role) =>
      Object.values(role).some((value) => String(value).toLowerCase().indexOf(String(query).toLowerCase()) !== -1)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RolePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('firstname');

  const [filterName, setFilterName] = useState('');

  const [role, setRole] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoles()
      .then((res) => {
        setRole(res.data);
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
      const newSelecteds = role.map((n) => n._id);
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

  const handleDelete = (roleId) => {
    console.log(roleId)
    deleteRole(roleId)
      .then(() => {
        const updatedRoles = role.filter((r) => r._id !== roleId);
        setRole(updatedRoles);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - role.length) : 0;

  const filteredRoles = applySortFilter(role, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredRoles.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Admin Roles List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Roles
          </Typography>
          <Link to="/dashboard/Role/Create">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Role
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
                  rowCount={role.length}
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
                    filteredRoles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role) => {
                      const { _id, name, envois, clients, livreurs, paiements, tarifs, parameters, administrateurs } =
                        role;
                      const isItemSelected = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isItemSelected}>
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
                          <TableCell align="left">{envois ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{clients ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{livreurs ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{paiements ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{tarifs ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{parameters ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{administrateurs ? 'Yes' : 'No'}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              sx={{ color: '##FF0000', '&:hover': { bgcolor: '##FF0000', color: '#FF0000' } }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this Role ?')) {
                                  handleDelete(_id);
                                }
                              }}
                            >
                              <Iconify icon="feather:trash-2" width={20} height={20} stroke="red" />
                            </IconButton>

                            <Link
                              to="/dashboard/Role/Update"
                              state={{
                                id: _id,
                                Name: name,
                                Envois: envois,
                                Clients: clients,
                                Livreurs: livreurs,
                                Paiements: paiements,
                                Tarifs: tarifs,
                                Parameters: parameters,
                                Administrateurs: administrateurs,
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
            count={role.length}
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
