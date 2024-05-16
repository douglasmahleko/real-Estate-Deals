import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBar({sx, title, value, onChange, values}) {

  return (
    <Box sx={sx} >
      <FormControl required fullWidth>
        <InputLabel id="demo-simple-select-label"> {title} </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={title}
          error={value.length===0}
          onChange={onChange}
        >
            {
                values.map((val) => (
                    <MenuItem value={val}>{val}</MenuItem>
                ))
            }
        </Select>
      </FormControl>
    </Box>
  );
}