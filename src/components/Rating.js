import React from "react";

export default function Rating(props) {
  const ratings = props.ratings.map((e) => e.rating);

  const average =
    Math.round(
      ratings.reduce(function (sum, current) {
        return sum + current;
      }, 0) / ratings.length
    ) * 20;

  console.log("rating:", average);

  return (
    <div>
      <span
        style={{ fontSize: "2em" }}
        class={`stars-container stars-${average}`}
      >
        ★★★★★
      </span>
      <span style={{ color: "gray", fontSize: "1.5em" }}>
        [{ratings.length}]
      </span>
    </div>
  );
}
