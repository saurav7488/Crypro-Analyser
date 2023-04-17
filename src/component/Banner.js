import React from 'react'
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Tcoins from './Tcoins';
const Banner = () => {
  const MyComponent = styled('Container')({
    backgroundImage:'url(./images.jpg)',
    display:'flex',
    flexDirection:'column',
    padding:25,
    justifyContent:'space-around',
    height:'70vh',
  });
  const Component = styled('div')({
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    textAlign:'center',

  });
  return (
    <>
    <MyComponent>
         <Component>
            <Typography
               variant="h2"
               style={{
                  fontWeight:"bold",
                  marginBottom:15,
                  fontFamily:"sans-serif",
                  
               }}
            >
                 Crypto Analyser
            </Typography>
            <Typography
               variant='subtitles2'
               style={{
                  color:"darkgrey",
                  textTransform:"capitalize",
                  fontFamily:"Montserrat"
               }}
            >
                Get all the Info regarding Your favourite Crypto Currency
            </Typography>
            </Component>
            <Tcoins/>
    </MyComponent>
    </>
  )
}

export default Banner
