import React from "react";
import { useSelector } from "react-redux";
import NotLogged from "../components/NotLogged";
import { selectToken, selectPostRecipe } from "../store/user/selectors";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkIngredient,
  postRecipe,
  sendDeletedIngredient,
  postImage,
} from "../store/user/actions";
import Autocomplete from "../components/Autocomplete";
import { selectAllIngredients } from "../store/ingredients/selectors";
import { getAllIngredients } from "../store/ingredients/actions";

export default function PostRecipe() {
  const dispatch = useDispatch();
  const allIngredients = useSelector(selectAllIngredients);

  useEffect(() => {
    dispatch(getAllIngredients());
  }, []);

  const [foundIngredient, set_foundIngredient] = useState(false);
  //const [notFoundIngredient, set_notFoundIngredient] = useState(null);

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

  const [newRecipe, set_newRecipe] = useState(initialStateNewRecipe);
  const [newIngredient, set_newIngredient] = useState(
    initialStateNewIngredient
  );
  const [ingredientList, set_ingredientList] = useState([]);

  const token = useSelector(selectToken);
  if (!token) {
    return <NotLogged />;
  }

  function submitRecipe(event) {
    event.preventDefault();
    if (ingredientList.length === 0) {
      console.log("Please fill the ingredient list");
      return;
    }
    console.log("submit", newRecipe);
    dispatch(postRecipe(newRecipe));
    set_newRecipe(initialStateNewRecipe);
    set_ingredientList([]);
    set_newIngredient(initialStateNewIngredient);
  }

  function pushIngredient(event) {
    event.preventDefault();
    //dispatch(checkIngredient(newIngredient));
    set_ingredientList([...ingredientList, newIngredient]);
  }
  function deleteIngredient(id) {
    console.log(id);
    // set_ingredientList(
    //   ingredientList.filter((e) => ingredientList.indexOf(e) !== i)
    // );
    dispatch(sendDeletedIngredient(id));
  }

  function uploadImage(e) {
    console.log("Uploading", e.target.files);
    if (e.target.files) {
      const files = e.target.files;
      dispatch(postImage(files));
    }
  }
  function selectIngredient(item) {
    console.log(item);
    set_newIngredient({
      ...newIngredient,
      ...item,
    });
    set_foundIngredient(true);
    console.log(newIngredient);
  }
  return (
    <div className="resultBoard">
      <div className="ingredientsCard shadowBoxCard">
        <h1>Ingredients:</h1>
        <div>
          <form className="resultBoard" onSubmit={pushIngredient}>
            <Autocomplete array={allIngredients} action={selectIngredient} />
            <input
              type="number"
              required
              className="forminput"
              placeholder="Quantity"
              value={newIngredient.quantity}
              onChange={(event) =>
                set_newIngredient({
                  ...newIngredient,
                  quantity: event.target.value,
                })
              }
            />
            <select
              className="forminput"
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
            <button className="buttons" type="submit">
              + Add Ingredient
            </button>
          </form>
        </div>
        {/* End ingredient form */}
        <div>
          {ingredientList.map((e) => (
            <div key={e.id} className="itemList">
              <p>{`${e.quantity} (${e.unitOfMeasure}) of ${e.name}`}</p>

              <button
                className="deleteButton"
                onClick={() => deleteIngredient(e.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* End Ingredient List */}
      <div className="recipeCard">
        <form onSubmit={submitRecipe}>
          {/* <h1>Title</h1> */}
          <input
            type="string"
            required
            className="forminput"
            placeholder="Recipe's Title"
            value={newRecipe.title}
            onChange={(event) =>
              set_newRecipe({
                ...newRecipe,
                title: event.target.value,
              })
            }
          />
          <br />
          {/* <h1>Image</h1> */}
          <input
            type="text"
            required
            className="forminput"
            placeholder="A nice picture of your Recipe (URL)"
            value={newRecipe.imageUrl}
            onChange={(event) =>
              set_newRecipe({
                ...newRecipe,
                imageUrl: event.target.value,
              })
            }
          />
          <br />
          {/* <h1>Description</h1> */}
          <input
            type="text"
            required
            className="forminput"
            placeholder="Short Description"
            value={newRecipe.description}
            onChange={(event) =>
              set_newRecipe({
                ...newRecipe,
                description: event.target.value,
              })
            }
          />
          <br />
          {/* <h1>Directions</h1> */}
          <input
            type="text"
            required
            className="forminput"
            placeholder="Recipe's Directions"
            value={newRecipe.content}
            onChange={(event) =>
              set_newRecipe({
                ...newRecipe,
                content: event.target.value,
              })
            }
          />
          <br />
          <button className="buttons" type="submit">
            Post Recipe
          </button>
        </form>
        <form>
          <h1>Upload Image</h1>
          <input type="file" onChange={uploadImage} />
          {postRecipeState.imageUrl ? (
            <img src={postRecipeState.imageUrl} />
          ) : null}
        </form>
      </div>
    </div>
  );
}
