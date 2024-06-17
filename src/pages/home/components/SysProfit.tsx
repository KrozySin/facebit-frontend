import { useAuth } from "../../../hook/useAuth";
import Panel from "../../../layout/panel";

interface Props {
  className?: string;
}

const SystemProfit = ({ className }: Props) => {
  const { isLoggedIn, balance } = useAuth();

  return isLoggedIn ? (
    <div className={`${className ?? ""} ml-15 sys-panel`}>
      <Panel className={` dark-panel balance-panel`}>
        <label>Your Balance</label>
        <span>{balance.toFixed(2)}</span>
      </Panel>
      <Panel className={`dark-panel mt-3 predict-panel`}>
        <label>Do you want to get AI predictions?</label>
        <button className="button-72">✨ Go Premium</button>
      </Panel>
    </div>
  ) : (
    <></>
  );
};

export default SystemProfit;
