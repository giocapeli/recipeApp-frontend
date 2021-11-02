import React from "react";
import { useDispatch } from "react-redux";
import { clearSearchResults, searchRecipes } from "../store/recipes/actions";
import SearchForm from "../components/SearchForm";
import { useSelector } from "react-redux";
import { selectSearchResults } from "../store/recipes/selectors";
import { useState, useEffect } from "react";
import SearchResultCards from "../components/SearchResultCards";

export default function Homepage() {
  const [showSearchForm, set_showSearchForm] = useState(true);
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);

  // useEffect(() => {
  //   dispatch(clearSearchResults);
  // }, []);

  useEffect(() => {
    console.log("search results", searchResults);
  }, [searchResults]);

  function searchIt(keywords) {
    dispatch(searchRecipes(keywords));
    set_showSearchForm(false);
  }

  return (
    <div>
      {showSearchForm ? (
        <div className="searchPage">
          <SearchForm searchIt={searchIt} />{" "}
        </div>
      ) : null}

      <div className="resultBoard">
        {searchResults.map((e) => (
          <SearchResultCards key={e.id} id={e.id} />
        ))}
      </div>
    </div>
  );
}
