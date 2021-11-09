import React from "react";
import { useSelector } from "react-redux";
import NotLogged from "../components/NotLogged";
import {
  selectToken,
  selectPostRecipe,
  selectIngredientList,
} from "../store/user/selectors";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  postRecipe,
  sendDeletedIngredient,
  postImage,
  sendIngredient,
} from "../store/user/actions";
import Autocomplete from "../components/Autocomplete";
import { selectAllIngredients } from "../store/ingredients/selectors";
import { getAllIngredients } from "../store/ingredients/actions";
import { showMessageWithTimeout } from "../store/appState/actions";
import { useHistory } from "react-router-dom";

export default function PostRecipe() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allIngredients = useSelector(selectAllIngredients);
  const postRecipeState = useSelector(selectPostRecipe);
  const initialStateNewRecipe = {
    title: "",
    imageUrl: "",
    content: "",
    description: "",
  };
  const initialStateNewIngredient = {
    name: "",
    quantity: "",
    unitOfMeasure: "unit",
    id: "",
  };
  const [autocomplete, set_autocomplete] = useState(true);
  const [newRecipe, set_newRecipe] = useState(initialStateNewRecipe);
  const [newIngredient, set_newIngredient] = useState(
    initialStateNewIngredient
  );
  const ingredientList = useSelector(selectIngredientList);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getAllIngredients());
  }, []);

  useEffect(() => {
    set_newRecipe({
      ...newRecipe,
      imageUrl: postRecipeState.imageUrl,
    });
  }, [postRecipeState]);

  function submitRecipe(event) {
    event.preventDefault();
    if (ingredientList.length === 0) {
      dispatch(
        showMessageWithTimeout(
          "danger",
          true,
          "Please fill the ingredient list",
          3000
        )
      );
      return;
    }
    if (!newRecipe.imageUrl) {
      dispatch(
        showMessageWithTimeout(
          "danger",
          true,
          "Please insert an image of your recipe",
          3000
        )
      );
      return;
    }
    dispatch(postRecipe(newRecipe, history));
    set_newRecipe(initialStateNewRecipe);
    set_newIngredient(initialStateNewIngredient);
  }
  function pushIngredient() {
    if (
      newIngredient.name &&
      newIngredient.quantity &&
      newIngredient.unitOfMeasure
    ) {
      if (ingredientList.length) {
        ingredientList.find((e) => {
          if (e.name === newIngredient.name) {
            dispatch(sendDeletedIngredient(e));
          }
        });
      }
      dispatch(sendIngredient(newIngredient));
      set_autocomplete(true);
    }
  }
  function deleteIngredient(e) {
    dispatch(sendDeletedIngredient(e));
  }

  function uploadImage(e) {
    if (e.target.files) {
      const files = e.target.files;
      dispatch(postImage(files));
    }
  }
  function selectIngredient(item) {
    if (item.name) {
      set_newIngredient({
        ...newIngredient,
        ...item,
      });
      set_autocomplete(false);
    }
  }

  if (!token) {
    return <NotLogged />;
  }

  return (
    <div style={{ textAlign: "center" }} className="page">
      <h1>Post a new Recipe</h1>
      <div className="layout">
        <div className="column-1">
          <div className="card">
            <h2 className="title">Ingredients:</h2>
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  pushIngredient();
                }}
              >
                {autocomplete ? (
                  <Autocomplete
                    array={allIngredients}
                    action={selectIngredient}
                  />
                ) : (
                  <div style={{ display: "flex" }}>
                    <h4 className="form-input">{newIngredient.name}</h4>
                    <div
                      onClick={() => {
                        set_newIngredient(initialStateNewIngredient);
                        set_autocomplete(true);
                      }}
                      className="side-button red"
                    >
                      <h4 style={{ margin: "auto" }}>X</h4>
                    </div>
                  </div>
                )}
                <input
                  type="number"
                  required
                  className="form-input"
                  placeholder="Quantity"
                  value={newIngredient.quantity}
                  onChange={(event) =>
                    set_newIngredient({
                      ...newIngredient,
                      quantity: event.target.value,
                    })
                  }
                />
                <br />
                <select
                  className="form-input"
                  name="units-of-measurement"
                  defaultValue=""
                  id="unit"
                  required
                  onChange={(event) =>
                    set_newIngredient({
                      ...newIngredient,
                      unitOfMeasure: event.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <optgroup label="Volume">
                    <option value="teaspoon">teaspoon</option>
                    <option value="tablespoon">tablespoon</option>
                    <option value="cup">cup</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                  </optgroup>
                  <optgroup label="Weight">
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="unit">unit</option>
                    <option value="to taste">to taste</option>
                  </optgroup>
                </select>
                <br />
                <button className="buttons" type="submit">
                  + Add Ingredient
                </button>
              </form>
            </div>
            <div>
              {ingredientList
                ? ingredientList.map((e) => (
                    <div key={e.id} style={{ display: "flex" }}>
                      <h4 className="ingredient-card">{`${e.quantity} (${e.unitOfMeasure}) of ${e.name}`}</h4>
                      <div
                        onClick={() => deleteIngredient(e)}
                        className="side-button red"
                      >
                        <div style={{ margin: "auto" }}>
                          <h4>X</h4>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="column-2">
          <div className="card">
            <h2 className="title">Information:</h2>
            <form onSubmit={submitRecipe}>
              <input
                type="string"
                required
                className="form-input"
                placeholder="Recipe's Title"
                value={newRecipe.title}
                onChange={(event) =>
                  set_newRecipe({
                    ...newRecipe,
                    title: event.target.value,
                  })
                }
              />
              <input
                type="text"
                required
                className="form-input"
                placeholder="Short Description"
                value={newRecipe.description}
                onChange={(event) =>
                  set_newRecipe({
                    ...newRecipe,
                    description: event.target.value,
                  })
                }
              />
              <h2 className="title">Upload Image:</h2>
              <label className="buttons file">
                <input type="file" onChange={uploadImage} />
                Choose a picture of your recipe!
              </label>
              <div
                className="img-container form-input"
                style={{
                  height: "200px",
                  padding: "0",
                  margin: "10px 0px",
                  backgroundColor: "rgb(238, 238, 238)",
                }}
              >
                {postRecipeState.imageUrl ? (
                  <img
                    alt="recipe pic"
                    className="img"
                    src={postRecipeState.imageUrl}
                  />
                ) : null}
              </div>
              <textarea
                type="text"
                required
                className="form-input"
                placeholder="Recipe's Directions"
                value={newRecipe.content}
                style={{ height: "200px", overflowY: "scroll" }}
                onChange={(event) =>
                  set_newRecipe({
                    ...newRecipe,
                    content: event.target.value,
                  })
                }
              />
              <button className="buttons " type="submit">
                Post Recipe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
