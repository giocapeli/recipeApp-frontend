import React from "react";
import { useState } from "react";

export default function SearchForm(props) {
  const { searchIt } = props;

  const [keywords, set_keywords] = useState("");

  function sendResults(event) {
    event.preventDefault();
    if (keywords === "") {
      return;
    }
    searchIt(keywords);
    set_keywords("");
  }

  return (
    <div>
      <form onSubmit={sendResults}>
        <h1 className="pageTitle">What I have in my fridge:</h1>
        <input
          className="searchInput searchItens"
          type="search"
          placeholder="Eggs, Tomatoes, Pasta"
          aria-label="Search Recipes"
          value={keywords}
          onChange={(event) => set_keywords(event.target.value)}
        />
        <br />
        <button className="searchButton searchItens" type="submit">
          What Should I Cook?
        </button>
      </form>
    </div>
  );
}
