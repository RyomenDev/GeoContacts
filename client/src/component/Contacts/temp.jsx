import FilterDropdown from "../../utility/FilterDropdown.jsx";
import ContactList from "./ContactList.jsx";
import useContactFilters from "../../hooks/useContactFilters.js";
import SectionHeader from "../../utility/SectionHeader.jsx";

const ContactFilter = () => {
  const { filters, setFilters, filterOptions, contacts, loading, error } =
    useContactFilters();

  const handleChange = (field, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "country") {
        updated.state = "";
        updated.city = "";
      } else if (field === "state") {
        updated.city = "";
      }
      return updated;
    });
  };

  return (
    <>
      <div className="my-7">
        <SectionHeader title="Contacts" />
      </div>
      <div className="min-h-screen flex flex-col md:flex-row md:items-start gap-6 p-4">
        <div className="w-full md:w-1/7 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Filter Contacts
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <FilterDropdown
              label="Country"
              value={filters.country}
              onChange={(val) => handleChange("country", val)}
              options={filterOptions.countries}
              placeholderCondition={false}
              placeholderMessage="Select Country"
            />

            <FilterDropdown
              label="State"
              value={filters.state}
              onChange={(val) => handleChange("state", val)}
              options={filterOptions.states}
              placeholderCondition={!filters.country}
              placeholderMessage="Select Country First"
            />

            <FilterDropdown
              label="City"
              value={filters.city}
              onChange={(val) => handleChange("city", val)}
              options={filterOptions.cities}
              placeholderCondition={!filters.state}
              placeholderMessage="Select State First"
            />

            <FilterDropdown
              label="Role"
              value={filters.role}
              onChange={(val) => handleChange("role", val)}
              options={filterOptions.roles}
              placeholderCondition={false}
              placeholderMessage="Select Role"
            />
          </div>
        </div>

        <div className="w-full md:w-full">
          <ContactList contacts={contacts} loading={loading} error={error} />
        </div>
      </div>
    </>
  );
};

export default ContactFilter;
