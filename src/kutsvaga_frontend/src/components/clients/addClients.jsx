import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import './client.css'
import { Box, Stack, TextField, Typography } from "@mui/material";
import CommonButton from "../constants/commonButton";
import BasicCard from "../constants/basicCard";
import DatingBar from "../constants/datingBar";
import SelectBar from "../constants/selectBar";
import validator from "validator";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import InputAdornment from '@mui/material/InputAdornment';
import Validate from "../constants/validate";
import emailjs from '@emailjs/browser';

function AddClient({backendActor, refresh, setrefresh, handleClickBar, setregistered, logout, isAuthenticated}){
  const [emailErr, setemailErr] = useState('')
  const [contactErr, setcontactErr] = useState('')
  const [open, setopen] = useState(false)
  const [verifyingNum, setverifyingNum] = useState(Math.random().toString(36).substring(2,7).toUpperCase())
  const form = useRef();
  const navigate = useNavigate()
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [title, setTitle] = useState('')
  const [contact, setContact] = useState('')
  const [dob, setDOB] = useState("")
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [done, setdone] = useState(false);

  const handleSelectTitle = (event) => {
    setTitle(event.target.value);
  };
  const sendMessage = async (e) => {
    e.preventDefault()
    handleClickBar('Inserting Data', 'info')
    const d = new Date(dob)
    let real_dob = d.toDateString()
    const regDate = new Date()
    let real_regDate = regDate.toDateString()
    try {
      const message = {
        surname: surname,
        email: email,
        contact: contact,
        dob: real_dob,
        name: name,
        country: country,
        gender: gender,
        title: title,
        level: {CLIENT : null },
        regDate: real_regDate,
        registered:true
      };
      const message2 = {
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
            const addUserRes = await backendActor.createUser(message);
            setrefresh(true)
            if(addUserRes === 'added'){
              const paymentInfo = await backendActor.createLocalLedger(message2);
              navigate("/", { replace: true })
              logout()
              handleClickBar(addUserRes, 'success')
              setregistered("registered")
            }
            else if(addUserRes === 'User Email or Contact already exist'){
              handleClickBar(addUserRes, 'info')
            }else{
              handleClickBar(addUserRes, 'error')
              console.log(addUserRes)
            }
          // }
      }else{
        handleClickBar( 'Email is invalid', 'error')
      }
    }catch (error) {
      handleClickBar(error.message, 'error')
      console.log(error.message)
    }
  };
  const handleSelectGender = (event) => {
    setGender(event.target.value);
  };
    const getContent = () => {
      return(
        <Box sx={{ justifyContent:"center", marginRight:'100px'}}>
        <form ref={form} style={{ margin: '1%' }}>
          <Stack>
              <SelectBar title="Title" value={title} sx={{ width:'60%', margin:'1%'}} onChange={handleSelectTitle} values={['Mr', 'Mrs', "Miss"]} />
              <TextField sx={{ width:'60%', margin:'1%'}} required error={name.length===0} variant="outlined" value={name} onChange={(e) => setName(e.target.value)} label="Name" />
              <TextField sx={{ width:'60%', margin:'1%'}} required error={surname.length===0} variant="outlined" value={surname} onChange={(e) => setSurname(e.target.value)} label="Surname" />
              <TextField name="email" sx={{ width:'60%', margin:'1%'}} required type="email" helperText={emailErr} error={email.length===0} minRows={2} variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
              <DatingBar title="D.O.B" value={dob} setValue={setDOB} sx={{ width:'60%', margin:'1%'}} />
              <SelectBar title="Gender" value={gender} sx={{ width:'60%', margin:'1%'}} onChange={handleSelectGender} values={['Male', 'Female']} />
              <TextField name="country" sx={{ width:'60%', margin:'1%', display:'none'}} type="text"  variant="outlined" value={country} onChange={(e) => setCountry(e.target.value)} label="Country" />
              <TextField sx={{ width:'60%', margin:'1%'}} name="contact" helpText={contactErr} required error={contact.length===0} label="Contact" InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInput country={'zw'} value={contact} onChange={handleChange} inputProps={{ name: 'Contact', required: true, autoFocus: true}} />
                    </InputAdornment>
                  ),
                }} />
              <TextField name="verifyingNum" sx={{ width:'60%', margin:'1%', display:'none'}} type="text"  variant="outlined" value={verifyingNum} onChange={(e) => setverifyingNum(e.target.value)} />
              <CommonButton sx={{ width:'60%', marginLeft:'1%'}} variant="contained" onClick={sendMessage} type="submit"> Submit </CommonButton>
            </Stack>
          </form>
          <Validate result={verifyingNum} handleClickBar={handleClickBar} setdone={setdone} open={open} setopen={setopen} title="Verify the existance of Client Email" />
      </Box>
      )
    }
    const getHead = () => {
      return(
        <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
            <Typography variant="h3"> Register as A Client </Typography>
        </Box>
      )
    }
    const nav = () => {
      logout()
      navigate("/", { replace: true })
    }
    const handleChange = (value) => {
      setContact(value)
    }
    const validateEmail = () => {
      return validator.isEmail(email)
    }
    const sendEmail = async () => {
      await emailjs.sendForm('service_bcqhxt9', 'template_q2ny4kg', form.current, '-qF8akIE4pkA51mhw')
        .then(() => {
            setopen(true)
          },
          (error) => {
            handleClickBar( error.text, 'error')
          },
        );
    };
  return(
    <Box bgcolor={"background.default"} color={"text.primary"}>
        { isAuthenticated ? ( <BasicCard header={getHead()} content={getContent()} sx={{width:"800px"}} /> ) : ( 
          nav()
         ) }
    </Box>
  )
}
export default AddClient