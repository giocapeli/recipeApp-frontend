import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes, clearState } from "../store/recipes/actions";
import { useSelector } from "react-redux";
import {
  selectActiveSearch,
  selectSearchResults,
} from "../store/recipes/selectors";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

export default function Search() {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const searchKeywords = useSelector(selectActiveSearch);

  function searchIt(keywords) {
    dispatch(searchRecipes(keywords));
  }
  function resetState() {
    dispatch(clearState(true));
  }
  useEffect(() => {
    if (searchKeywords.length > 0) {
      searchIt(searchKeywords.toString());
    }
  }, []);

  return (
    <div style={{ textAlign: "center", zIndex: "-1" }}>
      <div className="page">
        {searchKeywords.length ? (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            Here the results for{" "}
            {searchKeywords.map((e) => (
              <div className="match">{e}</div>
            ))}
            :
          </h1>
        ) : (
          <h2>
            Sorry, I couldn't find anything with your criteria. Try a different
            ingredient.
          </h2>
        )}
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
          <Link to="/" className="buttons" onClick={() => resetState()}>
            Search Again
          </Link>
        </div>
      </div>
    </div>
  );
}
