import FooterCTA from "../component/Footer/FooterCTA.jsx";
import FooterInfo from "../component/Footer/FooterInfo.jsx";
import FooterImg from "../assets/images/footer.jpg"

const Footer = () => {
  return (
    <>
      <footer
        className="relative bg-gradient-to-b from-[#33cc99] to-[#27ae60] text-white overflow-hidden"
        id="Contact_Section"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
          <img
            src={FooterImg}
            alt="Footer Wave Background"
            className="w-full h-full object-cover"
          />
        </div>

        <FooterCTA />
        <FooterInfo />
      </footer>
    </>
  );
};

export default Footer;
