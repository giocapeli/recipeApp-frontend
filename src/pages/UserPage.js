import React from "react";
import { selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { useState } from "react";
import Loading from "../components/Loading";

export default function UserPage() {
  const initialToggleMenu = {
    favorites: true,
    ratings: true,
    my: true,
  };
  const [toggleMenu, set_toggleMenu] = useState(initialToggleMenu);

  const user = useSelector(selectUser);
  if (!user.token) {
    return <h1>Please Login</h1>;
  }

  if (!user.favorites) {
    return <Loading />;
  }

  return (
    <div className="centerPage">
      <h1>{user.name}'s Page</h1>
      <div className="resultBoard">
        <div className="ingredientsCard">
          <button
            className="buttons"
            onClick={() =>
              set_toggleMenu({
                ...toggleMenu,
                favorites: !toggleMenu.favorites,
              })
            }
          >
            <h3>My Favorites</h3>
          </button>
          {toggleMenu.favorites
            ? user.favorites.map((e) => (
                <RecipeCard
                  id={e.id}
                  title={e.title}
                  ratings={e.ratings}
                  imageUrl={e.imageUrl}
                />
              ))
            : null}
        </div>
        <div className="ingredientsCard">
          <button
            className="buttons"
            onClick={() =>
              set_toggleMenu({
                ...toggleMenu,
                my: !toggleMenu.my,
              })
            }
          >
            <h3>My Recipes</h3>
          </button>
          {toggleMenu.my
            ? user.owner.map((e) => (
                <RecipeCard
                  id={e.id}
                  title={e.title}
                  ratings={e.ratings}
                  imageUrl={e.imageUrl}
                />
              ))
            : null}
        </div>
        <div className="ingredientsCard">
          <button
            className="buttons"
            onClick={() =>
              set_toggleMenu({
                ...toggleMenu,
                ratings: !toggleMenu.ratings,
              })
            }
          >
            <h3>My Ratings</h3>
          </button>
          {toggleMenu.ratings
            ? user.ratings.map((e) => (
                <RecipeCard
                  id={e.id}
                  title={e.title}
                  ratings={e.ratings}
                  imageUrl={e.imageUrl}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
