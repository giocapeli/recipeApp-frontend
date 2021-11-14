import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password));

    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <form className="page" style={{ maxWidth: "700px" }}>
      <h1 className="title">Signup</h1>
      <input
        className="form-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Enter name"
        required
      />
      <input
        className="form-input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Enter email"
        required
      />
      <input
        className="form-input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <button className="buttons" type="submit" onClick={submitForm}>
        Sign up
      </button>

      <Link to="/login" style={{ textAlign: "center", color: "blue" }}>
        Click here to login
      </Link>
    </form>
  );
}
