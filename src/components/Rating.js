import React from "react";

export default function Rating(props) {
  console.log(props);
  const number = Math.round(props.rating.averageRating * 2) * 10;
  return (
    <div>
      <span
        style={{ fontSize: "2em" }}
        class={`stars-container stars-${number}`}
      >
        ★★★★★
      </span>
      <span style={{ color: "gray", fontSize: "1.5em" }}>
        [{props.rating.quantity}]
      </span>
    </div>
  );
}
