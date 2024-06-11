import Panel from "../../../layout/panel";

interface Props {
  className?: string;
}

const SystemProfit = ({ className }: Props) => {
  return <Panel className={`${className ?? ""} dark-panel ml-15`}></Panel>;
};

export default SystemProfit;
