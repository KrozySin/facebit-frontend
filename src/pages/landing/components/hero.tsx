const Hero = () => {
  return (
    <>
      <header>
        <div className="container">
          <h1>Testa Bit</h1>
          <nav>
            <a href="#why-we-are">Why We Are</a>
            <a href="#Comparison">Comparison</a>
            <a href="/home">Start Playing</a>
          </nav>
        </div>
      </header>
      <section className="landingImage" />
      <section id="hero">
        <div className="overlay"></div>
        <div className="container">
          <h2>Join the Excitement of Crash Game</h2>
          <p>Bet, watch the multiplier grow, and cash out before it crashes!</p>
          <a href="/home" className="button-29 p-5">
            Start Playing
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
