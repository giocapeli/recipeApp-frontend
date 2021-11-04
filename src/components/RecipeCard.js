import React from "react";
import { Link } from "react-router-dom";
import RatingCard from "./RatingCard";

export default function RecipeCard(props) {
  const { id, title, ratings, imageUrl } = props;

  return (
    <div className="resultCard shadowBoxCard">
      <div className="titleContainer">
        <h2>{title}</h2>
      </div>
      <div>
        <div className="imgContainer">
          <img className="img" alt={title} src={imageUrl} />
        </div>
        <RatingCard ratings={ratings} id={id} />
        <Link to={`/recipe/${id}`}>
          <button className="buttons">Open Recipe</button>
        </Link>
      </div>
    </div>
  );
}
