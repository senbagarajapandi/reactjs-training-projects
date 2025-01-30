import { Entry } from './interfaces';

export const calculateTotals = (entries: Entry[]) => {
  const totalIncome = entries
    .filter((entry) => entry.type === 'income')
    .reduce((total, entry) => total + entry.amount, 0);

  const totalExpense = entries
    .filter((entry) => entry.type === 'expense')
    .reduce((total, entry) => total + entry.amount, 0);

  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
};

export const aggregateByMonth = (entries: Entry[]) => {
  const grouped: { [key: string]: number } = {};

  entries.forEach((entry) => {
    const month = new Date(entry.date).toLocaleString('default', { month: 'short' });
    if (!grouped[month]) grouped[month] = 0;
    grouped[month] += entry.amount;
  });

  return grouped;
};