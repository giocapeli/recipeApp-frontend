import React from "react";

export default function DeleteButton(props) {
  return (
    <div>
      <button onClick={() => props.action()} className="exit-button">
        X
      </button>
    </div>
  );
}
