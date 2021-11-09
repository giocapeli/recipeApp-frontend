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
    <div style={{ textAlign: "center" }}>
      <h1 className="title">{user.name}'s Page</h1>
      <div className="resultBoard">
        <div className="ingredientsCard">
          <h2
            style={{ marginBottom: "25px" }}
            onClick={() =>
              set_toggleMenu({
                ...toggleMenu,
                favorites: !toggleMenu.favorites,
              })
            }
          >
            My Favorites
          </h2>
          {toggleMenu.favorites
            ? user.favorites.map((e) => (
                <div style={{ marginBottom: "20px" }}>
                  <RecipeCard
                    id={e.id}
                    title={e.title}
                    ratings={e.ratings}
                    imageUrl={e.imageUrl}
                  />
                </div>
              ))
            : null}
        </div>
        <div className="ingredientsCard">
          <h2
            style={{ marginBottom: "25px" }}
            onClick={() =>
              set_toggleMenu({
                ...toggleMenu,
                my: !toggleMenu.my,
              })
            }
          >
            My Recipes
          </h2>
          {toggleMenu.my
            ? user.owner.map((e) => (
                <div style={{ marginBottom: "20px" }}>
                  <RecipeCard
                    id={e.id}
                    title={e.title}
                    ratings={e.ratings}
                    imageUrl={e.imageUrl}
                  />
                </div>
              ))
            : null}
        </div>
        <div className="ingredientsCard">
          <h2
            style={{ marginBottom: "25px" }}
            onClick={() =>
              set_toggleMenu({
                ...toggleMenu,
                ratings: !toggleMenu.ratings,
              })
            }
          >
            My Ratings
          </h2>
          {toggleMenu.ratings
            ? user.ratings.map((e) => (
                <div style={{ marginBottom: "20px" }}>
                  <RecipeCard
                    id={e.id}
                    title={e.title}
                    ratings={e.ratings}
                    imageUrl={e.imageUrl}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
