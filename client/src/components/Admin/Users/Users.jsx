import { useState, useEffect } from 'react';
import { TextField, Button, Tab, Tabs, Box, Typography, Pagination } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import EditUser from './EditUser';
import DeleteUserModal from './DeleteUserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/userForAdmin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filterUsers = (role) => {
    return users.filter(
      (user) =>
        user.role === role &&
        (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const admins = filterUsers('admin');
  const instructors = filterUsers('instructor');
  const students = filterUsers('student');

  const userTypes = [
    { label: 'Admins', data: admins },
    { label: 'Instructors', data: instructors },
    { label: 'Students', data: students },
  ];

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCloseEdit = () => {
    setEditingUser(null);
    fetchUsers();
  };

  const handleDeleteUser = (user) => {
    setDeletingUser(user);
  };

  const handleCloseDelete = () => {
    setDeletingUser(null);
    fetchUsers();
  };

  const columns = [

    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Joined',
      width: 130,
      
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleEditUser(params.row)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteUser(params.row)}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="user tabs">
          {userTypes.map((type, index) => (
            <Tab key={index} label={`${type.label} (${type.data.length})`} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Search users"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Box>
      <DataGrid
        rows={userTypes[tab].data.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
        columns={columns}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        disableSelectionOnClick
        autoHeight
        getRowId={(row) => row._id}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(userTypes[tab].data.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
      {editingUser && <EditUser user={editingUser} onClose={handleCloseEdit} />}
      {deletingUser && <DeleteUserModal user={deletingUser} onClose={handleCloseDelete} />}
    </Box>
  );
};

export default Users;