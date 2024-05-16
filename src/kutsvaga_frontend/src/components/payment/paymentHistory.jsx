import React from "react";
import CreateTable from '../constants/createTable'
import BasicCard from '../constants/basicCard';
import { Box, ButtonGroup, Button, Stack, TextField, Typography } from "@mui/material";
import CommonButton from "../constants/commonButton";
import { Navigate } from "react-router-dom";
import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import SensorWindowIcon from '@mui/icons-material/SensorWindow';
import LaunchIcon from '@mui/icons-material/Launch';

class PaymentHistory extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:null,
      visible: 0,
      receiverEmail: '',
      amountInBitCoins: props.userLevel === 'AGENT' ? '23820' : '39700',
      myTransAddress: '',
      datePaymentMade:'',
      myBalance:'',
      feePercentile:'',
      receiverAddress:'',
      utxoResult:'',
      value:"1",
      purpose:'',
      tableHeader : [
        { id: 'email', name : 'User Email' },
        { id: 'receiverAddress', name : 'Receiver Address' },
        { id: 'receiverEmail', name : 'Receiver Email' },
        { id: 'purpose', name : 'Purpose' },
        { id: 'datePaymentMade', name : 'Date Payment Made' },
    ],
      getting:true
    }
    this.handleChange = this.handleChange.bind(this)
    
  }
  componentDidMount(){
    const getData = async () => {
      let history = await this.props.backemdActor.getMyPaymentHistory(this.props.user.email)
      if(history != "No history exist yet"){
        this.setState({ data : history})
      }
      else{
        if(this.state.visible === 0){
          this.props.handleClickSnackBar(history, "info")
        }
      }
    } 
    getData()
}
handleChange = (e, val) => {
  this.setState({value : val})
};
sendMessage(e){
  e.preventDefault()
  let msg = {
      email : this.props.email,
      receiverAddress : this.state.receiverAddress,
      myAddress : this.state.myAddress,
      receiverEmail : this.state.receiverEmail,
      amount : this.state.amountInBitCoins,
      purpose : this.state.purpose,
      datePaymentMade : this.state.datePaymentMade
    }
  };
getHead(){
  return(
    <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
        <Typography variant="h3"> My Payments History </Typography>
        { !this.props.paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features click </Typography> ) : ( null ) }
    </Box>
  )
}
buttons(){
  return(
    <Box sx={{ flexDirection:'row', display: 'flex',alignItems: 'center', marginLeft:'150px','& > *': {m: 1,},}}>
        <CommonButton size='large' variant = {this.state.visible == 0 ? 'outlined' : "contained"} onClick={() => this.setState({visible:0})}>Payment History</CommonButton>, 
        <CommonButton size='large' variant = {this.state.visible == 1 ? 'outlined' : "contained"} onClick={() => this.setState({visible:1})}>Make Payment</CommonButton>,
    </Box>
  )
}
getHeadForPayments(){
  return(
    <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
        <Typography variant="h3"> Make Payment </Typography>
        { !this.props.paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features </Typography> ) : ( null ) }
    </Box>
  )
}
getContentForPayments() {
  return(
    <Box sx={{ justifyContent:"center", marginLeft :{ xs:'150px'}}}>
            <TabContext value={this.state.value} >
              <Box sx={{ width: '1500px', marginTop:'-45px', borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <TabList onChange={this.handleChange} textColor="secondary" centered indicatorColor="secondary" >
                  <Tab icon={<SensorWindowIcon />} iconPosition="start" label="Get Balance" value='1' />
                  <Tab icon={<LaunchIcon />} iconPosition="start" label="Get Percintile Fee" value='2' />
                  <Tab icon={<SensorWindowIcon />} iconPosition="start" label="Get My Senting Address" value='3' />
                  <Tab icon={<LaunchIcon />} iconPosition="start" label="Get UTXOS" value='4' />
                  <Tab icon={<SensorWindowIcon />} iconPosition="start" label="Sent Coins" value='5' />
                </TabList >
              </Box>
              <TabPanel value='1'>
                <form style={{ margin: '1%' }}>
                  {/* GET BALANCE */}
                  <Stack>
                    <Box>
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.myBalance.length===0} variant="outlined" value={this.state.myBalance} label="My Account Balance" />
                    </Box>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel value='2'>
                <form style={{ margin: '1%' }}>
                  {/* GET PERCENTILE FEE */}
                  <Stack>
                    <Box>
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.feePercentile.length===0} variant="outlined" value={this.state.feePercentile} label="Percentile Charge Per Transfere" />
                    </Box>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel value='3'>
                <form style={{ margin: '1%' }}>
                  {/* GET SENTING ADDRESS */}
                  <Stack>
                    <Box>
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.myTransAddress.length===0} variant="outlined" value={this.state.myTransAddress} label="My Transactioning Address" />
                    </Box>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel value='4'>
                <form style={{ margin: '1%' }}>
                  {/* GET UTXO */}
                  <Stack>
                    <Box>
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.utxoResult.length===0} variant="outlined" value={this.state.utxoResult} label="UTXO Result" />
                    </Box>
                    <CommonButton sx={{ width:'60%', marginLeft:'1%'}} variant="contained" type="submit"> Submit </CommonButton>
                  </Stack>
                </form>
              </TabPanel>
              <TabPanel value='5'>
                <form style={{ margin: '1%' }}>
                  {/* SENT COINS */}
                  <Stack>
                    <Box>
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.amountInBitCoins.length===0} variant="outlined" value={this.state.amountInBitCoins} label="ICP Amount" />
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.receiverEmail.length===0} variant="outlined" value={this.state.receiverEmail} onChange={(e) => this.setState({ receiverEmail :e.target.value})} label="Receiver Email" />
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.receiverAddress.length===0} variant="outlined" value={this.state.receiverAddress} onChange={(e) => this.setState({ receiverAddress :e.target.value})} label="Receiver Address" />
                      <TextField sx={{ width:'60%', margin:'1%'}} required error={this.state.purpose.length===0} variant="outlined" value={this.state.purpose} onChange={(e) => this.setState({ purpose :e.target.value})} label="Purpose" />
                    </Box>
                    <CommonButton sx={{ width:'60%', marginLeft:'1%'}} onClick={this.sendMessage} variant="contained" type="submit"> Submit </CommonButton>
                    </Stack>
                  </form>
              </TabPanel>
            </TabContext>
            <Button onClick={() => this.props.navigate(-1)}> Get Back </Button>
          </Box>
  )
}
    render(){
      return(
        <>
          { this.props.isAuthenticated ? ( <Box>
          <Box sx={{position:'absolute', marginLeft:'25%', marginBottom: { sm : '30px', xs : '40px'}, 
            paddingBottom:{ sm : '30px', xs : '40px'}}} >
            <ButtonGroup size="large" aria-label="Large button group">
              {this.buttons()}
            </ButtonGroup>
          </Box>
          <Box sx={{ marginTop: { sm : '-30px', xs : '-40px'}, paddingTop:{ sm : '30px', xs : '40px'}}}>
            <Box className={ this.state.visible === 0 ? "show" : "hide"}>
              {
                this.state.data && <BasicCard content={<CreateTable link2="email" user={this.props.user} 
                routie2="/more" data={this.state.data} tableHeader={this.state.tableHeader} />}
                header={this.getHead()} />
              }
            </Box>
            <Box className={ this.state.visible === 1 ? "show" : "hide"}>
                <BasicCard header={this.getHeadForPayments()} content={this.getContentForPayments()} sx={{width:"800px"}} />
            </Box>
          </Box>
       </Box> ) : ( <Navigate to="/" replace={true} /> )}
        </>
       )
    }
}
export default PaymentHistory