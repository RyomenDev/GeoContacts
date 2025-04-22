import {
  MapPin,
  Mail,
  Phone,
  UserCircle,
  ShieldCheck,
  Info,
} from "lucide-react";

const FeaturedData = {
  title: "GeoContacts",
  description:
    "Discover and Connect with Key Project Roles — Easily browse verified contacts",
  features: [
    {
      title: "View on Map",
      desc: "Easily locate individuals on Google Maps based on their provided address details.",
      icon: <MapPin size={32} />,
    },
    {
      title: "Instant Email Access",
      desc: "Quickly connect via email. Just one click to open your mail client and reach out.",
      icon: <Mail size={32} />,
    },
    {
      title: "Direct Calling",
      desc: "Get in touch through listed phone numbers without any hassle.",
      icon: <Phone size={32} />,
    },
    {
      title: "Role-Based Identification",
      desc: `Each contact is tagged with a unique role like Contractor (⭐), Geo Tech (🔺), Home Owner (🏠), and more.`,
      icon: <ShieldCheck size={32} />,
    },
    {
      title: "Organized Contact Profiles",
      desc: "All information in one place — name, role, contact details, and address for each person.",
      icon: <UserCircle size={32} />,
    },
    {
      title: "Smart Project Filtering",
      desc: "Filter and find people based on their project roles to make collaboration easier and faster.",
      icon: <Info size={32} />,
    },
  ],
};

export default FeaturedData;
