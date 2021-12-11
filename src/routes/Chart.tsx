import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const ChartBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
  color: #5e5e5e;
`;

const Chart = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const result = data?.map(item => {
    const x = new Date(item.time_close);
    const y = [item.open.toFixed(2), item.high.toFixed(2), item.low.toFixed(2), item.close.toFixed(2), item.volume.toFixed(2)];
    return {
      x, y
    }
  })

  console.log(result)

  return (
    <ChartBackground>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: result
              }
            ]
          }
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
          }}
        />
      )}
    </ChartBackground>
  );
};

export default Chart;
