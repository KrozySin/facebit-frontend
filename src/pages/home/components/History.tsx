import { useGameHistory } from "../../../hook/useGameHistory";
import Panel from "../../../layout/panel";
import SimpleBar from "simplebar-react";
interface Props {
  className?: string;
}

const History = ({ className }: Props) => {
  const { history, userHistory } = useGameHistory();
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
            {history.map((data, index) => {
              const item = userHistory.find((x) => x.gameId === data.id);
              return (
                <tr key={`history_${index}`}>
                  <td>#{data.id}</td>
                  <td>{(Math.floor(data.bust! * 100) / 100).toFixed(2)}</td>
                  <td>
                    {item && data.bust
                      ? data.bust >= item.bust
                        ? ((item.bust - 1) * item.amount).toFixed(2)
                        : "Busted"
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SimpleBar>
    </Panel>
  );
};

export default History;
