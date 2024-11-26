import React, { useEffect, useState }from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import TopNav from "./TopNav";



const SideNav = ({ isSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));  

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Roles", path: "/roles" },
    { label: "Users", path: "/users" },
  ];

  return (
    <Box
      sx={{
        width: isMobile ? (isSidebarOpen ? 250 : 0) : 250,  
        height: "100vh",
        backgroundColor: "#f5f5f5",
        position: "fixed",
        top: 0,
        left: 0,
        paddingTop: "20px",
        transition: "width 0.3s ease",  
        overflow: "hidden",  
      }}

    >
      

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isSidebarOpen ? 0 : 250,  
            transition: "margin-left 0.3s ease",
            paddingTop: "75px",  
          }}
        ></Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} sx={{ display: "block" }}>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#1976d2" : "#000",
                fontWeight: isActive ? "bold" : "normal",
                display: "block",
                padding: "8px 16px",
              })}
            >
              <ListItemText primary={item.label} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideNav;
