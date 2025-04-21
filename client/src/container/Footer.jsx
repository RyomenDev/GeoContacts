import FooterCTA from "../component/Footer/FooterCTA.jsx";
import FooterInfo from "../component/Footer/FooterInfo.jsx";

const Footer = () => {
  return (
    <>
      <div className="min-h-screen bg-emerald-50" />
      <footer
        className="relative bg-gradient-to-b from-[#33cc99] to-[#27ae60] text-white overflow-hidden"
        id="footerMain"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20"></div>

        <FooterCTA />
        <FooterInfo />
      </footer>
    </>
  );
};

export default Footer;
