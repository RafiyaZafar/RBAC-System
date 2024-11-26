import React from "react";
import { IconButton, AppBar, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const TopNav = ({ onToggleSidebar }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <h6 style={{ flexGrow: 1 }}></h6>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
