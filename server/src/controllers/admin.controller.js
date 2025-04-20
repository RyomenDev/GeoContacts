import axios from "axios";
import conf from "../conf.js";
// console.log(conf.PORT, conf.HUBSPOT_API_KEY);

export const GetAllContacts = async (req, res) => {
  try {
    const HUBSPOT_API_KEY = conf.HUBSPOT_API_KEY;
    const hubspotUrl = `https://api.hubapi.com/crm/v3/objects/contacts/search`;
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

    const response = await axios.post(hubspotUrl, payload, {
      headers: {
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const formattedContacts = response.data.results.map((contact) => ({
      name: `${contact.properties.firstname || ""} ${
        contact.properties.lastname || ""
      }`.trim(),
      email: contact.properties.email || "",
      phone: contact.properties.phone || "",
      address: {
        country: contact.properties.country || "",
        state: contact.properties.state || "",
        city: contact.properties.city || "",
        state_code: contact.properties.hs_state_code || "",
      },
      project_roles: contact.properties.project_role?.split(";") || [],
    }));

    res.json(formattedContacts);
  } catch (error) {
    console.error(
      "Error fetching contacts:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};


// server/controllers/contactController.js
export const GetLocationFilters = async (req, res) => {
  try {
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
      properties: ["country", "state", "city"],
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

    const countries = new Set();
    const states = new Set();
    const cities = new Set();

    results.forEach((contact) => {
      const { country, state, city } = contact.properties;
      if (country) countries.add(country.trim());
      if (state) states.add(state.trim());
      if (city) cities.add(city.trim());
    });

    res.json({
      countries: Array.from(countries).sort(),
      states: Array.from(states).sort(),
      cities: Array.from(cities).sort(),
    });
  } catch (error) {
    console.error("Error fetching location filters:", error.message);
    res.status(500).json({ error: "Failed to fetch location filters" });
  }
};
