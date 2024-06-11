import { useMemo } from "react";
import { useGameHistory } from "../../../hook/useGameHistory";
import { useWebsocket } from "../../../hook/useWebsocket";
import Panel from "../../../layout/panel";
import SimpleBar from "simplebar-react";
import { useAuth } from "../../../hook/useAuth";
interface Props {
  className?: string;
}
const Users = ({ className }: Props) => {
  const { user } = useAuth();
  const { rate } = useWebsocket();
  const { betList } = useGameHistory();

  const betResult = useMemo(() => {
    const cashedResults = betList.filter((x) => x.bust <= rate);
    const otherResult = betList.filter((x) => x.bust > rate);
    return [...otherResult, ...cashedResults.sort((a, b) => b.bust - a.bust)];
  }, [betList, rate]);

  return (
    <Panel className={`${className ?? ""} align-items-top dark-panel ml-15`}>
      <SimpleBar className="sticky-table height-available">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>@</th>
              <th>Bet</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {betResult.map((value, index) => (
              <tr
                key={`bet_${index}`}
                className={`${value.bust <= rate ? "cashed" : ""} ${
                  user.userId === value.user ? "mine" : ""
                }`}
              >
                <td>{value.user}</td>
                <td>{value.bust <= rate ? value.bust : "-"}</td>
                <td>{value.amount}</td>
                <td>
                  {value.bust <= rate
                    ? ((value.bust - 1) * value.amount).toFixed(2)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleBar>
    </Panel>
  );
};

export default Users;
