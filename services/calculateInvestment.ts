export const calculateInvestment = (data: Array<[number, number, (string | number)[]]>, initialInvestment: number) => {
    let acumulateInvestment = 0;
    console.log('data', data);
    const totalInvestment = [] as Array<[number, number, number, number, number]>;
    for (let i = data.length - 1; i >= 0; i--) {
      const priceData = data[i][2][2];
      const price = typeof priceData === 'string' ? parseInt(priceData) : 0;
      const amount = price === 0 ? 0 : initialInvestment / price;
      const total = (amount + acumulateInvestment) * price;
      const performance = ((total / (initialInvestment * (data.length - i))) - 1 ) * 100;
      totalInvestment.push([data[i][0], data[i][1], total, initialInvestment * (data.length - i), performance]);
      acumulateInvestment += amount;
    }
    console.log('totalInvestments', totalInvestment);
    console.log('totalInvestment', totalInvestment[data.length - 1][2]);

    return {
      finalInvestment: totalInvestment[data.length - 1][2],
      totalInvestments: totalInvestment
    };
  };
  