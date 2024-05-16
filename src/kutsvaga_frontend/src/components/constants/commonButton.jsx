import React from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function CommonButton({children, color, disabled, size, variant, onClick, sx}){

    return(
        <Button color={color} disabled={disabled} size={size} onClick={onClick} variant={variant} sx={sx}>
            {children}
        </Button>
    )
}export default CommonButton