import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const roleIcons = {
  contractor: "⭐",
  geo_tech: "🔺",
  home_owner: "🏠",
  referral_partner: "🤝",
};

const ShimmerMapLoader = () => (
  <div className="w-full h-[80vh] bg-gray-100 animate-pulse rounded-md overflow-hidden">
    <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
  </div>
);

const MapUI = ({ contacts }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);

  const handleMapLoad = async (map) => {
    setMapLoaded(true);
    const geocoder = new window.google.maps.Geocoder();

    const geocodedMarkers = [];

    for (const contact of contacts) {
      if (!contact.address) continue;

      try {
        const response = await geocoder.geocode({ address: contact.address });

        if (response.results.length > 0) {
          const { lat, lng } = response.results[0].geometry.location;

          contact.project_roles.forEach((role) => {
            geocodedMarkers.push({
              position: { lat: lat(), lng: lng() },
              label: roleIcons[role] || "📍",
              name: contact.name,
            });
          });
        }
      } catch (err) {
        console.error("Geocoding failed for:", contact.name, err);
        setError(`Error geocoding: ${contact.name}`);
      }
    }

    setMarkers(geocodedMarkers);
  };

  const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629,
  };

  return (
    <div className="relative p-4">
      {!mapLoaded && <ShimmerMapLoader />}

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        loadingElement={<div className="hidden" />}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={3}
          onLoad={handleMapLoad}
          options={{ gestureHandling: "greedy" }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              label={marker.label}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {mapLoaded && (
        <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 shadow-md rounded-md p-3 text-sm z-10">
          <h2 className="font-semibold mb-2">Legend</h2>
          <ul className="space-y-1">
            <li>⭐ Contractor</li>
            <li>🔺 Geo Tech</li>
            <li>🏠 Home Owner</li>
            <li>🤝 Referral Partner</li>
          </ul>
        </div>
      )}

      {error && (
        <div className="absolute bottom-6 right-6 bg-red-100 text-red-700 p-3 rounded-md shadow-md z-10">
          {error}
        </div>
      )}
    </div>
  );
};

export default MapUI;

// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { useRef, useState } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "80vh",
// };

// const center = {
//   lat: 23.2599,
//   lng: 77.4126,
// };

// const roleIcons = {
//   contractor: "⭐",
//   geo_tech: "🔺",
//   home_owner: "🏠",
//   referral_partner: "🤝",
// };

// const ShimmerMapLoader = () => (
//   <div className="w-full h-[80vh] bg-gray-100 animate-pulse rounded-md overflow-hidden">
//     <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
//   </div>
// );

// const MapUI = ({ contacts }) => {
//   const mapRef = useRef(null);
//   const omsRef = useRef(null);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [selectedMarker, setSelectedMarker] = useState(null); // For managing selected marker

//   const handleMapLoad = async (map) => {
//     mapRef.current = map;

//     const OverlappingMarkerSpiderfierModule = await import(
//       "overlapping-marker-spiderfier"
//     );
//     const OverlappingMarkerSpiderfier =
//       OverlappingMarkerSpiderfierModule.default;

//     omsRef.current = new OverlappingMarkerSpiderfier(map, {
//       markersWontMove: true,
//       markersWontHide: true,
//       keepSpiderfied: true,
//     });

//     contacts.forEach((contact) => {
//       if (!contact.coords || !contact.project_roles) return;

//       contact.project_roles.forEach((role) => {
//         const marker = new window.google.maps.Marker({
//           position: contact.coords,
//           label: roleIcons[role] || "📍",
//           map,
//         });

//         // Open InfoWindow on Marker Click
//         marker.addListener("click", () => {
//           setSelectedMarker(contact);
//         });

//         omsRef.current.addMarker(marker);
//       });
//     });

//     setMapLoaded(true);
//   };

//   return (
//     <div className="relative p-4">
//       {!mapLoaded && <ShimmerMapLoader />}

//       <LoadScript
//         googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
//         loadingElement={<div className="hidden" />} // removes "Loading..." fallback
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={6}
//           onLoad={handleMapLoad}
//           options={{ gestureHandling: "greedy" }}
//         >
//           {/* Info Window for selected marker */}
//           {selectedMarker && (
//             <InfoWindow
//               position={selectedMarker.coords}
//               onCloseClick={() => setSelectedMarker(null)}
//             >
//               <div>
//                 <h3>{selectedMarker.name}</h3>
//                 <p>{selectedMarker.role}</p>
//                 <p>{selectedMarker.address}</p> {/* Add more info as needed */}
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </LoadScript>

//       {mapLoaded && (
//         <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 shadow-md rounded-md p-3 text-sm z-10">
//           <h2 className="font-semibold mb-2">Legend</h2>
//           <ul className="space-y-1">
//             <li>⭐ Contractor</li>
//             <li>🔺 Geo Tech</li>
//             <li>🏠 Home Owner</li>
//             <li>🤝 Referral Partner</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapUI;
