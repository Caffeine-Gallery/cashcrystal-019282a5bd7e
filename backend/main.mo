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

  stable var fundEntries : [(Text, Fund)] = [];
  var funds = HashMap.HashMap<Text, Fund>(10, Text.equal, Text.hash);

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

  system func preupgrade() {
    fundEntries := Iter.toArray(funds.entries());
  };

  system func postupgrade() {
    funds := HashMap.fromIter<Text, Fund>(fundEntries.vals(), 10, Text.equal, Text.hash);
  };
}
