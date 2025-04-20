# 📘 HubSpot

---

## ✅ Step 1: Set Up

- [x] Create a HubSpot Developer Account: https://developers.hubspot.com
- [x] Set up a test app with CRM access.
- [x] Connect with HubSpot via API using their sandbox/test account or OAuth/private app API keys.

---

## ✅ Step 2: Populate Contacts

- [x] Create 10 contacts in the HubSpot Contacts object.
- [x] Each contact should have:
  - Name
  - Email
  - Phone number
  - Address (populate the default HubSpot address property)

---

## ✅ Step 3: Add Custom Property

- [x] Check if a property named “Project Role” exists in the Contacts object.
- [x] If not present, create a custom multiple select property named project_role with the following options:
  - Contractor
  - Home Owner
  - Affiliate
  - Referral Partner
  - Community Partner
  - Geo Tech

---

## ✅ Step 4: Assign Roles

- [x] Assign 1–2 roles to each contact.
- [x] Ensure that:
  - Some contacts have multiple roles (e.g., both Geo Tech and Home Owner).
  - All roles are represented across your 10 contacts.

---

## ✅ Step 5: API Integration

- [ ] Build a backend API using Node.js, Flask, Django, or any backend framework to:
  - Fetch all contacts where project_role is not null.
- [ ] Return the following fields: Name, Email, Phone, Address, Project Role(s).

---

## ✅ Step 6: Interactive Map UI

- [ ] Build a web interface using a frontend framework/library (React preferred) to:
  - Display contacts on a map (Google Maps, Leaflet, or Mapbox).
- [ ] Use distinct icons for each project role.
      Example: Contractors = Star, Geo Tech = Triangle, etc.
  - If a contact has multiple roles, show multiple icons at the same location.
- [ ] Add a legend to explain what each icon represents.

---

## ✅ Step 7: Role-Based Filtering

- [ ] Implement UI functionality to:
      Filter and highlight contacts based on selected project roles and location (region/city/state).
- [ ] Suggest matches based on filters.
      Example: “You can contact Jane Doe in San Diego as a Geo Tech.”

---

### 📌 License

This project is licensed under [Your License Here].
