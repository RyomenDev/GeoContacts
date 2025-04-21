/**
 * Formats the contact object from HubSpot into a cleaner structure.
 * @param {Object} contact - Raw HubSpot contact.
 * @returns {Object} - Formatted contact object.
 */
export const formatContact = (contact) => {
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
};
