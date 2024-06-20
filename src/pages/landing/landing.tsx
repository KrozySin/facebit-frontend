import Competitive from "./components/competitive";
import Copyright from "./components/copyright";
import Hero from "./components/hero";
import WhyWeAre from "./components/whyWeAre";
import "./landing.css";

const Landing = () => {
  return (
    <>
      <Hero />
      <WhyWeAre />
      <Competitive />
      <Copyright />
    </>
  );
};

export default Landing;
