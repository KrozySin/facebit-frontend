import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const WhyWeAre = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Disable next and prev buttons
    swipe: true, // Enable swiping
  };

  return (
    <section id="why-we-are">
      <h2>Why We Are</h2>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="reason">
            <div className="image-area">
              <img src="/secure.png" alt="Trustworthy" />
            </div>

            <h3>Trustworthy</h3>
            <p>
              We use a provably fair system to ensure transparency and fairness
              in every game.
            </p>
          </div>
          <div className="reason">
            <div className="image-area">
              <img src="/exciting.png" alt="Trustworthy" />
            </div>

            <h3>Exciting</h3>
            <p>
              Experience the thrill of watching the multiplier grow and making
              strategic cashouts.
            </p>
          </div>
          <div className="reason">
            <div className="image-area">
              <img src="/web.png" alt="Trustworthy" />
            </div>

            <h3>Innovative</h3>
            <p>
              Our platform offers the latest technology and user-friendly
              interface to enhance your gaming experience.
            </p>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default WhyWeAre;
