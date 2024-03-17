import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const isValidEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

const isValidNumber = (number: string): boolean => {
  return !isNaN(Number(number));
};

const isValidIP = (ip: string): boolean => {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
};

const isValidPath = (path: string): boolean => {
  return /^\/[a-zA-Z0-9-_]+\/$/.test(path);
};

const isUrlA = (path: string): boolean => {
  return /^\/[a-zA-Z0-9-_]+$/.test(path);
};

const isPlainUrl = (str: string): boolean => {
  return /^[a-zA-Z0-9-_]+$/.test(str);
};

interface TextBoxNormalProps {
  id: string;
  label: string;
  helperText: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  notempty?: boolean;
  required?: boolean;
  pwd?: boolean;
  validationType?: 'email' | 'number' | 'prefix' | 'urla' | 'plainurl' | 'ip';
}

const TextBoxNormal: React.FC<TextBoxNormalProps> = ({ id, label, helperText, value, onChange, notempty = false, validationType,required = false, pwd= false}) => {
  const [error, setError] = useState<boolean>(false);
  const [helperTextState, setHelperTextState] = useState<string>(helperText);

  useEffect(() => {
    let isValid = false;
    let errorText = '';

    if (value === '' && notempty) {
      errorText = 'Dieses Feld darf nicht leer sein.';
    } else {
      switch (validationType) {
        case 'email':
          isValid = isValidEmail(value);
          errorText = 'Bitte gib eine gültige E-Mail-Adresse ein.';
          break;
        case 'number':
          isValid = isValidNumber(value);
          errorText = 'Bitte gib eine gültige Zahl ein.';
          break;
        case 'prefix':
          isValid = isValidPath(value);
          errorText = 'Ungültiger Prefix. Bitte gib einen gültigen Prefix ein (/v1/).';
          break;
        case 'urla':
          isValid = isUrlA(value);
          errorText = 'Ungültige Url. Bitte gib eine gültige Url ein (/test).';
          break;
        case 'plainurl':
          isValid = isPlainUrl(value);
          errorText = 'Ungültiger Teil-Url. Bitte gib eine gültige Url ein (test), ohne /';
          break;
        case 'ip':
          isValid = isValidIP(value);
          errorText = 'Bitte gib eine gültige IP-Adresse ein.';
          break;
        default:
          isValid = true;
          break;
      }
    }

    setError(!isValid);
    setHelperTextState(!isValid ? errorText : helperText);
  }, [value, validationType, helperText, notempty]);

  return (
    <TextField

      id={id}
      label={label}
      variant="outlined"
      fullWidth
        type={pwd ? "password" : "text"}
      error={error}
      helperText={helperTextState}
      value={value}
      onChange={onChange}
        required={required}
     
    />
  );
};

export default TextBoxNormal;
