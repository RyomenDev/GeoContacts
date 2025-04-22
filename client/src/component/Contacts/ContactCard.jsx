import { Mail, Phone, MapPin, MapPinned } from "lucide-react";

const formatRole = (role) => {
  if (!role) return "—";
  return role
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
};

const getInitials = (name) => {
  if (typeof name !== "string" || name.trim().length === 0) return "—";
  const words = name.trim().split(" ");
  return words
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
};

const ContactCard = ({ contact, handleViewMap, viewMode }) => {
  const isList = viewMode === "list";

  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col overflow-hidden ${
        isList ? "min-h-[180px]" : "min-h-[320px]"
      }`}
    >
      <div
        className={`${
          isList
            ? "grid grid-cols-12 items-center gap-4"
            : "flex flex-col justify-between"
        } h-full`}
      >
        <div
          className={`${
            isList ? "col-span-3" : "flex items-center gap-4 mb-4"
          }`}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-inner">
            {getInitials(contact.name)}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {contact.name}
            </h4>
            <p className="text-sm text-gray-500">
              {/* {contact.project_roles?.join(", ") || "—"} */}
              {contact.project_roles?.length > 0
                ? contact.project_roles.map(formatRole).join(", ")
                : "—"}
            </p>
          </div>
        </div>
        <div
          className={`text-sm italic text-gray-600 ${
            isList ? "col-span-4" : "mb-4 col-span-3"
          }`}
        >
          You can contact {contact.name} in {contact.address?.city || "N/A"} as{" "}
          {contact.project_roles?.length > 0
            ? contact.project_roles.map(formatRole).join(", ")
            : "—"}
          .
        </div>

        <div
          className={`${
            isList ? "col-span-4" : ""
          } flex flex-col gap-2 text-sm text-gray-700`}
        >
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 hover:underline"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-500" />
            <span>{contact.phone || "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinned className="w-4 h-4 text-red-500" />
            <span>
              {contact.address?.city || "N/A"}, {contact.address?.state || "—"},{" "}
              {contact.address?.country || "—"}
            </span>
          </div>
        </div>

        <div
          className={`${
            isList ? "col-span-1 justify-end" : "justify-center"
          } flex mt-4 sm:mt-0`}
        >
          <button
            onClick={() => handleViewMap(contact)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

{
  /* <div
          className={`text-sm italic text-gray-600 ${
            isList ? "col-span-4" : "mb-4 col-span-3"
          }`}
        >
          You can contact {contact.name} in {contact.address?.city || "N/A"} as{" "}
          {formatRole(contact.project_roles?.[0])}.
        </div> */
}
