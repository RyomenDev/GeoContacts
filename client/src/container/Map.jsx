import MapUI from "../component/Map/MapUI.jsx";

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

let contactsData = [
  {
    name: "Jane Smith",
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
    project_roles: ["home_owner", "referral_partner"],
  },
  {
    name: "Alex Chen",
    address: "350 5th Ave, New York, NY 10118, USA", // Empire State Building
    project_roles: ["contractor", "geo_tech"],
  },
  {
    name: "Sara Patel",
    address: "10 Downing Street, Westminster, London SW1A 2AA, UK",
    project_roles: ["geo_tech"],
  },
  {
    name: "Mohammed Al-Fulan",
    address: "Burj Khalifa, Downtown Dubai, Dubai, UAE",
    project_roles: ["referral_partner"],
  },
  {
    name: "Ananya Rao",
    address:
      "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India",
    project_roles: ["home_owner", "contractor"],
  },
  {
    name: "Carlos Ruiz",
    address: "Av. 9 de Julio, Buenos Aires, Argentina",
    project_roles: ["contractor"],
  },
];


const GoogleMap = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* <MapUI contacts={contactsData} /> */}
      </div>
    </>
  );
};

export default GoogleMap;
