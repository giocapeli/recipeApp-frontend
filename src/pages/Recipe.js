import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeActiveSearch, getRecipeById } from "../store/recipes/actions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  selectActiveSearch,
  selectSelectedRecipe,
} from "../store/recipes/selectors";
import RatingCard from "../components/RatingCard";
import ShareCard from "../components/ShareCard";
import Loading from "../components/Loading";

export default function Recipe() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeData = useSelector(selectSelectedRecipe);
  const userHaveIngredients = useSelector(selectActiveSearch);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);

  function print() {
    window.print();
  }

  if (!recipeData) {
    return <Loading />;
  }

  return (
    <div className="layout page">
      <div className="column-1" style={{ width: "30%" }}>
        <div className="card">
          <h2>Ingredients:</h2>
          {recipeData.ingredients.map((e) =>
            userHaveIngredients.includes(e.name) ? (
              <h3
                onClick={() => dispatch(changeActiveSearch(e.name))}
                style={{
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(199, 31, 31, 0.514)",
                }}
              >{`${e.recipe_ingredients.quantity} (${e.recipe_ingredients.unitOfMeasure}) of ${e.name}`}</h3>
            ) : (
              <h3
                onClick={() => dispatch(changeActiveSearch(e.name))}
              >{`${e.recipe_ingredients.quantity} (${e.recipe_ingredients.unitOfMeasure}) of ${e.name}`}</h3>
            )
          )}
          <div>
            <button className="buttons" onClick={() => print()}>
              Print
            </button>
            <ShareCard title={recipeData.title} id={id} />
          </div>
        </div>
      </div>
      <div className="column-2" style={{ width: "60%" }}>
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
          <p className="quote">"{recipeData.description}"</p>
          <h2>Directions:</h2>
          <p>{recipeData.content}</p>
        </div>
      </div>
    </div>
  );
}
