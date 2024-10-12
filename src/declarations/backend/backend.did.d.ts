import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CustodyFee {
  'fee' : number,
  'bank' : string,
  'sourceLink' : string,
}
export interface Fund {
  'ticker' : string,
  'name' : string,
  'annualReturn' : number,
  'expenseRatio' : number,
}
export interface _SERVICE {
  'addFund' : ActorMethod<[string, string, number, number], undefined>,
  'compareFunds' : ActorMethod<[Array<string>], Array<[] | [Fund]>>,
  'getAllFunds' : ActorMethod<[], Array<Fund>>,
  'getCustodyFees' : ActorMethod<[], Array<CustodyFee>>,
  'getFund' : ActorMethod<[string], [] | [Fund]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
