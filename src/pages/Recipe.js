import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../store/recipes/actions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectSelectedRecipe } from "../store/recipes/selectors";
import RatingCard from "../components/RatingCard";
import ShareCard from "../components/ShareCard";
import Loading from "../components/Loading";

export default function Recipe() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sharePopUp, set_sharePopUp] = useState(false);

  const recipeData = useSelector(selectSelectedRecipe);

  useEffect(() => {
    dispatch(getRecipeById(id));
    console.log(recipeData);
  }, []);
  console.log("ID", id);
  if (!recipeData.title) {
    return <Loading />;
  } else {
    return (
      <div className="resultBoard">
        <div className="box">
          <h1>Ingredients:</h1>
          {recipeData.ingredients.map((e) => (
            <h3>{`${e.recipe_ingredients.quantity} (${e.recipe_ingredients.unitOfMeasure}) of ${e.name}`}</h3>
          ))}
          <div style={{ display: "flex" }}>
            <button style={{ backgroundColor: "#DFFFC8" }} className="buttons">
              Print
            </button>
            <button
              style={{ backgroundColor: "#DFFFC8" }}
              className="buttons"
              onClick={() => set_sharePopUp(true)}
            >
              Share
            </button>
            {sharePopUp ? (
              <ShareCard action={() => set_sharePopUp(false)} data={"he"} />
            ) : null}
          </div>
        </div>
        <div className="recipeCard">
          <h1>{recipeData.title}</h1>
          <div className="imgContainer">
            <img
              className="img"
              alt={recipeData.title}
              src={recipeData.imageUrl}
            />
          </div>
          <RatingCard ratings={recipeData.ratings} id={parseInt(id)} />
          <p>"{recipeData.description}"</p>
          <h3>Directions:</h3>
          <p>{recipeData.content}</p>
        </div>
      </div>
    );
  }
}
