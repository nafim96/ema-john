import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import {
  createUserWithEmailAndPassword,
  handleFacebookSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFrameWork,
  signInWithEmailAndPassword
} from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSigned: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });
  initializeLoginFrameWork();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);

  const handleResponse = (res, redirect) => {
    setUser(res);
    setUserLoggedIn(res);
    if (redirect) {
      history.replace(from);
    }
  };
  
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const fbSignIn = () => {
    handleFacebookSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const SignOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const passwordLength = e.target.value.length > 6;
      const passwordValidate = /\d{1}/.test(e.target.value);
      isFieldValid = passwordLength && passwordValidate;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const SubmitHandle = (e) => {
    if (user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSigned ? (
        <button onClick={SignOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
      {<button onClick={fbSignIn}>Sign In with Facebook</button>}
      {user.isSigned && <h1>{user.name}</h1>}

      <h1>Our Own Authentication</h1>
      <form onSubmit={SubmitHandle}>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id="newUser"
        />
        <label for="newUser">New User Sign Up</label>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Enter Your name"
            required
          />
        )}
        <br />
        <input
          type="email"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter Your Email"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="Enter Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <h1 style={{ color: "red" }}>{user.error}</h1>
      {user.success && (
        <h1 style={{ color: "green" }}>
          Account {newUser ? "Created" : "Logged In "} Successfully
        </h1>
      )}
    </div>
  );
}

export default Login;
