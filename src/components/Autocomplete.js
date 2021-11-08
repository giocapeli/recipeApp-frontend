import React from "react";
import { useState, useEffect } from "react";

export default function Autocomplete(props) {
  //it expects two paramens in props, a function that needs an id and a word.
  // const { array, action } = props;
  //the array has to have an id and a name, so, the function will be called with and do whathever it need to do

  const [typed, set_typed] = useState("");
  const [suggestions, set_suggestions] = useState([]);
  const [selected, set_selected] = useState({});
  const [autocomplete, set_autocomplete] = useState(false); //used to toogle

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

  function clickOnElement(e) {
    if (e) {
      set_selected({ name: e.name, found: true, id: e.id });
    } else {
      set_selected({ name: typed, found: false, id: Math.random() });
    }
    set_suggestions([]);
    set_autocomplete(true);
  }
  useEffect(() => {
    props.action(selected);
    set_typed("");
    set_suggestions([]);
    set_autocomplete(false);
  }, [selected]);

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
//set found to false after click on ingredient or +
