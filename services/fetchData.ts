import getData from './getData';

function monthDiff(initialDate: Date, finalDate: Date) {
  return finalDate.getMonth() - initialDate.getMonth() + 
    (12 * (finalDate.getFullYear() - initialDate.getFullYear()));
}

const fetchData = async (initialDate: string, finalDate: string) => {
  const startDate = new Date(initialDate);
  const endDate = new Date(finalDate);

  const months = monthDiff(startDate, endDate);
  const prices = [] as Array<[number, number, (string | number)[]]>;

  for (let i = months; i >= 0; i--) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const timestamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const url = 'http://localhost:8010/proxy/api/v2/markets/btc-clp/trades';
    const params = { 'timestamp': timestamp, 'limit': 50 };
    const priceData = await getData(url, params);
    if (priceData) {
      prices.push([date.getFullYear(), date.getMonth(), priceData]);
    }
  }

  return prices;
};

export default fetchData;
