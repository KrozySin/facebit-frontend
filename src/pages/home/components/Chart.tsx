import { useWebsocket } from "../../../hook/useWebsocket";
import Panel from "../../../layout/panel";

interface Props {
  className?: string;
}

const Chart = ({ className }: Props) => {
  const { chartComponent } = useWebsocket();
  return (
    <Panel
      className={`${className ?? ""} align-items-center justify-content-center`}
    >
      <div className="gameInfo" ref={chartComponent}></div>
    </Panel>
  );
};

export default Chart;
