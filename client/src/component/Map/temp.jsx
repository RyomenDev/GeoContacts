// import { GoogleMap, LoadScript } from "@react-google-maps/api";
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
//         />
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


import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: 23.2599,
  lng: 77.4126,
};

const roleIcons = {
  contractor: "⭐",
  geo_tech: "🔺",
  home_owner: "🏠",
  referral_partner: "🤝",
};

const ShimmerMapLoader = () => {
  return (
    <div className="w-full h-[80vh] bg-gray-100 animate-pulse rounded-md overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  );
};

const MapUI = ({ contacts }) => {
  const mapRef = useRef(null);
  const omsRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = async (map) => {
    mapRef.current = map;

    const OverlappingMarkerSpiderfierModule = await import(
      "overlapping-marker-spiderfier"
    );
    const OverlappingMarkerSpiderfier =
      OverlappingMarkerSpiderfierModule.default;

    omsRef.current = new OverlappingMarkerSpiderfier(map, {
      markersWontMove: true,
      markersWontHide: true,
      keepSpiderfied: true,
    });

    contacts.forEach((contact) => {
      if (!contact.coords || !contact.project_roles) return;

      contact.project_roles.forEach((role) => {
        const marker = new window.google.maps.Marker({
          position: contact.coords,
          label: roleIcons[role] || "📍",
          map,
        });

        omsRef.current.addMarker(marker);
      });
    });

    setMapLoaded(true);
  };

  return (
    <div className="relative p-4">
      {!mapLoaded && <ShimmerMapLoader />}

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          onLoad={handleMapLoad}
          options={{ gestureHandling: "greedy" }}
        />
      </LoadScript>

      {/* Show Legend after map has loaded */}
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
    </div>
  );
};

export default MapUI;



// import { GoogleMap, LoadScript } from "@react-google-maps/api";
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

// const MapUI = ({ contacts }) => {
//   const mapRef = useRef(null);
//   const omsRef = useRef(null);
//   const [mapLoaded, setMapLoaded] = useState(false); // Track map load state

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

//         omsRef.current.addMarker(marker);
//       });
//     });

//     // Show legend once map and markers are ready
//     setMapLoaded(true);
//   };

//   return (
//     <div className="relative p-4">
//       <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={6}
//           onLoad={handleMapLoad}
//         />
//       </LoadScript>

//       {/* Legend appears only after map is fully loaded */}
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

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "80vh",
  position: "relative", // Important for positioning the legend inside
};

const center = {
  lat: 23.2599,
  lng: 77.4126,
};

const roleIcons = {
  contractor: "⭐",
  geo_tech: "🔺",
  home_owner: "🏠",
  referral_partner: "🤝",
};

const MapUI = ({ contacts }) => {
  const mapRef = useRef(null);
  const omsRef = useRef(null);

  const handleMapLoad = async (map) => {
    mapRef.current = map;

    const OverlappingMarkerSpiderfierModule = await import(
      "overlapping-marker-spiderfier"
    );
    const OverlappingMarkerSpiderfier =
      OverlappingMarkerSpiderfierModule.default;

    omsRef.current = new OverlappingMarkerSpiderfier(map, {
      markersWontMove: true,
      markersWontHide: true,
      keepSpiderfied: true,
    });

    contacts.forEach((contact) => {
      if (!contact.coords || !contact.project_roles) return;

      contact.project_roles.forEach((role) => {
        const marker = new window.google.maps.Marker({
          position: contact.coords,
          label: roleIcons[role] || "📍",
          map,
        });

        omsRef.current.addMarker(marker);
      });
    });
  };

  return (
    <div className="relative p-4">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          onLoad={handleMapLoad}
        />
      </LoadScript>

      {/* Legend overlay inside the map container */}
      {/* Legend overlay inside the map container */}
      <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 shadow-md rounded-md p-3 text-sm z-10">
        <h2 className="font-semibold mb-2">Legend</h2>
        <ul className="space-y-1">
          <li>
            <span>⭐</span> Contractor
          </li>
          <li>
            <span>🔺</span> Geo Tech
          </li>
          <li>
            <span>🏠</span> Home Owner
          </li>
          <li>
            <span>🤝</span> Referral Partner
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MapUI;

// import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { useRef } from "react";

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

// const MapUI = ({ contacts }) => {
//   const mapRef = useRef(null);
//   const omsRef = useRef(null);

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

//         omsRef.current.addMarker(marker);
//       });
//     });
//   };

//   return (
//     <div className="p-4">
//       <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={6}
//           onLoad={handleMapLoad}
//         />
//       </LoadScript>

//       {/* Legend */}
//       <div className="mt-4 bg-white shadow rounded p-4 max-w-md">
//         <h2 className="text-lg font-semibold mb-2">Legend</h2>
//         <ul className="space-y-1 text-sm">
//           <li>⭐ Contractor</li>
//           <li>🔺 Geo Tech</li>
//           <li>🏠 Home Owner</li>
//           <li>🤝 Referral Partner</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MapUI;

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

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

const offsetMarkerPosition = (lat, lng, index, total) => {
  const radius = 0.0003;
  const angle = (index / total) * 2 * Math.PI;
  return {
    lat: lat + radius * Math.cos(angle),
    lng: lng + radius * Math.sin(angle),
  };
};

const MapUI = ({ contacts }) => {
  const mapRef = useRef(null);

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;

      const bounds = new window.google.maps.LatLngBounds();

      contacts.forEach((contact) => {
        if (!contact.coords || !contact.project_roles) return;

        contact.project_roles.forEach((_, i) => {
          const { lat, lng } = offsetMarkerPosition(
            contact.coords.lat,
            contact.coords.lng,
            i,
            contact.project_roles.length
          );
          bounds.extend({ lat, lng });
        });
      });

      map.fitBounds(bounds);
    },
    [contacts]
  );

  return (
    <div className="p-4">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          defaultZoom={6}
          defaultCenter={{ lat: 20.5937, lng: 78.9629 }} // India center fallback
        >
          {contacts.map((contact, idx) => {
            if (!contact.coords || !contact.project_roles) return null;

            return contact.project_roles.map((role, i) => {
              const { lat, lng } = offsetMarkerPosition(
                contact.coords.lat,
                contact.coords.lng,
                i,
                contact.project_roles.length
              );
              return (
                <Marker
                  key={`${idx}-${i}`}
                  position={{ lat, lng }}
                  label={roleIcons[role] || "📍"}
                />
              );
            });
          })}
        </GoogleMap>
      </LoadScript>

      {/* Legend */}
      <div className="mt-4 bg-white shadow rounded p-4 max-w-md">
        <h2 className="text-lg font-semibold mb-2">Legend</h2>
        <ul className="space-y-1 text-sm">
          <li>⭐ Contractor</li>
          <li>🔺 Geo Tech</li>
          <li>🏠 Home Owner</li>
          <li>🤝 Referral Partner</li>
        </ul>
      </div>
    </div>
  );
};

export default MapUI;

// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "80vh",
// };

// const roleIcons = {
//   contractor: "⭐",
//   geo_tech: "🔺",
//   home_owner: "🏠",
//   referral_partner: "🤝",
// };

// const center = {
//   //   lat: 43.6532,
//   lat: 28.6139,
//   //   lng: -79.3832,
//   lng: 77.209,
// };

// const MapUI = ({ contacts }) => {
//   return (
//     <div className="p-4">
//       <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
//           {contacts.map(
//             (contact, idx) =>
//               contact.coords &&
//               contact.project_roles.map((role, i) => (
//                 <Marker
//                   key={`${idx}-${i}`}
//                   position={contact.coords}
//                   label={roleIcons[role] || "📍"}
//                 />
//               ))
//           )}
//         </GoogleMap>
//       </LoadScript>

//       {/* Legend */}
//       <div className="mt-4 bg-white shadow rounded p-4 max-w-md">
//         <h2 className="text-lg font-semibold mb-2">Legend</h2>
//         <ul className="space-y-1 text-sm">
//           <li>⭐ Contractor</li>
//           <li>🔺 Geo Tech</li>
//           <li>🏠 Home Owner</li>
//           <li>🤝 Referral Partner</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MapUI;
