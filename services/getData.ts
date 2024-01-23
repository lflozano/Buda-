import axios from 'axios';

const getData = async (url: string, params: { timestamp: number, limit: number }) => {
  try {
    const response = await axios.get(url, { params });
    return response.data.trades.entries[0];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An error occurred while fetching data');
    }
  }
};

export default getData;
