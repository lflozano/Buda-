import React from 'react';

interface InvestmentFormProps {
  initialInvestment: number;
  finalInvestment: number;
  setInitialInvestment: (amount: number) => void;
  onCalculate: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ initialInvestment, finalInvestment, setInitialInvestment, onCalculate }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="mb-4">
        <p>Dinero Inicial: {initialInvestment} CLP</p>
        <input 
          type="number"
          className="p-2 border rounded w-full"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(parseInt(e.target.value) || 0)}
        />
      </div>
      <button className="h-10 px-6 mb-4 font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 w-full" onClick={onCalculate}>
        Calcular Inversión Mensual
      </button>
      <p>Dinero Final: {finalInvestment} CLP</p>
    </div>
  );
};

export default InvestmentForm;
