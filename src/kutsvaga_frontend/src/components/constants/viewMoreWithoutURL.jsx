import React from "react";
import { Box, Button } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BasicCard from "./basicCard";
import Skeleton from '@mui/material/Skeleton';
import { Navigate } from "react-router-dom";
function ViewMoreWithoutURL({tableHead, msg, paid, data1,handleClickSnackBar, user, title1, isAuthenticated}){
    const navigate = useNavigate()
    const h = []
    tableHead.forEach((th) => (
            h.push(th.id)
        ))
        const getHead = () => {
            return(
              <Box sx={{marginLeft:'20%', justifyContent:"center"}}>
                  <Typography variant="h3"> { title1 } </Typography>
              </Box>
            )
          }
        if(msg){
            handleClickSnackBar(msg, 'info')
        }
    const getContent = () => {
        return(
            <Paper sx={{margin:'1%', marginLeft :{ xs:'150px'}}} >
                <div style={{ margin: '1%' }}>
                { data1 != null ? ( <TableContainer>
                        <Table>
                            <TableBody>
                                {
                                    h.map((head) => (
                                        <TableRow>
                                            <TableCell > {head} </TableCell>
                                            <TableCell > { (head === "roomsNeeded" || head === "budget" ) ?
                                                 ( data1[head].toString() ) : ( data1[head] )  } 
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer> ) : (
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {
                                    h.map((head) => (
                                        <TableRow>
                                            <TableCell > {head} </TableCell>
                                            <TableCell > < Skeleton animation="wave" height={50} width="100%" style={{ marginBottom: 6, width:'60%', margin:'1%' }} /> </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    )}
                </div>
                <Button onClick={() => navigate(-1)}> Get Back </Button>
            </Paper>
        )
    }
    return(
        <>
            { isAuthenticated ? ( <BasicCard header={getHead()} content={getContent()} sx={{width:"800px"}} /> ) : ( <Navigate to="/" replace={true} /> )}
        </>
    )
}

export default ViewMoreWithoutURL