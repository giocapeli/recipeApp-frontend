import React from "react";
import { useDispatch } from "react-redux";
import { searchRecipes, clearState } from "../store/recipes/actions";
import SearchForm from "../components/SearchForm";
import { useSelector } from "react-redux";
import {
  selectActiveSearch,
  selectSearchResults,
} from "../store/recipes/selectors";
import RecipeCard from "../components/RecipeCard";

export default function Homepage() {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const searchKeywords = useSelector(selectActiveSearch);

  function searchIt(keywords) {
    dispatch(searchRecipes(keywords));
  }

  function resetState() {
    dispatch(clearState(true));
  }

  return (
    <div style={{ textAlign: "center" }}>
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
          <div className="layout">
            {searchResults.map((e) => (
              <RecipeCard
                id={e.id}
                title={e.title}
                ratings={e.ratings}
                imageUrl={e.imageUrl}
              />
            ))}
            <button className="buttons" onClick={() => resetState()}>
              Search Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
