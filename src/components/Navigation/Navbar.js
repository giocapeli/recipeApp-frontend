import React from "react";
import { useState } from "react";
import "./style.css";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import { clearState } from "../../store/recipes/actions";
import { logOut } from "../../store/user/actions";

export default function Menu() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [show, setshow] = useState(false);
  function myFunction() {
    setshow(!show);
  }
  function reportWindowSize() {
    setshow(false);
  }
  function resetState() {
    dispatch(clearState(true));
    setshow(false);
  }

  function logout() {
    dispatch(logOut());
    resetState();
  }

  window.onresize = reportWindowSize;

  const menu = show ? "" : "hide";
  return (
    <div className="my-navbar">
      {!show ? (
        <Link to="/" onClick={() => resetState()} className="link">
          <div style={{ flexGrow: "1" }}>WhatShouldICook?</div>
        </Link>
      ) : null}
      <div>
        <Link to="/" onClick={() => resetState()}>
          <h1 className={`navbar-link ${menu}`}>Search</h1>
        </Link>
        {token ? (
          <Link
            to="/newrecipe"
            onClick={() => {
              setshow(false);
            }}
          >
            <h1 className={`navbar-link ${menu}`}>Post Recipe</h1>
          </Link>
        ) : null}
        {token ? (
          <Link
            to="/user"
            onClick={() => {
              setshow(false);
            }}
          >
            <h1 className={`navbar-link ${menu}`}>{user.name}</h1>
          </Link>
        ) : null}
        {!token ? (
          <Link
            to="/login"
            onClick={() => {
              setshow(false);
            }}
          >
            <h1 className={`navbar-link ${menu}`}>Login</h1>
          </Link>
        ) : null}
        {token ? (
          <Link to="/login">
            <h1
              style={{ color: "rgb(158, 18, 0)", fontWeight: "500" }}
              className={`navbar-link ${menu}`}
              onClick={() => {
                logout();
                setshow(false);
              }}
            >
              Logout
            </h1>
          </Link>
        ) : null}
        <div className="show-navbar-button" onClick={() => myFunction()}>
          |||
        </div>
      </div>
    </div>
  );
}
