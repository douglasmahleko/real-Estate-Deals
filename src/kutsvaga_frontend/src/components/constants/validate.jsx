import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, TextField, Typography } from "@mui/material"
import CommonButton from './commonButton';

const Validate = ({ result, handleClickBar, setdone, open, setopen, title}) => {
  const [confirm, setconfirm] = useState('')
  const confirmEmail = () => {
    if(result === confirm.toUpperCase()){
        handleClickBar('Email was confirmed successfully', 'success')
        setdone(true)
    }else{
        handleClickBar('Cannot confirm email successfully', 'error')
        setdone(false)
    }
  }
  return (
    <Dialog open={open} fullWidth maxWidth="sm" sx={{marginLeft :{ xs:'150px'}}}>
                <DialogTitle>
                    <Typography variant="span">
                        {title}
                    </Typography>
                    <br/>
                    <Tooltip title='close'>
                        <IconButton onClick={() => setopen(!open)} style={{float:'right'}}>
                            <CloseIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <form style={{ margin: '1%' }}>
                        <Stack>
                            <TextField sx={{margin:'1%'}} required error={confirm.length===0} variant="outlined" value={confirm} onChange={(e) => setconfirm(e.target.value)} label="Confirmation Text" />
                            <CommonButton sx={{ width:'60%', marginLeft:'15%'}} onClick={confirmEmail} variant="contained" type="submit"> Submit </CommonButton>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
  );
};
export default Validate