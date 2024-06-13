import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { GameHistoryContext } from "../context/GameHistoryContext";
import { BetInfo, GameInfo } from "../const/interfaces";
import axios from "axios";

export const GameHistoryProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [history, setHistory] = useState<GameInfo[]>([]);
  const historyRef = useRef<GameInfo[]>([]);

  const [betList, setBetList] = useState<BetInfo[]>([]);
  const betListRef = useRef<BetInfo[]>([]);

  const getInitGameHistory = async () => {
    const result = await axios.get("http://192.168.6.244:4000/rate", {
      params: {
        count: 50,
      },
    });
    setHistory(result.data.list);
  };

  const getInitBetHistory = async () => {
    const result = await axios.get("http://192.168.6.244:4000/user/history");
    setBetList(result.data.sort((a: any, b: any) => b.amount - a.amount));
  };

  const addNewHistory = (data: GameInfo) => {
    if (historyRef.current.find((x) => x.id === data.id)) {
      return;
    }
    getInitGameHistory();
  };

  const addNewBet = (data: BetInfo) => {
    if (betListRef.current.find((x) => x.user === data.user)) {
      return;
    }
    setBetList(
      [data, ...betListRef.current].sort((a, b) => b.amount - a.amount)
    );
  };

  const clearBet = () => {
    setBetList([]);
  };

  useEffect(() => {
    getInitGameHistory();
    getInitBetHistory();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    betListRef.current = betList;
  }, [betList]);

  return (
    <GameHistoryContext.Provider
      value={{ history, addNewHistory, betList, addNewBet, clearBet }}
    >
      {children}
    </GameHistoryContext.Provider>
  );
};
