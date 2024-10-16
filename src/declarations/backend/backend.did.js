export const idlFactory = ({ IDL }) => {
  const FundCategory = IDL.Variant({
    'CryptoETP' : IDL.Null,
    'EquityFund' : IDL.Null,
  });
  const Fund = IDL.Record({
    'ticker' : IDL.Text,
    'name' : IDL.Text,
    'category' : FundCategory,
    'annualReturn' : IDL.Float64,
    'expenseRatio' : IDL.Float64,
  });
  const CustodyFee = IDL.Record({
    'fee' : IDL.Float64,
    'bank' : IDL.Text,
    'calculationMethod' : IDL.Text,
    'sourceLink' : IDL.Text,
  });
  const ICPETP = IDL.Record({
    'aum' : IDL.Float64,
    'websiteLink' : IDL.Text,
    'name' : IDL.Text,
    'factsheetLink' : IDL.Text,
  });
  return IDL.Service({
    'addFund' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Float64, IDL.Float64, IDL.Text],
        [],
        [],
      ),
    'compareFunds' : IDL.Func(
        [IDL.Vec(IDL.Text)],
        [IDL.Vec(IDL.Opt(Fund))],
        ['query'],
      ),
    'getAllFunds' : IDL.Func([], [IDL.Vec(Fund)], ['query']),
    'getCustodyFees' : IDL.Func([], [IDL.Vec(CustodyFee)], ['query']),
    'getFund' : IDL.Func([IDL.Text], [IDL.Opt(Fund)], ['query']),
    'getFundsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Fund)], ['query']),
    'getICPETPs' : IDL.Func([], [IDL.Vec(ICPETP)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
