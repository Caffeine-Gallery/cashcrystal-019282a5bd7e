import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const addFundForm = document.getElementById('add-fund-form');
  const fundList = document.getElementById('funds');
  const comparisonResult = document.getElementById('comparison-result');
  const custodyFeesList = document.getElementById('custody-fees-list');
  const equityFundsButton = document.getElementById('equity-funds');
  const cryptoETPsButton = document.getElementById('crypto-etps');
  const equityFundsContent = document.getElementById('equity-funds-content');
  const cryptoETPsContent = document.getElementById('crypto-etps-content');
  const icpETPsList = document.getElementById('icp-etps-list');

  let currentCategory = 'EquityFund';

  addFundForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('fund-name').value;
    const ticker = document.getElementById('fund-ticker').value;
    const annualReturn = parseFloat(document.getElementById('annual-return').value);
    const expenseRatio = parseFloat(document.getElementById('expense-ratio').value);
    const category = document.getElementById('fund-category').value;

    await backend.addFund(name, ticker, annualReturn, expenseRatio, category);
    addFundForm.reset();
    await updateFundList(currentCategory);
  });

  equityFundsButton.addEventListener('click', () => {
    currentCategory = 'EquityFund';
    updateFundList(currentCategory);
    showEquityFunds();
  });

  cryptoETPsButton.addEventListener('click', () => {
    currentCategory = 'CryptoETP';
    showCryptoETPs();
  });

  function showEquityFunds() {
    equityFundsButton.classList.add('active');
    cryptoETPsButton.classList.remove('active');
    equityFundsContent.style.display = 'block';
    cryptoETPsContent.style.display = 'none';
  }

  function showCryptoETPs() {
    equityFundsButton.classList.remove('active');
    cryptoETPsButton.classList.add('active');
    equityFundsContent.style.display = 'none';
    cryptoETPsContent.style.display = 'block';
    displayICPETPs();
  }

  async function updateFundList(category) {
    const funds = await backend.getFundsByCategory(category);
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

    let comparisonHTML = '<table><tr><th>Fund</th><th>Category</th><th>Annual Return</th><th>Expense Ratio</th></tr>';
    comparedFunds.forEach(fund => {
      if (fund) {
        comparisonHTML += `
          <tr>
            <td>${fund.name}</td>
            <td>${fund.category == 'EquityFund' ? 'Equity Fund' : 'Crypto ETP'}</td>
            <td>${fund.annualReturn.toFixed(2)}%</td>
            <td>${fund.expenseRatio.toFixed(2)}%</td>
          </tr>`;
      }
    });
    comparisonHTML += '</table>';

    comparisonResult.innerHTML = comparisonHTML;
  }

  async function displayCustodyFees() {
    const custodyFees = await backend.getCustodyFees();
    let feesHTML = '<table><tr><th>Bank</th><th>Custody Fee</th><th>Calculation Method</th><th>Source</th></tr>';
    custodyFees.forEach(fee => {
      feesHTML += `
        <tr>
          <td>${fee.bank}</td>
          <td>${fee.fee.toFixed(2)}%</td>
          <td>${fee.calculationMethod}</td>
          <td><a href="${fee.sourceLink}" target="_blank" rel="noopener noreferrer">Details</a></td>
        </tr>`;
    });
    feesHTML += '</table>';
    custodyFeesList.innerHTML = feesHTML;
  }

  async function displayICPETPs() {
    const icpETPs = await backend.getICPETPs();
    let etpsHTML = '<table><tr><th>ETP Name</th><th>Assets under Management (USD)</th><th>Website</th></tr>';
    icpETPs.forEach(etp => {
      etpsHTML += `
        <tr>
          <td>${etp.name}</td>
          <td>$${etp.aum.toLocaleString()}</td>
          <td><a href="${etp.websiteLink}" target="_blank" rel="noopener noreferrer">Details</a></td>
        </tr>`;
    });
    etpsHTML += '</table>';
    icpETPsList.innerHTML = etpsHTML;
  }

  await updateFundList(currentCategory);
  compareFunds();
  displayCustodyFees();
});
