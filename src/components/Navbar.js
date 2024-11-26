import React from "react";
import { IconButton, AppBar, Toolbar, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onLogout, onToggleSidebar }) => {
  
  const theme = useTheme();

  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar>
        
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" style={{ flexGrow: 1 }} className="rbac-header">
          RBAC
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
