import React from "react";

const SearchForm = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for images..."
      />
    </form>
  );
};

export default SearchForm;
