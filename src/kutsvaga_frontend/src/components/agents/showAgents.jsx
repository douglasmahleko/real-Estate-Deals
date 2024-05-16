import React from "react";
import CreateTable from '../constants/createTable'
import BasicCard from '../constants/basicCard';
import SearchBar from "../constants/searchBar";
import { Box, Paper, Typography } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import CommonButton from "../constants/commonButton";
import { Link, Navigate } from "react-router-dom";
import './agent.css'

class ShowAgents extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sending : false,
      data:null,
      visible:0,
      search: '',
      dataSearch:[],
      dataSearch2:[],
      displayRearchResult: false,
      agent:'',
      data1:null,
      data1ToDisplay:null,
      updated: false, 
      tableHeader : [
        { id: 'title', name : 'Title' },
        { id: 'name', name : 'Name' },
        { id: 'surname', name : 'Surname' },
        { id: 'email', name : 'Email' },
        { id: 'contact', name : 'Contact' },
        { id: 'dob', name : 'D.O.B' },
        { id: 'gender', name : 'Gender' },
        { id: 'country', name : 'Country' },
        { id: 'physicalAddress', name:"Physical Address"},
        { id: 'city', name:"City"},
        { id: 'province', name:"Province"},
    ],
    tableHeaderNotPaid : [
      { id: 'title', name : 'Title' },
      { id: 'name', name : 'Name' },
      { id: 'dob', name : 'D.O.B' },
      { id: 'gender', name : 'Gender' },
      { id: 'country', name : 'Country' },
      { id: 'province', name:"Province"},
  ],
    tableHeaderForHouse : [
      {id:'houseID', name:"House ID"},
      {id:'agentEmail', name:"Agent"},
      {id:'city', name:"City"},
      {id:'phase', name:"Phase/Street"},
      {id:'roomsAvailable', name:"Rooms Available"},
      {id:'conditions', name:"Conditions"},
      {id:'amountPerRoom', name:"Amount Per Room"},
      {id:'requirements', name:"Requirements"},
      {id:'utilities', name:"Utilities Offered"},
      {id:'physicalDescription', name:"Physical Description"},
    ],
    tableHeaderForHouseNotPaid : [
      {id:'houseID', name:"House ID"},
      {id:'city', name:"City"},
      {id:'roomsAvailable', name:"Rooms Available"},
      {id:'conditions', name:"Conditions"},
      {id:'amountPerRoom', name:"Amount Per Room"},
      {id:'requirements', name:"Requirements"},
      {id:'utilities', name:"Utilities Offered"},
      {id:'physicalDescription', name:"Physical Description"},
    ],
      getting:true
    }
    this.housesByAnAgent = this.housesByAnAgent.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch = (e) => {
    e.preventDefault()
    this.props.handleClickSnackBar('Loading Search Result', 'info')
    if(this.state.data != null){
      if(this.state.visible === 1 ){
        this.state.data.forEach((dat) => {
          if(dat.city.toUpperCase() === this.state.search.toUpperCase() || dat.address.toUpperCase()  === this.state.search.toUpperCase() || dat.address.toUpperCase().startsWith(this.state.search.toUpperCase())||
            dat.phase.toUpperCase() === this.state.search.toUpperCase() || dat.roomsAvailable.toString()  === this.state.search.toString() || dat.agentEmail.toUpperCase().startsWith(this.state.search.toUpperCase())||
            dat.amountPerRoom.toString() === this.state.search.toString() || dat.agentEmail.toUpperCase()  === this.state.search.toUpperCase() ||
            dat.city.toUpperCase().startsWith(this.state.search.toUpperCase())||dat.phase.toUpperCase().startsWith(this.state.search.toUpperCase())){
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
    }else if(this.state.visible === 0){
      if(this.state.data1ToDisplay != null){
        this.state.data1ToDisplay.forEach((dat) => {
          if(dat.country.toUpperCase()  === this.state.search.toUpperCase() || dat.country.toUpperCase().startsWith(this.state.search.toUpperCase()) ||
            dat.city.toUpperCase()  === this.state.search.toUpperCase() || dat.city.toUpperCase().startsWith(this.state.search.toUpperCase())|| 
            dat.province.toUpperCase()  === this.state.search.toUpperCase() || dat.province.toUpperCase().startsWith(this.state.search.toUpperCase())|| 
            dat.gender.toUpperCase()  === this.state.search.toUpperCase() || 
            dat.name.toUpperCase()  === this.state.search.toUpperCase() || dat.name.toUpperCase().startsWith(this.state.search.toUpperCase())|| 
            dat.surname.toUpperCase()  === this.state.search.toUpperCase() || dat.surname.toUpperCase().startsWith(this.state.search.toUpperCase())||
            dat.contact.toString()  === this.state.search.toString() || 
            dat.email.toUpperCase()  === this.state.search.toUpperCase()|| dat.email.toUpperCase().startsWith(this.state.search.toUpperCase())){
            this.state.dataSearch2.push(dat)
            this.props.handleCloseSnackBar()
          }
        })
        if(this.state.dataSearch2.length <= 0){
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
  }
  componentDidMount(){
    if(!this.props.paid){
      this.setState({ tableHeaderForHouse : this.state.tableHeaderForHouseNotPaid })
      this.setState({ tableHeader : this.state.tableHeaderNotPaid }) 
    }
    const getData = async () => {
      this.props.handleClickSnackBar('Loading', 'info')
      let dat = []
      try {
        const messages = await this.props.backendActor.getAgents();
        const messages2 = await this.props.backendActor.getUsers();
        const messages3 = await this.props.backendActor.getPayments();
        if( messages3.length > 0 ){
          messages.forEach( ( msg ) => {
            messages3.forEach( ( msg3 ) => {
              if( msg3.email === msg.email && msg3.valid ){
                messages2.forEach( ( msg2 ) => {
                  if( msg3.email === msg2.email ){
                    let combine = {
                      title : msg2.title,
                      name : msg2.name,
                      surname: msg2.surname,
                      email : msg2.email,
                      contact : msg2.contact,
                      dob :  msg2.dob,
                      gender : msg2.gender,
                      country : msg2.country,
                      physicalAddress : msg.physicalAddress,
                      city : msg.city,
                      province : msg.province,
                    }
                    dat.push(combine)
                  }
                })
              }
            })
          })
          this.setState({data:dat});
        }else{
          this.props.handleClickSnackBar("Currently no Agent exist", 'info')
        }
      } catch (error) {
        this.props.handleClickSnackBar(error.message, 'error')
      }
    };
      getData()
      if(this.state.search != ""){
        this.handleSearch()
      }
}
housesByAnAgent = async (agenty) => {
  this.setState({displayRearchResult:false})
  this.setState({search:""})
  this.props.handleClickSnackBar('Loading', 'info')
  this.setState({agent : agenty.email})
  const messages2 = await this.props.backendActor.getAllHousesByAgent(agenty.email);
  if(messages2.err != 'Currently user has no houses to manage. Please add some!!'){
    this.setState({data1ToDisplay : messages2.ok})
    this.props.handleCloseSnackBar()
  }
  else{
    this.props.handleClickSnackBar(messages2.err, 'error')
  }
  this.setState({visible : 1})
}
getToAgents(){
  this.setState({displayRearchResult:false})
  this.setState({visible : 0})
  this.setState({agent : ''})
  this.setState({data1ToDisplay : null})
}
getHead(title){
  return(
    <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
        <Typography variant="h3"> {title} {this.state.agent != '' ? this.state.agent.toUpperCase() : null} </Typography>
        { !this.props.paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features click <span style={{ color: 'black' }}><Link to="/pay"> here </Link></span> </Typography> ) : ( null ) }
        { this.state.visible === 1 ? ( <CommonButton size='large' sx={{marginLeft:'25%'}} variant = "contained" onClick={() => this.getToAgents() }>Show Agents Again</CommonButton> ) : ( null ) }
        { this.state.displayRearchResult ? ( <CommonButton size='large' sx={{marginLeft:'25%'}} variant = "contained" onClick={() => this.setState({displayRearchResult:false}) }> Kill Search </CommonButton> ) : ( null ) }
    </Box>
  )
}
    render(){
      return(
        <Paper sx={{marginLeft :{ xs:'150px'}}}>
          { 
          this.props.isAuthenticated ? (
          <Box bgcolor={"background.default"} color={"text.primary"}>
            <div className={ this.state.visible === 0 ? "show" : "hide"}>
              <div className={ !this.state.displayRearchResult ? "show" : "hide"}>
                <BasicCard content={ this.state.data != null ? ( <CreateTable backendActor={this.props.backendActor}
                      link2="email" user={this.props.user} focus="housesByAgent" handleClickSnackBar={this.props.handleClickSnackBar}
                      onClick={this.housesByAnAgent} routie2="/more" data={this.state.data} getLevel={this.props.userLevel}
                      tableHeader={this.state.tableHeader} paid={this.props.paid} /> ) : ( 
                        <>
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        </> ) }
                      header={ <SearchBar searchValue={this.state.search} title={this.getHead("Available Agents")}
                      onChange={(e) => this.setState({search : e.target.value})} paid={this.props.paid}
                      placeholder="Search for Agents" onClick={this.handleSearch} /> } />
              </div>
              <div className={ this.state.displayRearchResult ? "show" : "hide"}>
                <BasicCard content={ this.state.dataSearch.length > 0 ? ( <CreateTable backendActor={this.props.backendActor}
                      link2="email" user={this.props.user} focus="housesByAgent" handleClickSnackBar={this.props.handleClickSnackBar}
                      onClick={this.housesByAnAgent} routie2="/more" data={this.state.dataSearch} getLevel={this.props.userLevel}
                      tableHeader={this.state.tableHeader} paid={this.props.paid} /> ) : ( 
                        <>
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        </> ) }
                      header={this.getHead("Available Agents")} />
              </div>
            </div>
            <div className={ this.state.visible === 1 ? "show" : "hide"}>
              <div className={ !this.state.displayRearchResult ? "show" : "hide"}>
                <BasicCard content={ this.state.data1ToDisplay != null ? ( <CreateTable backendActor={this.props.backendActor}
                    user={this.props.user} focus="MoreOnHouse" handleClickSnackBar={this.props.handleClickSnackBar}
                    data={this.state.data1ToDisplay} getLevel={this.props.userLevel} paid={this.props.paid}
                    tableHeader={this.state.tableHeaderForHouse} /> ) : ( 
                      <>
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      </>
                    ) }
                    header={ <SearchBar searchValue={this.state.search} paid={this.props.paid}
                    onChange={(e) => this.setState({search : e.target.value})} title={this.getHead("Agents' Houses")}
                    placeholder="Search for Agents" onClick={this.handleSearch} /> } />
              </div>
              <div className={ this.state.displayRearchResult ? "show" : "hide"}>
                <BasicCard content={ this.state.dataSearch2.length > 0 ? ( <CreateTable backendActor={this.props.backendActor}
                    user={this.props.user} focus="MoreOnHouse" handleClickSnackBar={this.props.handleClickSnackBar}
                    data={this.state.dataSearch2} getLevel={this.props.userLevel} paid={this.props.paid}
                    tableHeader={this.state.tableHeaderForHouse} /> ) : ( 
                      <>
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      </>
                    ) }
                    header={ this.getHead("Agents' Houses")} />
              </div>
            </div>
          </Box>
        ) : (
          <Navigate to="/" replace={true} />
          )
      }
        </Paper>
      )
    }
}
export default ShowAgents