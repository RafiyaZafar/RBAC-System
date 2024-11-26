import React, { useState, useEffect } from "react";
import axiosInstance from "../services/mockApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  Modal,
  Box,
  TextField,
  IconButton,
  Typography,
  useMediaQuery,
  InputAdornment,
  Switch, 
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      fontWeight: 600,
      fontSize: "22px",
      color: "#333",
    },
    body1: {
      fontSize: "16px", 
      color: "#555",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1976d2", 
          color: "white", 
          fontWeight: 600,
          fontSize: "16px", 
        },
        body: {
          fontSize: "16px", 
          fontWeight: "normal", 
          borderBottom: "1px solid #ddd", 
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#f9f9f9", 
          },
          "&:hover": {
            backgroundColor: "#e3f2fd", 
          },
        },
      },
    },
  },
});

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

 
  useEffect(() => {
    axiosInstance.get("/users").then((response) => {
      setUsers(response.data);
      setFilteredUsers(response.data);
    });

    axiosInstance.get("/roles").then((response) => {
      setRoles(response.data);
    });
  }, []);

  
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  
  const handleDelete = (id) => {
    axiosInstance.delete(`/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  
  const handleOpenModal = (user = null) => {
    setCurrentUser(user || { name: "", role: "", status: true });
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const handleSave = () => {
    if (currentUser.id) {
      // Edit user
      axiosInstance.patch(`/users/${currentUser.id}`, currentUser).then(() => {
        setUsers(
          users.map((user) => (user.id === currentUser.id ? currentUser : user))
        );
      });
    } else {
      // Add user
      if (roles.length === 0) {
        alert("Please add roles before adding users.");
        return;
      }
      axiosInstance.post("/users", currentUser).then((response) => {
        setUsers([...users, response.data]);
      });
    }
    handleCloseModal();
  };

  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginLeft: isMobile ? "0" : "100px", padding: "20px" }}>
        <TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal()}
              style={{
                height: "40px",
                width: "150px",
                padding: "8px 16px",
                fontSize: isMobile ? "14px" : "16px",
                display: "flex",
                alignItems: "center", 
                justifyContent: "center",
              }}
            >
              <AddCircleIcon style={{ marginRight: "5px" }} />
              Add User
            </Button>

            
            <TextField
              variant="outlined"
              label="Search Users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                maxWidth: "300px",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.status ? (
                      <Typography color="green" variant="body1">
                        Active
                      </Typography>
                    ) : (
                      <Typography color="red" variant="body1">
                        Inactive
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenModal(user)}
                      style={{
                        margin: "5px",
                        color: "#1976d2", 
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                      style={{
                        margin: "5px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit User Modal */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "90%" : "400px",
              bgcolor: "background.paper",
              p: 4,
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              {currentUser?.id ? "Edit User" : "Add User"}
            </Typography>
            <TextField
              fullWidth
              label="Name"
              value={currentUser?.name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
              margin="normal"
            />
            <Select
              fullWidth
              value={currentUser?.role || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
              margin="normal"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
            <div style={{ margin: "16px 0" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Active Status
              </Typography>
              <Switch
                checked={currentUser?.status || false}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, status: e.target.checked })
                }
              />
            </div>
            <Button
              variant="contained"
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <SaveIcon style={{ marginRight: "10px" }} />
              Save
            </Button>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default UserTable;
