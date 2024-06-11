import Action from "./components/Action";
import Chart from "./components/Chart";
import History from "./components/History";
import Users from "./components/Users";
import SystemProfit from "./components/SysProfit";

const Home = () => {
  return (
    <div className="home">
      <div className="bk-clip" />
      <div className="ripple-shape">
        <div className="ripple-1" />
        <div className="ripple-2" />
        <div className="ripple-3" />
        <div className="ripple-4" />
        <div className="ripple-5" />
        <div className="ripple-6" />
        <div className="ripple-7" />
      </div>
      <div className="row">
        <Chart className="col col-4" />
        <Action className="col col-3" />
        <SystemProfit className="col col-4" />
      </div>
      <div className="row mt-3">
        <History className="col col-7" />
        <Users className="col col-4" />
      </div>
    </div>
  );
};

export default Home;
