import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ISwitchesGroup } from 'src/settings/types';

export const SwitchesGroup: React.FC<ISwitchesGroup> = ({
  note1,
  note2,
  title,
  ...props
}) => {
  const [state, setState] = React.useState({
    note1: true,
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
