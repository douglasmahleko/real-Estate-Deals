import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../constants/commonButton";
import BasicCard from "../constants/basicCard";
import DatingBar from "../constants/datingBar";
import SelectBar from "../constants/selectBar";
import validator from "validator";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import InputAdornment from '@mui/material/InputAdornment';
import emailjs from '@emailjs/browser';
import Validate from "../constants/validate";

function AddAgent({backendActor, refresh, setrefresh, handleClickBar, setregistered, logout, isAuthenticated}){
    const [emailErr, setemailErr] = useState('')
    const [open, setopen] = useState(false)
    const [verifyingNum, setverifyingNum] = useState(Math.random().toString(36).substring(2,7).toUpperCase())
    const form = useRef();
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const [done, setdone] = useState(false);
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [contactErr, setcontactErr] = useState('')
    const [gender, setGender] = useState('')
    const [title, setTitle] = useState('')
    const [contact, setContact] = useState('')
    const [dob, setDOB] = useState("")
    const [name, setName] = useState('')
    const [physicalAddress, setPhysicalAdress] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [phase, setPhase] = useState('')
    const [err, seterr] = useState('')

    const validateEmail = () => {
      return validator.isEmail(email)
    }
    const handleSelectTitle = (event) => {
      setTitle(event.target.value);
    };
    const handleSelectGender = (event) => {
      setGender(event.target.value);
    };
    const sendMessage = async () => {
      handleClickBar('Inserting Data', 'info')
      const addDays = (date, days) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    };
    const todayDate = new Date();
    const days = 60;
    const newDate = addDays(todayDate, days);
      const d = new Date(dob)
      const regDate = new Date()
      let real_dob = d.toDateString()
      let real_regDate = regDate.toDateString()
      let expDate = newDate.toDateString()
        try {
          setSending(true);
          const message = {
            surname: surname,
            email: email,
            contact: contact,
            dob: real_dob,
            name: name,
            country: country,
            gender: gender,
            title: title,
            level: {AGENT : null },
            regDate: real_regDate,
            registered:true
          };
          const message2 = {
            email: email,
            city: city,
            province: province,
            phase: phase,
            physicalAddress: physicalAddress,
            regExpire: expDate,
          }
          const message3 = {
            email: email,
            receiverEmail: "dmlambo@gmail.com",
            receiverAddress: "",
            myAddress:"",
            amount: 12.5,
            purpose: "re-register",
            datePaymentMade: real_regDate,
          }
          if(validateEmail()){
              // sendEmail()
              // if(done){
                  const userResp = await backendActor.createUser(message);
                  const agentResp = await backendActor.addAgent(message2);
                  const paymentInfo = await backendActor.createLocalLedger(message3);
                  navigate("/", { replace: true })
                  logout()
                  navigate("/", { replace: true })
                  handleClickBar(userResp, 'success')
                  setregistered("registered")
                  if(userResp === 'added'){
                    handleClickBar(userResp, 'success')
                    if(agentResp === 'added'){
                      handleClickBar(agentResp, 'success')
                      setSending(true);
                      setregistered("registered")
                    }
                    else if(userResp === 'User Email or Contact already exist'){
                      handleClickBar(userResp, 'info')
                    }
                    else{
                      handleClickBar(agentResp, 'error')
                    }
                  }
                  else{
                    handleClickBar(userResp, 'error')
                  }
              // }
          }else{
            handleClickBar("Email not valid", 'error')
          }
        } catch (error) {
          handleClickBar(error.message, 'error')
          setSending(false);
        }
      };
      const nav = () => {
        navigate("/", { replace: true })
      }
      const sendEmail = async () => {
        console.log('start validating email')
        await emailjs.sendForm('service_bcqhxt9', 'template_q2ny4kg', form.current, '-qF8akIE4pkA51mhw')
          .then(() => {
              setopen(true)
              handleClickBar('Email is Valid', 'success')
            },
            (error) => {
              seterr(error.text);
              handleClickBar(error.text, 'error')
            },
          );
      };
      const handleChange = (value) => {
        setContact(value)
      }
      const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage()
      }
      const getContent = () => {
        return(
          <Box bgcolor={"background.default"} color={"text.primary"} sx={{ justifyContent:"center", marginRight:'100px'}}>
          <form ref={form} style={{ margin: '1%' }}>
            <Stack>
                <SelectBar title="Title" value={title} sx={{ width:'60%', margin:'1%'}} onChange={handleSelectTitle} values={['Mr', 'Mrs', "Miss"]} />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={name.length===0} variant="outlined" value={name} onChange={(e) => setName(e.target.value)} label="Name" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={surname.length===0} variant="outlined" value={surname} onChange={(e) => setSurname(e.target.value)} label="Surname " />
                <TextField name="email" sx={{ width:'60%', margin:'1%'}} required type="email" helperText={emailErr} error={email.length===0} minRows={2} variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
                <TextField name="verifyingNum" sx={{ width:'60%', margin:'1%', display:'none'}} type="text"  variant="outlined" value={verifyingNum} onChange={(e) => setverifyingNum(e.target.value)} />
                <DatingBar title="D.O.B" value={dob} setValue={setDOB} sx={{ width:'60%', margin:'1%'}} />
                <SelectBar title="Gender" value={gender} sx={{ width:'60%', margin:'1%'}} onChange={handleSelectGender} values={['Male', 'Female']} />
                <TextField name="contact" sx={{ width:'60%', margin:'1%'}} required label="Contact" helpText={contactErr} error={contact.length===0} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInput country={'zw'} value={contact} onChange={handleChange} inputProps={{ name: 'contact', required: true, autoFocus: true}} />
                    </InputAdornment>
                  ),
                }} />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={physicalAddress.length===0} minRows={2} maxRows={2} multiline variant="outlined" value={physicalAddress} onChange={(e) => setPhysicalAdress(e.target.value)} label="Physical Address" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={phase.length===0} variant="outlined" value={phase} onChange={(e) => setPhase(e.target.value)} label="Phase" />
                <TextField name="country" sx={{ width:'60%', margin:'1%'}} required error={country.length===0} variant="outlined" value={country} onChange={(e) => setCountry(e.target.value)} label="Country" />
                <TextField name="province" sx={{ width:'60%', margin:'1%'}} required error={province.length===0} variant="outlined" value={province} onChange={(e) => setProvince(e.target.value)} label="Province " />
                <TextField name="city" sx={{ width:'60%', margin:'1%'}} required type="text" error={city.length===0} variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} label="City" />
                <CommonButton sx={{ width:'60%', marginLeft:'1%'}} onClick={handleSubmit} variant="contained" type="submit"> Submit </CommonButton>
              </Stack>
            </form>
            <Validate result={verifyingNum} handleClickBar={handleClickBar} setdone={setdone} open={open} setopen={setopen} title="Verify the existance of Agent Email" />
        </Box>
        )
      }
      const getHead = () => {
        return(
          <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
              <Typography variant="h3"> Register as An Agent </Typography>
          </Box>
        )
      }
    return(
      <Box sx={{margin:'60%'}} bgcolor={"background.default"} color={"text.primary"}>
          { isAuthenticated ? ( <BasicCard header={getHead()} content={getContent()} sx={{width:"800px"}} /> ) : (
            nav()
          )}
      </Box>
    )
}
export default AddAgent
