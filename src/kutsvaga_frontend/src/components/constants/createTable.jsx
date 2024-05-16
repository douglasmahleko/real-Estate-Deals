import React, { useState, useEffect } from "react";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Box, Button, Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate, Link  } from "react-router-dom";
import RecommendIcon from '@mui/icons-material/Recommend';
import SmallScreenCard from "./smallScreenCard";
import AddNum from "./addNum";

function CreateTable({tableHeader, data, getLevel, backendActor, setconfirm, paid, handleClickSnackBar, tableHeaderForMore, dataReco, user, link, link2, link3, routie, routie2, focus, canDownload, onClick, onClick1}){
    const navigate = useNavigate()
    const [tableHead, setTableHead] = useState(tableHeader)
    // let dataLength = 0
    // if(data != null){
        let dataLength = data.length
    // }
    const [dat, setDat] = useState(data)
    const [numRoomsToTake, setnumRoomsToTake] = useState('')
    const [numRooms, setnumRooms] = useState('')
    const [address, setaddress] = useState('')
    const [shortListingData, setshortListingData] = useState(null)
    const [title, settitle] = useState('')
    const [openNum, setopenNum] = useState(false)
    const [openNumForRooms, setopenNumForRooms] = useState(false)
    const h = []
    tableHead.forEach((th) => (
        h.push(th.id)
    ))
    const [rowsPerpage, setRowsPerpage] = useState(5)
    const [page, setPage] = useState(0)
    const handlePageChange = (e, newpage) => {
        setPage(newpage)
    }
    const handleRowChange = (e) => {
        setRowsPerpage(+e.target.value)
        setPage(0)
    }
      const housesByAnAgent = (data) => {
        navigate('/getHouseByAgent', {
            state:{
                stories : data,
            }
        })
      }
      const moreOfData = (tableHead, data, title) => {
        navigate('/more', {
            state:{
                tableHead : tableHead,
                data : data,
                title : title
            }
        })
      }
      const moreOfDataNoTHead = (tableHead, data, title) => {
        navigate('/moreURL', {
            state:{
                headerType : tableHead,
                url : data,
                title : title
            }
        })
      }
      const openSetNumRooms = (address) => {
        setopenNum(true)
        settitle("Add the number of rooms free")
        setaddress(address)
      }
      const returnToMarket = async () => {
        if(numRooms > 0){
            await backendActor.returnToMarket(address, numRooms)
            handleClickSnackBar("the house has returned to market", 'info')
        }
        else{
            handleClickSnackBar("Please add number of rooms free", 'info')
        }
      }
      const takeHouse = async (houseData) => {
        let returnStatement = await backendActor.confirm(houseData)
        setconfirm(true)
        handleClickSnackBar(returnStatement, 'info')
        console.log("done on confirm" + user.done)
        console.log("done on confirm and payment valid " + paid)
      }
      const openRecoAndSetData = (data) => {
        onClick()
        onClick1(data)
      }
      const selectHouseToReco = async (data) => {
        const message = {
            principleIdClient: dataReco.principleIdClient.toString(),
            address : data.address,
            clientEmail: dataReco.clientEmail,
            agentEmail : user.email,
            houseID : data.houseID,
            phase : data.phase,
            city : data.city,
            done : false
        }
        let res = await backendActor.recomend(message)
        handleClickSnackBar(res, 'info')
      }
      const shortList = async (data) => {
        settitle("Please enter the number of rooms you want")
        setopenNumForRooms(true)
        const messsage = {
            principleIdAgent: data.principleIdAgent.toString(),
            agentEmail : data.agentEmail,
            clientEmail : user.email,
            address : data.address,
            houseID : data.houseID,
            clientContact : user.contact,
            roomsTaken : parseInt(numRoomsToTake),
        }
        setshortListingData(messsage)
      }
      const runShortList = async () => {
        setopenNumForRooms(false)
            if( parseInt(numRoomsToTake) > 0 ){
                const messsag = {
                    principleIdAgent: shortListingData.principleIdAgent,
                    agentEmail : shortListingData.agentEmail,
                    clientEmail : shortListingData.clientEmail,
                    address : shortListingData.address,
                    houseID : shortListingData.houseID,
                    clientContact : shortListingData.clientContact,
                    roomsTaken : parseInt(numRoomsToTake),
                }
                let res = await backendActor.shortList(messsag)
                handleClickSnackBar(res, 'info')
            }
            else{
                handleClickSnackBar('Please put the number of rooms you want !!', 'error')
            }
        }
    return(
        <Box>
            <Box sx={{marginLeft:'30%'}} >
                {
                    canDownload ? (
                        <Button onClick={() =>console.log("download")} variant="contained" endIcon={<DownloadForOfflineIcon />}>
                            Download Data
                        </Button>
                    ) : (
                        null
                    )
                }
            </Box>
            <Paper sx={{margin:'1%', display : { xs : 'none', sm:'block'  }}} >
            <div style={{ margin: '1%' }}>
            <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor:'midnightblue' }} >
                                    {
                                        tableHead.map((col) => (
                                            <TableCell key={col.id} style={{ color:'white' }} > {col.name} </TableCell>
                                        ))
                                    }
                                    <TableCell key='action' style={{ color:'white' }} > Action </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    dat.slice(page*rowsPerpage, page * rowsPerpage + rowsPerpage).map((company) => (
                                        <TableRow>
                                            {
                                                h.map((head) => (
                                                            <TableCell>
                                                                {
                                                                    ( head === link) ? (
                                                                        (routie === 'more') ? (<Link to={routie} state={{
                                                                            tableHead : tableHead,
                                                                            data : company,
                                                                            title : "More On Client Data"
                                                                        }} > {company[head]} </Link>) : (<Link to={routie} state={{
                                                                                url : company[link],
                                                                                headerType : 'user',
                                                                                title : "More On Client Data"
                                                                        }} > {company[head]} </Link>)
                                                                    ):(
                                                                        (head === link2 ) ? (
                                                                            (routie2 === '/more') ? (<Link to={routie2} state={{
                                                                                tableHead : tableHead,
                                                                                data : company,
                                                                                title : "More On Agent Data"
                                                                            }} > {company[head]} </Link>) : (<Link to={routie2} state={{
                                                                                url : company[link2],
                                                                                headerType : 'user',
                                                                                title : "More On Agent Data"
                                                                            }} > {company[head]} </Link>)
                                                                        ):(
                                                                            (head === link3 ) ? (
                                                                                (routie2 === '/more') ? (<Link to={routie2} state={{
                                                                                    tableHead : tableHead,
                                                                                    data : company,
                                                                                    title : "More On House Data"
                                                                                }} > {company[head]} </Link>) : (<Link to={routie2} state={{
                                                                                    url : company['address'],
                                                                                    headerType : 'house',
                                                                                    title : "More On House Data"
                                                                                }} > {company[head]} </Link>)
                                                                            ) : (
                                                                                ( head === 'roomsNeeded' || head === "budget" ) ?
                                                                                 ( company[head].toString() ) : 
                                                                                 ( company[head] )
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </TableCell>
                                                ))
                                            }
                                            <TableCell >
                                            {
                                                paid ? (
                                                        (focus === "MoreOnHouse") ? (
                                                        <div>
                                                            <Button onClick={() => moreOfData(tableHead, company, "More On A House")} variant="contained" size="small" color="primary" mt={5} >More On House </Button>
                                                            {   
                                                                getLevel === 'CLIENT' ? (
                                                                    <Button onClick={() => shortList(company)} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >ShortList </Button>
                                                                ) : (
                                                                    null
                                                                )
                                                            }
                                                        </div>
                                                        ) : (
                                                        (focus === "housesByAgent") ? (
                                                            <Button onClick={() => onClick(company)} variant="contained" size="small" color="primary" mt={5} >Houses By Agent </Button>
                                                        ) : (
                                                            (focus === "MoreOnClient") ? (
                                                                <Button onClick={() => navigate("/showHouses")} variant="contained" size="small" color="primary" mt={5} >More On House ShortListed </Button>
                                                            ) : (
                                                                (focus === "shortList") ? (
                                                                    
                                                                        getLevel === "CLIENT" ? (
                                                                            <Button onClick={() => takeHouse(company.address)} variant="contained" size="small" color="primary" mt={5} >Confirm</Button>
                                                                        ) : (
                                                                            <Button onClick={() => moreOfData(tableHead, company, "More On ShortList")} variant="contained" size="small" color="primary" mt={5} >More On ShortList</Button>
                                                                        )
                                                                ) : (
                                                                    (focus === "Requirements") ? (
                                                                        <div>
                                                                            <Button onClick={() => openRecoAndSetData(company)}  variant="contained" size="small" color="primary" mt={5} >Recommend</Button>
                                                                            <Button onClick={() => moreOfData(tableHead, company, "More On Prerequisities")} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >View Requirement</Button>
                                                                        </div>
                                                                    ) : (
                                                                        (focus === "Recommend") ? (
                                                                            <div>
                                                                                <Button onClick={() => selectHouseToReco(company)}  variant="contained" size="small" color="primary" mt={5} endIcon={<RecommendIcon />} >Select</Button>
                                                                                <Button onClick={() => moreOfDataNoTHead("house", company.address, "More On A House")} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >More On House</Button>
                                                                            </div>
                                                                        ) : (
                                                                            (focus === "Recommended") ? (
                                                                                <div>
                                                                                    {
                                                                                        (getLevel === 'CLIENT') ? (<Button onClick={() => shortList(company)}  variant="contained" size="small" color="primary" mt={5} endIcon={<RecommendIcon />} >ShortList</Button>) : ( null)
                                                                                    }
                                                                                    <Button onClick={() => moreOfDataNoTHead("house", company.address, "More On Reccommended House")} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >More On House</Button>
                                                                                </div>
                                                                            ) : (
                                                                                <Button onClick={() => openSetNumRooms(company.address)} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >Bring To Market</Button>
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    ) : (
                                                        null
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination 
                        rowsPerPageOptions={[5, 10, 20]}
                        rowsPerPage={rowsPerpage}
                        page={page}
                        count={dataLength}
                        component={"div"}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowChange}
                    >
                    </TablePagination>
                </div>
            </Paper>
            <Paper sx={{margin : '1%', display : { xs : 'block', sm:'none'  }, marginLeft : { xs : '150px'}}}>
                {/* {
                    canDownload ? (
                        <Button onClick={() =>console.log("download")} variant="contained" endIcon={<DownloadForOfflineIcon />}>
                            Download Data
                        </Button>
                    ) : (
                        null
                    )
                } */}
                {
                    dat.map((note) => (
                        <SmallScreenCard header={h} takeHouse={takeHouse} shortList={shortList} openNum={openNum} setnumRooms={setnumRooms} numRoomsToTake={numRoomsToTake}
                            returnToMarket={returnToMarket} openSetNumRooms={openSetNumRooms} numRooms={numRooms} link3={link3} openNumForRooms={openNumForRooms}
                            moreOfDataNoTHead={moreOfDataNoTHead} routie={routie} routie2={routie2} getLevel={getLevel} runShortList={runShortList} paid={paid}
                            link2={link2} link={link} onClick={onClick} user={user} moreOfData={moreOfData} setopenNum={setopenNum} setnumRoomsToTake={setnumRoomsToTake}
                            tableHead={tableHead} note={note} focus={focus} tableHeaderForMore={tableHeaderForMore} setopenNumForRooms={setopenNumForRooms} />
                    ))
                }
            </Paper>
            <AddNum numRooms={numRooms} returnToMarket={returnToMarket} openNum={openNum}
                setnumRooms={setnumRooms} setopenNum={setopenNum} title={title} />
            <AddNum numRooms={numRoomsToTake} returnToMarket={runShortList} openNum={openNumForRooms}
                setnumRooms={setnumRoomsToTake} setopenNum={setopenNumForRooms} title={title} />
            
        </Box>
    )
}

export default CreateTable