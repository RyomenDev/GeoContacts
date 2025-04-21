import { UserCircle2, MapPin } from "lucide-react";


const ContactCard = ({ contact, handleViewMap, viewMode }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-6 border transition-all duration-300 hover:shadow-2xl transform hover:scale-105`}
    >
      <div className={`${viewMode === "list" ? "grid grid-cols-3 gap-4" : ""}`}>
        <div className="flex items-center gap-3 mb-4">
          <UserCircle2 className="text-blue-500 w-8 h-8" />
          <div>
            <h4 className="text-lg font-semibold">{contact.name}</h4>
            <p className="text-sm text-gray-600">
              {contact.project_roles?.join(", ") || "—"}
            </p>
          </div>
        </div>

        {viewMode != "list" && <div className="border-t" />}

        <div className="flex flex-col">
          <p>
            <span className="font-medium">E-mail:</span>{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 underline"
            >
              {contact.email}
            </a>
          </p>
          <p>
            <span className="font-medium">Phone:</span> {contact.phone}
          </p>
          <p>
            <span className="font-medium">Location:</span>{" "}
            {contact.address.city}, {contact.address.state},{" "}
            {contact.address.country}
          </p>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() =>
              handleViewMap(
                contact.address.city,
                contact.address.state,
                contact.address.country
              )
            }
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 flex items-center gap-2 justify-center"
          >
            <MapPin className="w-4 h-4" />
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
