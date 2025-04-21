import { useState, useEffect, useRef } from "react";
import ContactCard from "./ContactCard";
import { MapPin } from "lucide-react";
import { GoogleMap } from "../../container";

const ContactList = ({ contacts, loading, error }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Use useRef to store map data without triggering re-renders
  const mapDataRef = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSetMapData = (contacts) => {
    const filteredData = contacts.map((contact) => ({
      name: contact.name,
      address: `${contact.address.city}, ${contact.address.state}, ${contact.address.country}`,
      project_roles: contact.project_roles,
    }));
    mapDataRef.current = filteredData;
    // console.log("Map data after setting:", mapDataRef.current);
  };

  const handleViewMap = (contacts) => {
    // If it's a single contact, convert it into an array
    const contactsArray = Array.isArray(contacts) ? contacts : [contacts];
    handleSetMapData(contactsArray);
    setShowMap(true);
  };

  const handleShowAllContacts = () => {
    setShowMap(false);
  };

  const currentView = isSmallScreen ? "grid" : viewMode;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
          Matched Contacts
        </h3>

        <div className="flex items-center gap-3">
          {contacts.length !== 0 && (
            <button
              onClick={() =>
                showMap ? handleShowAllContacts() : handleViewMap(contacts)
              }
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              {showMap ? (
                <> Show All Contacts</>
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

      {showMap ? (
        <GoogleMap data={mapDataRef.current} />
      ) : loading ? (
        <div className="text-center text-lg font-semibold text-gray-600">
          Loading...
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
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
  );
};

export default ContactList;
