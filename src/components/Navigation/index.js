import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import { clearState } from "../../store/recipes/actions";
import { logOut } from "../../store/user/actions";

export default function Navigation() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const logged = token ? (
    <div>
      <Link to="/" onClick={() => dispatch(clearState(true))}>
        Search
      </Link>
      <Link to="/newrecipe">Post Recipe</Link>
      <Link to="/user">{user.name}</Link>
      <button onClick={() => dispatch(logOut())}>Logout</button>
    </div>
  ) : (
    <div>
      <Link to="/" onClick={() => dispatch(clearState(true))}>
        Search
      </Link>
      <Link to="/login">Login</Link>
    </div>
  );

  return (
    <Navbar bg="light" expand="lg">
      WhatShouldICook?
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          {logged}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
