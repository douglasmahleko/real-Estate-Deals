import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Hero from './home/hero/hero';
import Value from './home/values/value';
import Contact from './home/contact/contact';
import GetStarted from './home/getStarted/getStarted';
import '../App.css';

function Home({backendActor, needAdded, refresh, setneedAdded, handleClickBar, setpaid, confirm, registered, logout, setloading, loading, setuserLogged, setuserlevel, setagentLogged, determineExistance, accountExist, login, isAuthenticated}){
  const [usersCount, setuserscount] = useState(0)
  const [agentsCount, setagentscount] = useState(0)
  const [houseCount, sethousescount] = useState(0)
  const navigate = useNavigate()
  if(isAuthenticated){
    determineExistance()
  }
  const getData = async () =>{
    handleClickBar('Loading', "info")
    if(isAuthenticated){
      setloading(true)
      if(accountExist){
        let user = await backendActor.getUser()
        if(user.err === 'User not found'){
          handleClickBar('User not found', "error")
          setloading(false)
        }else{
          setuserLogged(user.ok)
          let userlvl = await backendActor.getUserLevel()
          let paidie = await backendActor.getLocalLedger()
          setpaid(paidie)
          let usersCounts = await backendActor.getClientsCount()
          setuserscount(usersCounts)
          let agentsCounts = await backendActor.getAgentsCount()
          setagentscount(agentsCounts)
          let houseCounts = await backendActor.getHouseCount()
          sethousescount(houseCounts)
          if(userlvl ==='AGENT'){
            let agentIonf = await backendActor.getSpecificAgent()
            setagentLogged(agentIonf.ok)
          }else{
            let needeExist = await backendActor.addedNeed()
            setneedAdded(needeExist)
          }
          handleClickBar('You have logged in', "success")
          setuserlevel(userlvl)
          if(registered === "registered" && needAdded){
            navigate('/myPrerequisites', { replace: true })
          }
          else if(registered === "registered"){
            navigate('/showHouses', { replace: true })
          }
          else if(registered === "none" && refresh){
            logout()
            navigate('/', { replace: true })
          }
          else{
            logout()
            navigate("/", { replace: true })
            // logout()
          }
          setloading(false)
        }
      }else{
        handleClickBar('User not found', "error")
        setloading(false)
      }
    }
    else{
      handleClickBar('Try to log In to Register or Log In if regitered', "info")
      setloading(false)
    }
    setloading(false)
  }
  useEffect(() => {
    getData()
  }, [isAuthenticated, accountExist, registered, confirm, refresh])
  // console.log("done on confirm" + user.done)
      return(
        <>
          { !loading ? (
            <div className='App'>
              <Box sx={{ width : '1500px', p : -3}} >
                <Box className='white-gradient' />
                <Hero login={login} isAuthenticated={isAuthenticated} houseCount={houseCount} usersCount={usersCount} agentsCount={agentsCount} />
              </Box>
              <Value />
              <Contact />
              <GetStarted />
            </div>
          ) : (
            <>
              < Skeleton animation="wave" height={100} width="80%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
            </>
          ) }
        </>
      )
}
export default Home
