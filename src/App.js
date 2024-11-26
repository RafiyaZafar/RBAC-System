import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RoleTable from "./components/RoleTable";
import UserTable from "./components/UserTable";
import SideNav from "./components/SideNav";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Box, useMediaQuery, useTheme  } from "@mui/material";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const theme = useTheme();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

 
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  

  const padding = isMobile ? "10px" : isTablet ? "20px" : "30px"; 
  const paddingTop = isMobile ? "60px" : isTablet ? "70px" : "80px"; 
  const marginLeft = isMobile ? "40px" : isTablet ? "150px" : "200px"; 

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {isAuthenticated ? (
          <>

            
            <SideNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} handleToggleSidebar={handleToggleSidebar} userRole={userRole} />

            
            <Box sx={{ flexGrow: 1 }}>
              
              <Navbar onToggleSidebar={handleToggleSidebar} onLogout={handleLogout} />

              
              <Box sx={{ padding:padding , paddingTop: paddingTop , marginLeft: marginLeft }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/roles" element={<RoleTable />} />
                  <Route path="/users" element={<UserTable />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Box>
            </Box>
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Box>
    </Router>
  );
};

export default App;
