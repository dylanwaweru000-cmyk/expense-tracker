import { calculateTotal, convertAmount, filterExpenses } from './utils.js';

const money = (amount, currency) => new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);

export function render(state) {
  const total = calculateTotal(state.expenses, state.homeCurrency, state.rates);
  document.querySelector('#total-amount').textContent = state.rates ? money(total, state.homeCurrency) : '—';
  document.querySelector('#expense-count').textContent = `${state.expenses.length} ${state.expenses.length === 1 ? 'ENTRY' : 'ENTRIES'}`;
  document.querySelector('#list-count').textContent = `(${filterExpenses(state.expenses, state.filter).length})`;
  const status = document.querySelector('#rate-status');
  status.classList.toggle('error', Boolean(state.rateError));
  status.innerHTML = `<span class="status-dot"></span>${state.rateError ? 'Rates unavailable · showing saved entries' : state.rates ? `Rates updated ${state.rateUpdatedAt ? new Date(state.rateUpdatedAt).toLocaleDateString() : 'just now'}` : 'Getting the latest exchange rate…'}`;

  const visible = filterExpenses(state.expenses, state.filter);
  const list = document.querySelector('#expense-list');
  list.replaceChildren(...visible.map((expense) => {
    const converted = state.rates ? convertAmount(expense.amount, expense.currency, state.homeCurrency, state.rates) : null;
    const row = document.createElement('article');
    row.className = 'expense-row';
    const detail = document.createElement('div');
    const description = document.createElement('div');
    description.className = 'expense-description';
    description.textContent = expense.description;
    const meta = document.createElement('div');
    meta.className = 'expense-meta';
    const category = document.createElement('select');
    category.className = 'category-tag';
    category.dataset.category = expense.id;
    category.setAttribute('aria-label', `Change category for ${expense.description}`);
    for (const name of ['Food', 'Transport', 'Stay', 'Shopping', 'Activities', 'Other']) {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      option.selected = name === expense.category;
      category.append(option);
    }
    const date = document.createElement('span');
    date.textContent = new Date(expense.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    meta.append(category, document.createTextNode('·'), date);
    detail.append(description, meta);
    const values = document.createElement('div');
    values.className = 'expense-values';
    const original = document.createElement('span');
    original.className = 'original-value';
    original.textContent = money(Number(expense.amount), expense.currency);
    values.append(original);
    if (converted !== null) {
      const homeValue = document.createElement('span');
      homeValue.className = 'converted-value';
      homeValue.textContent = `≈ ${money(converted, state.homeCurrency)}`;
      values.append(homeValue);
    } else {
      const unavailable = document.createElement('span');
      unavailable.className = 'converted-value';
      unavailable.textContent = 'Rate unavailable';
      values.append(unavailable);
    }
    const remove = document.createElement('button');
    remove.className = 'delete-button';
    remove.type = 'button';
    remove.dataset.delete = expense.id;
    remove.setAttribute('aria-label', `Delete ${expense.description}`);
    remove.textContent = '×';
    row.append(detail, values, remove);
    return row;
  }));
  document.querySelector('#empty-state').hidden = visible.length > 0;
}
