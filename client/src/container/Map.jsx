import { useJsApiLoader } from "@react-google-maps/api";
import MapUI from "../component/Map/MapUI.jsx";
import Spinner from "../utility/Spinner.jsx";
import { useEffect, useState } from "react";

const GoogleMap = ({ data }) => {
//   console.log({ data });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    id: "google-map-script",
  });

  const [mapData, setMapData] = useState([]);
  console.log({ mapData });

  useEffect(() => {
    if (data && data.length > 0) {
      setMapData(data);
    }
  }, [data]);

  if (loadError) {
    return (
      <div className="flex flex-col justify-center items-center space-y-2 md:h-96 lg:h-screen h-80">
        <Spinner />
        <p className="text-lg text-gray-600">
          Error loading map data: {loadError}
        </p>
      </div>
    );
  }

  if (!mapData || mapData.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center space-y-2 md:h-96 lg:h-screen h-80">
        <Spinner />
        <p className="text-lg text-gray-600">
          Loading...
        </p>
      </div>
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
      <MapUI contacts={mapData} /> 
    </div>
  );
};

export default GoogleMap;
