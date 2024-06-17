import { useEffect, useState } from "react";
import { useWebsocket } from "../../../hook/useWebsocket";
import Panel from "../../../layout/panel";

interface Props {
  className?: string;
}

const Chart = ({ className }: Props) => {
  const { status, chartComponent } = useWebsocket();
  const [launched, setLaunched] = useState(true);
  const [cssLaunch, setCssLaunch] = useState("rocket-flying rocket-flying-eff");
  const [cssBg, setCssBg] = useState("rocket-prepare");
  const star = () => {
    let count = 30;
    let box = document.querySelector(".box");
    let i = 0;
    while (i < count) {
      let star = document.createElement("i");
      let x = Math.floor(Math.random() * (box?.clientWidth ?? 100));
      let duration = Math.random() * 1;
      let h = Math.random() * 30;
      star.style.left = x + "px";
      star.style.width = "1px";
      star.style.height = h + "px";
      star.style.animationDuration = duration + "s";
      box?.appendChild(star);
      i++;
    }
  };

  const removeStar = () => {
    const box = document.querySelector(".box");
    while (box?.childNodes.length && box?.childNodes.length > 2) {
      box?.removeChild(box?.childNodes[2]);
    }
  };

  useEffect(() => {
    if (status === "ended") {
      setLaunched(false);
    } else {
      setLaunched(true);
    }
  }, [status]);

  useEffect(() => {
    if (launched) {
      setCssLaunch("rocket-flying");
      setCssBg("chart-bg-hide");
      setTimeout(() => {
        star();
        setCssLaunch("rocket-flying rocket-flying-eff");
      }, 2000);
    } else {
      removeStar();
      setCssLaunch("rocket-gone");
      setTimeout(() => {
        setCssLaunch("rocket-prepare");
        setCssBg("");
      }, 3000);
    }
  }, [launched]);

  return (
    <Panel
      className={`${
        className ?? ""
      } align-items-center justify-content-center space-panel`}
    >
      <div className="box">
        <img src="chartBG2.webp" className={`chart-bg ${cssBg}`} alt="" />
        <div className={`rocket ${cssLaunch}`}>
          <img src="rocket.png" alt="" />
        </div>
      </div>
      <div className="gameInfo" ref={chartComponent}></div>
    </Panel>
  );
};

export default Chart;
