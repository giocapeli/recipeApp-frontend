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
import { selectUserOwner } from "../store/user/selectors";
import { deleteRecipe } from "../store/user/actions";
import { useHistory } from "react-router-dom";

export default function Recipe() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeData = useSelector(selectSelectedRecipe);
  const userHaveIngredients = useSelector(selectActiveSearch);
  const owner = useSelector(selectUserOwner);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);

  function print() {
    window.print();
  }

  if (!recipeData) {
    return <Loading />;
  }
  let isOwner = [];

  if (owner) {
    isOwner = owner.filter((e) => e.id === parseInt(id));
  }

  function deleteIt() {
    dispatch(deleteRecipe(id));
    history.push(`/user`);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{recipeData.title}</h1>
            {isOwner.length ? (
              <button
                className="buttons"
                style={{
                  width: "50px",
                  fontSize: "0.7em",
                  padding: "2px",
                  height: "25px",
                  backgroundColor: "rgb(158, 18, 0)",
                }}
                onClick={() => deleteIt()}
              >
                delete
              </button>
            ) : null}
          </div>
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
