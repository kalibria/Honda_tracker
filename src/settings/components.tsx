import { useField } from 'formik';
import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { IBasicTextFields, ISwitchesGroup } from 'src/settings/types';

export const SwitchesGroup: React.FC<ISwitchesGroup> = ({
  note1,
  note2,
  title,
  isCreatedFieldName,
  isChangedFieldName,
}) => {
  const [isCreatedField] = useField({
    name: isCreatedFieldName,
    type: 'radio',
  });

  const [isChangedField] = useField({
    name: isChangedFieldName,
    type: 'radio',
  });

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      className={'self-center'}>
      <>
        <FormLabel component="legend">{title}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isChangedField.value}
                onChange={isCreatedField.onChange}
                name={note1}
              />
            }
            label={note1}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isCreatedField.value}
                onChange={isChangedField.onChange}
                name={note2}
              />
            }
            label={note2}
          />
        </FormGroup>
      </>
    </FormControl>
  );
};

export const BasicTextFields: React.FC<IBasicTextFields> = ({
  label,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <TextField
      id="standard-basic"
      label={label}
      variant="standard"
      {...field}
      {...props}
      // value={placeWhereCar}
    />
  );
};
