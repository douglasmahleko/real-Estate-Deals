import React from "react"; 
import CreateTable from '../constants/createTable'
import BasicCard from '../constants/basicCard';
import SearchBar from "../constants/searchBar";
import { Box } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import { Typography } from "@mui/material"
import './house.css'
import Skeleton from '@mui/material/Skeleton';
import { Link, Navigate } from "react-router-dom";
import CommonButton from "../constants/commonButton";

class ShowHouses extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open : false,
      dataSearch:[],
      data:null,
      userLevel:props.userLevel,
      tableHeader: null,
      displayRearchResult: false,
      title: '',
      tableHeaderAgent : [
        {id:'address', name:"Address"},
        {id:'city', name:"City"},
        {id:'phase', name:"Phase/Street"},
        {id:'roomsAvailable', name:"Rooms Available"},
        {id:'conditions', name:"Conditions"},
        {id:'amountPerRoom', name:"Amount Per Room"},
        {id:'requirements', name:"Requirements"},
        {id:'utilities', name:"Utilities"},
        {id:'physicalDescription', name:"Physical Description"},
      ],
      tableHeaderClient : [
        {id:'houseID', name:"House ID"},
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
      tableHeaderNotPaid : [
        {id:'roomsAvailable', name:"Rooms Available"},
        {id:'conditions', name:"Conditions"},
        {id:'amountPerRoom', name:"Amount Per Room"},
        {id:'requirements', name:"Requirements"},
        {id:'utilities', name:"Utilities"},
        {id:'physicalDescription', name:"Physical Description"},
      ],
      search : '',
      getting : true
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch = (e) => {
    e.preventDefault()
    this.props.handleClickSnackBar('Loading Search Result', 'info')
    if(this.state.data != null){
      this.state.data.forEach((dat) => {
        if(dat.city.toUpperCase() === this.state.search.toUpperCase() || dat.address.toUpperCase()  === this.state.search.toUpperCase() || dat.agentEmail.toUpperCase().startsWith(this.state.search.toUpperCase()) ||
          dat.phase.toUpperCase() === this.state.search.toUpperCase() || dat.roomsAvailable.toString()  === this.state.search.toString() || dat.phase.toUpperCase().startsWith(this.state.search.toUpperCase()) ||
          dat.amountPerRoom.toString() === this.state.search.toString() || dat.agentEmail.toUpperCase()  === this.state.search.toUpperCase() || dat.city.toUpperCase().startsWith(this.state.search.toUpperCase())){
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
  componentDidMount(){
    this.props.handleClickSnackBar('Loading', 'info')
    const getData = async () => {
      try {
        let messages = null
        if(this.state.userLevel ==="AGENT"){
          if(!this.props.paid){
            this.setState({ tableHeader : this.state.tableHeaderNotPaid })
          }else{
            this.setState({tableHeader:this.state.tableHeaderAgent})
          }
          messages = await this.props.backendActor.getMyHouses();
          if(messages.err != "Currently user has no houses to manage. Please add some!!"){
            this.setState({data:messages.ok});
          }else{
            this.props.handleClickSnackBar(messages.err, 'error')
          }
        }else{
          if(!this.props.paid){
            this.setState({ tableHeader : this.state.tableHeaderNotPaid })
          }else{
            this.setState({tableHeader:this.state.tableHeaderClient})
          }
          messages = await this.props.backendActor.getAllHouses();
          if(messages.length === 0){
            this.props.handleClickSnackBar('No houses uploaded yet', 'info')
          }
          else if(messages.length > 0){
            this.setState({data:messages});
          } 
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
    headerShow(){
      return(
        <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
            <Typography variant="h3"> Available Houses </Typography>
            { !this.props.paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features click <span style={{ color: 'black' }}><Link to="/pay"> here </Link></span></Typography> ) : ( null ) }
            { this.state.displayRearchResult && <CommonButton sx={{ width:'60%', marginLeft:'1%'}} onClick={() => this.setState({ displayRearchResult : false })} variant="contained" type="submit"> Close Search </CommonButton>}
        </Box>
      )
    }
    showHouses () {
      return(
        <Box sx={{marginLeft :{ xs:'150px'}}}>
        <Paper sx={{marginLeft :{ xs:'150px'}}}>
              <div className={ !this.state.displayRearchResult ? "show" : "hide"}>
                <BasicCard content={ this.state.data != null && this.state.tableHeader != null ? ( <CreateTable link2="agentEmail" 
                  handleClickSnackBar={this.props.handleClickSnackBar} getLevel={this.state.userLevel} paid={this.props.paid}
                  user={this.props.user} focus="MoreOnHouse" routie2="/moreURL" backendActor={this.props.backendActor}
                  data={this.state.data} tableHeader={this.state.tableHeader} 
                  /> ) : (
                        <>
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                          < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        </>
                  ) }
                  header={ <SearchBar searchValue={this.state.search} onChange={(e) => this.setState({search:e.target.value})} 
                  placeholder="Search for a House" title={this.headerShow()} onClick={this.handleSearch} paid={this.props.paid} /> } />
              </div>
              <div className={ this.state.displayRearchResult ? "show" : "hide"}>
                <BasicCard content={ this.state.dataSearch.length > 0 && this.state.tableHeader != null ? ( <CreateTable link2="agentEmail" 
                    handleClickSnackBar={this.props.handleClickSnackBar} getLevel={this.state.userLevel} paid={this.props.paid}
                    user={this.props.user} focus="MoreOnHouse" routie2="/moreURL" backendActor={this.props.backendActor}
                    data={this.state.dataSearch} tableHeader={this.state.tableHeader} 
                    /> ) : (
                      <>
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                        < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                      </>
                  )
                }
                header={ this.headerShow() } />
              </div>
        </Paper>   
      </Box>
      )
    }
  render(){
    return(
      <>
          { this.props.isAuthenticated ? ( this.state.userLevel && this.showHouses() ) : ( <Navigate to="/" replace={true} />  ) }
      </>
  )
  }
}
export default ShowHouses