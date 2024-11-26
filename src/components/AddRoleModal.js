import React, { useState } from "react";
import { Modal, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

const AddRoleModal = ({ open, onClose, onSave, currentRole }) => {
  const [roleName, setRoleName] = useState(currentRole ? currentRole.name : "");
  const [permissions, setPermissions] = useState(currentRole ? currentRole.permissions : []);
  
  const allPermissions = ["Read", "Write", "Delete"]; 

  const handlePermissionToggle = (permission) => {
    setPermissions((prev) => 
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    const newRole = { name: roleName, permissions };
    onSave(newRole);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...styles.modalBox }}>
        <TextField
          label="Role Name"
          fullWidth
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Permissions</InputLabel>
          <Select
            multiple
            label="Package Type"
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {allPermissions.map((permission) => (
              <MenuItem key={permission} value={permission}>
                <Checkbox checked={permissions.includes(permission)} />
                {permission}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave} style={{marginTop: "12px"}}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

const styles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    padding: 16,
  }
};

export default AddRoleModal;
