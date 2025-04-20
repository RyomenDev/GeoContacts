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
