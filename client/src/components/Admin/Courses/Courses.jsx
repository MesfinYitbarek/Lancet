import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state: 'all', 'approved', 'unapproved'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/allCourses'); // Fetch all courses for admin
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      showSnackbar('Error fetching courses', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/courses/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setCourses(courses.filter((course) => course._id !== id));
      showSnackbar('Course deleted successfully', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error deleting course', 'error');
    }
  };

  const toggleApproval = async (id) => {
    try {
      const response = await fetch(`/api/courses/approve/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      fetchCourses(); // Refresh courses
      showSnackbar('Course approval status updated', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error updating approval status', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'approved') {
      return matchesSearch && course.isApproved;
    } else if (filter === 'unapproved') {
      return matchesSearch && !course.isApproved;
    }

    return matchesSearch; // Default: 'all'
  });

  return (
    <Box sx={{ p: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <TextField
            label="Search Courses"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Filter</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="unapproved">Unapproved</MenuItem>
            </Select>
          </FormControl>

          {isMobile ? (
            // Mobile view
            filteredCourses.map((course) => (
              <Card key={course._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {course.catagory}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Instructor: {course.instructor}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: {course.isPaid ? `$${course.price}` : 'Free'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Duration: {course.duration}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {course.isApproved ? 'Approved' : 'Unapproved'}
                  </Typography>
                  {currentUser.role === 'admin' && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        onClick={() => toggleApproval(course._id)}
                        color={course.isApproved ? 'warning' : 'success'}
                        variant="contained"
                        size="small"
                        startIcon={<CheckIcon />}
                      >
                        {course.isApproved ? 'Unapprove' : 'Approve'}
                      </Button>
                      <IconButton
                        onClick={() => handleDelete(course._id)}
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            // Desktop view
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.catagory}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.isPaid ? `$${course.price}` : 'Free'}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.isApproved ? 'Approved' : 'Unapproved'}</TableCell>
                      <TableCell>
                        {currentUser.role === 'admin' && (
                          <>
                            <Button
                              onClick={() => toggleApproval(course._id)}
                              color={course.isApproved ? 'warning' : 'success'}
                              variant="contained"
                              size="small"
                              startIcon={<CheckIcon />}
                            >
                              {course.isApproved ? 'Unapprove' : 'Approve'}
                            </Button>
                            <IconButton
                              onClick={() => handleDelete(course._id)}
                              color="error"
                              size="small"
                              sx={{ ml: 1 }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Courses;
