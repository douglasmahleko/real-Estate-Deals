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
import Skeleton from '@mui/material/Skeleton';
import { Navigate } from "react-router-dom";

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
      arr:[],
      side:'',
      navigate: props.navigate,
    }
  }
  navigateModal (link) {
    this.state.navigate(link)
    this.setState({open : false})
  }
  logOutNot(){
    this.props.logout()
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
  displayHtml(){
    return(
      <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={this.state.open}
                onClose={(e) => this.modalClose()}
                anchorOrigin={{
                vertical: 'top',
                horizontal: this.state.side,
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: this.state.side,
                }}
                >
                <Typography p={3} color='#9c9797' variant="span">{ this.props.user != null ? (this.props.user.name) : (null) }</Typography>
                {this.props.userLevel != null ? (this.state.arr.map((item) => (
                    this.props.userLevel === item.level || item.level ==='both' ? (
                      <MenuItem key={item.id} onClick={() => this.navigateModal(item.route)} >
                    {item.label}
                  </MenuItem> ) : (
                    null
                  )
            ))) : (
              <Box>
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
              </Box>
            ) }
              <Button sx={{ padding:'2', width:'100%' }} variant='outline' onClick={() => this.props.logout()} >
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
                            <Notifications  />
                        </Badge>
                    </Tooltip>
                    <UserBox onClick={(e) => this.modalOpen(NavBarLists.slice(13), 'left')} >
                        <Avatar sx={{width:30, height:30}} />
                    </UserBox>
            </Icons>
            <Typography sx={{ color:'white', flexDirection:"row", position:"absolute", alignItems:"center", marginLeft:"100px", top:"20px" }}>
              { this.props.location.pathname != null ? this.props.location.pathname.replace(/\W/g, ' ').toUpperCase() : (
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
              ) }
            </Typography>
          </Typography>
          <Typography sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' }}}>
              <UserBox onClick={(e) => this.setState({open:true})} >
                <Avatar sx={{width:30, height:30}} />
              </UserBox>
          </Typography>
          <Box>
            { this.props.userLevel != null ? this.displayHtml() : (
              <Box>
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
              </Box>
            )}
          </Box>
          <Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
             { this.props.userLevel != null ? (NavBarLists.slice(3, 8).map((item) => (
                  <>
                    {
                       this.props.userLevel === item.level || item.level ==='both' ? (
                        <Button key={item.id} sx={{ color: '#fff' }} onClick={() => this.navigateAround(item.route)} >
                          {item.label} 
                        </Button>
                      ) : (
                        null
                      )
                    }
                  </>
              ))) : (
                <Box>
                  < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                  < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                  < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                </Box>
              ) }
                <Button sx={{ color: '#fff' }} onClick={() => this.props.logout()} >
                  LogOut
                </Button>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Icons>
                <UserBox onClick={(e) => this.modalOpen(NavBarLists.slice(3, 8), 'right')} >
                    <MenuIcon />
                </UserBox>
              </Icons>
            </Box>
            <Box>
            { this.props.userLevel != null ? this.displayHtml() : (
              <Box>
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
              </Box>
            )}
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
      <div>
        {this.showNav()}
      </div>
    );
  }
}