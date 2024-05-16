import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import CommonButton from "../constants/commonButton";
import BasicCard from "../constants/basicCard";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import InputAdornment from '@mui/material/InputAdornment';
import Home from "../home";
import Skeleton from '@mui/material/Skeleton';
import { Navigate } from "react-router-dom";

class EditProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sending : false,
      getting: true,
      getLevel: props.userLevel,
      contact: props.user.contact,
      physicalAddress : '',
      province : '',
      city : '',
      phase : '',
    }
  }
  sendMessage(e){
    e.preventDefault();
    const addData = async (e) => {
      try {
        if(validateContact()){
          const message = {
            surname: this.props.user.surname,
            email: this.props.user.email,
            contact: this.state.contact,
            dob: this.props.user.dob,
            name: this.props.user.name,
            country: this.props.user.country,
            gender: this.props.user.gender,
            title: this.props.user.title,
            level: this.props.user.level,
            regDate: this.props.user.regDate,
            done : this.props.user.done,
            registered: this.props.user.registered,
          };
          await this.props.backendActor.updateUser(message);
          this.setState({
            contact: ''
          })
          if(this.state.getLevel === "AGENT"){
            const message1 = {
              email: this.props.user.email,
              city: this.state.city,
              province: this.state.province,
              physicalAddress: this.state.physicalAddress,
              regExpire: this.props.agentLogged.regExpire,
              phase: this.state.phase,
            }
            await this.props.backendActor.updateAgent(message1);
            this.setState({
              sending : true,
              physicalAddress :'',
              province :'',
              phase :'',
              city :'',
            })
          }
        }
        this.props.handleClickSnackBar("updated successfully", 'success')
      } catch (error) {
        this.props.handleClickSnackBar("Could Not update", 'error')
      }
    }
    addData()
  };
  componentDidMount(){
    if(this.state.getLevel === "AGENT"){
      this.setState({
        physicalAddress : this.props.agentLogged.physicalAddress,
        province : this.props.agentLogged.province,
        city : this.props.agentLogged.city,
        phase : this.props.agentLogged.phase,
      })
    }
  }
    handleChange = (value) => {
      this.setState({contact : value})
    }
    getContent() {
        return(
          <Box sx={{ justifyContent:"center", marginLeft :{ xs:'150px'}}}>
          <form style={{ margin: '1%' }}>
            <Stack>
            <TextField sx={{ width:'60%', margin:'1%'}} required label="Contact" error={this.state.contact.length===0} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInput country={'zw'} value={this.state.contact} onChange={this.handleChange} inputProps={{ name: 'contact', required: true, autoFocus: true}} />
                    </InputAdornment>
                  ),
                }} />
                {
                  this.state.getLevel === 'AGENT' ? (
                    this.props.agentLogged != null ? ( <div>
                      <TextField sx={{ width:'60%', margin:'1%'}} required  minRows={2} maxRows={2} multiline variant="outlined" value={this.state.physicalAddress} onChange={(e) => this.setState({physicalAddress :e.target.value})} label="Physical Address" />
                      <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.state.province} onChange={(e) => this.setState({province :e.target.value})} label="Province" />
                      <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.state.city} onChange={(e) => this.setState({city :e.target.value})} label="City" />
                      <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.state.phase} onChange={(e) => this.setState({phase :e.target.value})} label="Phase" />
                    </div> ) : (
                      <>
                      < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                    </>
                      )
                    ) : (
                      null
                    )
                }
                <CommonButton disabled={this.state.sending} sx={{ width:'60%', marginLeft:'1%'}} onClick={this.handleSubmit} variant="contained" type="submit"> Submit </CommonButton>
              </Stack>
            </form>
        </Box>
        )
      }
      componentDidMound(){
        this.props.handleClickSnackBar('Loading', 'info')
      }
    getHead(){
        return(
          <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
              <Typography variant="h3"> Edit Your Contact </Typography>
          </Box>
        )
      }
    render(){
      return(
        <>
          { this.props.isAuthenticated ? ( <BasicCard header={this.getHead()} content={this.getContent()} sx={{width:"800px"}} /> ) : ( <Navigate to="/" replace={true} /> ) }
        </>
      )
    }
}
export default EditProfile
