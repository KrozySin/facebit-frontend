import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Competitive = () => {
  const generateRandomGrowthData = (length: number, maxIncrement: number) => {
    let data = [0];
    for (let i = 1; i < length; i++) {
      data.push(data[i - 1] + (Math.random() - 0.45) * maxIncrement);
    }
    return data;
  };

  // Data for Bustabit chart
  const bustabitData = {
    labels: Array.from({ length: 50 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Bustabit",
        data: generateRandomGrowthData(50, 10000),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  // Data for Ours chart
  const ourData = {
    labels: Array.from({ length: 50 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Ours",
        data: Array.from({ length: 50 }, () => (Math.random() - 0.5) * 10000), // Vibrating values
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Remove legends
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Set x-axis font color to white
        },
      },
      y: {
        ticks: {
          color: "white", // Set y-axis font color to white
        },
      },
    },
  };

  return (
    <section id="Comparison">
      <div className="overlay" />
      <div className="container">
        <h2>Comparison</h2>
        <div className="chart-container">
          <div className="chart">
            <h3>Bustabit</h3>
            <Line data={bustabitData} options={options} />
          </div>
          <div className="chart">
            <h3>Our System</h3>
            <Line data={ourData} options={options} />
          </div>
        </div>
        <p className="comparison-description">
          The original crash game, like Bustabit, profits always grow because of
          the house edge. The house edge is a built-in advantage for the game
          operator, ensuring that over time, the operator will always make a
          profit from the players. This is typically achieved by having a slight
          advantage in the game rules that favors the house.
          <br />
          <br />
          In contrast, our system never gets any profit from users through
          gameplay. Instead, we only collect fees from withdrawals and deposits.
          This means that our profits are not dependent on the players losing
          money, but rather on the volume of transactions that occur on the
          platform.
        </p>
      </div>
    </section>
  );
};

export default Competitive;
