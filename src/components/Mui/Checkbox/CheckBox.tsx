import React, { ChangeEvent } from 'react';
import { FormControlLabel, Switch, SwitchProps } from '@mui/material';

interface CheckBoxProps extends SwitchProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange, ...checkboxProps }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          {...checkboxProps}
        />
      }
      label={label}
    />
  );
};

export default CheckBox;
