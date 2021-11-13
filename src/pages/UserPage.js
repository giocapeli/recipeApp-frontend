import React from "react";
import { selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { useState } from "react";
import Loading from "../components/Loading";

export default function UserPage() {
  const initialToggleMenu = {
    favorites: false,
    ratings: false,
    my: false,
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
    <div style={{ textAlign: "center" }} className="page">
      <h1 className="title">{user.name}'s Page</h1>
      <div>
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
          <div className="layout">
            {toggleMenu.favorites
              ? user.favorites.map((e) => (
                  <div style={{ margin: "10px auto" }}>
                    <RecipeCard
                      id={e.id}
                      title={e.title}
                      ratings={e.ratings}
                      imageUrl={e.imageUrl}
                      matches={[]}
                      highlighted={false}
                    />
                  </div>
                ))
              : null}
          </div>
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
          <div className="layout">
            {toggleMenu.my
              ? user.owner.map((e) => (
                  <div style={{ margin: "10px auto" }}>
                    <RecipeCard
                      id={e.id}
                      title={e.title}
                      ratings={e.ratings}
                      imageUrl={e.imageUrl}
                      matches={[]}
                      highlighted={false}
                    />
                  </div>
                ))
              : null}
          </div>
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
          <div className="layout">
            {toggleMenu.ratings
              ? user.ratings.map((e) => (
                  <div style={{ margin: "10px auto" }}>
                    <RecipeCard
                      id={e.id}
                      title={e.title}
                      ratings={e.ratings}
                      imageUrl={e.imageUrl}
                      matches={[]}
                      highlighted={false}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
