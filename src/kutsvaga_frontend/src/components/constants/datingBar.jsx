import * as React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Box } from '@mui/material';

export default function DatingBar({value, setValue, title,sx}) {

  return (
    <Box sx={{marginLeft:'1%'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
                <DateField required sx={sx} label={title} value={value} onChange={(newValue) => setValue(newValue)} />
            </DemoContainer>
        </LocalizationProvider>
    </Box>
  );
}