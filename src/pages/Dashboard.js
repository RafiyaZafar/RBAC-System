import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import axios from "../services/mockApi";
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(null);
  const [roleCount, setRoleCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from mock API
    const fetchData = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get("/users"),
          axios.get("/roles"),
        ]);
        setUserCount(usersResponse.data.length);
        setRoleCount(rolesResponse.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
     
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginBottom: "20px" }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: "center", marginTop: "20px" }}>
        
        <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
          <Card>
            <CardContent >
            <PeopleIcon sx={{ fontSize: 40, marginRight: 2 }} />
              <Typography variant="h6">Total Users </Typography>
              <Typography variant="h3" color="primary">
                {userCount}
              </Typography>
            </CardContent>
          </Card>
          
        </Grid>

        
        <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
          <Card>
            <CardContent>
            <BadgeIcon sx={{ fontSize: 40, marginRight: 2 }} />
              <Typography variant="h6">Total Roles</Typography>
              <Typography variant="h3" color="secondary">
                {roleCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;


