import { useEffect, useState } from "react";
import {
  fetchFilterOptions,
  fetchStates,
  fetchCities,
  fetchFilteredContacts,
} from "../api/contactApi.jsx";
import { apiHandler } from "../utility/apiHandler.jsx";
const useContactFilters = () => {
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

  useEffect(() => {
    const getInitialOptions = async () => {
      const { data, error } = await apiHandler(fetchFilterOptions);
      if (data) {
        setFilterOptions((prev) => ({
          ...prev,
          countries: data.countries || [],
          roles: data.roles || [],
        }));
      } else {
        console.error("Failed to load filter options:", error);
        setError("Could not load filter options.");
      }
    };

    getInitialOptions();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      if (!filters.country) {
        setFilterOptions((prev) => ({ ...prev, states: [], cities: [] }));
        return;
      }

      const { data, error } = await apiHandler(fetchStates, filters.country);
      if (data) {
        setFilterOptions((prev) => ({
          ...prev,
          states: data.states || [],
          cities: [],
        }));
      } else {
        console.error("Failed to load states:", error);
        setError("Failed to load states.");
      }
    };

    getStates();
  }, [filters.country]);

  useEffect(() => {
    const getCities = async () => {
      if (!filters.country || !filters.state) {
        setFilterOptions((prev) => ({ ...prev, cities: [] }));
        return;
      }

      const { data, error } = await apiHandler(
        fetchCities,
        filters.country,
        filters.state
      );
      if (data) {
        setFilterOptions((prev) => ({
          ...prev,
          cities: data.cities || [],
        }));
      } else {
        console.error("Failed to load cities:", error);
        setError("Failed to load cities.");
      }
    };

    getCities();
  }, [filters.state, filters.country]);

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await apiHandler(fetchFilteredContacts, filters);
      if (data) {
        setContacts(data);
      } else {
        console.error("Failed to load contacts:", error);
        setError("Could not load contacts.");
      }

      setLoading(false);
    };

    getContacts();
  }, [filters]);

  return {
    filters,
    setFilters,
    filterOptions,
    contacts,
    loading,
    error,
  };
};

export default useContactFilters;

