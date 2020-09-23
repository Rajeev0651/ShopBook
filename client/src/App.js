import React from "react";
import Home from "./components/Home/Home";
import Welcome from "./components/Welcome/Welcome";
import User from "./components/Home/UserView/UserView";
import AdminHotel from "./components/Home/AdminView/AdminView";
import AdminRestaurant from "./components/Home/AdminView/AdminViewRestaurant";
import AdminSaloon from "./components/Home/AdminView/AdminViewSaloon"
import hotelform from "./components/Home/HotelForm/HotelForm"
import restaurantform from "./components/Home/RestaurantForm/RestaurantForm"
import saloonform from "./components/Home/SaloonForm/SaloonForm"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={Welcome} exact={true} />
          <Route path="/home" component={Home} />
          <Route path="/userview" component={User} exact={true} />
          <Route path="/adminhotel" component={AdminHotel} exact={true} />
          <Route path="/adminrestaurant" component={AdminRestaurant} exact={true} />
          <Route path="/adminsaloon" component={AdminSaloon} exact={true} />
          <Route path="/hotelform" component={hotelform} exact={true} />
          <Route path="/restautantform" component={restaurantform} exact={true} />
          <Route path="/saloonform" component={saloonform} exact={true} />
          {/* <Route component={Error404} /> */}
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
export default App;
