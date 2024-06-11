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

  const addNewHistory = (data: GameInfo) => {
    if (historyRef.current.find((x) => x.id === data.id)) {
      return;
    }
    setHistory([data, ...historyRef.current.slice(0, 49)]);
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
