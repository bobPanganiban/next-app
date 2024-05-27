import { ChangeEvent, useState } from "react";

interface Props {
  options: any[];
}

const DropdownSearch = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] =
    useState<string>("Choose an option");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchValue)
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        {selectedOption}
      </label>
      <div
        tabIndex={0}
        className="dropdown-content card card-compact p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div className="form-control">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-xs"
            onChange={handleSearch}
          />
        </div>
        <ul
          className="menu overflow-y-auto w-full bg-base-100 p-2 text-xs"
          style={{ maxHeight: "10rem" }}
        >
          {filteredOptions.map((option, index) => (
            <li
              tabIndex={0}
              key={index}
              onClick={(e) => setSelectedOption(option)}
            >
              <a>{option}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownSearch;
