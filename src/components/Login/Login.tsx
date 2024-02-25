import React, { useState } from 'react';
import { Button, Box, Container, Alert, AlertTitle } from '@mui/material';
import TextBox from '../Mui/Textbox/TextBoxNormal'; 
import logo from '../../assets/Logo.webp';
import './Login.css';
import Footer from '../Footer/Footer'; 
import LoginIcon from '@mui/icons-material/Login';
import LanguageSelector from '../Mui/Language/LanguageSelector';
import GetLng from '../Mui/Language/GetLng'; 

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  statusCode: number;
}

async function loginUser(credentials: Credentials): Promise<LoginResponse> {
  const etoken = '';
  let statusCode = 500;

  if (!credentials.username || !credentials.password) {
    return { token: etoken, statusCode };
  }

  const basicAuthString = 'Basic ' + btoa(credentials.username + ':' + credentials.password);

  let response;
  try {
    response = await fetch(localStorage.getItem('host')! + '/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuthString,
      },
    });
    statusCode = response.status;
  } catch (error) {
    console.error('Error during request: ', error);
    return { token: etoken, statusCode };
  }

  if (!response.ok) {
    return { token: etoken, statusCode };
  }

  const data = await response.json();
  const token = data.token || '';

  console.log('Login ok', data, statusCode);
  return { token, statusCode };
}

function LoginForm() {
  let location = window.location.href;
  if (location.endsWith('/')) {
    location = location.slice(0, -1);
  }
  if (location) {
    if (location.includes('3000')) {
      location = location.replace('3000', '8080');
    }
    if (location.includes('5173')) {
      location = location.replace('5173', '8080');
    }
    if (location.includes('localhost')) {
      location = location.replace('localhost', '127.0.0.1');
    }

    const parts = location.split("/");
    const baseUrl = parts.slice(0, 3).join("/");

    localStorage.setItem('host', baseUrl);
  }
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const divStyle = {
    backgroundImage: `url(${logo})`,
    width: '500px',
    height: '500px',
    backgroundSize: 'cover',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resp = await loginUser({ username: userName, password });
    console.log('Response', resp);
    if (resp.statusCode === 200) {
      console.log('ALL OKAY');
      localStorage.setItem('token', resp.token);
      window.location.replace('/web/dashboard');
    } else {
      console.log('Login Error no Token retrieved!');
      setError(true);
    }
  };

  const handleCloseAlert = () => {
    setError(false);
  };

  return (
    <Container maxWidth="sm">
      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert onClose={handleCloseAlert} severity="error">
            <AlertTitle>Error</AlertTitle>
            {GetLng(4)}
          </Alert>
        </Box>
      )}
      <div style={divStyle}></div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ mb: 2 }}>
            <TextBox
              helperText='Username'
              id="user"
              label={GetLng(1)}
              required={true}
              value={userName}
              
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextBox
              helperText='Password'
              id="pwd"
              label={GetLng(2)}
                            
              value={password}
              required={true}
                pwd={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <LanguageSelector />
          </Box>
          <Button fullWidth variant="contained" type="submit" endIcon={<LoginIcon />}>
            {GetLng(3)}
          </Button>
        </form>
      </Box>
      <Footer></Footer>
    </Container>
  );
}

export default LoginForm;
