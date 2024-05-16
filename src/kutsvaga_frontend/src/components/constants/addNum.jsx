import React, { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, TextField, Typography } from "@mui/material"
import CommonButton from './commonButton';

export default function AddNum({ numRooms, setnumRooms, returnToMarket, openNum, setopenNum, title}){
    return(
        <Dialog open={openNum} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="span">
                        {title}
                    </Typography>
                    <br/>
                    <Tooltip title='close'>
                        <IconButton onClick={() => setopenNum(!openNum)} style={{float:'right'}}>
                            <CloseIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <form style={{ margin: '1%' }}>
                        <Stack>
                            <TextField sx={{margin:'1%'}} required type='number' error={numRooms.length===0} variant="outlined" value={numRooms} onChange={(e) => setnumRooms(e.target.value)} label="Number of free Rooms" />
                            <CommonButton sx={{ width:'60%', marginLeft:'15%'}} onClick={returnToMarket} variant="contained" type="submit"> Submit </CommonButton>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
    )
}