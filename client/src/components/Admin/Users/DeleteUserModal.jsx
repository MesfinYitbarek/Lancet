import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from '@mui/material';

const DeleteUserModal = ({ user, onClose, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!user || !user._id) {
      console.error('User ID is undefined');
      onClose();
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/userForAdmin/deleteAdmin/${user._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(user._id);
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the user "{user.username}"?
        </Typography>
        {error && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>Cancel</Button>
        <Button 
          onClick={handleDelete} 
          color="error" 
          variant="contained"
          disabled={isDeleting}
        >
          {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;