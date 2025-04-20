import { useEffect, useState } from "react";
import axios from "axios";

const ContactFilter = () => {
  const [contacts, setContacts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    states: [],
    cities: [],
  });
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    role: "",
  });

  // Fetch filter options
  useEffect(() => {
    const getOptions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/contacts/filters"
        );
        setFilterOptions(res.data);
      } catch (err) {
        console.error("Failed to fetch filter options", err);
      }
    };
    getOptions();
  }, []);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.role) params.append("role", filters.role);
        if (filters.city) params.append("city", filters.city);
        if (filters.state) params.append("state", filters.state);
        if (filters.country) params.append("country", filters.country);

        const res = await axios.get(
          `http://localhost:3000/api/admin/contacts?${params}`
        );
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts", err);
      }
    };

    fetchContacts();
  }, [filters]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Filter Contacts</h2>
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        >
          <option value="">Select Country</option>
          {filterOptions.countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        >
          <option value="">Select State</option>
          {filterOptions.states.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="">Select City</option>
          {filterOptions.cities.map((city, i) => (
            <option key={i} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Role (e.g., Geo Tech)"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold">Matched Contacts:</h3>
        {contacts.map((contact, idx) => (
          <div key={idx} className="p-2 border-b">
            <p>
              <strong>{contact.name}</strong> (
              {contact.project_roles.join(", ")})
            </p>
            <p>
              {contact.address.city}, {contact.address.state},{" "}
              {contact.address.country}
            </p>
            <p>
              {contact.email} | {contact.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFilter;
