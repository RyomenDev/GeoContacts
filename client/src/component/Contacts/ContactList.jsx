import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import { MapPin } from "lucide-react";

const ContactList = ({ contacts, loading, error }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewMap = (city, state, country) => {
    console.log("View map for:", city, state, country);
  };

  const handleViewAllMap = (contacts) => {
    console.log("View map for:", contacts);
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
              onClick={() => handleViewAllMap(contacts)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              <MapPin className="w-5 h-5" />
              View on Map
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

      {loading ? (
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
