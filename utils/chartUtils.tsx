import { TooltipItem } from 'chart.js';

export const getChartConfig = (data: Array<[number, number, (string | number)[]]>, dataUser: Array<[number, number, number, number, number]>) => {
  const labels = data.map((item) => item[0] + '/' + (item[1] + 1)).reverse();
  const prices = dataUser.map((item) => item[3]);
  const dataUserPrices = dataUser.map((item) => item[2]);
  const performance = dataUser.map((item) => item[4]);

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
          label: 'Monto Invertido',
          data: prices,
          borderColor: btcColor,
          backgroundColor: btcBackgroundColor,
        },
        {
          label: 'Valor Portafolio',
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
          text: 'DCA Crypto Calculadora'
        },
        tooltip: {
          callbacks: {
            label: function(context: TooltipItem<'line'>) {
              const label = context.dataset.label || '';
              let labelLine = '';

              if (label) {
                labelLine = label + ': ';
              }
              if (context.parsed.y !== null) {
                labelLine += new Intl.NumberFormat().format(context.parsed.y);
              }

              const perfValue = performance[context.dataIndex];
              const performanceLine = `Performance del portafolio hasta la fecha: ${Number(perfValue.toFixed(2)) > 0 ? `+${perfValue.toFixed(2)}%` : `${perfValue.toFixed(2)}%`}`;

              return [labelLine, performanceLine];
            }
          }
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
