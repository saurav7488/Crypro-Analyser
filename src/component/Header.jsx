import { AppBar, Toolbar, Select,MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react'
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContextApi';
const darkTheme = createTheme({
     palette: {
       mode: 'dark',
     },
   });
export default function Header() {
     const history=useNavigate();
     const {currency,setCurrency}=CryptoState();
     const MyComponent = styled('div')({
          color: 'tomato',
          fontWeight:'bold',  
          cursor:'pointer',
        });
  return (
     <ThemeProvider theme={darkTheme}>
     <AppBar color='transparent' position='static'>
     {/* Container used to make responsive*/}
     <MyComponent>
             <Toolbar>
                  <Typography
                     variant="h6"
                    style={{
                  fontWeight:"bold",
                  fontFamily:"sans-serif",
                    }}
                   onClick={()=>history("/")}> {/* typography used for writing something */}
                       Crypto-Analyser
                  </Typography>
                  
                  <Select variant='outlined' style={{
                      widht:50,
                      height:40,
                      marginLeft:900,
                      display:'flex',

                  }}
                  value={currency}
                  onChange={(e)=>setCurrency(e.target.value)}
                  >
                      <MenuItem value={'USD'}>USD</MenuItem>
                      <MenuItem value={'INR'}>INR</MenuItem>
                  </Select>
             </Toolbar>
        </MyComponent>
     </AppBar>
     </ThemeProvider>    
  )
}
