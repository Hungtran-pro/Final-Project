import React, { useEffect, useState } from "react";
import {
  ButtonBase,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import "../Style/Venue.css";
import { getCafe, getCafeInPage, getNumberOfPages } from "../axios";
import SelectVenue from "./SelectVenue";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-around",
    marginLeft: 2,
    marginBottom: 20,
    marginTop: 30,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "start",
    color: theme.palette.text.secondary,
    maxWidth: 600,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  middle: {
    justifyContent: "center",
  },
}));

export default function Venue() {
  const [cafe, setCafe] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [keySearch, setKeySearch] = useState("");
  var classes = useStyles();

  useEffect(() => {
    getNumberOfPages().then((res) => {
      setNumberOfPages(res.data);
      console.log(res.data);
    });
    getCafe().then((res) => {
      setCafe(res.data);
    });
  }, []);

  const handleChangePage = (event, page) => {
    console.log(page);
    getCafeInPage(page).then((res) => {
      setCafe(res.data);
    });
    window.scrollTo(0, 0);
  };

  function renderCafe(item, index) {
    console.log(item);
    return (
      <div className={classes.root} key={index}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://cong-news.appwifi.com/wp-content/uploads/2020/07/Website-Our-Story-TVV.jpg"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" variant="h5">
                  {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Address: {item.address}
                    </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Detail: {item.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Capability: {item.capability}
                  </Typography>
                </Grid>
                {/* <Grid item>
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    Remove
                  </Typography>
                </Grid> */}
              </Grid>
              {/* <Grid item>
                <Typography variant="subtitle1">$19.00</Typography>
              </Grid> */}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }

  const searchCafe = () => {
    console.log("searching...");
  };

  return (
    <div>
      <Grid className={classes.root} container>
        <Grid container item xs={3}>
          <SelectVenue />
        </Grid>
        <Grid container item xs={6} className={classes.middle}>
          {cafe.map(renderCafe)}
          {/* {cafe.map(FormRow)} */}
          <Pagination
            className={classes.pagination}
            count={Math.ceil(numberOfPages / 10)}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Grid>
        <Grid container item xs={3}>
          {/* <img
            className={classes.cafeImg}
            alt="img"
            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/coffee_break_j3of.svg"
          /> */}
        </Grid>
      </Grid>
    </div>
  );
}
