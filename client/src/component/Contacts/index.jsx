// components/ContactFilter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactFilter = () => {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    role: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/contacts");
        setContacts(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const result = contacts.filter((contact) => {
      const roleMatch = filters.role
        ? contact.project_roles.some((r) =>
            r.toLowerCase().includes(filters.role.toLowerCase())
          )
        : true;
      const cityMatch = filters.city
        ? contact.address.city
            .toLowerCase()
            .includes(filters.city.toLowerCase())
        : true;
      const stateMatch = filters.state
        ? contact.address.state
            .toLowerCase()
            .includes(filters.state.toLowerCase())
        : true;
      const countryMatch = filters.country
        ? contact.address.country
            .toLowerCase()
            .includes(filters.country.toLowerCase())
        : true;

      return roleMatch && cityMatch && stateMatch && countryMatch;
    });

    setFiltered(result);
  }, [filters, contacts]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Filter</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          name="role"
          placeholder="Filter by Role"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="city"
          placeholder="Filter by City"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="state"
          placeholder="Filter by State"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="country"
          placeholder="Filter by Country"
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((contact, idx) => (
          <div
            key={idx}
            className="p-4 rounded border bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-lg">{contact.name}</p>
            <p className="text-sm text-gray-600">
              📞 {contact.phone} | 📧 {contact.email}
            </p>
            <p className="text-sm">
              🏙️ {contact.address.city}, {contact.address.state},{" "}
              {contact.address.country}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Roles: {contact.project_roles.join(", ")}
            </p>
            <p className="text-sm italic mt-1 text-green-700">
              Suggestion: You can contact {contact.name} in{" "}
              {contact.address.city} as a{" "}
              {contact.project_roles.length
                ? contact.project_roles[0]
                : "member"}
              .
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFilter;
