import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import CommonButton from "../constants/commonButton";
import BasicCard from "../constants/basicCard";
import DatingBar from "../constants/datingBar";
import { Navigate } from "react-router-dom";

function AddShortList ( { backendActor, user, handleClickSnackBar, isAuthenticated, paid } ){
    const navigate = useNavigate()
    const [roomsNeeded, setroomsNeeded] = useState('')
    const [amountPerRoom, setamountPerRoom] = useState('')
    const [budget, setbudget] = useState('')
    const [budgetErr, setbudgetErr] = useState('')
    const [amountErr, setamountErr] = useState('')
    const [roomsErr, setroomsErr] = useState('')
    const [country, setCountry] = useState('')
    const [personalInfo, setpersonalInfo] = useState('')
    const [city, setCity] = useState('')
    const [province, setprovince] = useState('')
    const [phase, setPhase] = useState('')
    const [consideration, setconsideration] = useState('')
    const [requirements, setrequirements] = useState('')
    const [dateExpectingHouse, setdateExpectingHouse] = useState('')
    const [sending, setsending] = useState(false)
    console.log(  "add shortlis paid " + !paid)
    const sendMessage = async (e) => {
        e.preventDefault();
          try {
            setsending(true)
            const message = {
              clientEmail: user.email,
              roomsNeeded: parseInt(roomsNeeded),
              amountPerRoom: parseFloat(amountPerRoom),
              country: country,
              city: city,
              budget:parseFloat(budget),
              province: province,
              personalInfo: personalInfo,
              phase: phase,         
              consideration : consideration,
              requirements : requirements,
              dateExpectingHouse: new Date(dateExpectingHouse).toDateString()
            };
            await backendActor.addNeeds(message);
            let response = await backendActor.autoRecomend();
              setamountErr('')
              setroomsNeeded('')
              setprovince('')
              setpersonalInfo("");
              setconsideration("");
              setamountPerRoom("");
              setbudgetErr("");
              setrequirements("");
              setroomsErr("");
              setCountry("");
              setCity("");
              setdateExpectingHouse("");
              setPhase("")
              setsending(false);
              if(response != "Cannot find your needs !!"){
                handleClickSnackBar('Needs added successfull and ' + response, 'success')
              }
              else{
                handleClickSnackBar('Needs added successfull and ' + response, 'info')
              }
              navigate('/previewPrerequisites')
          } catch (error) {
            handleClickSnackBar(error.message, 'error')
            setsending(false);
          }
      };
      const navigateOnLogOut = () => {
        navigate('/')
      }
    const getContent = () => {
        return(
          <Box sx={{ justifyContent:"center", marginLeft:{xs : '150px'}}}>
          <form style={{ margin: '1%' }}>
            <Stack>
                <TextField sx={{ width:'60%', margin:'1%'}} required type="number" helperText={amountErr} error={amountPerRoom.length===0} variant="outlined" value={amountPerRoom} onChange={(e) => setamountPerRoom(e.target.value)} label="Amount Per Room" />
                <TextField sx={{ width:'60%', margin:'1%'}} required type="number" helperText={roomsErr} error={roomsNeeded.length===0} variant="outlined" value={roomsNeeded} onChange={(e) => setroomsNeeded(e.target.value)} label="Number Of Rooms Needed" />
                <TextField sx={{ width:'60%', margin:'1%'}} required type="number" helperText={budgetErr} error={budget.length===0} variant="outlined" value={budget} onChange={(e) => setbudget(e.target.value)} label="Budget" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={personalInfo.length===0} variant="outlined" minRows={2} maxRows={2} multiline value={personalInfo} onChange={(e) => setpersonalInfo(e.target.value)} label="Personal Info" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={phase.length===0} variant="outlined" value={phase} onChange={(e) => setPhase(e.target.value)} label="phase" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={consideration.length===0} minRows={2} maxRows={2} multiline variant="outlined" value={consideration} onChange={(e) => setconsideration(e.target.value)} label="Considerations" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={requirements.length===0} minRows={2} maxRows={2} multiline variant="outlined" value={requirements} onChange={(e) => setrequirements(e.target.value)} label="Requirements" />
                <DatingBar title="Date To Move In" value={dateExpectingHouse} setValue={setdateExpectingHouse} sx={{ width:'60%', margin:'1%'}} />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={country.length===0} variant="outlined" value={country} onChange={(e) => setCountry(e.target.value)} label="Country" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={province.length===0} variant="outlined" value={province} onChange={(e) => setprovince(e.target.value)} label="Province" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={city.length===0} variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} label="City" />
                <CommonButton disabled={ sending } sx={{ width:'60%', marginLeft:'1%'}} onClick={sendMessage} variant="contained" type="submit"> Submit </CommonButton>
              </Stack>
            </form>
        </Box>
        )
      }
    const getHead = () => {
        return(
          <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
              <Typography variant="h3"> What Am I Looking For </Typography>
              {/* { !paid && <Typography  variant = "h5" color="red" > please pay to get all data and all features click <span style={{ color: 'black' }}><Link to="/pay"> here </Link></span> </Typography> } */}
          </Box>
        )
      }
      return(
          <>
          {
            isAuthenticated ? ( 
              <BasicCard header={getHead()} content={getContent()} sx={{width:"800px"}} />
             ) : (
              navigateOnLogOut()
             )
          }
        </>
      )
}
export default AddShortList