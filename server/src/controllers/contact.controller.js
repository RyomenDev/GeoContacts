import axios from "axios";
import conf from "../conf.js";

export const GetFilteredContacts = async (req, res) => {
  try {
    const { role, country, state, city } = req.query;
    const HUBSPOT_API_KEY = conf.HUBSPOT_API_KEY;

    // Build filters dynamically based on query params
    const filters = [];

    if (role) {
      filters.push({
        propertyName: "project_role",
        operator: "CONTAINS_TOKEN", // More reliable than EQ for multi-role fields
        value: role,
      });
    }

    if (country) {
      filters.push({
        propertyName: "country",
        operator: "EQ",
        value: country,
      });
    }

    if (state) {
      filters.push({
        propertyName: "state",
        operator: "EQ",
        value: state,
      });
    }

    if (city) {
      filters.push({
        propertyName: "city",
        operator: "EQ",
        value: city,
      });
    }

    // Always ensure we're pulling contacts with project_role property
    filters.push({
      propertyName: "project_role",
      operator: "HAS_PROPERTY",
    });

    const payload = {
      filterGroups: [
        {
          filters,
        },
      ],
      properties: [
        "firstname",
        "lastname",
        "email",
        "phone",
        "country",
        "state",
        "city",
        "hs_state_code",
        "project_role",
      ],
    };

    const response = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      payload,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Transform and clean up contact data
    const contacts = response.data.results.map((contact) => {
      const {
        firstname,
        lastname,
        email,
        phone,
        country,
        state,
        city,
        hs_state_code,
        project_role,
      } = contact.properties;

      return {
        name: `${firstname || ""} ${lastname || ""}`.trim(),
        email: email || "",
        phone: phone || "",
        address: {
          country: country || "",
          state: state || "",
          city: city || "",
          state_code: hs_state_code || "",
        },
        project_roles:
          project_role
            ?.split(";")
            .map((r) => r.trim())
            .filter(Boolean) || [],
      };
    });

    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const GetLocationFilters = async (req, res) => {
  try {
    const { country, state } = req.query;
    console.log({ country, state });

    const HUBSPOT_API_KEY = conf.HUBSPOT_API_KEY;
    const payload = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "project_role",
              operator: "HAS_PROPERTY",
            },
          ],
        },
      ],
      properties: ["country", "state", "city", "project_role"],
    };

    const response = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      payload,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const results = response.data.results;

    const allCountries = new Set();
    const allStates = new Set();
    const allCities = new Set();
    const allRoles = new Set();

    results.forEach(({ properties }) => {
      const { country, state, city, project_role } = properties;
      if (country) allCountries.add(country);
      if (state) allStates.add(state);
      if (city) allCities.add(city);
      if (project_role) {
        project_role
          .split(";")
          .filter((r) => r)
          .forEach((r) => allRoles.add(r));
      }
    });

    const filtered = results.filter((c) => {
      const { country: cCountry, state: cState } = c.properties;
      if (country && cCountry !== country) return false;
      if (state && cState !== state) return false;
      return true;
    });

    const responseObj = {
      roles: Array.from(allRoles).sort(),
    };

    if (!country && !state) {
      responseObj.countries = Array.from(allCountries).sort();
    }

    if (country && !state) {
      const states = new Set();
      filtered.forEach((c) => {
        if (c.properties.state) states.add(c.properties.state);
      });
      responseObj.states = Array.from(states).sort();
    }

    if (country && state) {
      const cities = new Set();
      filtered.forEach((c) => {
        if (c.properties.city) cities.add(c.properties.city);
      });
      responseObj.cities = Array.from(cities).sort();
    }

    res.json(responseObj);
  } catch (error) {
    console.error("Error fetching location filters:", error.message);
    res.status(500).json({ error: "Failed to fetch location filters" });
  }
};

// export const GetLocationLevels = async (req, res) => {
//   try {
//     const { country, state } = req.query;
//     const HUBSPOT_API_KEY = conf.HUBSPOT_API_KEY;

//     const payload = {
//       filterGroups: [
//         {
//           filters: [
//             {
//               propertyName: "project_role",
//               operator: "HAS_PROPERTY",
//             },
//           ],
//         },
//       ],
//       properties: ["country", "state", "city"],
//     };

//     const response = await axios.post(
//       "https://api.hubapi.com/crm/v3/objects/contacts/search",
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${HUBSPOT_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     let results = response.data.results.map((c) => c.properties);

//     if (country) {
//       results = results.filter(
//         (c) => c.country && c.country.toLowerCase() === country.toLowerCase()
//       );
//     }

//     if (state) {
//       results = results.filter(
//         (c) => c.state && c.state.toLowerCase() === state.toLowerCase()
//       );
//     }

//     const states = new Set();
//     const cities = new Set();

//     if (country && !state) {
//       results.forEach((c) => {
//         if (c.state) states.add(c.state.trim());
//       });
//       return res.json({ states: Array.from(states).sort() });
//     }

//     if (country && state) {
//       results.forEach((c) => {
//         if (c.city) cities.add(c.city.trim());
//       });
//       return res.json({ cities: Array.from(cities).sort() });
//     }

//     res.status(400).json({ error: "Invalid filter level" });
//   } catch (error) {
//     console.error("Error fetching filter levels:", error.message);
//     res.status(500).json({ error: "Failed to fetch filter levels" });
//   }
// };
