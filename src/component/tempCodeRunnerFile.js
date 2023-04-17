import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from './api/Api';
import { CryptoState } from '../CryptoContextApi';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import TextField from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const CoinTable = () => {
       const [coins,setCoins]=useState([]);
       const [loading,setLoading]=useState();
       const {currency}=CryptoState();
       const fetchcoins= async ()=>{
            setLoading(true);
            const {data}=await axios.get(CoinList(currency));
            setLoading(false);
            console.log(data);
       }
       useEffect(()=>{
           fetchcoins();
       },[currency])
  return (
    <ThemeProvider theme={darkTheme}>
       <Container style={{textAlign:'center'}}>
          <Typography
             variant='h4'
             style={{margin:18,fontFamily:'Monserrat'}}
          >
               Today's Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField label="Search Cryptocurrency" variant="outlined" />
       </Container>
    </ThemeProvider>
  )
}

export default CoinTable
