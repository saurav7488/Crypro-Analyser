import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./api/Api";
import { CryptoState } from "../CryptoContextApi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency, symbol } = CryptoState();
  const fetchcoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchcoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Monserrat" }}
        >
          Today's Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search Cryptocurrency"
          variant="outlined"
          style={{ width: "100vh", marginBottom: 15 }}
          value={search}
          onChange={searchChange}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "tomato" }} />
          ) : (
            <>
              <Table>
                <TableHead style={{ backgroundColor: "tomato" }}>
                  <TableRow>
                    <TableCell>Coins</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">24h Change</TableCell>
                    <TableCell align="right">Market Cap</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch().map((coin) => {
                    const profit = coin.price_change_percentage_24h;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${coin.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          <img
                            src={coin.image}
                            height="80"
                            style={{ marginBottom: 10 }}
                            alt={coin.name}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: 20,
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {coin.symbol}
                            </span>
                            <span style={{ color: "grey" }}>{coin.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              color: "white",
                              textDecoration: "none",
                              marginBottom: 10,
                              fontSize: 22,
                              fontWeight: 500,
                            }}
                          >
                            {symbol}&nbsp;
                            {coin.current_price.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ color: profit > 0 ? "green" : "red" }}
                          align="right"
                        >
                          {coin.market_cap_change_percentage_24h}
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}{coin.market_cap}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;
