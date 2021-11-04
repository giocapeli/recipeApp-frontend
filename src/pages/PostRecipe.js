import React from "react";
import { useSelector } from "react-redux";
import NotLogged from "../components/NotLogged";
import { selectToken } from "../store/user/selectors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkIngredient, postRecipe } from "../store/recipes/actions";

export default function PostRecipe() {
  const dispatch = useDispatch();
  const initialStateNewRecipe = {
    title: "",
    imageUrl: "",
    content: "",
    description: "",
  };
  const initialStateNewIngredient = {
    name: "",
    quantity: "",
    unitMeasure: "unit",
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
    dispatch(checkIngredient(newIngredient.name));
    set_ingredientList([...ingredientList, newIngredient]);
    console.log(ingredientList);
  }
  function deleteIngredient(i) {
    set_ingredientList(
      ingredientList.filter((e) => ingredientList.indexOf(e) !== i)
    );
  }

  return (
    <div className="resultBoard">
      <div className="ingredientsCard shadowBoxCard">
        <h1>Ingredients:</h1>
        <div>
          <form className="resultBoard" onSubmit={pushIngredient}>
            <input
              type="string"
              required
              className="forminput"
              placeholder="Ingredient's Name"
              value={newIngredient.name}
              onChange={(event) =>
                set_newIngredient({
                  ...newIngredient,
                  name: event.target.value,
                })
              }
            />
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
                  unitMeasure: event.target.value,
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
          {ingredientList.map((e, i) => (
            <div key={i} className="itemList">
              <p>{`${e.quantity} (${e.unitMeasure}) of ${e.name}`}</p>

              <button
                className="deleteButton"
                onClick={() => deleteIngredient(i)}
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
      </div>
    </div>
  );
}
