import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Typography,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import axios from "axios";

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get("/api/contact/contactDisplay");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Mark as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/contact/markAsRead/${id}`);
      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id ? { ...contact, read: true } : contact
        )
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
  };

  // Delete contact
  const deleteContact = async () => {
    try {
      await axios.delete(`/api/contact/delete/${deleteId}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtered and searched contacts
  const filteredContacts = contacts
    .filter((contact) => {
      if (filter === "read") return contact.read;
      if (filter === "unread") return !contact.read;
      return true;
    })
    .filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase())
    );

  // Paginated contacts
  const paginatedContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Contact Messages
      </Typography>

      <Box
        display="flex"
        gap={2}
        mb={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          variant="outlined"
          label="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ maxWidth: "400px" }}
        />

        <TextField
          select
          label="Filter by Status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          SelectProps={{ native: true }}
          variant="outlined"
          sx={{ width: "200px" }}
        >
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.message}</TableCell>
                <TableCell>
                  {new Date(contact.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {contact.read ? (
                    <Typography color="green">Read</Typography>
                  ) : (
                    <Typography color="red">Unread</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  {!contact.read && (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => markAsRead(contact._id)}
                      startIcon={<Visibility />}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteConfirmation(contact._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredContacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {filteredContacts.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          mt={2}
        >
          No contacts found.
        </Typography>
      )}

      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Are you sure you want to delete this message?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteContact}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactUs;
