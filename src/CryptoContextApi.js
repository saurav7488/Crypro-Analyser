import React, {useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const myContext=createContext();
const CryptoContextApi = ({children}) => {
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹");
    useEffect(()=>{
         if(currency==='INR') setSymbol('₹');
         else if(currency === 'USD') setSymbol('$');
    },[currency]);
  return (
    <myContext.Provider value={{currency,symbol,setCurrency}}>
       {children}
    </myContext.Provider>
  )
}

export default CryptoContextApi
                                 










export const CryptoState=()=>{
       return(
           useContext(myContext)
       )
}
























