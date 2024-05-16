import * as React from 'react';
import { NavBarLists } from '../constants/navBarLists';
import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material"
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { Notifications } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@material-ui/core';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import './navBar.css'

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
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function NavBar({user, LogOut}) {
  const location = useLocation()
  const navigate = useNavigate()
    const parsedTitle = location.pathname.replace(/\W/g, ' ')
    const page = parsedTitle.toLocaleUpperCase()
  const [open, setOpen] = useState(false)
  let both = []
  NavBarLists.slice(3, 6).forEach(item => {          
    console.log( 'user outside if' ,item.level)
  })
  // console.log(both)
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider theme={darkTheme}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Icons>
                    <Tooltip title="Notification">
                        <Badge badgeContent={4} color="error">
                            <Notifications  />
                        </Badge>
                    </Tooltip>
                    <UserBox onClick={(e) => setOpen(true)}>
                        <Avatar sx={{width:30, height:30}} src={require("./dougy.jpg")} />
                    </UserBox>
            </Icons>
              {/* <Typography sx={{ color:'white', flexDirection:"row", position:"absolute", alignItems:"center", marginLeft:"100px", top:"20px" }}>
                {page}
              </Typography> */}
              <Typography sx={{ color:'white', flexDirection:"row", position:"absolute", alignItems:"center", marginLeft:"330px", top:"20px" }}> 
                (DOLLARS) - <IconButton color="inherit" size="small"> <CurrencyExchangeIcon /> </IconButton> - {user.amountInDolls}
              </Typography>
              <Typography sx={{ color:'white', flexDirection:"row", position:"absolute", alignItems:"center", marginLeft:"530px", top:"20px" }}>
              (ICP) - <IconButton color="inherit" size="small"> <CurrencyBitcoinIcon /> </IconButton> - {user.amountInICP}
              </Typography>
          </Typography>
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
                <Typography p={3} color='#9c9797' variant="span">{user.name}</Typography>
                
                {NavBarLists.slice(10).map((item) => (
              <MenuItem key={item.id} onClick={() => navigate(item.route)} >
                {item.label}
              </MenuItem>
            ))}
              <Button sx={{ padding:'2', width:'100%' }} variant='outline' onClick={() => LogOut()} >
                LogOut
              </Button>
            </Menu>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {NavBarLists.slice(3, 6).map((item) => (
                <Button key={item.id} sx={{ color: '#fff' }} onClick={() => navigate(item.route)} >
                  {item.label} 
                </Button>
            ))}
              <Button sx={{ color: '#fff' }} onClick={() => LogOut()} >
                LogOut
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      </ThemeProvider>
    </Box>
  );
}


import React from "react";
import { NavBarLists } from '../constants/navBarLists';
import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material"
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { Notifications } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './navBar.css'
import MenuIcon from '@mui/icons-material/Menu';

const UserBox = styled(Box)(({theme}) => ({
  display:"flex",
  gap:"5px",
  alignItems:'center'
}))
const Icons = styled(Box)(({theme}) => ({
  display:"flex",
  gap:"20px",
  alignItems:'center'
}))
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default class NavBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open : false,
      data:[],
      arr:[],
      side:'',
      getLevel:props.userLevel,
      navigate: props.navigate,
      getting: true,
      page: '',
    }
  }
  navigateModal (link) {
    this.state.navigate(link)
    this.setState({open : false})
  }
  modalClose () {
    this.setState({open : false})
    this.setState({arr : NavBarLists.slice(13)})
    this.setState({side : 'left'})
  }
  modalOpen(data, side){
    this.setState({open : true})
    this.setState({arr : data})
    this.setState({side : side})
  }
  navigateAround (link) {
    this.state.navigate(link)
  }
  LogOutOption(){
    this.props.LogOut()
    this.state.navigate('/')
  }
  componentDidMount(){
    this.setState({page : this.props.location.pathname.replace(/\W/g, ' ').toUpperCase()})
    console.log(this.state.page)
    console.log(this.state.getLevel)
    console.log(this.state.NavBarLists)

  }
  displayHtml(){
    return(
      <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={this.state.open}
                onClose={(e) => this.modalClose()}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                anchorOrigin={{
                vertical: 'top',
                horizontal: this.state.side,
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: this.state.side,
                }}
                >
                <Typography p={3} color='#9c9797' variant="span">{ this.props.user.name }</Typography>
                {this.state.arr.map((item) => (
                    item.level === 'both' ? (
                      <MenuItem key={item.id} onClick={() => this.navigateModal(item.route)} >
                        {item.label}
                      </MenuItem> ) : (
                            this.state.getLevel === item.level ? (
                              <MenuItem key={item.id} onClick={() => this.navigateModal(item.route)} >
                                {item.label}
                              </MenuItem> ) : (
                                    null
                                  )
                          )
            ))}
              <Button sx={{ padding:'2', width:'100%' }} variant='outline' onClick={() => this.LogOutOption()} >
                LogOut
              </Button>
            </Menu>
    )
  }
  showNav(){
    return(
      <Box sx={{ display: 'flex' }} >
      <ThemeProvider theme={darkTheme}>
      <AppBar component="nav" >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Icons>
                    <Tooltip title="Notification">
                        <Badge badgeContent={4} color="error">
                            <Notifications  />....
                        </Badge>
                    </Tooltip>
                    <UserBox onClick={(e) => this.modalOpen(NavBarLists.slice(13), 'left')} >
                        <Avatar sx={{width:30, height:30}} />......
                    </UserBox>
            </Icons>
            <Typography sx={{ color:'white', flexDirection:"row", position:"absolute", alignItems:"center", marginLeft:"100px", top:"20px" }}>
              {this.state.page}................
            </Typography>
          </Typography>
          <Typography sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' }}}>
              <UserBox onClick={(e) => this.modalOpen(NavBarLists.slice(13), 'left')} >
                <Avatar sx={{width:30, height:30}} />.........
              </UserBox>
              <Typography sx={{ color:'white', flexDirection:"row", position:"absolute", alignItems:"center", marginLeft:"100px", top:"20px" }}>
                {this.state.page}............
              </Typography>
          </Typography>
          <Box>
            {this.displayHtml()}
          </Box>
          <Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {NavBarLists.slice(3, 8).map((item) => (
                  <>
                    {
                      item.level ==='both' ? (
                        <Button key={item.id} sx={{ color: '#fff' }} onClick={() => this.navigateAround(item.route)} >
                          {item.label} 
                        </Button>
                      ) : (
                        this.state.getLevel === item.level ? (
                          <Button key={item.id} sx={{ color: '#fff' }} onClick={() => this.navigateAround(item.route)} >
                            {item.label} 
                          </Button>
                        ) : (
                          null
                        )
                      )
                    }
                  </>
              ))}
                <Button sx={{ color: '#fff' }} onClick={() => this.LogOutOption()} >
                  LogOut
                </Button>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Icons>
                <UserBox onClick={(e) => this.modalOpen(NavBarLists.slice(3, 8), 'right')} >
                    <MenuIcon />
                </UserBox>
              </Icons>
              {this.displayHtml()}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      </ThemeProvider>
    </Box>
    )
  }
  render(){
    return (
      <Box>
        {this.showNav()}
      </Box>
    );
  }
}