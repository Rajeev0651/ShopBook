import React, { useState , useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Background from "./img/background.jpg";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik, Field } from "formik";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [valid, SetValid] = useState(true);
  const [connected, setConnected] = useState(false);
  const initialValues = {
    name: "",
    location: "",
    checkin: "",
    checkout: "",
    room: "",
    adult: "",
    children: "",
  };
  useEffect(() => {
    fetch("https://localhost:5000", {
        method: "GET",
        mode: "cors",
        withCredentials: true,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status !== "ok" || data.ownership!=="user") SetValid(false)
          setConnected(true)
        })
        .catch((err) => console.log(err));
  }, [])
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      fetch("https://localhost:5000/hotelbooking", {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status !== "ok" || data.ownership!=="hotel") SetValid(false)
          setConnected(true)
        })
        .catch((err) => console.log(err));
        resetForm({ values: "" });
    },
  });
  return (
    <React.Fragment>
      {valid === false ? (
        <Redirect to={{ pathname: "/" }} />
      ) : connected === true ? (
        <div
        style={{
          background: `url(${Background})`,
          height: "713px",
        }}
      >
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Box width={1 / 4} ml={70} mt={0}>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Name
                </span>
              </div>
              <input
                type="text"
                name="name"
                class="form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Location
                </span>
              </div>
              <input
                type="text"
                name="location"
                class="form-control"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  CheckIn
                </span>
              </div>
              <input
                type="date"
                name="checkin"
                class="form-control"
                value={formik.values.checkin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  CheckOut
                </span>
              </div>
              <input
                type="date"
                name="checkout"
                class="form-control"
                value={formik.values.checkout}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Room
                </span>
              </div>
              <input
                type="Number"
                name="room"
                class="form-control"
                value={formik.values.room}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Adult
                </span>
              </div>
              <input
                type="Number"
                name="adult"
                class="form-control"
                value={formik.values.adult}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Children
                </span>
              </div>
              <input
                type="number"
                name="children"
                class="form-control"
                value={formik.values.childern}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </div>
          </Box>
        </form>
      </div>
      ) : (
        <h1>Loading...123</h1>
      )}
    </React.Fragment>
  );
};

export default Login;
