import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../store/recipes/actions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectSelectedRecipe } from "../store/recipes/selectors";
import Rating from "../components/Rating";

export default function Recipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipeData = useSelector(selectSelectedRecipe);

  useEffect(() => {
    dispatch(getRecipeById(id));
    console.log(recipeData);
  }, []);

  if (!recipeData.recipe) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="resultBoard">
        <div className="ingredientsCard shadowBoxCard">
          <h1>Ingredients:</h1>
          {recipeData.recipe.ingredients.map((e) => (
            <h3>{e.name}</h3>
          ))}
        </div>
        <div className="recipeCard">
          <h1>{recipeData.recipe.title}</h1>
          <div className="imgContainer">
            <img className="img" src={recipeData.recipe.imageUrl} />
          </div>
          <Rating rating={recipeData.rating} />
          <p>"{recipeData.recipe.description}"</p>
          <h3>Directions:</h3>
          <p>{recipeData.recipe.content}</p>
        </div>
      </div>
    );
  }
}
