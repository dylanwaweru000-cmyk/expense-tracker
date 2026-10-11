const STORAGE_KEY = 'elsewhere-expenses-v1';

function readExpenses() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export const state = { expenses: readExpenses(), rates: null, homeCurrency: 'KES', filter: 'all', rateUpdatedAt: null, rateError: null };

export function saveExpenses(expenses) {
  state.expenses = expenses;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    // Keep the in-memory session usable when browser storage is unavailable.
  }
}

export function setExpenseCategory(id, category) {
  const updated = state.expenses.map((expense) => expense.id === id ? { ...expense, category } : expense);
  saveExpenses(updated);
}
