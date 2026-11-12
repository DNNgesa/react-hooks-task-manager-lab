import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  function handleSearch() {
    if (searchInputRef.current) {
      setQuery(searchInputRef.current.value);
    }
  }

  return (
    <div className="search-container">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
