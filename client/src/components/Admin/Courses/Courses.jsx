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
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/courses');
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
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setCourses(courses.filter(course => course._id !== id));
      showSnackbar('Course deleted successfully', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error deleting course', 'error');
    }
  };


  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  {currentUser.role === "admin" && (
                    <Box sx={{ mt: 2 }}>
                      <IconButton onClick={() => handleDelete(course._id)} color="error">
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
                      <TableCell>
                        {currentUser.role === "admin" && (
                          <>
                            <IconButton onClick={() => handleDelete(course._id)} color="error" size="small">
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