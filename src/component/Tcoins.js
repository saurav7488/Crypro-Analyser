import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../CryptoContextApi";
import { TrendingCoins } from "./api/Api";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Tcoins = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrendingcoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingcoins();
         // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = trending.map((coin) => {
    return (
      <Link style={{textDecoration:'none',}} to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ color: "gold", textDecoration: "none", marginBottom: 10 }}
        />
        <br/>
        <span
          style={{ color: "white", textDecoration: "none", marginBottom: 10,
          textTransform:'uppercase',cursor:'pointer',
          alignItems:'center' }}
        >&nbsp;
          {coin.symbol}
        </span>
        <br/>
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
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <AliceCarousel
      mouseTracking
      infinite
      animationDuration={1500}
      responsive={responsive}
      autoPlay
      items={items}
    />
  );
};

export default Tcoins;
