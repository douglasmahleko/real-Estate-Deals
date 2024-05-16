import React from "react";
import CreateTable from '../constants/createTable'
import BasicCard from '../constants/basicCard';
import SearchBar from "../constants/searchBar";
import { Box, Paper, Typography } from '@material-ui/core';
import ViewMoreWithoutURL from "../constants/viewMoreWithoutURL";
import MakeReco from '../constants/makeReco';
import './shortList.css'
import Skeleton from '@mui/material/Skeleton';
import { Link, Navigate } from "react-router-dom";

class PreviewPreRequisities extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:"",
      open:false,
      stories:null,
      stories1:null,
      clientInfo: null,
      displayRearchResult: false,
      sending:false,
      search:"",
      dataSearch:[],
      getLevel:props.userLevel,
      getting:true,
      tableHeader : [
        {id:'clientEmail', name:"Client Email"},
        {id:'phase', name:"Phase/Street"},
        {id:'roomsNeeded', name:"Rooms Needed"},
        {id:'amountPerRoom', name:"Amount Per Room"},
        {id:'requirements', name:"Requirements"},
        {id:'budget', name:"Budget"}, 
        {id:'city', name:"City"},
        {id:'country', name:"Country"},
        {id:'personalInfo', name:"Personal Info"},
        {id:'consideration', name:"Consideration"},
        {id:'requirements', name:"Requirements"}, 
        {id:'dateExpectingHouse', name:"Date Expecting House"}, 
      ],
      tableHeaderNotPaid : [
        {id:'roomsNeeded', name:"Rooms Needed"},
        {id:'amountPerRoom', name:"Amount Per Room"},
        {id:'requirements', name:"Requirements"},
        {id:'requirements', name:"Requirements"}, 
        {id:'dateExpectingHouse', name:"Date Expecting House"}, 
      ],
      tableHeader1 : [
        {id:'agentEmail', name:"Agent"},
        {id:'city', name:"City"},
        {id:'phase', name:"Phase/Street"},
        {id:'roomsAvailable', name:"Rooms Available"},
        {id:'amountPerRoom', name:"Amount Per Room"},
      ],
      tableHeaderForMore : [
        {id:'houseID', name:"House ID"},
        {id:'address', name:"Address"},
        {id:'agentEmail', name:"Agent"},
        {id:'city', name:"City"},
        {id:'phase', name:"Phase/Street"},
        {id:'roomsAvailable', name:"Rooms Available"},
        {id:'conditions', name:"Conditions"},
        {id:'amountPerRoom', name:"Amount Per Room"},
        {id:'requirements', name:"Requirements"},
        {id:'utilities', name:"Utilities"},
        {id:'physicalDescription', name:"Physical Description"},
        ],
        tableHeaderForMoreNotPaid : [
          {id:'roomsAvailable', name:"Rooms Available"},
          {id:'amountPerRoom', name:"Amount Per Room"},
          {id:'requirements', name:"Requirements"},
          {id:'utilities', name:"Utilities"},
          ]
    }
    this.change = this.change.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleChange = (e) => {
    this.setState({search : e.target.value})
  }
  componentDidMount(){
    if(!this.props.paid){
      this.setState({tableHeader : this.state.tableHeaderNotPaid})
      this.setState({tableHeaderForMore : this.state.tableHeaderForMoreNotPaid})
      this.setState({open : false})
    }
    const getData = async () => {
      this.props.handleClickSnackBar('Loading', 'info')
      let messages = []
      try {
        if(this.state.getLevel === "AGENT"){
          messages = await this.props.backendActor.getAllClientsNeeds();
          if(messages.length === 0){
            this.props.handleClickSnackBar('No needs posted at the moment', 'info')
          }
          else{
            this.setState({stories:messages});
            const msg = await this.props.backendActor.getMyHouses();
            if(messages.err != "Currently user has no houses to manage. Please add some!!"){
              this.setState({stories1:msg.ok});
            }else{
              this.props.handleClickSnackBar(msg.err, 'error')
            }
          }
        }else{
          messages = await this.props.backendActor.getClientNeeds();
          if(messages.err != 'User needs not found'){
            this.setState({stories:messages.ok});
          }
          else{
            this.props.handleClickSnackBar(messages.err, 'error')
          }
        }
      } catch (error) {
        this.props.handleClickSnackBar(error.error, 'error')
      }
    };
      getData()
      if(this.state.search != ""){
        this.handleSearch()
      }
    }
    getHead(title){
      return(
        <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
            <Typography variant="h3"> {title} </Typography>
            { !this.props.paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features click <span style={{ color: 'red' }}><Link to="/pay"> here </Link></span> </Typography> ) : ( null ) }
            { this.state.displayRearchResult && <CommonButton sx={{ width:'60%', marginLeft:'1%'}} onClick={() => this.setState({ displayRearchResult : false })} variant="contained" type="submit"> Close Search </CommonButton>}
        </Box>
      )
    }
    change(data){
      this.setState({ clientInfo: data})
    }
    handleSearch = (e) => {
      e.preventDefault()
      this.props.handleClickSnackBar('Loading Search Result', 'info')
      if( this.state.stories != null){
        this.state.stories.forEach((dat) => {
          if(dat.city.toUpperCase() === this.state.search.toUpperCase() || dat.country.toUpperCase()  === this.state.search.toUpperCase() ||
            dat.phase.toUpperCase() === this.state.search.toUpperCase() || dat.budget.toString()  === this.state.search.toString() || dat.country.toUpperCase().startsWith(this.state.search.toUpperCase()) || 
            dat.clientEmail.toUpperCase()  === this.state.search.toUpperCase() || dat.amountPerRoom.toString() === this.state.search.toString() ||
            dat.roomsNeeded.toUpperCase()  === this.state.search.toUpperCase() || dat.clientEmail.toUpperCase().startsWith(this.state.search.toUpperCase()) ||
            dat.city.toUpperCase().startsWith(this.state.search.toUpperCase()) || dat.phase.toUpperCase().startsWith(this.state.search.toUpperCase())){
              this.state.dataSearch.push(dat)
              this.props.handleCloseSnackBar()
          }
        })
        if(this.state.dataSearch.length <= 0){
          this.props.handleCloseSnackBar()
          this.props.handleClickSnackBar('No search result found', 'info')
          this.setState({displayRearchResult:false})
          this.setState({search:""})
        }else{
          this.props.handleCloseSnackBar()
          this.setState({search:""})
          this.setState({displayRearchResult:true})
          this.props.handleClickSnackBar('Here your search results', 'info')
        }
      }
    }
    viewPreRequisities(){
      return(
        <Box>
        <Paper sx={{marginLeft :{ xs:'150px'}}}>
            {
              this.state.getLevel === 'AGENT' ? (
                <>
                  <div className={ !this.state.displayRearchResult ? "show" : "hide"}>
                    <BasicCard content={ this.state.stories != null ? ( <CreateTable data={this.state.stories} backendActor={this.props.backendActor}
                    user={this.props.user} link="clientEmail" focus="Requirements" getLevel={this.state.getLevel} paid={this.props.paid}
                    routie="/moreURL" tableHeader={this.state.tableHeader} handleClickSnackBar={this.props.handleClickSnackBar}
                    canDownload={true} onClick={() => this.setState({ open : true})} onClick1={this.change} /> ) : (
                      <>
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      </>
                    )}
                    header={ <SearchBar searchValue={this.state.search} onClick={this.handleSearch} paid={this.props.paid}
                    onChange={(e) => this.setState({ search : e.target.value})} user={this.props.user}
                    placeholder="Search for Requirements" title={this.getHead(" View Prerequisities")} /> } />
                  </div>
                  <div className={ this.state.displayRearchResult ? "show" : "hide"}>
                    <BasicCard content={ this.state.dataSearch.length > 0 ? ( <CreateTable data={this.state.dataSearch} backendActor={this.props.backendActor}
                    user={this.props.user} link="clientEmail" focus="Requirements" getLevel={this.state.getLevel} paid={this.props.paid}
                    routie="/moreURL" tableHeader={this.state.tableHeader} handleClickSnackBar={this.props.handleClickSnackBar}
                    canDownload={true} onClick={() => this.setState({ open : true})} onClick1={this.change} /> ) : (
                      <>
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      </>
                    )}
                    header={ this.getHead(" View Prerequisities")} />
                  </div>
                </>
              ) : (
                <ViewMoreWithoutURL data1={this.state.stories} user={this.props.user} paid={this.props.paid}
                tableHead={this.state.tableHeader} isAuthenticated={this.props.isAuthenticated} title1={this.getHead('My Needs' )} />
              )
            }
        </Paper>
        <MakeReco open={this.state.open} stories1={this.state.stories1} getLevel={this.state.getLevel}
            tableHeader1={this.state.tableHeader1} clientInfo={this.state.clientInfo} handleCloseSnackBar={this.props.handleCloseSnackBar}
            tableHeaderForMore={this.state.tableHeaderForMore} backendActor={this.props.backendActor}
            closeUp={(e) => this.setState( { open : false } ) } user={this.props.user} 
            handleClickSnackBar={this.props.handleClickSnackBar} paid={this.props.paid}
         />
    </Box>
      )
    }
    render(){
      return(
        <Box sx={{marginLeft :{ xs:'150px'}}} bgcolor={"background.default"} color={"text.primary"}>
          { this.props.isAuthenticated ? (this.viewPreRequisities()) : ( <Navigate to="/" replace={true} /> )}
        </Box>
    )
    }
}
export default PreviewPreRequisities