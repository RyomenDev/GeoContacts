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
  affiliate: "📣",
  community_partner: "🌐",
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
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); 

  const handleMapLoad = async (map) => {
    setMapLoaded(true);
    const geocoder = new window.google.maps.Geocoder();
    const geocodedMarkers = [];

    let firstValidLatLng = null;

    for (const contact of contacts) {
      if (!contact.address) continue;

      try {
        const response = await geocoder.geocode({ address: contact.address });

        if (response.results.length > 0) {
          const { lat, lng } = response.results[0].geometry.location;

          if (!firstValidLatLng) {
            firstValidLatLng = { lat: lat(), lng: lng() };
            setCenter(firstValidLatLng);
          }

          contact.project_roles.forEach((role, i) => {
            geocodedMarkers.push({
              position: {
                lat: lat(),
                lng: lng() + i * 0.0002, 
              },
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

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={handleMapLoad}
        options={{ gestureHandling: "greedy" }}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} label={marker.label} />
        ))}
      </GoogleMap>

      {mapLoaded && (
        <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 shadow-md rounded-md p-3 text-sm z-10">
          <h2 className="font-semibold mb-2">Legend</h2>
          <ul className="space-y-1">
            <li>⭐ Contractor</li>
            <li>🔺 Geo Tech</li>
            <li>🏠 Home Owner</li>
            <li>🤝 Referral Partner</li>
            <li>🌐 community partner</li>
            <li>📣 affiliate</li>
          </ul>
        </div>
      )}

      {error && (
        <div className="absolute bottom-6 right-6 bg-red-100 text-red-700 p-3 rounded-md shadow-md z-10">
          {error}
        </div>
      )}
    </>
  );
};

export default MapUI;
