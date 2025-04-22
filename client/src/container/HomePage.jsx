import HeroSection from "../component/Home/HeroSection.jsx";
import Features from "../component/Home/Features.jsx";
import Featured from "../component/Home/featured.jsx";
import FeaturesData from "../Data/featuresData.jsx"

const HomePage = () => {
  return (
    <>
      <div className="">
        <HeroSection />
        <Features Data={FeaturesData} />
        <Featured />
      </div>
    </>
  );
};

export default HomePage;
