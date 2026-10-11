import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotal, convertAmount, filterExpenses } from '../src/utils.js';

const rates = { USD: 1, EUR: 0.92, KES: 129.5 };
const expenses = [
  { amount: 10, currency: 'USD', category: 'Food' },
  { amount: 9.2, currency: 'EUR', category: 'Food' },
  { amount: 1295, currency: 'KES', category: 'Transport' },
];

test('converts from a non-home currency using home-base rates', () => {
  assert.ok(Math.abs(convertAmount(9.2, 'EUR', 'USD', rates) - 10) < 1e-10);
});
test('same-currency conversion is unchanged', () => {
  assert.equal(convertAmount(0, 'KES', 'KES', rates), 0);
});
test('missing or invalid rates return null', () => {
  assert.equal(convertAmount(10, 'GBP', 'USD', rates), null);
  assert.equal(convertAmount(10, 'EUR', 'USD', { EUR: 0 }), null);
});
test('totals skip expenses that cannot be converted', () => {
  assert.equal(calculateTotal(expenses, 'USD', rates), 30);
  assert.equal(calculateTotal([...expenses, { amount: 4, currency: 'GBP' }], 'USD', rates), 30);
});
test('category filter returns matching expenses and all returns a copy', () => {
  assert.equal(filterExpenses(expenses, 'Food').length, 2);
  const all = filterExpenses(expenses, 'all');
  assert.deepEqual(all, expenses);
  assert.notEqual(all, expenses);
});
test('non-numeric amounts do not produce invalid totals', () => {
  assert.equal(convertAmount('not-money', 'USD', 'USD', rates), null);
});
