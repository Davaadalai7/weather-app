import React from "react";

const SearchBar = ({ searchValue, setSearchValue, allCities, filteredData, setFilteredData, onSelectCity }) => {
    const onChange = (event) => {
        setSearchValue(event.target.value);
        const filtered = allCities
            .filter((el) => el.toLowerCase().startsWith(event.target.value.toLowerCase()))
            .slice(0, 3);
        setFilteredData(filtered);
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search for a city"
                value={searchValue}
                onChange={onChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {filteredData.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                    {filteredData.map((city) => (
                        <p
                            key={city}
                            onClick={() => onSelectCity(city)}
                            className="cursor-pointer hover:bg-indigo-100 p-2"
                        >
                            {city}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
