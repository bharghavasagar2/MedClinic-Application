const SelectBox = ({ id, label, options, value, onChange, required = false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700">
      {label}:
    </label>
    <select
      id={id}
      className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectBox;



{/* <SelectBox
id="mySelect"
label="Options"
options={options}
value={selectedOption}
onChange={handleOptionChange}
required
/> */}