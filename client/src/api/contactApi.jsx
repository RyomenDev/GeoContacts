import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const BASE_URL = `${SERVER_URL}/api/contacts`;

export const fetchFilterOptions = () => {
  return axios.get(`${BASE_URL}/filters`).then((res) => res.data);
};

export const fetchStates = (country) => {
  return axios
    .get(`${BASE_URL}/filters?country=${encodeURIComponent(country)}`)
    .then((res) => res.data);
};

export const fetchCities = (country, state) => {
  return axios
    .get(
      `${BASE_URL}/filters?country=${encodeURIComponent(
        country
      )}&state=${encodeURIComponent(state)}`
    )
    .then((res) => res.data);
};

export const fetchFilteredContacts = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return axios
    .get(`${BASE_URL}/filteredContacts/?${params}`)
    .then((res) => res.data);
};

