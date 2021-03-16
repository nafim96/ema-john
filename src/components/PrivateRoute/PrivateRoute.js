import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../App";

const PrivateRoute = ({children,...rest}) => {
    const [userLoggedIn, setUserLoggedIn]= useContext(UserContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userLoggedIn.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
