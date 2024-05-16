import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Paper, makeStyles } from '@material-ui/core'
import { Button } from '@mui/material';
import { blue, green, pink, yellow } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import RecommendIcon from '@mui/icons-material/Recommend';
import { useNavigate, Link  } from "react-router-dom";
import AddNum from './addNum';

const useStyles = makeStyles({
    avatar:{
        backgroundColor: (note) => {
            if(note.category === "work"){
                return yellow[700]
            }
            if(note.category === "money"){
                return green[500]
            }
            if(note.category === "todos"){
                return pink[500]
            }
            return blue[500]
        }
    }
})

function SmallScreenCard({note, setopenNum, title, paid, runShortList, setnumRoomsToTake, setopenNumForRooms, openNumForRooms, numRoomsToTake, numRooms, header, focus, moreOfDataNoTHead, openSetNumRooms, link3, shortList, setnumRooms, openNum, returnToMarket, takeHouse, onClick, link, getLevel, link2, routie, routie2, tableHead, tableHeaderForMore, user, moreOfData}){ 
    const classes = useStyles(note)
    const navigate = useNavigate()
    return(
        <Paper sx={{margin:'1%', marginLeft :{ xs:'150px'}}}>
            <Card elevation={1}>
                <CardContent sx={{margin:'1%', marginLeft :{ xs:'150px'}}}>
                    <TableContainer>
                            <Table>
                                <TableBody>
                                    {
                                        header.map((head) => (
                                            <TableRow>
                                                <TableCell> {head} </TableCell>
                                                <TableCell > 
                                                    {
                                                        paid ? ( ( head === link ) ? (
                                                                    ( routie === 'more' ) ? (<Link to={routie} state={{
                                                                            tableHead : tableHead,
                                                                            data : note,
                                                                            title : "More On Client Data"
                                                                        }} > {note[head]} </Link>) : (<Link to={routie} state={{
                                                                                url : note[link],
                                                                                headerType : 'user',
                                                                                title : "More On Client Data"
                                                                        }} > {note[head]} </Link>)
                                                                        ) : (
                                                                        ( head === link2 ) ? (
                                                                            ( routie2 === '/more' ) ? (<Link to={routie2} state={{
                                                                                tableHead : tableHead,
                                                                                data : note,
                                                                                title : "More On Agent Data"
                                                                            }} > {note[head]} </Link>) : (<Link to={routie2} state={{
                                                                                url : note[link2],
                                                                                headerType : 'user',
                                                                                title : "More On Agent Data"
                                                                            }} > {note[head]} </Link>)
                                                                            ) : (
                                                                            ( head === link3 ) ? (
                                                                                ( routie2 === '/more' ) ? (<Link to={routie2} state={{
                                                                                    tableHead : tableHead,
                                                                                    data : note,
                                                                                    title : "More On House Data"
                                                                                }} > {note[head]} </Link>) : (<Link to={routie2} state={{
                                                                                    url : 'address',
                                                                                    headerType : 'house',
                                                                                    title : "More On House Data"
                                                                                }} > {note[head]} </Link>)
                                                                                ) : (
                                                                                ( head === 'roomsNeeded' || head === "budget" ) ? ( 
                                                                                    note[head].toString() 
                                                                                    ) : ( 
                                                                                    note[head] 
                                                                                        )
                                                                                    )
                                                                                )
                                                                            )
                                                                        ) : ( 
                                                                        note[head]
                                                                    )
                                                                }
                                                 </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    <TableRow>
                                    {
                                                paid ? (
                                                        ( focus === "MoreOnHouse") ? (
                                                        <div>
                                                            <Button onClick={() => moreOfData(tableHead, note, "More On A House")} variant="contained" size="small" color="primary" mt={5} >More On House </Button>
                                                            {
                                                                getLevel === 'CLIENT' ? (
                                                                    <Button onClick={() => shortList(note)} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >ShortList </Button>
                                                                ) : (
                                                                    null
                                                                )
                                                            }
                                                        </div>
                                                        ) : (
                                                        (focus === "housesByAgent") ? (
                                                            <Button onClick={() => onClick(note)} variant="contained" size="small" color="primary" mt={5} >Houses By Agent </Button>
                                                        ) : (
                                                            (focus === "MoreOnClient") ? (
                                                                <Button onClick={() => navigate("/showHouses")} variant="contained" size="small" color="primary" mt={5} >More On House ShortListed </Button>
                                                            ) : (
                                                                (focus === "shortList") ? (
                                                                    
                                                                    getLevel === "CLIENT" ? (
                                                                            <Button onClick={() => takeHouse(user.email, note.address)} variant="contained" size="small" color="primary" mt={5} >Confirm</Button>
                                                                        ) : (
                                                                            <Button onClick={() => moreOfData(tableHead, note, "More On ShortList")} variant="contained" size="small" color="primary" mt={5} >More On ShortList</Button>
                                                                        )
                                                                ) : (
                                                                    (focus === "Requirements") ? (
                                                                        <div>
                                                                            <Button onClick={() => onClick()}  variant="contained" size="small" color="primary" mt={5} >Recommend</Button>
                                                                            <Button onClick={() => moreOfData(tableHead, note, "More On Prerequisities")} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >View Requirement</Button>
                                                                        </div>
                                                                    ) : (
                                                                        (focus === "Recommend") ? (
                                                                            <div>
                                                                                <Button onClick={onClick}  variant="contained" size="small" color="primary" mt={5} endIcon={<RecommendIcon />} >Select</Button>
                                                                                <Button onClick={() => moreOfData(tableHeaderForMore, note, "More On A House")} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >More On House</Button>
                                                                            </div>
                                                                        ) : (
                                                                            (focus === "Recommended") ? (
                                                                                <div>
                                                                                    {
                                                                                        (getLevel === 'CLIENT') ? (<Button onClick={onClick}  variant="contained" size="small" color="primary" mt={5} endIcon={<RecommendIcon />} >ShortList</Button>) : ( null)
                                                                                    }
                                                                                    <Button onClick={() => moreOfDataNoTHead("house", note.address, "More On Reccommended House")} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >More On House</Button>
                                                                                </div>
                                                                            ) : (
                                                                                <Button onClick={() => openSetNumRooms(note.address)} sx={{marginLeft:"3px"}} variant="outlined" size="small" color="primary" mt={5} >Bring To Market</Button>
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
                                    </TableRow>
                                </TableBody>
                            </Table>
                    </TableContainer>
                </CardContent>
                <AddNum numRooms={numRooms} openNum={openNum} returnToMarket={returnToMarket}
                        setnumRooms={setnumRooms} setopenNum={setopenNum} title="Add the number of rooms free" />
                <AddNum numRooms={numRoomsToTake} returnToMarket={runShortList} openNum={openNumForRooms}
                        setnumRooms={setnumRoomsToTake} setopenNum={setopenNumForRooms} title={title} />
                <h1>-----------------------------------------------------------------------------------------------------------------------</h1>
            </Card>
                
        </Paper>
    )
}
export default SmallScreenCard