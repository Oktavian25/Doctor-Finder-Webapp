import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownSelector({value, onChange, desktopWidth,mobileWidth,specializations}) {

  const desktopWidthFinal = desktopWidth+28;
  const mobileWidthFinal = mobileWidth+28;

  return (
    <FormControl sx={{ 
      margin:"8px 0", 
      width: desktopWidthFinal + "px",
      "@media (max-width: 600px)": {
        width: desktopWidthFinal + "px",
      }
      }} >
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        sx={{height:36, padding:"8px 12px"}}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="" sx={{color:"red"}}>
          Unselected
        </MenuItem>
        {
          specializations.map(spec => (
            <MenuItem key={spec.id} value={spec.id}>
              {spec.name}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}