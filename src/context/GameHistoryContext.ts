import { createContext } from "react";
import { BetInfo, GameInfo } from "../const/interfaces";

export interface GameHistoryContextValue {
  history: GameInfo[];
  addNewHistory: (data: GameInfo) => Promise<void>;
  betList: BetInfo[];
  userHistory: BetInfo[];
  addNewBet: (data: BetInfo) => void;
  clearBet: () => void;
}

export const GameHistoryContext = createContext<null | GameHistoryContextValue>(
  null
);
