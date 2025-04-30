import { useState, useEffect, useRef } from "react";
import ContactCard from "./ContactCard";
import { MapPin } from "lucide-react";
import { GoogleMap } from "../../container";
import ShimmerCard from "./ShimmerCard.jsx";

const ContactList = ({ contacts, loading, error, selectedRole }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      handleSetMapData(contacts);
    }
  }, [contacts, selectedRole]);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1005;
      setIsSmallScreen(isSmall);
      if (isSmall) setViewMode("grid");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSetMapData = (contacts) => {
    const mappedData = contacts.map(({ name, address, project_roles }) => {
      const filteredRoles = selectedRole
        ? project_roles.filter(
            (role) => role.value === selectedRole || role === selectedRole
          )
        : project_roles;

      return {
        name,
        address: `${address.city}, ${address.state}, ${address.country}`,
        project_roles: filteredRoles,
      };
    });

    setMapData(mappedData);
  };

  const handleViewMap = (contacts) => {
    const contactArray = Array.isArray(contacts) ? contacts : [contacts];
    handleSetMapData(contactArray);
    setShowMap(true);
  };

  const handleShowAllContacts = () => setShowMap(false);

  const currentView = isSmallScreen ? "grid" : viewMode;
  const isList = viewMode === "list";

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">ProStruct Contacts</h2>

        <div className="flex flex-wrap gap-3 items-center">
          {contacts.length > 0 && (
            <button
              onClick={() =>
                showMap ? handleShowAllContacts() : handleViewMap(contacts)
              }
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              {showMap ? (
                <>Show All Contacts</>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  View on Map
                </>
              )}
            </button>
          )}

          {!isSmallScreen && (
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="border border-gray-300 bg-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>
          )}
        </div>
      </div>

      <div>
        {showMap ? (
          <GoogleMap data={mapData} />
        ) : loading ? (
          <div
            className={`${
              currentView === "grid"
                ? "grid gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-6"
            }`}
          >
            {[...Array(12)].map((_, idx) => (
              <ShimmerCard idx={idx} isList={isList} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-lg font-semibold text-red-500">
            {error}
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-500">
            No contacts found.
          </div>
        ) : (
          <div
            className={`${
              currentView === "grid"
                ? "grid gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-6"
            }`}
          >
            {contacts.map((contact, idx) => (
              <ContactCard
                key={idx}
                contact={contact}
                handleViewMap={handleViewMap}
                viewMode={currentView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
