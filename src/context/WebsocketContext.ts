import { RefObject, createContext } from "react";
import { GameInfo } from "../const/interfaces";

export interface WebsocketContextValue {
  gameInfo: GameInfo;
  chartComponent: RefObject<HTMLDivElement>;
  reconnect: () => void;
  doBet: (amount: number, bust: number) => void;
  rate: number;
}

export const WebsocketContext = createContext<null | WebsocketContextValue>(
  null
);
