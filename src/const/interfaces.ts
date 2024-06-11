export interface GameInfo {
  id?: number;
  bust?: number;
  status?: string;
}

export interface BetInfo {
  user: string;
  bust: number;
  amount: number;
}
