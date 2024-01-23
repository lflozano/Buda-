import { describe, it, expect } from 'vitest';
import { calculateInvestment } from '../services/calculateInvestment';

describe('calculateInvestment function', () => {
  it('calculates final investment and total investments correctly', () => {
    const data: [number, number, (string | number)[]][] = [
        [2024, 0, ["1704065295084", "0.08000317", "37504048.05", "sell", 7804493]],
        [2023, 11, ["1701388653968", "0.0038318", "32851332.0", "sell", 7688071]],
        [2023, 10, ["1698796482937", "0.00031478", "31299159.9", "buy", 7675140]],
      ];
      const initialInvestment = 100;

    const { finalInvestment, totalInvestments } = calculateInvestment(data, initialInvestment);

    expect(finalInvestment).toBe(333.98740392872327);
    expect(totalInvestments).toEqual([[2023, 10, 100, 100, 0], [2023, 11, 204.9591524168429, 200, 2.4795762084214523], [2024, 0, 333.98740392872327, 300, 11.329134642907746]]);
  });
});
