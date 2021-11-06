import React from "react";
import { useDispatch } from "react-redux";
import { searchRecipes, clearState } from "../store/recipes/actions";
import SearchForm from "../components/SearchForm";
import { useSelector } from "react-redux";
import {
  selectActiveSearch,
  selectSearchResults,
} from "../store/recipes/selectors";
import { useEffect } from "react";
import SearchResultCards from "../components/SearchResultCards";
import RecipeCard from "../components/RecipeCard";

export default function Homepage() {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const searchKeywords = useSelector(selectActiveSearch);

  useEffect(() => {
    console.log("search results", searchResults);
  }, [searchResults]);

  function searchIt(keywords) {
    dispatch(searchRecipes(keywords));
  }

  function resetState() {
    console.log("click");
    dispatch(clearState(true));
  }

  return (
    <div>
      {!searchResults.length > 0 ? (
        <div className="centered">
          <SearchForm searchIt={searchIt} />
        </div>
      ) : (
        <div>
          {searchKeywords.length ? (
            <h1>
              Here the results for {searchKeywords.map((e) => `[${e}] `)}:
            </h1>
          ) : null}
          <div className="resultBoard">
            {searchResults.map((e) => (
              <RecipeCard
                id={e.id}
                title={e.title}
                ratings={e.ratings}
                imageUrl={e.imageUrl}
              />
            ))}
            <button
              className="searchButton searchItens"
              onClick={() => resetState()}
            >
              Search Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
