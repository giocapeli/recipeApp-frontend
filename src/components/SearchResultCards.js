import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectSearchResults } from "../store/recipes/selectors";

export default function SearchResultCards(props) {
  const { id } = props;
  const recipe = useSelector(selectSearchResults).filter((e) => e.id === id)[0];

  return (
    <div className="resultCard shadowBoxCard">
      <div className="titleContainer">
        <h2>{recipe.title}</h2>
      </div>
      <div className="imgContainer">
        <img className="img" alt={recipe.title} src={recipe.imageUrl} />
      </div>
      <h2>description</h2>
      <Link to={`/recipe/${id}`}>
        <button className="buttons">Open Recipe</button>
      </Link>
    </div>
  );
}
