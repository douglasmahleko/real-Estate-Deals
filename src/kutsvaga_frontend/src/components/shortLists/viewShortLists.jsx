import React from "react";
import CreateTable from '../constants/createTable'
import BasicCard from '../constants/basicCard';
import { Box, Typography } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { Link, Navigate } from "react-router-dom";

class ViewShortLists extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sending : false,
      data:null,
      displayRearchResult: false,
      getLevel:props.userLevel,
      tableHeader:null,
      tableHeaderAgent : [
        {id:"address", name:"Address"},
        {id:"clientEmail", name:"Client Email"},
        {id:"houseID", name:"House Id"},
        {id:"roomsTaken", name:"Rooms Available"},
        {id:"clientContact", name:"Client Contact"},
      ],
      tableHeaderAgentNotPaid : [
        {id:"", name:"Address"},
        {id:"", name:"Client Email"},
        {id:"", name:"House Id"},
        {id:"roomsTaken", name:"Rooms Available"},
        {id:"clientContact", name:"Client Contact"},
      ],
      tableHeaderClient : [
        {id:"agentEmail", name:"Agent Email"},
        {id:"houseID", name:"House Id"},
        {id:"roomsTaken", name:"Rooms Available"},
      ],
      tableHeaderClientNotPaid : [
        {id:"", name:"Agent Email"},
        {id:"houseID", name:"House Id"},
        {id:"roomsTaken", name:"Rooms Available"},
      ],
    }
  }
  componentDidMount(){
    if(this.state.getLevel === "AGENT"){
      this.setState({ tableHeader : this.state.tableHeaderAgent })
      if(!this.props.paid){
        this.setState({ tableHeader : this.state.tableHeaderAgentNotPaid })
      }
    }else{
      this.setState({ tableHeader : this.state.tableHeaderClient })
      if(!this.props.paid){
        this.setState({ tableHeader : this.state.tableHeaderClientNotPaid })
      }
    }
    const getData = async () => {
      this.props.handleClickSnackBar('Loading', 'info')
      try {
          const messages = await this.props.backendActor.getAllShortListsForUser(this.props.user.email);
          if(messages.length > 0){
            this.setState({data:messages});
            this.props.handleCloseSnackBar()
          }
          else{
            this.props.handleClickSnackBar('None of Short list linked to you exist', 'info')
          }
      } catch (error) {
        this.props.handleClickSnackBar(error.message, 'error')
      }
    };
    if(!this.state.displayRearchResult){
      getData()
    }
}
getHead() {
  return(
    <Box sx={{justifyContent:"center", marginLeft :{ xs:'150px', sm : "15%"}}}>
        <Typography variant="h3"> Houses On ShortList</Typography>
        <Typography variant="h3"> Remember when You Confirm a house you loose access for security reasons </Typography>
        { !this.props.paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features click <span style={{ color: 'black' }}><Link to="/pay"> here </Link></span> </Typography> ) : ( null ) }
    </Box>
  )
}
render(){
return(
  <Box sx={{marginLeft :{ xs:'150px'}}} bgcolor={"background.default"} color={"text.primary"}>
    { this.props.isAuthenticated ? 
      (
      <BasicCard content={ this.state.data != null ? ( <CreateTable user={this.props.user} 
          data={this.state.data} link2="agentEmail" link="clientEmail" link3="houseID" getLevel={this.state.getLevel}
          focus="shortList" routie2="/moreURL" routie="/moreURL" backendActor={this.props.backendActor}
          tableHeader={this.state.tableHeader} handleClickSnackBar={this.props.handleClickSnackBar}
          canDownload={this.state.getLevel === 'AGENT'} paid={this.props.paid} setconfirm={this.props.setconfirm} /> ) : (
            <>
              < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
              < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
              < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
              < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
            </>
          )}
          header={this.getHead()} /> ) : ( <Navigate to="/" replace={true} /> )
    }
  </Box>
  )
  }
}
export default ViewShortLists