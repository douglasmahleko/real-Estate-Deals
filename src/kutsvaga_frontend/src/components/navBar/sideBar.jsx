import React, {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarStyles } from './styles';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from "react-router-dom";
import { NavBarLists } from '../constants/navBarLists';
import Switch from '@mui/material/Switch';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import {Box} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import WidgetsIcon from '@mui/icons-material/Widgets';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function SideBar({user, mode, handleCloseSnackBar, needAdded, msgSnackBar, svrtySnackBar, openSnackBar, setmode, userLevel}){
    const navigate = useNavigate()
    const navigateAround = (link) => {
      navigate(link)
      setOpen(false)
    }
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
    const showSideBar = () => {
      return(
      <Box>
        <Divider />
        <List>
          {NavBarLists.slice(8, 13).map((text, index) => (
            <>
              {
                userLevel === text.level || text.level ==='both' ? (
                  ( needAdded && text.route === "myPrerequisites" ) ? ( null ) : (
                    <ListItem key={text.id} >
                    <ListItemButton onClick={() => navigateAround(text.route)} >
                      <ListItemIcon sx={navbarStyles.icons}>
                        {text.icon}
                      </ListItemIcon>
                      <ListItemText primary={text.label} sx={navbarStyles.text } />
                    </ListItemButton>
                  </ListItem>
                  )
                  
                ) : (
                  null
                )
              }
            </>
          ))}
          <ListItem key='11'>
              <ListItemButton  >
                <ListItemIcon sx={navbarStyles.icons}>
                  <NightsStayIcon />
                </ListItemIcon>
                  <Switch
                    onChange={() => setmode(mode === "light" ? "dark" : "light")}
                  />
                </ListItemButton>
            </ListItem>
        </List>
      </Box>
    )}
    return(
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Box sx={{ display : { xs : "none", sm : "block" }}}>
            <Drawer 
              sx={navbarStyles.drawer}
              variant="permanent"
              anchor="left"
            >
              {showSideBar()}
            </Drawer>
          </Box>
          <Box sx={{ display : { xs : "block", sm : "none" }}}>
              <IconButton
                color="inherit"
                onClick={handleDrawerOpen}
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <WidgetsIcon />
              </IconButton>
              <Box>
                  <Drawer 
                    sx={navbarStyles.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                  >
                    <DrawerHeader>
                      <IconButton color="inherit" onClick={handleDrawerClose}>
                        <ChevronLeftIcon  />
                      </IconButton>
                    </DrawerHeader>
                    {showSideBar()}
                  </Drawer>
              </Box>
          </Box>
          <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
              <Alert
                onClose={handleCloseSnackBar}
                severity={svrtySnackBar}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {msgSnackBar}
              </Alert>
            </Snackbar>
        </Box>
    )
}export default SideBar