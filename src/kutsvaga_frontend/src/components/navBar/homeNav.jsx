import * as React from 'react';
import { NavBarLists } from '../constants/navBarLists';
import { Alert, AppBar, Box, Snackbar, Toolbar, styled } from "@mui/material"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from "react";
import { makeStyles } from '@material-ui/core';
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Skeleton from '@mui/material/Skeleton';

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
    return{
        page:{
            width:"100%",
            background:"#f9f9f9",
            padding: theme.spacing(3)
        },
        drawer:{
            width:drawerWidth
        },
        drawerPaper:{
            width:drawerWidth
        },
        root:{
            display:"flex"
        },
        active:{
            backgroundColor:"#f4f4f4",
            color:"#862020"
        },
        title:{
            padding: theme.spacing(2)
        },
        appBar:{
            width : `calc(100% - ${drawerWidth}px)`
        },
        toolbar:theme.mixins.toolbar,
        date:{
            flexGrow:1
        },
        avatar:{
            marginLeft:10
        }
    }
})

const UserBox = styled(Box)(({theme}) => ({
  display:"flex",
  gap:"10px",
  alignItems:'center'
}))
const Icons = styled(Box)(({theme}) => ({
  display:"flex",
  gap:"20px",
  alignItems:'center'
}))
export default function HomeNav({agent, accountExist, loading, msgBar, svrtyBar, openBar, handleCloseBar}) {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const navigateModal = (link) => {
    navigate(link)
    setOpen(false)
  }
  const displayHtml = () => (
      <Box>
        <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                >
                {NavBarLists.slice(0, 3).map((item) => (
                  <Button key={item.id} className = { (!accountExist && item.label === 'Home') ? 'hide' : 'show'} sx={{ color: '#088F8F', flowDirection:'column' }} onClick={() => navigateModal(item.route)} >
                    {item.label}
                  </Button>
            ))}
            </Menu>
      </Box>
    )

  return (
    <Box sx={{ display: 'flex' }}>
      { !loading ? ( <AppBar component="nav">
        <Toolbar>
          <Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {NavBarLists.slice(0, 3).map((item) => (
                  <Button key={item.id} sx={{ color: '#fff' }} onClick={() => navigate(item.route)} className = { (!accountExist && item.label === 'Home') ? 'hide' : 'show'} >
                    {item.label}
                  </Button>
            ))}
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Icons>
                <UserBox onClick={(e) => setOpen(true)} >
                    <MenuIcon />
                </UserBox>
              </Icons>
              {displayHtml()}
            </Box>
              
          </Box>
        </Toolbar>
      </AppBar> ) : ( 
        <>
          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
        </>
       ) }
      <Box component="main">
        <Toolbar />
      </Box>
      <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
                <Alert
                  onClose={handleCloseBar}
                  severity={svrtyBar}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {msgBar}
                </Alert>
        </Snackbar>
    </Box>
  );
}