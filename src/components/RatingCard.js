import React from "react";
import { useDispatch } from "react-redux";
import { ratingRecipe } from "../store/recipes/actions";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { favoriteRecipe } from "../store/user/actions";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectUserFavorites,
  selectUserOwner,
} from "../store/user/selectors";

export default function RatingCard(props) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectUserFavorites);
  const token = useSelector(selectToken);
  const [favorite, set_favorite] = useState(false);
  const ratings = props.ratings.map((e) => e.rating);
  let average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  const [stars, set_stars] = useState(average);

  const owner2 = useSelector(selectUserOwner);
  let owner = [];
  if (owner2) {
    owner = owner2.filter((e) => e.id === props.id);
  }

  function ratingIt(newValue) {
    dispatch(ratingRecipe(props.id, newValue));
  }
  function favoriteIt(newValue) {
    dispatch(favoriteRecipe(props.id));
  }
  function changingStars(event, newValue) {
    set_stars(Math.round(newValue));
    ratingIt(Math.round(newValue));
  }
  function checkFavorite() {
    set_favorite(false);
    favorites.map((e) => {
      if (e.id === props.id) {
        set_favorite(true);
      }
    });
  }
  useEffect(() => {
    if (favorites !== null) {
      checkFavorite();
    }
  }, [favorites, props.ratings]);

  return (
    <div>
      <div>
        {token ? (
          !owner.length ? (
            <Rating
              value={stars}
              onChange={(event, newValue) => changingStars(event, newValue)}
            />
          ) : (
            <Rating
              style={{ color: "#D5D7B9", marginTop: "15px" }}
              value={stars}
              readOnly
            />
          )
        ) : (
          <Rating value={stars} readOnly />
        )}
        <span style={{ color: "gray", fontSize: "1em" }}>
          [{ratings.length}]
        </span>
        {token && !owner.length ? (
          <Rating
            style={{
              color: "red",
              marginLeft: "10px",
              fontSize: "2em",
            }}
            value={favorite}
            max={1}
            icon={"♥"}
            emptyIcon={""}
            onChange={(event, newValue) => {
              set_favorite(!favorite);
              favoriteIt(favorite);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
