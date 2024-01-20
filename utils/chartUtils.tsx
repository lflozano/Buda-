export const getChartConfig = (data, dataUser): ChartConfiguration<'line'> => {
  const labels = data.map((item) => item[0] + '/' + (item[1] + 1)).reverse();
  const prices = data.map((item) => item[2][2]).reverse();
  
  // Mapeando los precios de dataUser
  const dataUserPrices = dataUser.map((item) => item[2]).reverse();

  // Define los colores para el gráfico
  const btcColor = 'rgba(255, 99, 132, 1)';
  const btcBackgroundColor = 'rgba(255, 99, 132, 0.5)';
  const userColor = 'rgba(99, 255, 132, 1)';
  const userBackgroundColor = 'rgba(99, 255, 132, 0.5)';

  return {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Precio BTC-CLP',
          data: prices,
          borderColor: btcColor,
          backgroundColor: btcBackgroundColor,
        },
        {
          label: 'Inversión Usuario',
          data: dataUserPrices,
          borderColor: userColor,
          backgroundColor: userBackgroundColor,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Precio BTC-CLP por Mes e Inversión Usuario'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
};
