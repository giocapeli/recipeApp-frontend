import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../store/recipes/actions";
import { useSelector } from "react-redux";
import { selectSelectedRecipe } from "../store/recipes/selectors";
import RatingCard from "../components/RatingCard";
import ShareCard from "../components/ShareCard";
import Loading from "../components/Loading";

export default function Recipe() {
  const dispatch = useDispatch();
  const id = 1;
  const [sharePopUp, set_sharePopUp] = useState(false);

  const recipeData = useSelector(selectSelectedRecipe);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);

  if (!recipeData) {
    return <Loading />;
  }

  return (
    <div className="layout">
      <div style={{ backgroundColor: "black" }} className="column-1">
        <div className="card">
          <h1>Ingredients:</h1>
          {recipeData.ingredients.map((e) => (
            <h3>{`${e.recipe_ingredients.quantity} (${e.recipe_ingredients.unitOfMeasure}) of ${e.name}`}</h3>
          ))}
          <div>
            <button className="buttons">Print</button>
            <button className="buttons" onClick={() => set_sharePopUp(true)}>
              Share
            </button>
            {sharePopUp ? (
              <ShareCard action={() => set_sharePopUp(false)} data={"he"} />
            ) : null}
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "black" }} className="column-2">
        <div className="card">
          <h1>{recipeData.title}</h1>
          <div className="img-container" style={{ height: "300px" }}>
            <img
              className="img"
              alt={recipeData.title}
              src={recipeData.imageUrl}
            />
          </div>
          <RatingCard ratings={recipeData.ratings} id={parseInt(id)} />
          <div>
            <p>"{recipeData.description}"</p>
          </div>
          <h3>Directions:</h3>
          <p>{recipeData.content}</p>
        </div>
      </div>
    </div>
  );
}
