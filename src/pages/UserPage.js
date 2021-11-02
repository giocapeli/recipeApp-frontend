import React from "react";
import { selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import SearchResultCards from "../components/SearchResultCards";

export default function UserPage() {
  const user = useSelector(selectUser);
  if (!user.token) {
    return <h1>Please Login</h1>;
  }
  return (
    <div>
      <h1>{user.name}'s Page</h1>
      <div className="resultBoard">
        <div className="ingredientsCard">
          <h1>My Favorites</h1>
          {user.favorites.map((e) => (
            <h1>card</h1>
            // <SearchResultCards key={e.id} id={e.id} />
          ))}
        </div>
        <div className="ingredientsCard">
          <h1>My Recipes</h1>
          {user.owner.map((e) => (
            <h1>card</h1>
            // <SearchResultCards key={e.id} id={e.id} />
          ))}
        </div>
        <div className="ingredientsCard">
          <h1>My Ratings</h1>
          {user.ratings.map((e) => (
            <h1>card</h1>
            // <SearchResultCards key={e.id} id={e.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
