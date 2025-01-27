import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Snackbar, Alert, Button, IconButton, InputLabel, MenuItem, Select, FormControl, TextField, Typography, Box, Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme, useMediaQuery } from '@mui/material';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/allCourses');
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      fetchCourses();
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

    return matchesSearch;
  });

  return (
    <Box className="p-4">
      <Card className="shadow-lg">
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
            <TextField
              label="Search Courses"
              variant="outlined"
              fullWidth
              className="mb-4 sm:mb-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel >Filter</InputLabel>
              <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="unapproved">Unapproved</MenuItem>
              </Select>
            </FormControl>
          </div>

          {isMobile ? (
            filteredCourses.map((course) => (
              <Card key={course._id} className="mb-4 p-4 shadow-sm">
                <CardContent>
                  <Typography variant="h6" className="font-semibold">{course.title}</Typography>
                  <Typography variant="body2" color="textSecondary">Category: {course.catagory}</Typography>
                  <Typography variant="body2" color="textSecondary">Instructor: {course.instructor}</Typography>
                  <Typography variant="body2" color="textSecondary">Price: {course.isPaid ? `$${course.price}` : 'Free'}</Typography>
                  <Typography variant="body2" color="textSecondary">Duration: {course.duration}</Typography>
                  <Typography variant="body2" color="textSecondary">Status: {course.isApproved ? 'Approved' : 'Unapproved'}</Typography>
                  {currentUser.role === 'admin' && (
                    <div className="flex space-x-2 mt-4">
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
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Title</th>
                    <th className="py-2 px-4 text-left">Category</th>
                    <th className="py-2 px-4 text-left">Instructor</th>
                    <th className="py-2 px-4 text-left">Price</th>
                    <th className="py-2 px-4 text-left">Duration</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course._id} className="border-b">
                      <td className="py-2 px-4">{course.title}</td>
                      <td className="py-2 px-4">{course.catagory}</td>
                      <td className="py-2 px-4">{course.instructor}</td>
                      <td className="py-2 px-4">{course.isPaid ? `$${course.price}` : 'Free'}</td>
                      <td className="py-2 px-4">{course.duration}</td>
                      <td className="py-2 px-4">{course.isApproved ? 'Approved' : 'Unapproved'}</td>
                      <td className="py-2 px-4">
                        {currentUser.role === 'admin' && (
                          <div className="flex space-x-2">
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
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

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
