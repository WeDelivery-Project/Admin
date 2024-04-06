import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// @mui

import {
  Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import avatar1 from '../../assets/avatars/avatar_1.jpg';
import avatar10 from '../../assets/avatars/avatar_10.jpg';
import avatar2 from '../../assets/avatars/avatar_2.jpg';
import avatar3 from '../../assets/avatars/avatar_3.jpg';
import avatar4 from '../../assets/avatars/avatar_4.jpg';
import avatar5 from '../../assets/avatars/avatar_5.jpg';
import avatar6 from '../../assets/avatars/avatar_6.jpg';
import avatar7 from '../../assets/avatars/avatar_7.jpg';
import avatar8 from '../../assets/avatars/avatar_8.jpg';
import avatar9 from '../../assets/avatars/avatar_9.jpg';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

import { deleteAdmin, getAdmins } from '../../api/admin';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'role', label: 'Rôle', alignRight: false },
  { id: 'email', label: 'E-mail', alignRight: false },
  { id: 'phonnumber', label: 'Phone Number', alignRight: false },
  { id: 'edit', label: '', alignRight: true },
  { id: 'delete', label: '', alignRight: true },
];

const avatarMap = {
  'avatar-url-1': avatar1,
  'avatar-url-2': avatar2,
  'avatar-url-3': avatar3,
  'avatar-url-4': avatar4,
  'avatar-url-5': avatar5,
  'avatar-url-6': avatar6,
  'avatar-url-7': avatar7,
  'avatar-url-8': avatar8,
  'avatar-url-9': avatar9,
  'avatar-url-10': avatar10,
  // Add more avatar mappings if needed
};

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
    console.log(query);
    return filter(stabilizedThis, ([admin]) =>
      Object.values(admin).some((a) => {
        console.log(a);
        return (
          String(`${a.lastname} ${a.email} ${a.role.name}`).toLowerCase().indexOf(String(query).toLowerCase()) !== -1
        );
      })
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AdminPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('firstname');

  const [filterName, setFilterName] = useState('');

  const [admin, setAdmins] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdmins()
      .then((res) => {
        const admin = res.data.map((admin) => ({
          ...admin,
          avatarUrl: avatarMap[admin.avatarUrl] ?? avatarMap['avatar-url-1'],
        }));
        setAdmins(admin);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = admin.map((n) => n._id);
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

  const handleDelete = (adminId) => {
    console.log(adminId);
    deleteAdmin(adminId)
      .then(() => {
        const updatedAdmins = admin.filter((a) => a._id !== adminId);
        setAdmins(updatedAdmins);
      })
      .catch((error) => {
        console.error(error);
      });
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - admin.length) : 0;

  const filteredAdmins = applySortFilter(
    admin.filter((admin) => admin.firstname.toLowerCase().includes(filterName.toLowerCase())),
    getComparator(order, orderBy)
  );

  const isNotFound = !filteredAdmins.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Admin List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admins
          </Typography>
          <Link to="/dashboard/admin/create">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Admin
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
                  rowCount={admin.length}
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
                    filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { _id, email, firstname, lastname, phonenumber, role, password } = row;
                      const isItemSelected = selected.indexOf(_id) !== -1;
                      const fullname = firstname && lastname ? `${firstname} ${lastname}` : 'Admin name';
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
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar /> */}
                              {/* &nbsp;&nbsp;&nbsp; */}
                              {fullname}
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{role?.name || '/'}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phonenumber}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              sx={{ color: '##FF0000', '&:hover': { bgcolor: '##FF0000', color: '#FF0000' } }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this Admin?')) {
                                  handleDelete(_id);
                                }
                              }}
                            >
                              <Iconify icon="feather:trash-2" width={20} height={20} stroke="red" />
                            </IconButton>

                            <Link
                              to="/dashboard/Admin/Update"
                         
                              state={{
                                id: _id,
                                Email: email,
                                Password: password,
                                Firstname: firstname,
                                Lastname: lastname,
                                Phonenumber: phonenumber,
                                Role: role?._id || '',
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
            count={admin.length}
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
