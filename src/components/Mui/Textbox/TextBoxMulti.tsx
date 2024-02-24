import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface TextBoxMultiProps {
    label: string;
    helperText?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    rows?: number;
}

const TextBoxMulti: React.FC<TextBoxMultiProps> = ({
  label,
  helperText,
  value,
  onChange,
  rows,
  ...textFieldProps
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      multiline
      rows={rows}
      helperText={helperText}
      value={value}
      onChange={onChange}
      {...textFieldProps}
    />
  );
};

export default TextBoxMulti;
