import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserOwner } from "../store/user/selectors";
import RatingCard from "./RatingCard";

export default function RecipeCard(props) {
  const { id, title, ratings, imageUrl, matches, highlighted } = props;
  const owner = useSelector(selectUserOwner);
  let isOwner = [];
  if (owner) {
    isOwner = owner.filter((e) => e.id === id);
  }

  return (
    <div
      className={`resultCard shadowBoxCard ${
        highlighted === true && matches.length > 1 ? "glow" : null
      }`}
    >
      <Link to={`/recipe/${id}`} className="link">
        <div className="titleContainer">
          <h2>{title}</h2>
        </div>
        <div className="img-container" style={{ height: "300px" }}>
          <img className="img" alt={title} src={imageUrl} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {matches.map((e) => (
            <div className="match">{e}</div>
          ))}
        </div>
      </Link>
      <div>
        <RatingCard ratings={ratings} id={id} />
      </div>
    </div>
  );
}
