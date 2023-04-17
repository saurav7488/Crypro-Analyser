import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { CryptoState } from "../CryptoContextApi";
import GlobalStyles from "@mui/material/GlobalStyles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const CoinPage = () => {
  const [coin, setCoin] = useState([]);
  const { id } = useParams();
  const { symbol, currency } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;


  return (
    <ThemeProvider theme={darkTheme} >
      <GlobalStyles styles={{ Typography: {marginBottom:10}}} />
      
        <img src={coin?.image?.large} alt={coin?.name} />

        <Typography variant="h3">{coin?.name}</Typography>
        <Typography>{coin?.description?.en.split(". ")[0]}.</Typography>

        <Typography variant="h6">Rank : {coin?.market_cap_rank}</Typography>

        <Typography variant="h6">
          Current Price : {symbol}{" "}
          {coin?.market_data?.current_price[currency.toLowerCase()]}
        </Typography>
        <Typography variant="h6">
          Market Cap : {symbol}{" "}
          {coin?.market_data?.market_cap[currency.toLowerCase()]
            .toString()
            .slice(0, -6)}
        </Typography>
      
    </ThemeProvider>
  );
};

export default CoinPage;
