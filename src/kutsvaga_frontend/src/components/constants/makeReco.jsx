import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Box, Typography } from "@mui/material"
import BasicCard from "./basicCard"
import CreateTable from "./createTable"
import SearchBar from "./searchBar"
import Skeleton from '@mui/material/Skeleton';
import './consStyle.css'
import CommonButton from './commonButton';
import { Link } from 'react-router-dom';

 const MakeReco =  ({ open, stories1, handleCloseSnackBar, clientInfo, getLevel, paid, backendActor, handleClickSnackBar, tableHeader1, tableHeaderForMore, closeUp, user}) => {
  const [displayRearchResult, setdisplayRearchResult] = useState(false)
  const [search, setsearch] = useState("")
  const dataSearch = []
  const handleSearch = (e) => {
    e.preventDefault()
    handleClickSnackBar('Loading Search Result', 'info')
    stories1.forEach((dat) => {
      if(dat.city.toUpperCase() === search.toUpperCase() || dat.country.toUpperCase()  === search.toUpperCase() ||
        dat.phase.toUpperCase() === search.toUpperCase() || dat.budget.toString()  === search.toString() || dat.country.toUpperCase().startsWith(search.toUpperCase()) || 
        dat.clientEmail.toUpperCase()  === search.toUpperCase() || dat.amountPerRoom.toString() === search.toString() ||
        dat.roomsNeeded.toUpperCase()  === search.toUpperCase() || dat.clientEmail.toUpperCase().startsWith(search.toUpperCase()) ||
        dat.city.toUpperCase().startsWith(search.toUpperCase()) || dat.phase.toUpperCase().startsWith(search.toUpperCase())){
          dataSearch.push(dat)
          this.props.handleCloseSnackBar()
      }
    })
    if(dataSearch.length <= 0){
      handleCloseSnackBar()
      handleClickSnackBar('No search result found', 'info')
      setdisplayRearchResult(false)
      setsearch("")
    }else{
      handleCloseSnackBar()
      setdisplayRearchResult(true)
      setsearch("")
      handleClickSnackBar('Here your search results', 'info')
    }
  }
  const getHead = (title) => {
    return(
      <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
          <Typography variant="h3"> {title} </Typography>
          { !paid ? ( <Typography  variant = "h5" color="red" > please pay to get all data and all features click <span style={{ color: 'black' }}><Link to="/pay"> here </Link></span> </Typography> ) : ( null ) }
          { displayRearchResult && <CommonButton sx={{ width:'60%', marginLeft:'1%'}} onClick={() => setdisplayRearchResult(false)} variant="contained" type="submit"> Close Search </CommonButton>}
      </Box>
    )
  }
  return (
            <Dialog open={open} fullScreen sx={{marginLeft :{ xs:'150px'}}} >
                <DialogTitle>
                    <br/>
                    <Tooltip title='close'>
                        <IconButton onClick={closeUp} style={{float:'right'}}>
                            <CloseIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <Box width={400} height={280} bgcolor='white' p={3} borderRadius={5} >
                        <Stack gap={1} mt={2} mb={3} >
                            <div className={ !displayRearchResult ? "show" : "hide"}>
                                <BasicCard content={ stories1 != null ? ( <CreateTable data={stories1} user={user} dataReco={clientInfo} getLevel={getLevel}
                                        link2="agent" sx={{ width: "500px" }} focus="Recommend" routie2="/moreURL" handleClickSnackBar={handleClickSnackBar}
                                        tableHeader={tableHeader1} tableHeaderForMore={tableHeaderForMore} backendActor={backendActor}
                                        canDownload={true} onClick1={closeUp} /> ) : (
                                            <>
                                                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                                < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                            </>
                                        )}
                                        header={ <SearchBar searchValue={search} onClick={handleSearch} paid={paid}
                                            onChange={() => setsearch(e.target.value)} title={getHead("Houses To Recommend")} 
                                            placeholder="Search for House To Recommend"
                                    /> } />
                            </div>
                            <div className={ displayRearchResult ? "show" : "hide"}>
                                <BasicCard content={ dataSearch.length > 0 ? ( <CreateTable data={dataSearch} user={user} dataReco={clientInfo} getLevel={getLevel}
                                    link2="agent" sx={{ width: "500px" }} focus="Recommend" routie2="/moreURL" handleClickSnackBar={handleClickSnackBar}
                                    tableHeader={tableHeader1} tableHeaderForMore={tableHeaderForMore} backendActor={backendActor}
                                    canDownload={true} onClick1={closeUp} /> ) : (
                                        <>
                                            < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                            < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                            < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                            < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} />
                                        </>
                                    )}
                                    header={getHead("Houses To Recommend")} />
                            </div>
                        </Stack>
                    </Box>
                </DialogContent>
            </Dialog>
  );
};
export default MakeReco