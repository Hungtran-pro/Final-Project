import React, { useState, useContext } from "react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { UserContext } from "../App";
import { grey } from "@material-ui/core/colors";

import "../Style/Leftbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "15vw",
    height: 30,
    background: "white",
    marginBottom: "10px",
  },
  input: {
    marginLeft: theme.spacing(1),
    fontSize: "15px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  search: {
    marginTop: "3vh",
    background: "white",
    display: "flex",
    alignItems: "center",
    width: "14vw",
    borderColor: "black",
    color: "black",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

function Leftbar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState([]);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("http://localhost:5000/searchuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserDetails(result.user);
      });
  };
  return (
    <div className="leftbar">
      <div className="leftSearch">
        <ThemeProvider theme={theme}>
          <TextField
            id="mui-theme-provider-outlined-input"
            className={classes.search}
            // id="outlined-basic"
            size="small"
            label="Search users"
            variant="outlined"
            onChange={(e) => fetchUsers(e.target.value)}
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </ThemeProvider>
      </div>
      <div className="userLists">
        {search === "" ? null : (
          <div>
            {userDetails.map((item) => {
              return (
                <div className="userComponents">
                  <Avatar
                    src={item.pic}
                    style={{
                      width: "40px",
                      height: "40px",
                      // marginLeft: "-30%",
                    }}
                  />
                  <div className="usernames">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "normal",
                      }}
                      to={
                        state
                          ? item?._id !== state._id
                            ? "/profile/" + item?._id
                            : "/profile"
                          : "/profile/" + item?._id
                      }
                    >
                      {item.username}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leftbar;