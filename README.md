# Elsewhere — a travel expense tracker

When a trip crosses currencies, even everyday purchases become hard to compare. Elsewhere gives each expense a small, clear place to land: record what you paid and where, then see its live converted value and your running total in a home currency you choose.

**Live demo:** Publish this repository with GitHub Pages, then add the resulting URL here.

## Features

- Log a description, amount, original currency, and category.
- See each original amount beside its converted home-currency value.
- Change the home currency and fetch a fresh set of rates.
- Check the running converted total, filter by category, and delete entries.
- Entries persist in browser storage. Loading and exchange-rate error states stay visible.
- A responsive, quiet travel-journal inspired interface.

## Built with

- HTML and CSS, with JavaScript ES modules (`api`, `state`, `utils`, `ui`, and `main`).
- Live exchange rates from [Open ER API](https://open.er-api.com/v6/latest/USD), a no-key REST API.
- Node.js built-in test runner for utility unit tests.
- ESLint 9 for static analysis.

## Run locally

Use Node.js 20 or newer. From the project folder:

```sh
npm install
npm test
npm run lint
```

Serve the project folder using a local static server (ES modules need HTTP), then open its local URL. For example, with Python installed:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. The app needs an internet connection for current exchange rates; if the service is unavailable, it keeps your entries visible and says that conversion rates are unavailable.

## Publish with GitHub Pages

Push the project to a public GitHub repository, then choose **Settings → Pages → Deploy from a branch**, select `main` and `/ (root)`, and save. Put the generated Pages URL in the live demo link above after publishing. Open the deployed page, add an expense, and check that its converted value and total appear before sharing the link.

## What I’d improve with more time

Add trip-specific ledgers, export to CSV, and a clearer way to review how recently a rate was updated.
