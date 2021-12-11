import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";

interface PriceProps {
  coinId: string;
}

const PriceSection = styled.ul`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 10px;
  li {
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
  }
  li h5 {
    width: 60%;
  }
`;

const PriceValue = styled.span<{ isActive?: boolean }>`
  font-size: 20px;
  color: ${(props) => (props?.isActive ? "rgb(255, 0, 0)" : "rgb(0, 217, 100)")};
`;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {
    refetchInterval: 5000,
  });
  return (
    <PriceSection>
      <li>
        <h5>price :</h5>
        <PriceValue>${tickersData?.quotes.USD.price.toFixed(3)}</PriceValue>
      </li>
      <li>
        <h5>Max Change rate in last 24h :</h5>
        <PriceValue isActive={tickersData!.quotes.USD.market_cap_change_24h < 0}>{tickersData?.quotes.USD.market_cap_change_24h}%</PriceValue>
      </li>
      <li>
        <h5>Change rate (last 30 Minutes) :</h5>
        <PriceValue isActive={tickersData!.quotes.USD.percent_change_30m < 0}>{tickersData?.quotes.USD.percent_change_30m}%</PriceValue>
      </li>
      <li>
        <h5>Change rate (last 1 hours) :</h5>
        <PriceValue isActive={tickersData!.quotes.USD.percent_change_1h < 0}>{tickersData?.quotes.USD.percent_change_1h}%</PriceValue>
      </li>
      <li>
        <h5>Change rate (last 12 hours) :</h5>
        <PriceValue isActive={tickersData!.quotes.USD.percent_change_12h < 0}>{tickersData?.quotes.USD.percent_change_12h}%</PriceValue>
      </li>
      <li>
        <h5>Change rate (last 24 hours) :</h5>
        <PriceValue isActive={tickersData!.quotes.USD.percent_change_24h < 0}>{tickersData?.quotes.USD.percent_change_24h}%</PriceValue>
      </li>
    </PriceSection>
  );
};

export default Price;
