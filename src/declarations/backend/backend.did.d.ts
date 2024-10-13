import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CustodyFee {
  'fee' : number,
  'bank' : string,
  'calculationMethod' : string,
  'sourceLink' : string,
}
export interface Fund {
  'ticker' : string,
  'name' : string,
  'category' : FundCategory,
  'annualReturn' : number,
  'expenseRatio' : number,
}
export type FundCategory = { 'CryptoETP' : null } |
  { 'EquityFund' : null };
export interface ICPETP {
  'aum' : number,
  'websiteLink' : string,
  'name' : string,
}
export interface _SERVICE {
  'addFund' : ActorMethod<[string, string, number, number, string], undefined>,
  'compareFunds' : ActorMethod<[Array<string>], Array<[] | [Fund]>>,
  'getAllFunds' : ActorMethod<[], Array<Fund>>,
  'getCustodyFees' : ActorMethod<[], Array<CustodyFee>>,
  'getFund' : ActorMethod<[string], [] | [Fund]>,
  'getFundsByCategory' : ActorMethod<[string], Array<Fund>>,
  'getICPETPs' : ActorMethod<[], Array<ICPETP>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
