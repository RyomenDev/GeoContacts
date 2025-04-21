


import axios from "axios";

const BASE_URL = "http://localhost:3000/api/contacts";

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


// const MOCK_CONTACTS = [
//   {
//     name: "Ananya  Sharma",
//     email: "ananya@example.com",
//     phone: "+919876543210",
//     address: {
//       country: "India",
//       state: "Maharashtra",
//       city: "Mumbai",
//       state_code: "MH",
//     },
//     project_roles: ["community_partner", "contractor"],
//   },
//   {
//     name: "Priya  Desai",
//     email: "priya@example.com",
//     phone: "+112344521154",
//     address: {
//       country: "India",
//       state: "Karnataka",
//       city: "Bangalor",
//       state_code: "KA",
//     },
//     project_roles: ["referral_partner", "home_owner"],
//   },
//   {
//     name: "Arjun  Mehta",
//     email: "arjun@example.com",
//     phone: "+112356448456",
//     address: {
//       country: "India",
//       state: "Maharashtra",
//       city: "Pune",
//       state_code: "MH",
//     },
//     project_roles: ["affiliate", "geo_tech"],
//   },
//   {
//     name: "Sara  Khan",
//     email: "sara@example.com",
//     phone: "+916545874524",
//     address: {
//       country: "India",
//       state: "Karnataka",
//       city: "Mangalore",
//       state_code: "KA",
//     },
//     project_roles: ["home_owner", "referral_partner"],
//   },
//   {
//     name: "Amit  Singh",
//     email: "amit@example.com",
//     phone: "+919546814552",
//     address: {
//       country: "India",
//       state: "Maharashtra",
//       city: "Nagpur",
//       state_code: "MH",
//     },
//     project_roles: ["geo_tech", "affiliate", "referral_partner"],
//   },
//   {
//     name: "Vikram  Rao",
//     email: "vikram@example.com",
//     phone: "+917152454157",
//     address: {
//       country: "India",
//       state: "Delhi",
//       city: "Dwarka",
//       state_code: "DL",
//     },
//     project_roles: ["contractor", "home_owner", "affiliate"],
//   },
//   {
//     name: "Emily  Smith",
//     email: "emily@example.com",
//     phone: "+918656424544",
//     address: {
//       country: "USA",
//       state: "California",
//       city: "San Francisco",
//       state_code: "CA",
//     },
//     project_roles: ["affiliate", "community_partner"],
//   },
//   {
//     name: "John  Doe",
//     email: "john@example.com",
//     phone: "+919454454142",
//     address: {
//       country: "USA",
//       state: "New York",
//       city: "New York City",
//       state_code: "NY",
//     },
//     project_roles: ["geo_tech", "affiliate"],
//   },
//   {
//     name: "Jessica  Lee",
//     email: "jessica@example.com",
//     phone: "+919564724854",
//     address: {
//       country: "USA",
//       state: "California",
//       city: "Los Angeles",
//       state_code: "CA",
//     },
//     project_roles: ["geo_tech", "affiliate", "community_partner"],
//   },
//   {
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     phone: "+1987654321",
//     address: {
//       country: "Canada",
//       state: "Ontario",
//       city: "Toronto",
//       state_code: "CN",
//     },
//     project_roles: ["home_owner", "referral_partner"],
//   },
// ];

// // Utility for unique values
// const getUnique = (arr) => [...new Set(arr)];

// // Extracted options for filters
// const countries = getUnique(MOCK_CONTACTS.map((c) => c.address.country));
// const states = {};
// const cities = {};

// MOCK_CONTACTS.forEach((c) => {
//   const { country, state, city } = c.address;

//   if (!states[country]) states[country] = new Set();
//   states[country].add(state);

//   if (!cities[country]) cities[country] = {};
//   if (!cities[country][state]) cities[country][state] = new Set();
//   cities[country][state].add(city);
// });

// Object.keys(states).forEach((c) => (states[c] = Array.from(states[c])));
// Object.keys(cities).forEach((c) => {
//   Object.keys(cities[c]).forEach((s) => {
//     cities[c][s] = Array.from(cities[c][s]);
//   });
// });

// // --------- EXPORTABLE FUNCTIONS ---------

// export const fetchFilterOptions = () => {
//   return Promise.resolve({ countries });
// };

// export const fetchStates = (country) => {
//   return Promise.resolve({ states: states[country] || [] });
// };

// export const fetchCities = (country, state) => {
//   return Promise.resolve({ cities: cities[country]?.[state] || [] });
// };

// export const fetchFilteredContacts = (filters) => {
//   const { country, state, city, project_role } = filters;

//   const filtered = MOCK_CONTACTS.filter((c) => {
//     const addr = c.address || {};
//     const roleMatch = !project_role || c.project_roles.includes(project_role);

//     return (
//       (!country || addr.country === country) &&
//       (!state || addr.state === state) &&
//       (!city || addr.city === city) &&
//       roleMatch
//     );
//   });

//   return Promise.resolve(filtered);
// };
