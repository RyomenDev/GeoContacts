import HeroSection from "../component/Contacts/HeroSection.jsx";
import ContactComponent from "../component/Contacts";
import Acknowledge from "../component/Contacts/Acknowledge.jsx";

const ContactHome = () => {
  return (
    <>
      <div className="scroll-smooth">
        <HeroSection />

        <div className="text-center my-8">
          <a
            href="#guidelines"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg shadow hover:bg-emerald-700 transition duration-300"
          >
            View Guidelines
          </a>
        </div>

        <ContactComponent />

        <div id="guidelines">
          <Acknowledge />
        </div>
      </div>
    </>
  );
};

export default ContactHome;
