import React from "react";
import { useState, useEffect } from "react";

export default function Autocomplete(props) {
  //it expects two paramens in props, a function that needs an id and a word.
  // const { array, action } = props;
  //the array has to have an id and a name, so, the function will be called with and do whathever it need to do

  const [typed, set_typed] = useState("");
  const [suggestions, set_suggestions] = useState([]);
  const [selected, set_selected] = useState({});

  useEffect(() => {
    //console.log(typed);
    if (typed !== "") {
      const newArray = props.array.filter(
        (e) => e.name.toLowerCase().indexOf(typed.toLowerCase()) > -1
      );
      //console.log(newArray);

      set_suggestions(newArray);
    } else {
      set_suggestions([]);
    }
  }, [typed]);

  const [found, set_found] = useState(false);
  function clickOnElement(e) {
    set_selected({ name: e.name, found: true, id: e.id });
    set_suggestions([]);
    set_found(true);
  }
  useEffect(() => {
    if (found) {
      props.action(selected);
    }
  }, [selected]);

  return (
    <div>
      {!found ? (
        <div>
          <input
            className="forminput"
            value={typed}
            placeholder="Search by Name"
            onChange={(event) => set_typed(event.target.value)}
          />
          {suggestions.length === 0 && typed !== "" ? (
            <p
              onClick={() => {
                set_found(true);
                set_selected({ name: typed, found: false, id: Math.random() });
              }}
              className="deleteButton"
              style={{ backgroundColor: "green" }}
            >
              +
            </p>
          ) : null}
        </div>
      ) : (
        <div>
          {selected.name}
          <p className="deleteButton" onClick={() => set_found(false)}>
            x
          </p>
        </div>
      )}
      {!found ? (
        <div className="autocompleteForm">
          {suggestions.map((e) => (
            <div
              className="autompleteSugestion"
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
