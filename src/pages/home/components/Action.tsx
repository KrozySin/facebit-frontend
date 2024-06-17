import React, { useMemo } from "react";
import { useState } from "react";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import { useWebsocket } from "../../../hook/useWebsocket";
import { useGameHistory } from "../../../hook/useGameHistory";
import { useAuth } from "../../../hook/useAuth";
import Panel from "../../../layout/panel";

interface Props {
  className?: string;
}

const Action = ({ className }: Props) => {
  const { gameInfo } = useWebsocket();
  const { betList } = useGameHistory();
  const { user } = useAuth();
  const { doBet } = useWebsocket();
  const [bust, setBust] = useState("");
  const [amount, setAmount] = useState("");

  const myBet = useMemo(() => {
    return betList.find((x) => x.user === user.userId);
  }, [betList, user]);

  const onBet = () => {
    const amountNm = parseFloat(amount);
    const bustNm = parseFloat(bust);

    if (isNaN(amountNm) || isNaN(bustNm)) return;
    doBet(amountNm, bustNm);
  };

  return (
    <div
      className={`${className ?? ""}`}
      style={{
        paddingRight: 0,
      }}
    >
      <Panel className={`mw-action flex-column dark-panel`}>
        <Tabs defaultActiveKey="manual">
          <Tab eventKey="manual" title="Manual">
            <Form.Label htmlFor="act_amount" className="mt-4">
              Amount
            </Form.Label>
            <Form.Control
              type="text"
              id="act_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Form.Label htmlFor="act_bust" className="mt-3">
              Bust
            </Form.Label>
            <Form.Control
              type="text"
              id="act_bust"
              value={bust}
              onChange={(e) => setBust(e.target.value)}
            />
            {myBet && (!gameInfo.bust || gameInfo.bust < myBet.bust) ? (
              <Button
                variant="primary"
                className="w-100 mt-4 mb-4 button-30"
                size="lg"
                style={{
                  height: "80px",
                }}
              >
                cash {(myBet.amount * (gameInfo.bust ?? 1.01)).toFixed(2)}
              </Button>
            ) : (
              <Button
                variant="primary"
                className="w-100 mt-4 mb-4 button-29"
                size="lg"
                style={{
                  height: "80px",
                }}
                onClick={onBet}
              >
                Bet Now
              </Button>
            )}
          </Tab>
          <Tab eventKey="auto" title="Auto"></Tab>
        </Tabs>
      </Panel>
    </div>
  );
};

export default Action;
