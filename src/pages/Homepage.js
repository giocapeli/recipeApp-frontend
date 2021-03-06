import React, { useEffect, useState } from "react";
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
    <div style={{ textAlign: "center", zIndex: "-1" }}>
      {!searchResults.length > 0 ? (
        <div className="centered">
          <SearchForm searchIt={searchIt} />
        </div>
      ) : (
        <div className="page">
          {searchKeywords.length ? (
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Here the results for{" "}
              {searchKeywords.map((e) => (
                <div className="match">{e}</div>
              ))}
              :
            </h1>
          ) : null}
          <div className="layout">
            {searchResults.map((e) =>
              e.matches.length === searchKeywords.length ? (
                <RecipeCard
                  id={e.id}
                  title={e.title}
                  ratings={e.ratings}
                  imageUrl={e.imageUrl}
                  matches={e.matches}
                  highlighted={true}
                />
              ) : (
                <RecipeCard
                  id={e.id}
                  title={e.title}
                  ratings={e.ratings}
                  imageUrl={e.imageUrl}
                  matches={e.matches}
                  highlighted={false}
                />
              )
            )}
            <button className="buttons" onClick={() => resetState()}>
              Search Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
