import React, { useState, useEffect } from "react";
import axiosInstance from "../services/mockApi";
import { IconButton } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      fontWeight: 600,
      fontSize: "22px", 
      color: "#333",
    },
    h5: {
      fontWeight: 500,
      fontSize: "26px", 
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
          borderBottom: "1px solid #ccc", 
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#f4f6f8", 
          },
          "&:hover": {
            backgroundColor: "#e0f7fa", 
          },
        },
      },
    },
  },
});

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const allPermissions = ["Read", "Write", "Delete"]; 

  
  useEffect(() => {
    axiosInstance.get("/roles").then((response) => {
      setRoles(response.data);
    });
  }, []);

  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  

  
  const handleOpenModal = (role = null) => {
    setCurrentRole(role || { name: "", permissions: [] });
    setPermissions(role ? role.permissions : []);
    setOpen(true);
  };

  
  const handleCloseModal = () => setOpen(false);

  
  const handlePermissionToggle = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  
  const handleSaveRole = () => {
    const roleData = { ...currentRole, permissions };
    if (currentRole.id) {
      
      axiosInstance
        .patch(`/roles/${currentRole.id}`, roleData)
        .then(() => {
          setRoles(
            roles.map((role) => (role.id === currentRole.id ? roleData : role))
          );
          handleCloseModal();
        })
        .catch((error) => {
          alert("Error updating role. Please try again.");
        });
    } else {
      
      axiosInstance.post("/roles", roleData).then((response) => {
        setRoles([...roles, response.data]);
      });
    }
    handleCloseModal();
  };

  
  const handleDeleteRole = (id) => {
    axiosInstance.delete(`/roles/${id}`).then(() => {
      setRoles(roles.filter((role) => role.id !== id));
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginLeft: isMobile ? "0" : "100px", padding: "20px" }}>
        <TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end", 
              marginBottom: isMobile ? "10px" : "20px",
              marginTop: isMobile ? "10px" : "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal()}
              style={{
                height: "40px",
                width: isMobile ? "120px" : "150px",
                padding: "8px 16px",
                fontSize: isMobile ? "14px" : "16px",
                display: "flex",
                alignItems: "center", 
                justifyContent: "center",
              }}
            >
              <AddCircleIcon style={{ marginRight: "5px" }} />
              Add Role
            </Button>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role Name</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.permissions.join(", ")}</TableCell>
                  <TableCell>
                    {/* Edit Icon Button */}
                    <IconButton
                      onClick={() => handleOpenModal(role)}
                      style={{
                        margin: "5px",
                        color: "#1976d2", 
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete Icon Button */}
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteRole(role.id)}
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

        {/* Add/Edit Role Modal */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "90%" : "400px",
              bgcolor: "background.paper",
              p: isMobile ? 2 : 4,
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
              {currentRole?.id ? "Edit Role" : "Add Role"}
            </Typography>
            <TextField
              fullWidth
              label="Role Name"
              value={currentRole?.name || ""}
              onChange={(e) =>
                setCurrentRole({ ...currentRole, name: e.target.value })
              }
              margin="normal"
              sx={{ marginBottom: "16px" }}
              variant="outlined"
            />
            <Divider sx={{ marginBottom: "12px" }} />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Permissions
            </Typography>
            <div style={{ marginBottom: "12px" }}>
              {allPermissions.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      checked={permissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                      icon={<CheckIcon />}
                      checkedIcon={<CheckIcon />}
                    />
                  }
                  label={permission}
                />
              ))}
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveRole}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                fontSize: "16px",
              }}
            >
              <SaveIcon sx={{ marginRight: "8px" }} />
              Save
            </Button>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default RoleTable;
