import React from "react";
import { useState, useEffect } from "react";

export default function Autocomplete(props) {
  const [typed, set_typed] = useState("");
  const [suggestions, set_suggestions] = useState([]);
  const [selected, set_selected] = useState({});
  const [autocomplete, set_autocomplete] = useState(false); //used to toogle autocomplete

  useEffect(() => {
    if (typed !== "") {
      const newArray = props.array.filter(
        (e) => e.name.toLowerCase().indexOf(typed.toLowerCase()) > -1
      );
      set_suggestions(newArray);
    } else {
      set_suggestions([]);
    }
  }, [typed, props.array]);

  useEffect(() => {
    props.action(selected);
    set_typed("");
    set_suggestions([]);
    set_autocomplete(false);
  }, [selected, props]);

  function clickOnElement(e) {
    if (e) {
      set_selected({ name: e.name, found: true, id: e.id });
    } else {
      set_selected({ name: typed, found: false, id: Math.random() });
    }
    set_suggestions([]);
    set_autocomplete(true);
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        <input
          className="form-input"
          value={typed}
          placeholder="Search by Name"
          onChange={(event) => set_typed(event.target.value)}
        />
        {suggestions.length === 0 && typed !== "" ? (
          <div onClick={() => clickOnElement()} className="side-button green">
            <h4 style={{ margin: "auto" }}>+</h4>
          </div>
        ) : null}
      </div>
      {!autocomplete ? (
        <div className="autocompleteForm">
          {suggestions.map((e) => (
            <div
              className="autocompleteSugestion"
              onClick={() => clickOnElement(e)}
            >
              {e.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
