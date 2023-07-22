import React from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Icon,
} from "@mui/material";

const Input = ({ half, name, label, autoFocus, type, handleChange }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
      />
    </Grid>
  );
};

export default Input;
