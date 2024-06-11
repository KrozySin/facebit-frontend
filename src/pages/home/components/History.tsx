import { useGameHistory } from "../../../hook/useGameHistory";
import Panel from "../../../layout/panel";
import SimpleBar from "simplebar-react";
interface Props {
  className?: string;
}

const History = ({ className }: Props) => {
  const { history } = useGameHistory();
  return (
    <Panel className={`${className ?? ""} dark-panel pw-15`}>
      <SimpleBar className="sticky-table height-available">
        <table>
          <thead>
            <div className="bk-table-header" />
            <tr>
              <th>Round #</th>
              <th>Busted</th>
              <th>Staked / Shared</th>
            </tr>
          </thead>
          <tbody>
            {history.map((data, index) => (
              <tr key={`history_${index}`}>
                <td>#{data.id}</td>
                <td>{data.bust?.toFixed(2)}</td>
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleBar>
    </Panel>
  );
};

export default History;
