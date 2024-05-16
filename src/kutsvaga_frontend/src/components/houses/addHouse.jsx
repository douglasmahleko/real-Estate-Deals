import React from "react";
import { Box } from "@material-ui/core";
import { Stack, TextField, Typography } from "@mui/material";
import CommonButton from "../constants/commonButton";
import BasicCard from "../constants/basicCard";
import Home from "../home";
import { Link, Navigate } from "react-router-dom";

export default class AddHouse extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sending : false, physicalDescription:'', city: '', address:'',
      phase: '', roomsAvailable: '', conditions: '',
      amountPerRoom:'' , requirements: '', utilities: '', country:'', province:''
    }
    // this.housesByAnAgent = this.housesByAnAgent.bind(this)
  }
    handleSubmit = (e) => {
      e.preventDefault()
      const sendMessage = async (e) => {
        try {
          this.setState({sending : true,})
          await this.props.backendActor.addHouse({
            city: this.state.city, address: this.state.address, agentEmail: this.props.user.email,
            phase: this.state.phase, roomsAvailable: parseInt(this.state.roomsAvailable), conditions: this.state.conditions,
            amountPerRoom: parseFloat(this.state.amountPerRoom), requirements: this.state.requirements,
            utilities: this.state.utilities, country: this.state.country, province: this.state.province, available:true,
            physicalDescription : this.state.physicalDescription, houseID: Math.random().toString(36).substring(2,8)
          });
          this.setState({
            city: '', address:'', phase: '', houseID:'', 
            roomsAvailable: '', conditions: '', amountPerRoom: '', requirements: '', 
            country: '', province: '', physicalDescription:'', utilities: '',
          })
          this.props.handleClickSnackBar('Data added successfully', 'success')
          this.props.navigate('/showHouses')
        } catch (error) {
          this.props.handleClickSnackBar(error.message, 'error')
        }
      };
      sendMessage()
    }
    getContent() {
        return(
          <Box sx={{ justifyContent:"center", marginLeft :{ xs:'150px'}}}>
          <form style={{ margin: '1%' }}>
            <Stack>
                <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.phase.length===0} minRows={2} variant="outlined" value={this.state.phase} onChange={(e) => this.setState({phase :e.target.value})} label="Phase " />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.address.length===0} minRows={2} variant="outlined" value={this.state.address} onChange={(e) => this.setState({address :e.target.value})} label="Address" />
                <TextField sx={{ width:'60%', margin:'1%'}} required type="number" error={this.state.roomsAvailable.length===0} minRows={2} variant="outlined" value={this.state.roomsAvailable} onChange={(e) => this.setState({roomsAvailable :e.target.value})} label="Available Rooms" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.conditions.length===0} minRows={2} variant="outlined" value={this.state.conditions} onChange={(e) => this.setState({conditions :e.target.value})} label="Conditions" />
                <TextField sx={{ width:'60%', margin:'1%'}} required type="number" error={this.state.amountPerRoom.length===0} variant="outlined" value={this.state.amountPerRoom} onChange={(e) => this.setState({amountPerRoom :e.target.value})} label="Amount Per Room" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.utilities.length===0} variant="outlined" value={this.state.utilities} onChange={(e) => this.setState({utilities :e.target.value})} label="Utilities" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.requirements.length===0} variant="outlined" value={this.state.requirements} onChange={(e) => this.setState({requirements :e.target.value})} label="Requirements" />
                <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.physicalDescription.length===0} minRows={2} variant="outlined" value={this.state.physicalDescription} onChange={(e) => this.setState({physicalDescription :e.target.value})} label="Physical Description" />
                <TextField name="country" sx={{ width:'60%', margin:'1%'}} required error={this.state.country.length===0} variant="outlined" value={this.state.country} onChange={(e) => this.setState({country :e.target.value})} label="Country" />
                <TextField name="province" sx={{ width:'60%', margin:'1%'}} required error={this.state.province.length===0} variant="outlined" value={this.state.province} onChange={(e) => this.setState({province :e.target.value})} label="Province " />
                <TextField name="city" sx={{ width:'60%', margin:'1%'}} required type="text" error={this.state.city.length===0} variant="outlined" value={this.state.city} onChange={(e) => this.setState({city :e.target.value})} label="City" />
                { this.props.paid ? ( <CommonButton sx={{ width:'60%', marginLeft:'1%'}} onClick={this.handleSubmit} variant="contained" type="submit"> Submit </CommonButton> ) : ( null ) }
              </Stack>
            </form>
        </Box>
        )
      }
    getHead(){
        return(
          <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
              <Typography variant="h3"> Add A House </Typography>
              { !this.props.paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features click <span style={{ color: 'black' }}><Link to="/pay"> here </Link></span> </Typography> ) : ( null ) }
          </Box>
        )
      }
    render(){
      return(
        <>
          {
            this.props.isAuthenticated ? (
              <BasicCard header={this.getHead()} content={this.getContent()} sx={{width:"800px"}} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        </>
        
      )
    }
}