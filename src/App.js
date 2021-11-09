import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Homepage from "./pages/Homepage";
import Recipe from "./pages/Recipe";
import UserPage from "./pages/UserPage";
import PostRecipe from "./pages/PostRecipe";
import Loading from "./components/Loading";
import Layout from "./pages/Layout";
import Navbar from "./components/Navigation/Navbar";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      {/* <Navigation /> */}
      <Navbar />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/user" component={UserPage} />
        <Route path="/newrecipe" component={PostRecipe} />
        <Route path="/layout" component={Layout} />
      </Switch>
      <MessageBox />
    </div>
  );
}

export default App;
