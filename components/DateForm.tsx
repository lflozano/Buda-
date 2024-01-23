import React from 'react';

interface DateFormProps {
  initialDate: string;
  finalDate: string;
  setInitialDate: (date: string) => void;
  setFinalDate: (date: string) => void;
}

const DateForm: React.FC<DateFormProps> = ({ initialDate, finalDate, setInitialDate, setFinalDate }) => {
  const minDate = new Date(1476905551698).toISOString().split('T')[0];
  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col justify-between">
      <div>
        <label className="block mb-2">Fecha de Inicio: {initialDate}</label>
        <input 
          type="date" 
          className="p-2 border rounded mb-4 w-full" 
          onChange={(e) => setInitialDate(e.target.value)} 
          min={minDate}
        />
      </div>
      <div>
        <label className="block mb-2">Fecha de Termino: {finalDate}</label>
        <input 
          type="date" 
          className="p-2 border rounded w-full" 
          onChange={(e) => setFinalDate(e.target.value)}
          max={maxDate}
        />
      </div>
    </div>
  );
};

export default DateForm;
