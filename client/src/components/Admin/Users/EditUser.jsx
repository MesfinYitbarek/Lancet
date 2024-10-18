import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditUser = ({ user, onClose }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!editedUser._id) {
                console.error('User ID is undefined');
                return;
            }

            const response = await fetch(`/api/userForAdmin/updateAdmin/${editedUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: editedUser.username,
                    email: editedUser.email,
                    role: editedUser.role,
                    // Add any other fields you want to update
                }),
            });

            if (response.ok) {
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Failed to update user:', errorData.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedUser.username || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={editedUser.email || ''}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            name="role"
                            value={editedUser.role || ''}
                            onChange={handleChange}
                            label="Role"
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="instructor">Instructor</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditUser;