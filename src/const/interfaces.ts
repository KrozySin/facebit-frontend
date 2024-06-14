export interface GameInfo {
  id?: number;
  bust?: number;
  sysProfit?: number;
  status?: string;
}

export interface BetInfo {
  gameId?: number;
  user: string;
  bust: number;
  amount: number;
}
