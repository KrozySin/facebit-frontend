import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useWebsocket } from "../../../hook/useWebsocket";

interface Props {
  className?: string;
}

const Action = ({ className }: Props) => {
  const { doBet } = useWebsocket();
  const [bust, setBust] = useState("");
  const [amount, setAmount] = useState("");

  const onBet = () => {
    const amountNm = parseFloat(amount);
    const bustNm = parseFloat(bust);

    if (isNaN(amountNm) || isNaN(bustNm)) return;
    doBet(amountNm, bustNm);
  };

  return (
    <div className={`h-auto ${className ?? ""} flex-column`}>
      <Form.Label htmlFor="act_amount">Amount</Form.Label>
      <Form.Control
        type="text"
        id="act_amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Form.Label htmlFor="act_bust">Bust</Form.Label>
      <Form.Control
        type="text"
        id="act_bust"
        value={bust}
        onChange={(e) => setBust(e.target.value)}
      />
      <Button
        variant="primary"
        className="w-100 mt-4 mb-4"
        size="lg"
        style={{
          height: "80px",
        }}
        onClick={onBet}
      >
        Bet Now
      </Button>
    </div>
  );
};

export default Action;
