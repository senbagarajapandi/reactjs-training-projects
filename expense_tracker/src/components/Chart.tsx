import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartProps } from './interfaces';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Chart: React.FC<ChartProps> = ({ entries }) => {

  const monthlyData = entries.reduce((acc, entry) => {
    const month = entry.date.slice(0, 7);
    
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    
    if (entry.type === 'income') {
      acc[month].income += entry.amount;
    } else {
      acc[month].expense += entry.amount;
    }
    
    return acc;
  }, {} as Record<string, { income: number; expense: number }>); 

  const labels = Object.keys(monthlyData); 
  const incomeData = labels.map((month) => monthlyData[month].income);
  const expenseData = labels.map((month) => monthlyData[month].expense);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Expense',
        data: expenseData,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default Chart;