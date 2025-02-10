import React from 'react';
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import DocfindLogo from "../../images/DocfindLogo.png"
import ClinicBadge from './clinicBadge';


import { Box, Typography, Card, CardContent, MenuItem } from '@mui/material';
import { StyledImage } from '../../styled-tags/styledTags';

const logoStyle = {
  width: '100px',
  height: 'auto',
  cursor: 'pointer',
};

function Navbar({ mode }) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const userdata = JSON.parse(localStorage.getItem('auth'));
  
  const handleMouseEnter = (e)=>{
    setIsHovering(true);
  }
  const handleMouseLeave = (e)=>{
    setIsHovering(false);
  }

  const handleLogout = ()=>{
    localStorage.removeItem('auth');
    window.location.href="/";
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
  
      if (scrollTop > 128 && isVisible) {
        setIsVisible(false);
      } else if (scrollTop <= 128 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return (
    
    <Box sx={{display:"block"}}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
          transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              {/* <img
                src={
                  DocfindLogo
                }
                style={logoStyle}
                alt="logo of sitemark"
              /> */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NavLink to="/" style={{"textDecoration":"none"}} end>
                <MenuItem
                  onClick={() => scrollToSection('testimonials')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                      Home
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink to="/doctors?page=1" style={{"textDecoration":"none"}}>
                <MenuItem
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                      Doctors                  
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink to="/clinics?page=1" style={{"textDecoration":"none"}}>
                <MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Clinics
                  </Typography>
                </MenuItem>
              </NavLink>
              </Box>
            </Box>
            
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {userdata && (
              <>
              {userdata.role === "clinic" && <ClinicBadge />}
              <Typography
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{marginRight:1}}
              >{userdata.username}</Typography>
              <StyledImage src={userdata.imageUrl}></StyledImage>
              { isHovering &&
              <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                  position: 'absolute',
                  top: '40px', // Adjust position relative to the username
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <MenuItem sx={{transition:"200ms",":hover":{backgroundColor:"lightgray"}}} component={NavLink} to="/profile/dashboard">
                    Profile
                  </MenuItem>
                  <MenuItem sx={{transition:"200ms",":hover":{backgroundColor:"lightgray"}}} component={NavLink} to="/profile/settings">
                    Settings
                  </MenuItem>
                  <MenuItem sx={{color:"red",transition:"200ms",":hover":{backgroundColor:"#eedbdb"}}} onClick={handleLogout}>Disconnect</MenuItem>
                </CardContent>
              </Card>
                  }
              </>
              )}      
              {userdata == null && (   
              <>    
              <NavLink to="/signin">
              <Button
                color="secondary"
                variant="text"
                size="small"
                component="a"
                target="_blank"
              >
                Sign in
              </Button>
              </NavLink>
              <NavLink to="/signup">
              <Button
                color="secondary"
                variant="contained"
                size="small"
                component="a"
                target="_blank"
              >
                Sign up
              </Button>
              </NavLink>
              </>
              )} 
            </Box>
            
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    display:'flex',
                    flexDirection:'column',
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >

                  <Box component="div" sx={{display: 'flex',flexDirection: 'column',alignItems: 'start'}}>
                    <MenuItem >
                      <Link to="/" style={{'textDecoration':'none', 'color':'black'}}>
                        Home
                      </Link>
                    </MenuItem>
                    <MenuItem >
                      <Link to="/doctors?page=1" style={{'textDecoration':'none', 'color':'black'}}>
                        Doctors
                      </Link>
                    </MenuItem>
                    <MenuItem >
                      <Link to="/clinics?page=1" style={{'textDecoration':'none', 'color':'black'}}>
                        Clinics
                      </Link>
                    </MenuItem>
                   
                  </Box>

                  <Divider />
                  <Box sx={{ flexGrow: 1 }}></Box>

                  {userdata && (
                    <Box 
                      component="footer"
                      sx={{
                        display:"flex",
                        flexDirection:"row",
                        alignSelf:"center",
                        alignItems:"center",
                        margin: "16px"
                      }}>
                      {userdata.role === "clinic" && <ClinicBadge />}
                      <Box component="p" sx={{margin:"8px 0", fontSize:"large"}}>{userdata.username}</Box>
                      <StyledImage sx={{margin:1, '&:hover': {opacity:"80%"}}} src='https://media.istockphoto.com/id/1370772148/photo/track-and-mountains-in-valle-del-lago-somiedo-nature-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=QJn62amhOddkJSbihcjWKHXShMAfcKM0hPN65aCloco='></StyledImage>
                    </Box>
                  )}
                  
                  {userdata==null && (
                  <Box component="footer">
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        href="/material-ui/getting-started/templates/sign-up/"
                        target="_blank"
                        sx={{ width: '100%' }}
                      >
                        Sign up
                      </Button>
                    </MenuItem>

                    <MenuItem>
                      <Button
                        color="secondary"
                        variant="outlined"
                        component="a"
                        href="/material-ui/getting-started/templates/sign-in/"
                        target="_blank"
                        sx={{ width: '100%' }}
                      >
                        Sign In
                      </Button>
                    </MenuItem>
                  </Box>
                  )} 
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default Navbar;