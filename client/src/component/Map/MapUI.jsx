import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";

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

const MapUI = ({ contacts }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    const geocodedMarkers = [];
    let firstValidLatLng = null;

    const geocodeContacts = async () => {
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
                roles: contact.project_roles,
                address: contact.address,
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

    geocodeContacts();
  }, [contacts]);

  const handleMapLoad = (map) => {
    setMapLoaded(true);
    addLegendControl(map);
  };

  const addLegendControl = (map) => {
    const legendDiv = document.createElement("div");
    legendDiv.classList.add(
      "p-2",
      "bg-white",
      "border",
      "rounded",
      "shadow-lg"
    );

    const legendHTML = `
      <h2 class="font-semibold mb-3 text-center text-sm">Legend</h2>
      <ul class="space-y-2 text-center text-xs">
        <li>⭐ Contractor</li>
        <li>🔺 Geo Tech</li>
        <li>🏠 Home Owner</li>
        <li>🤝 Referral Partner</li>
        <li>🌐 Community Partner</li>
        <li>📣 Affiliate</li>
      </ul>
    `;

    legendDiv.innerHTML = legendHTML;
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(legendDiv);
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={handleMapLoad}
        options={{
          gestureHandling: "greedy",
          mapTypeId: "roadmap",
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            label={marker.label}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {/* {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-xs text-sm">
              <h3 className="font-semibold mb-1">{selectedMarker.name}</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                {selectedMarker.roles.map((role, i) => (
                  <li key={i}>
                    {roleIcons[role] || "📍"} {role.replace(/_/g, " ")}
                  </li>
                ))}
              </ul>
            </div>
          </InfoWindow>
        )} */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-xs text-sm">
              <h3 className="font-semibold mb-1">{selectedMarker.name}</h3>
              <p className="text-gray-600 text-xs mb-1 italic">
                {selectedMarker.address}
              </p>{" "}
              <ul className="text-xs text-gray-700 space-y-1">
                {selectedMarker.roles.map((role, i) => (
                  <li key={i}>
                    {roleIcons[role] || "📍"} {role.replace(/_/g, " ")}
                  </li>
                ))}
              </ul>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {error && (
        <div className="absolute bottom-6 right-6 bg-red-100 text-red-700 p-3 rounded-md shadow-lg z-10 max-w-xs md:max-w-md">
          {error}
        </div>
      )}
    </>
  );
};

export default MapUI;
