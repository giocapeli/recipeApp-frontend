import React from "react";
import { selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

export default function UserPage() {
  const user = useSelector(selectUser);
  if (!user.token) {
    return <h1>Please Login</h1>;
  }
  return (
    <div className="centerPage">
      <h1>{user.name}'s Page</h1>
      <div className="resultBoard">
        <div className="ingredientsCard">
          <button className="buttons">
            <h3>My Favorites</h3>
          </button>
          {user.favorites.map((e) => (
            <RecipeCard
              id={e.id}
              title={e.title}
              ratings={e.ratings}
              imageUrl={e.imageUrl}
            />
          ))}
        </div>
        <div className="ingredientsCard">
          <button className="buttons">
            <h3>My Recipes</h3>
          </button>
          {user.owner.map((e) => (
            <RecipeCard
              id={e.id}
              title={e.title}
              ratings={e.ratings}
              imageUrl={e.imageUrl}
            />
          ))}
        </div>
        <div className="ingredientsCard">
          <button className="buttons">
            <h3>My Ratings</h3>
          </button>
          {user.ratings.map((e) => (
            <RecipeCard
              id={e.id}
              title={e.title}
              ratings={e.ratings}
              imageUrl={e.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
