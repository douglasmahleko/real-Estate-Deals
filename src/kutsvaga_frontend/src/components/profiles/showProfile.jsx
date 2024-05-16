import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import BasicCard from "../constants/basicCard";
import Home from "../home";
import Skeleton from '@mui/material/Skeleton';
import { Navigate } from "react-router-dom";

class ShowProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      getLevel: props.userLevel,
      surname: props.user.surname,
      email:props.user.email,
      gender:props.user.gender,
      title:props.user.title,
      contact:props.user.contact,
      dob:props.user.dob,
      name:props.user.name,
      country:props.user.country,
      regDate: props.user.regDate,
    }
  }
  componentDidMound(){
    this.props.handleClickSnackBar('Loading', 'info')
  }
    getContent() {
        return(
          <Box sx={{ justifyContent:"center", marginLeft :{ xs:'150px'}}}>
          <form style={{ margin: '1%' }}>
            <Stack>
                <TextField sx={{ width:'60%', margin:'1%'}} required variant="outlined" value={this.state.title} label="Title" />
                <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.state.name} label="Name" />
                <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.state.surname} label="Surname" />
                <TextField sx={{ width:'60%', margin:'1%'}} required minRows={2} variant="outlined" value={this.state.email} label="Email" />
                <TextField sx={{ width:'60%', margin:'1%'}} required variant="outlined" value={this.state.dob} label="D.O.B" />
                <TextField sx={{ width:'60%', margin:'1%'}} required variant="outlined" value={this.state.gender} label="Gender" />
                <TextField sx={{ width:'60%', margin:'1%'}} required  minRows={2} variant="outlined" value={this.state.contact} label="Contact" />
                <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.state.country} label="Country eg Zimbabwe" />
                <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.state.regDate} label="Registration Date" />
                  {
                      this.state.getLevel === 'AGENT' ? (
                        this.props.agentLogged != null ? ( <div>
                          <TextField sx={{ width:'60%', margin:'1%'}} required variant="outlined" value={this.props.agentLogged.regExpire} label="Registration Expiry date" />
                          <TextField sx={{ width:'60%', margin:'1%'}} required  minRows={2} maxRows={2} multiline variant="outlined" value={this.props.agentLogged.physicalAddress} label="Physical Address" />
                          <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.props.agentLogged.province} label="Province" />
                          <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.props.agentLogged.city} label="City" />
                          <TextField sx={{ width:'60%', margin:'1%'}} required  variant="outlined" value={this.props.agentLogged.phase} label="Phase" />
                        </div> ) : (
                          <>
                            < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                            < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
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
              </Stack>
            </form>
        </Box>
        )
      }
    getHead(){
        return(
          <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
              <Typography variant="h3"> My Profile </Typography>
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
export default ShowProfile