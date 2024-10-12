import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor FundAnalyser {
  type Fund = {
    name: Text;
    ticker: Text;
    annualReturn: Float;
    expenseRatio: Float;
  };

  type CustodyFee = {
    bank: Text;
    fee: Float;
    sourceLink: Text;
    calculationMethod: Text;
  };

  stable var fundEntries : [(Text, Fund)] = [];
  var funds = HashMap.HashMap<Text, Fund>(10, Text.equal, Text.hash);

  let custodyFees : [CustodyFee] = [
    { bank = "UBS"; fee = 0.15; sourceLink = "https://www.ubs.com/ch/en/private/accounts-and-cards/accounts/custody-account.html"; calculationMethod = "0.15% p.a. of the portfolio value, charged quarterly" },
    { bank = "Swissquote"; fee = 0.12; sourceLink = "https://en.swissquote.com/trading/pricing"; calculationMethod = "0.12% p.a. of the portfolio value, minimum CHF 50 per quarter" },
    { bank = "ZKB"; fee = 0.14; sourceLink = "https://www.zkb.ch/en/private-customers/investments/custody-account-and-trading.html"; calculationMethod = "0.14% p.a. of the portfolio value, charged quarterly" },
    { bank = "Raiffeisen"; fee = 0.13; sourceLink = "https://www.raiffeisen.ch/rch/en/private-clients/invest/custody-account.html"; calculationMethod = "0.13% p.a. of the portfolio value, minimum CHF 25 per quarter" },
    { bank = "Postfinance"; fee = 0.11; sourceLink = "https://www.postfinance.ch/en/private/products/investing/custody-account.html"; calculationMethod = "0.11% p.a. of the portfolio value, charged quarterly" },
    { bank = "Julius Baer"; fee = 0.16; sourceLink = "https://www.juliusbaer.com/en/services/custody-account/"; calculationMethod = "0.16% p.a. of the portfolio value, charged quarterly" }
  ];

  public func addFund(name: Text, ticker: Text, annualReturn: Float, expenseRatio: Float) : async () {
    let fund : Fund = {
      name = name;
      ticker = ticker;
      annualReturn = annualReturn;
      expenseRatio = expenseRatio;
    };
    funds.put(ticker, fund);
  };

  public query func getFund(ticker: Text) : async ?Fund {
    funds.get(ticker)
  };

  public query func getAllFunds() : async [Fund] {
    Iter.toArray(funds.vals())
  };

  public query func compareFunds(tickers: [Text]) : async [?Fund] {
    Array.map<Text, ?Fund>(tickers, func (ticker) { funds.get(ticker) })
  };

  public query func getCustodyFees() : async [CustodyFee] {
    custodyFees
  };

  system func preupgrade() {
    fundEntries := Iter.toArray(funds.entries());
  };

  system func postupgrade() {
    funds := HashMap.fromIter<Text, Fund>(fundEntries.vals(), 10, Text.equal, Text.hash);
  };
}
