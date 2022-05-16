import React, { useState } from "react";

const Search = ({ getQuery }) => {
  const [search, setSearch] = useState("");
  const onChangeHandler = (q) => {
    setSearch(q);
    getQuery(q);
  };

  return (
    <div className="search">
      <form>
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={(e) => onChangeHandler(e.target.value)}
          placeholder="Search Characters"
        ></input>
      </form>
    </div>
  );
};

export default Search;
