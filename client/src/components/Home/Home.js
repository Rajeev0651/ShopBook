import React, { useState, useEffect } from "react";
import { useRouteMatch, Redirect } from "react-router-dom";

const Home = () => {
  const [valid, SetValid] = useState(true);
  const [connected, setConnected] = useState(false);
  const [user, SetUser] = useState("");
  useEffect(() => {
    fetch("https://localhost:5000", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.ownership);
        if (data.status !== "ok") {
          SetValid(false);
        }
        SetUser(data.ownership)
        setConnected(true);
      });
  }, []);
  return (
    <React.Fragment>
      {valid === false ? (
        <Redirect to={{ pathname: "/" }} />
      ) : connected === true ? (
        user === "user" ? (
          <Redirect to={{ pathname: "/userview" }} />
        ) : user === "hotel" ? (
          <Redirect to={{ pathname: "/adminhotel" }} />
        ) : user === "restaurant" ? (
          <Redirect to={{ pathname: "/adminrestaurant" }} />
        ) : (
          <Redirect to={{ pathname: "/adminsaloon" }} />
        )
      ) : (
        <h1>Loading...123</h1>
      )}
      {console.log(user)}
    </React.Fragment>
  );
};

export default Home;
