import React from "react";
import { useDispatch } from "react-redux";
import {
  actionTest,
  favoriteRecipe,
  sendFavoriteRecipe,
} from "../store/user/actions";

export default function Layout() {
  const dispatch = useDispatch();

  return (
    <div className="layout">
      <div className="column-1">hey</div>
      <div className="column-2">hoi</div>
      <button onClick={() => dispatch(favoriteRecipe(1))}>Here</button>
    </div>
  );
}
