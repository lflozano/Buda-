import { useEffect, useRef, useState } from 'react';
import { getChartConfig } from '../utils/chartUtils';
import Chart, { ChartConfiguration, Chart as ChartType } from 'chart.js/auto';
import DateForm from '../components/DateForm';
import InvestmentForm from '../components/InvestmentForm';
import { calculateInvestment } from '../services/calculateInvestment';
import fetchData from '../services/fetchData';

const App = () => {
  const [data, setData] = useState<Array<[number, number, (string | number)[]]>>([]);
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const chartContainer = useRef(null);
  const chartInstance = useRef<ChartType | null>(null);
  const [finalInvestment, setFinalInvestment] = useState<number>(0);
  const [totalInvestments, setTotalInvestments] = useState<Array<[number, number, number, number, number]>>([]);
  const [initialInvestment, setInitialInvestment] = useState<number>(0);

  const handleCalculateInvestment = () => {
    const { finalInvestment, totalInvestments } = calculateInvestment(data, initialInvestment);
    setFinalInvestment(finalInvestment);
    setTotalInvestments(totalInvestments);
  };

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await fetchData(initialDate, finalDate);
      setData(prices);
    };

    fetchPrices();
  }, [initialDate, finalDate]);

  useEffect(() => {
    if (data.length > 0 && chartContainer.current) {
      const chartConfig = getChartConfig(data, totalInvestments);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, chartConfig as ChartConfiguration<'line', number[], string>);
    }
  }, [data, totalInvestments]);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:p-6 md:py-10 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col justify-center mb-6">
          <h1 className="text-4xl font-bold mb-4 text-center">Buda DCA</h1>
          <div className="grid md:grid-cols-2 gap-4">
            <DateForm
              initialDate={initialDate}
              finalDate={finalDate}
              setInitialDate={setInitialDate}
              setFinalDate={setFinalDate}
            />
            <InvestmentForm
              initialInvestment={initialInvestment}
              finalInvestment={finalInvestment}
              setInitialInvestment={setInitialInvestment}
              onCalculate={handleCalculateInvestment}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <canvas ref={chartContainer} className="w-full" />
        </div>
      </div>
    </div>
  );  
}

export default App;
