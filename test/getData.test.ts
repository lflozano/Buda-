import axios from 'axios';
import getData from '../services/getData';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe('getData function', () => {
  it('fetches data successfully from an API', async () => {
    const mockData = {
      data: {
        trades: {
          entries: [[2024, 0, ["1704065295084", "0.08000317", "37504048.05", "sell", 7804493]]]
        }
      }
    };

    mockedAxios.get.mockResolvedValue(mockData);

    const result = await getData('http://localhost:8010/proxy/api/v2/markets/btc-clp/trades', { timestamp: 123456, limit: 50 });
    expect(result).toEqual(mockData.data.trades.entries[0]);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8010/proxy/api/v2/markets/btc-clp/trades', {
      params: { timestamp: 123456, limit: 50 }
    });
  });

  it('handles errors from API', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    try {
      await getData('http://localhost:8010/proxy/api/v2/markets/btc-clp/trades', { timestamp: 123456, limit: 50 });
      throw new Error('Should have thrown an error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    }
  });
});

