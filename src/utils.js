export function convertAmount(amount, sourceCurrency, homeCurrency, rates) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return null;
  if (sourceCurrency === homeCurrency) return value;
  const rate = rates?.[sourceCurrency];
  if (!Number.isFinite(rate) || rate <= 0) return null;
  return value / rate;
}

export function calculateTotal(expenses, homeCurrency, rates) {
  return expenses.reduce((total, expense) => {
    const converted = convertAmount(expense.amount, expense.currency, homeCurrency, rates);
    return converted === null ? total : total + converted;
  }, 0);
}

export function filterExpenses(expenses, category) {
  return category === 'all' ? [...expenses] : expenses.filter((expense) => expense.category === category);
}
