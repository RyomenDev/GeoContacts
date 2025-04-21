const FilterDropdown = ({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  defaultOption = `Select ${label}`,
  placeholderCondition = null,
  placeholderMessage = "",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-b p-2 rounded"
      disabled={disabled}
    >
      <option value="">{defaultOption}</option>

      {placeholderCondition ? (
        <option disabled>{placeholderMessage}</option>
      ) : options.length === 0 ? (
        <option disabled>No {label}s Available</option>
      ) : (
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      )}
    </select>
  );
};

export default FilterDropdown;
