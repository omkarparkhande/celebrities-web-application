import React from "react";
import searchIcon from "../Assets/search.png";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="Search user"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 p-2 border border-gray-300 rounded-xl"
        style={{
         backgroundImage: `url(${searchIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "8px center",
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
};

export default SearchInput;
