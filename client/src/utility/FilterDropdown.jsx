import { ChevronDown } from "lucide-react";

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
    <div className="w-full max-w-xs relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="block w-full appearance-none border border-gray-300 bg-white px-4 py-2 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-blue-500 text-sm text-gray-800"
        >
          <option value="">{defaultOption}</option>

          {placeholderCondition ? (
            <option disabled>{placeholderMessage}</option>
          ) : options.length === 0 ? (
            <option disabled>No {label}s Available</option>
          ) : (
            options.map((option) => {
              const val = typeof option === "string" ? option : option.value;
              const displayLabel =
                typeof option === "string" ? option : option.label;
              return (
                <option key={val} value={val}>
                  {displayLabel}
                </option>
              );
            })
          )}
        </select>

        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;

