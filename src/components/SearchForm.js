import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../store/recipes/actions";
import { useHistory } from "react-router";

export default function SearchForm() {
  const history = useHistory();

  const [keywords, set_keywords] = useState("");
  const dispatch = useDispatch();
  function sendResults(event) {
    event.preventDefault();
    if (keywords === "") {
      return;
    }
    searchIt(keywords);
    set_keywords("");
    history.push("/search");
  }
  function searchIt(keywords) {
    dispatch(searchRecipes(keywords));
  }
  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={sendResults}>
        <h1 className="pageTitle">What I have in my fridge:</h1>
        <div>
          <input
            className="form-input"
            type="search"
            placeholder="Eggs, Tomatoes, Pasta"
            aria-label="Search Recipes"
            value={keywords}
            onChange={(event) => set_keywords(event.target.value)}
          />
        </div>
        <br />
        <button className="buttons" type="submit" style={{ margin: "0px" }}>
          What Should I Cook?
        </button>
      </form>
    </div>
  );
}
