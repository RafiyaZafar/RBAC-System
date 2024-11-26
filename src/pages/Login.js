import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const hardcodedUsers = [
    {
      username: "admin",
      password: "admin123",
      role: "Admin",
    },
    {
      username: "superadmin",
      password: "superadmin123",
      role: "SuperAdmin",
    },
    {
      username: "manager",
      password: "manager123",
      role: "Manager",
    },
  ];

  
  const handleLogin = () => {
    const user = hardcodedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      
      setIsAuthenticated(true);
      setUserRole(user.role);
      
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: "auto",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <Paper
        sx={{
          padding: "30px",
          maxWidth: "400px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Welcome to RBAC Portal
        </Typography>

      
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && (
          <Typography color="error" sx={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;

