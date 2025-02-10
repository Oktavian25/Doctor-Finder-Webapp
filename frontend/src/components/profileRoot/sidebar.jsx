import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, List, ListItem, ListItemText, ListItemIcon, Typography, Box, IconButton, useMediaQuery } from '@mui/material';
import { Home, Settings, Notifications, PrivacyTip, Help, Dashboard, Menu } from '@mui/icons-material'; 
import { StyledImage } from '../../styled-tags/styledTags';
import ClinicBadge from '../root/clinicBadge';

const user = JSON.parse(localStorage.getItem("auth"));

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDisconnectButton = () => {
    localStorage.removeItem('auth');
    window.location.href = "/";
  };

  const queries = {
    dashboard: "Manage clinics and doctors",
    settings: "Here you can adjust your settings.",
    help: "Get assistance with your profile.",
  };

  // Mapping icons to each query
  const icons = {
    overview: <Home />,
    dashboard: <Dashboard />,
    settings: <Settings />,
    notifications: <Notifications />,
    privacy: <PrivacyTip />,
    help: <Help />,
  };

  const drawerContent = (
    <>
      <Box sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          My Profile
        </Typography>
      </Box>

      <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: "5px" }}>     
        {Object.keys(queries).map((option) => (
          <ListItem
            key={option}
            component={Link}
            to={`/profile/${option}`}
            sx={{
              color: "inherit",
              textDecoration: "none",
              padding: "12px 20px",
              borderRadius: "4px",
              transition: "100ms",
              '&:hover': {
                backgroundColor: '#dbdbdb',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{icons[option]}</ListItemIcon>
            <ListItemText primary={option.charAt(0).toUpperCase() + option.slice(1)} />
          </ListItem>
        ))}
        <ListItem
          component={Link}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            padding: "12px 20px",
            borderRadius: "4px",
            '&:hover': {
              backgroundColor: '#dbdbdb',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>{icons["overview"]}</ListItemIcon>
          <ListItemText primary={"Homepage"} />
        </ListItem>   
      </List>
     
      <Box 
        component="footer"
        sx={{
          display:"flex",
          flexDirection:"row",
          alignSelf:"center",
          alignItems:"center",
          margin: "16px"
        }}>
        {user.role === "clinic" && <ClinicBadge />}
        <Box component="p" sx={{margin:"8px 0", fontSize:"large"}}>
          <Typography>{user.username}</Typography>
        </Box>
        <StyledImage sx={{margin:1, '&:hover': {opacity:"80%"}}} src={user.imageUrl}></StyledImage>
      </Box>
      <Button sx={{color:'red',borderRadius: 0, '&:hover':{backgroundColor:'pink'}}} onClick={handleDisconnectButton}>Disconnect</Button>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", padding: "20px 0" },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
