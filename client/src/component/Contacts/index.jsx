import { useEffect, useState } from "react";
import axios from "axios";

const ContactFilter = () => {
  const [contacts, setContacts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    states: [],
    cities: [],
    roles: [],
  });

  const [filters, setFilters] = useState({
    country: "",
    state: "",
    city: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch countries and roles initially
  useEffect(() => {
    const getInitialOptions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/contacts/filters"
        );
        setFilterOptions((prev) => ({
          ...prev,
          countries: res.data.countries || [],
          roles: res.data.roles || [],
        }));
      } catch (err) {
        console.error("Failed to load filter options", err);
        setError("Could not load filter options.");
      }
    };

    getInitialOptions();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!filters.country) {
        setFilterOptions((prev) => ({ ...prev, states: [], cities: [] }));
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/contacts/filters?country=${encodeURIComponent(
            filters.country
          )}`
        );
        setFilterOptions((prev) => ({
          ...prev,
          states: res.data.states || [],
          cities: [], // reset cities
        }));
      } catch (err) {
        console.error("Error fetching states", err);
        setError("Failed to load states.");
      }
    };

    fetchStates();
  }, [filters.country]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!filters.country || !filters.state) {
        setFilterOptions((prev) => ({ ...prev, cities: [] }));
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/contacts/filters?country=${encodeURIComponent(
            filters.country
          )}&state=${encodeURIComponent(filters.state)}`
        );
        setFilterOptions((prev) => ({
          ...prev,
          cities: res.data.cities || [],
        }));
      } catch (err) {
        console.error("Error fetching cities", err);
        setError("Failed to load cities.");
      }
    };

    fetchCities();
  }, [filters.state, filters.country]);

  // Fetch filtered contacts
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        const res = await axios.get(
          `http://localhost:3000/api/contacts/filteredContacts/?${params}`
        );
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts", err);
        setError("Could not load contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [filters]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Filter Contacts</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Country Filter */}
        <select
          value={filters.country}
          onChange={(e) =>
            setFilters({
              ...filters,
              country: e.target.value,
              state: "",
              city: "",
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Country</option>
          {filterOptions.countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Filter */}
        {/* <select
          value={filters.state}
          onChange={(e) =>
            setFilters({
              ...filters,
              state: e.target.value,
              city: "",
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select State</option>
          {filterOptions.states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select> */}
        <select
          value={filters.state}
          onChange={(e) =>
            setFilters({
              ...filters,
              state: e.target.value,
              city: "",
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select State</option>
          {!filters.country ? (
            <option disabled>Select Country First</option>
          ) : filterOptions.states.length === 0 ? (
            <option disabled>No States Available</option>
          ) : (
            filterOptions.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))
          )}
        </select>

        {/* City Filter */}
        {/* <select
          value={filters.city}
          onChange={(e) =>
            setFilters({
              ...filters,
              city: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select City</option>
          {filterOptions.cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select> */}
        <select
          value={filters.city}
          onChange={(e) =>
            setFilters({
              ...filters,
              city: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select City</option>
          {!filters.state ? (
            <option disabled>Select State First</option>
          ) : filterOptions.cities.length === 0 ? (
            <option disabled>No Cities Available</option>
          ) : (
            filterOptions.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          )}
        </select>

        {/* Role Filter */}
        <select
          value={filters.role}
          onChange={(e) =>
            setFilters({
              ...filters,
              role: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Role</option>
          {filterOptions.roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Contact Results */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Matched Contacts:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          contacts.map((contact, idx) => (
            <div key={idx} className="p-2 border-b">
              <p>
                <strong>{contact.name}</strong> (
                {contact.project_roles?.join(", ")})
              </p>
              <p>
                {contact.address.city}, {contact.address.state},{" "}
                {contact.address.country}
              </p>
              <p>
                {contact.email} | {contact.phone}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactFilter;
