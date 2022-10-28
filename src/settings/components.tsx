import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IBasicTextFields, ISwitchesGroup } from 'src/settings/types';

export const SwitchesGroup: React.FC<ISwitchesGroup> = ({
  note1,
  note2,
  title,
  ...props
}) => {
  const [state, setState] = React.useState({
    note1: false,
    note2: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{title}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.note1}
              onChange={handleChange}
              name="note1"
            />
          }
          label={note1}
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.note2}
              onChange={handleChange}
              name="note2"
            />
          }
          label={note2}
        />
      </FormGroup>
    </FormControl>
  );
};

export const BasicTextFields: React.FC<IBasicTextFields> = ({ label }) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
      <TextField id="standard-basic" label={label} variant="standard" />
    </Box>
  );
};
