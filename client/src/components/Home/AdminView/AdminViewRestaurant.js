import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const AdminView = () => {
  const classes = useStyles();
  const [valid, SetValid] = useState(true);
  const [connected, setConnected] = useState(false);
  const [totalbooking, SetBooking] = useState([]);
  useEffect(() => {
    fetch("https://localhost:5000/restaurantviewrequest", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Restaurant : ",data.ownership);
        if (data.status !== "ok") {
          SetValid(false);
          setConnected(true);
        }
        if (data.ownership !== "restaurant") {
          SetValid(false);
          setConnected(true);
        }
        setConnected(true);
        console.log(data)
        if (data.ownership === "restaurant" && data.status === "ok") {
          var ob = { ad: "as" };
          var dr = data.data;
          for (var i = 0; i < dr.length; i++) {
            SetBooking((totalbooking) => [...totalbooking, dr[i]]);
          }
        }
      });
  }, []);
  function handleClick(id) {
    fetch("https://localhost:5000/restaurantdelete", {
      method: "POST",
      mode: "cors",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") console.log("Entry Successfully deleted !!!");
        else console.log("Delete query error !!");
      });
  }
  return (
    <React.Fragment>
      {valid === false ? (
        <Redirect to={{ pathname: "/" }} />
      ) : connected === true ? (
        <div>
          <h1 align="center">Restaurant record</h1>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Customer ID</StyledTableCell>
                  <StyledTableCell align="right">Location</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Seats</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalbooking.length >= 0 &&
                  totalbooking.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.customer_id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.location}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.date}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.seats}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleClick(row.customer_id)}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h1>Loading...123</h1>
      )}
    </React.Fragment>
  );
};

export default AdminView;
