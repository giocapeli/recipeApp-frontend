import React from "react";

export default function Homepage() {
  return (
    <div className="searchPage">
      <h1 className="pageTitle">What I have in my fridge:</h1>
      <input
        className="searchInput searchItens"
        type="search"
        placeholder="Eggs, Tomatoes, Pasta"
        aria-label="Search Recipes"
      />
      <br />
      <button className="searchButton searchItens">What Should I Cook?</button>
    </div>
  );
}
