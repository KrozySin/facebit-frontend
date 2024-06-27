import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { GameHistoryContext } from "../context/GameHistoryContext";
import { BetInfo, GameInfo } from "../const/interfaces";
import axios from "axios";
import { useAuth } from "../hook/useAuth";

export const GameHistoryProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isLoggedIn, updateBalance } = useAuth();
  const [history, setHistory] = useState<GameInfo[]>([]);
  const [userHistory, setUserHistory] = useState<BetInfo[]>([]);
  const historyRef = useRef<GameInfo[]>([]);

  const [betList, setBetList] = useState<BetInfo[]>([]);
  const betListRef = useRef<BetInfo[]>([]);

  const getInitGameHistory = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/rate`, {
      params: {
        count: 50,
      },
    });
    setHistory(result.data.list);
    const token = window.localStorage.getItem("token");

    if (token) {
      const userResult = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/orders`,
        {
          params: {
            token: window.localStorage.getItem("token"),
            count: 50,
          },
        }
      );
      if (!userResult.data === false) {
        setUserHistory(userResult.data);
      }
    }
  };

  const getInitBetHistory = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/history`
    );
    setBetList(result.data.sort((a: any, b: any) => b.amount - a.amount));
  };

  const addNewHistory = async (data: GameInfo) => {
    await getInitGameHistory();
    updateBalance();
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
  }, [isLoggedIn]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    betListRef.current = betList;
  }, [betList]);

  return (
    <GameHistoryContext.Provider
      value={{
        history,
        addNewHistory,
        betList,
        addNewBet,
        clearBet,
        userHistory,
      }}
    >
      {children}
    </GameHistoryContext.Provider>
  );
};
