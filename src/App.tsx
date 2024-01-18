import React, { useEffect, useState } from 'react';
import axios from 'axios';



const date = new Date();
const unixTimestamp = Math.floor(date.getTime() / 1000);

function startOfMonth(date: Date)
  {
     
   return new Date(date.getFullYear(), date.getMonth(), 1);
 
  }

const dt = new Date(); 

console.log(startOfMonth(dt).toString());

const App = () => {
  const url = 'http://localhost:8010/proxy/api/v2/markets/btc-clp/trades';
  const params = {
    'timestamp': 1704110400000,
    'limit': 50,
  };

  const [data, setData] = useState([]);
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')

  const getData = async () => {
    try {
      const response = await axios.get(url, { params });
      console.log(response.data.trades);
      setData(response.data.trades.entries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(initialDate);
    console.log(finalDate);
  }
  , [initialDate, finalDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <header className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">
          Buda DCA
        </h1>
        <p>Fecha de Inicio: </p>
        <input type="date" onChange={(e) => setInitialDate(e.target.value)}></input>
        <p>Fecha de Termino: </p>
        <input type="date" onChange={(e) => setFinalDate(e.target.value)}></input>
        <div className="flex flex-col items-center justify-center">
          {data.map((trade, index) => (
            <div key={index} className="flex flex-row items-center justify-center">
              <p className="text-xl font-bold">{trade[0]}</p>
              <p className="text-xl font-bold">{trade[1]}</p>
              <p className="text-xl font-bold">{trade[2]}</p>
              <p className="text-xl font-bold">{trade[3]}</p>        
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
