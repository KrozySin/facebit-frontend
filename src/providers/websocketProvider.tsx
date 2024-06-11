import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../context/WebsocketContext";
import io, { Socket } from "socket.io-client";
import { GameInfo } from "../const/interfaces";
import { useGameHistory } from "../hook/useGameHistory";

export const WebSocketProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const socket = useRef<Socket | null>(null);
  const token = useRef<string | null>(null);
  const chartComponent = useRef<HTMLDivElement>(null);
  const { addNewHistory, addNewBet, clearBet } = useGameHistory();

  // rate live value
  const currentRate = useRef<GameInfo>({});
  const timer = useRef<number>(0);
  const isLive = useRef<boolean>(false);

  const [rate, setRate] = useState(0);

  const initGame = () => {
    console.log("game ended");
    isLive.current = false;
    currentRate.current = {};
  };

  const startLive = () => {
    console.log("new game started");
    if (isLive.current === false) {
      isLive.current = true;
    }
  };

  const connect = async () => {
    if (socket.current === null) {
      token.current = window.localStorage.getItem("token");
      socket.current = io("http://192.168.6.244:8080", {
        query: {
          token: token.current,
        },
      });

      socket.current.on("message", (msg) => {
        if (msg.msgType === "ongame") {
          if (isLive.current === false) {
            timer.current = msg.data.time;
            startLive();
          }
          setRate(msg.data.rate);
        }

        if (msg.msgType === "ended") {
          timer.current = msg.data.time;
          initGame();
          setTimeout(() => {
            setRate(0);
            clearBet();
          }, 3000);
          addNewHistory({
            id: msg.data.id,
            bust: msg.data.rate,
            status: "ended",
          });

          setRate(msg.data.rate);

          if (chartComponent.current && msg.data.rate) {
            chartComponent.current.innerHTML = `${msg.data.rate.toFixed(2)}x`;
          }
        }

        if (msg.msgType === "error") {
        }

        if (msg.msgType === "redirect") {
          window.location.href = msg.data;
        }

        if (msg.msgType === "bet") {
          addNewBet({
            user: msg.data.user,
            amount: msg.data.amount,
            bust: msg.data.bust,
          });
        }
      });
    }
  };

  const reconnect = () => {
    if (socket.current) {
      console.log("trying to reconnect using auth key...");
      socket.current.disconnect();
      socket.current = null;
      connect();
    }
  };

  const generateLiveData = () => {
    const now = Math.ceil(Date.now() / 100);
    if (
      isLive.current === false &&
      now - timer.current >= 30 &&
      timer.current > 0 &&
      chartComponent.current
    ) {
      chartComponent.current.innerHTML = `${(
        (95 - now + timer.current) /
        10
      ).toFixed(1)} seconds left`;
    }
    if (isLive.current === false) return;

    currentRate.current.bust =
      1 +
      Math.pow(
        (now - timer.current) * 0.01,
        Math.max((now - timer.current) / 100 + 1, 2)
      );
    if (chartComponent.current) {
      chartComponent.current.innerHTML = `${currentRate.current.bust.toFixed(
        2
      )}x`;
    }
  };

  const doBet = (amount: number, bust: number) => {
    if (!socket.current) {
      console.log("client is not connected");
      return;
    }
    if (!token.current) {
      console.log("Not authorized!");
      return;
    }

    socket.current.send({
      action: "bet",
      data: { amount, bust },
    });
  };

  useEffect(() => {
    connect();
    setInterval(generateLiveData, 50);

    //eslint-disable-next-line
  }, []);

  return (
    <WebsocketContext.Provider
      value={{
        gameInfo: currentRate.current,
        chartComponent,
        reconnect,
        doBet,
        rate,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};
