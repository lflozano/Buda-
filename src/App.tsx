import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getChartConfig } from '../utils/chartUtils';
import Chart, { Chart as ChartType } from 'chart.js/auto';

const App = () => {
  const [data, setData] = useState<Array<[number, number, Array<[]>]>>([]);
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const chartContainer = useRef(null);
  const chartInstance = useRef<ChartType | null>(null);
  const [finalInvestment, setFinalInvestment] = useState<number>(0);
  const [totalInvestments, setTotalInvestments] = useState<Array<[number, number, number]>>([]);
  const [initialInvestment, setInitialInvestment] = useState<number>(0);

  const handleCalculateInvestment = () => {
    let acumulateInvestment = 0;
    const totalInvestment = [] as Array<[number, number, number]>;
  
    for (let i = 0; i < data.length; i++) {
      console.log("data: ", data);
      const priceData = data[i][2][2];
      const price = Array.isArray(priceData) ? 0 : parseInt(priceData);
      const amount = initialInvestment / price;
      totalInvestment.push([data[i][0], data[i][1], amount * price])
      acumulateInvestment += amount;
    }
  
    setFinalInvestment(acumulateInvestment * Number(data[data.length - 1][2][2]));
    setTotalInvestments(totalInvestment);
    console.log("totalInvestment: ", totalInvestment);
  };

  const getData = async (url: string, params: { timestamp: number, limit: number }) => {
    try {
      const response = await axios.get(url, { params });
      return response.data.trades.entries[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      const prices = [] as Array<[number, number, Array<[]>]>;

      for (let i = 0; i > -12; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const timestamp = Date.UTC(year, month, day);
        const url = 'http://localhost:8010/proxy/api/v2/markets/btc-clp/trades';
        const params = {
          'timestamp': timestamp,
          'limit': 50,
        };

        const priceData = await getData(url, params);
        if (priceData) {
          prices.push([year, month, priceData]);
        }
      }
      setData(prices);
      console.log(prices);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && chartContainer.current) {
      const chartConfig = getChartConfig(data, totalInvestments);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, chartConfig);
    }
  }, [data, totalInvestments]);

  return (
    <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
        <h1 className="text-4xl font-bold">
          Buda DCA
        </h1>
        <p>Dinero Inicial: {initialInvestment}</p>
        <input 
          type="number" 
          value={initialInvestment} 
          onChange={(e) => setInitialInvestment(parseInt(e.target.value) || 0)}
        />
        <button onClick={handleCalculateInvestment}>Calcular Inversión</button>
        <p>Dinero Final: {finalInvestment}</p>
        <p>Fecha de Inicio: </p>
        <input type="date" onChange={(e) => setInitialDate(e.target.value)}></input>
        <p>Fecha de Termino: </p>
        <input type="date" onChange={(e) => setFinalDate(e.target.value)}></input>
        <div className="flex flex-col items-center justify-center">
          <canvas ref={chartContainer} />
        </div>
      </div>
    </div>
  );
}

export default App;
