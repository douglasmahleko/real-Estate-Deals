import React from 'react'
import Box from '@mui/material/Box';
import NavBar from './navBar/navaBar';
import SideBar from './navBar/sideBar';
import Grid from '@mui/material/Grid';
import './navBar/navBar.css'
import HomeNav from './navBar/homeNav';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

export default function LayOut ({user, handleCloseSnackBar, handleCloseBar, setloading, loading, openBar, registered,
    handleClickSnackBar, determineExistance, userLevel, mode, accountExist, isAuthenticated, logout, msgBar, needAdded,  
    login, children, backendActor, setmode, handleClickBar , openSnackBar, msgSnackBar, svrtySnackBar, svrtyBar}){
    const navigate = useNavigate()
    const location = useLocation()
    if(isAuthenticated){
      determineExistance()
    }
    if(accountExist && isAuthenticated){
      setloading(true)
    }
      return(
        <Grid container>
        <Box bgcolor={"background.default"} color={"text.primary"} >
          <Box item >
                  <div className={ isAuthenticated ? "show" : "hide"}>
                    <Box className={ accountExist && registered === "registered" ? "show" : "hide"}>
                      <NavBar user={user} logout={logout} navigate={navigate} userLevel={userLevel} 
                        handleClickSnackBar={handleClickSnackBar}
                        location={location} />
                      <SideBar user={user} userLevel={userLevel} mode={mode} setmode={setmode} 
                        svrtySnackBar={svrtySnackBar} msgSnackBar={msgSnackBar} openSnackBar={openSnackBar} 
                        handleCloseSnackBar={handleCloseSnackBar} needAdded={needAdded} />
                    </Box>
                    <Box className={ accountExist && isAuthenticated ? "hide" : "show"} >
                        <HomeNav backendActor={backendActor} isAuthenticated={isAuthenticated} 
                          setloading={setloading} loading={loading} accountExist={accountExist} 
                          login={login} svrtyBar={svrtyBar} msgBar={msgBar} openBar={openBar} 
                          handleCloseBar={handleCloseBar} handleClickBar={handleClickBar} />
                    </Box>
                  </div>
          </Box>
          <Box sx={{marginLeft:"20%"}}>
            <div >
              {children}
            </div>
          </Box>
      </Box>
    </Grid>
    )
}