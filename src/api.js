const API_ROOT = 'https://open.er-api.com/v6/latest/';

export async function fetchRates(baseCurrency) {
  const response = await fetch(`${API_ROOT}${encodeURIComponent(baseCurrency)}`);
  if (!response.ok) throw new Error(`Exchange service returned ${response.status}.`);
  const data = await response.json();
  if (data.result !== 'success' || !data.rates || typeof data.rates !== 'object') {
    throw new Error(data['error-type'] || 'The exchange service returned an unexpected response.');
  }
  return { rates: data.rates, updatedAt: data.time_last_update_utc };
}
