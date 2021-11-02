import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../store/recipes/actions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectSelectedRecipe } from "../store/recipes/selectors";

export default function Recipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipe = useSelector(selectSelectedRecipe);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);

  if (!recipe.title) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>{recipe.title}</h1>
        <h1>{recipe.description}</h1>
        {recipe.ingredients.map((e) => (
          <h3>{e.name}</h3>
        ))}
      </div>
    );
  }
}
