import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useRouteMatch, Redirect, useHistory } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import hotelimage from "./hotel.jpg";
import restaurantimage from "./restaurant.jpg";
import saloonimage from "./saloon.jpg";

import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 400,
  },
});

function UserView() {
  const history = useHistory();
  const classes = useStyles();
  const [valid, SetValid] = useState(true);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    fetch("https://localhost:5000/", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.ownership);
        if (data.status !== "ok" || data.ownership!=="user") {
          SetValid(false);
        }
        setConnected(true);
      });
  }, []);
  function hotel() {
    history.push("/hotelform");
  }
  function restaurant() {
    history.push("/restautantform");
  }
  function saloon() {
    history.push("/saloonform");
  }
  return (
    <React.Fragment>
      {valid === false ? (
        <Redirect to={{ pathname: "/" }} />
      ) : connected === true ? (
    <Container maxWidth="xl">
      <Box mt={10} bgcolor="background.paper">
        <Grid
          container
          direction="row"
          justify="center"
          spacing="2"
          alignItems="stretch"
        >
          <Grid item xs={3}>
            <Card className={classes.root}>
              <CardActionArea onClick={hotel}>
                <CardMedia
                  className={classes.media}
                  image={hotelimage}
                  title="Hotel Booking"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Book a Hotel
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.root}>
              <CardActionArea onClick={restaurant}>
                <CardMedia
                  className={classes.media}
                  image={restaurantimage}
                  title="Restaurant Booking"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Book a Restaurant
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.root}>
              <CardActionArea onClick={saloon}>
                <CardMedia
                  className={classes.media}
                  image={saloonimage}
                  title="Saloon Booking"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Book a Saloon
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
     ) : (
      <h1>Loading...123</h1>
    )}
  </React.Fragment>
  );
}
export default UserView;
