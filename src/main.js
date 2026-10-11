import { fetchRates } from './api.js';
import { saveExpenses, setExpenseCategory, state } from './state.js';
import { render } from './ui.js';

const form = document.querySelector('#expense-form');
const formMessage = document.querySelector('#form-message');

async function loadRates() {
  state.rates = null;
  state.rateUpdatedAt = null;
  state.rateError = null;
  render(state);
  try {
    const result = await fetchRates(state.homeCurrency);
    state.rates = result.rates;
    state.rateUpdatedAt = result.updatedAt;
  } catch (error) {
    state.rateError = error instanceof Error ? error.message : 'Could not load exchange rates.';
  }
  render(state);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const amount = Number(data.get('amount'));
  if (!Number.isFinite(amount) || amount <= 0) {
    formMessage.textContent = 'Add an amount greater than zero.';
    return;
  }
  const expense = { id: crypto.randomUUID(), description: String(data.get('description')).trim(), amount, currency: String(data.get('currency')), category: String(data.get('category')), createdAt: new Date().toISOString() };
  if (!expense.description) {
    formMessage.textContent = 'Add a short note for this expense.';
    return;
  }
  saveExpenses([...state.expenses, expense]);
  form.reset();
  formMessage.textContent = '';
  render(state);
  document.querySelector('#description').focus();
});

document.querySelector('#home-currency').addEventListener('change', (event) => {
  state.homeCurrency = event.target.value;
  loadRates();
});
document.querySelector('#refresh-rates').addEventListener('click', loadRates);
document.querySelector('#category-filter').addEventListener('change', (event) => {
  state.filter = event.target.value;
  render(state);
});
document.querySelector('#expense-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-delete]');
  if (!button) return;
  saveExpenses(state.expenses.filter((expense) => expense.id !== button.dataset.delete));
  render(state);
});
document.querySelector('#expense-list').addEventListener('change', (event) => {
  const select = event.target.closest('[data-category]');
  if (!select) return;
  setExpenseCategory(select.dataset.category, select.value);
  render(state);
});

render(state);
loadRates();
