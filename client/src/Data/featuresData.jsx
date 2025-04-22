import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUserTag,
} from "react-icons/fa";
import MapImage from "../assets/images/AI_1.png";
import ContactCard from "../assets/images/AI_2.png";
import RolesImage from "../assets/images/MDesign.png";
import SearchImage from "../assets/images/JS_1.png";

const FeaturedData = {
  title: "What we Provide",
  description:
    "Explore contact details and discover verified roles—mapped visually for smarter project collaboration.",
  features: [
    {
      icon: <FaMapMarkerAlt size={40} className="text-green-700" />,
      img: MapImage,
      title: "Interactive Map Integration",
      description:
        "View contacts on a map for easy geographic referencing and planning.",
    },
    {
      icon: <FaEnvelope size={40} className="text-indigo-600" />,
      img: ContactCard,
      title: "Verified Contact Details",
      description:
        "Access accurate emails, phone numbers, and physical addresses for quick outreach.",
    },
    {
      icon: <FaUserTag size={40} className="text-yellow-600" />,
      img: RolesImage,
      title: "Role-Based Tags",
      description: `Identify roles instantly: Contractor ⭐, Geo Tech 🔺, Home Owner 🏠, Affiliate 📣, and more.`,
    },
    {
      icon: <FaPhoneAlt size={40} className="text-rose-500" />,
      img: SearchImage,
      title: "Easy Search & Filtering",
      description:
        "Quickly find the right person using name, role, or location filters.",
    },
  ],
};

export default FeaturedData;
