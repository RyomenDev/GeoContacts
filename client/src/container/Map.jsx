import { useJsApiLoader } from "@react-google-maps/api";
import MapUI from "../component/Map/MapUI.jsx";
import Spinner from "../utility/Spinner.jsx";

const GoogleMap = ({ data }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    id: "google-map-script",
  });

  if (loadError) {
    return (
      <div className="flex flex-col justify-center items-center space-y-2 md:h-96 lg:h-screen h-80">
        <Spinner />
        <p className="text-lg text-gray-600">Error loading map data: {error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <div className="flex flex-col justify-center items-center space-y-2 md:h-96 lg:h-screen h-80">
          <Spinner />
          <p className="text-lg text-gray-600">
            No contacts available to display on the map
          </p>
        </div>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center space-y-2 md:h-96 lg:h-screen h-80">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <MapUI contacts={data} />
    </div>
  );
};

export default GoogleMap;

// let contactsData = [
//   {
//     name: "Jane Smith",
//     coords: { lat: 43.65, lng: -79.38 },
//     project_roles: ["home_owner", "referral_partner"],
//   },
//   {
//     name: "Alex Chen",
//     coords: { lat: 28.6139, lng: 77.209 },
//     project_roles: ["contractor"],
//   },
//   {
//     name: "Sara Patel",
//     coords: { lat: 43.65, lng: -79.38 },
//     project_roles: ["geo_tech"],
//   },
// ];

// let contactsData = [
//   {
//     name: "Jane Smith",
//     address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
//     project_roles: ["home_owner", "referral_partner"],
//   },
//   {
//     name: "Alex Chen",
//     address: "350 5th Ave, New York, NY 10118, USA", // Empire State Building
//     project_roles: ["contractor", "geo_tech"],
//   },
//   {
//     name: "Sara Patel",
//     address: "10 Downing Street, Westminster, London SW1A 2AA, UK",
//     project_roles: ["geo_tech"],
//   },
//   {
//     name: "Mohammed Al-Fulan",
//     address: "Burj Khalifa, Downtown Dubai, Dubai, UAE",
//     project_roles: ["referral_partner"],
//   },
//   {
//     name: "Ananya Rao",
//     address:
//       "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India",
//     project_roles: ["home_owner", "contractor"],
//   },
//   {
//     name: "Carlos Ruiz",
//     address: "Av. 9 de Julio, Buenos Aires, Argentina",
//     project_roles: ["contractor"],
//   },
// ];
