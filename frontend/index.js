import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const addFundForm = document.getElementById('add-fund-form');
  const fundList = document.getElementById('funds');
  const comparisonResult = document.getElementById('comparison-result');

  addFundForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('fund-name').value;
    const ticker = document.getElementById('fund-ticker').value;
    const annualReturn = parseFloat(document.getElementById('annual-return').value);
    const expenseRatio = parseFloat(document.getElementById('expense-ratio').value);

    await backend.addFund(name, ticker, annualReturn, expenseRatio);
    addFundForm.reset();
    await updateFundList();
  });

  async function updateFundList() {
    const funds = await backend.getAllFunds();
    fundList.innerHTML = '';
    funds.forEach(fund => {
      const li = document.createElement('li');
      li.textContent = `${fund.name} (${fund.ticker}) - Annual Return: ${fund.annualReturn.toFixed(2)}%, Expense Ratio: ${fund.expenseRatio.toFixed(2)}%`;
      fundList.appendChild(li);
    });
  }

  async function compareFunds() {
    const funds = await backend.getAllFunds();
    if (funds.length < 2) {
      comparisonResult.textContent = 'Need at least 2 funds to compare.';
      return;
    }

    const tickers = funds.map(fund => fund.ticker);
    const comparedFunds = await backend.compareFunds(tickers);

    let comparisonHTML = '<table><tr><th>Fund</th><th>Annual Return</th><th>Expense Ratio</th></tr>';
    comparedFunds.forEach(fund => {
      if (fund) {
        comparisonHTML += `<tr><td>${fund.name}</td><td>${fund.annualReturn.toFixed(2)}%</td><td>${fund.expenseRatio.toFixed(2)}%</td></tr>`;
      }
    });
    comparisonHTML += '</table>';

    comparisonResult.innerHTML = comparisonHTML;
  }

  await updateFundList();
  compareFunds();
});
