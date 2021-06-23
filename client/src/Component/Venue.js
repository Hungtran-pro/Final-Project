import React, { useEffect, useState } from "react";
import {
  ButtonBase,
  Grid,
  Paper,
  Typography,
  Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import withWidth from "@material-ui/core/withWidth";
import "../Style/Venue.css";
import anh from "../img/coffee.png";
import {
  getCafe,
  getCafeInPage,
  getNumberCitySelectedCafes,
  getNumberOfPages,
  getNumberSelectedCafes,
  getSelectedCafes,
  getSelectedCityCafes,
} from "../axios";
import SelectVenue from "./SelectVenue";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: "11vh",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "start",
    // color: theme.palette.text.secondary,
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
  modaldiv: {
    position: "absolute",
    width: 500,
    backgroundColor: "#F1F1F1",
    // backgroundColor: 'none',
    // border: "1px solid #000",
    borderRadius: "10px",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 4, 3),
  },
}));

function Venue(props) {
  const [openModal, setOpenModal] = useState(false);
  const [cafe, setCafe] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const { width } = props;
  var classes = useStyles();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getNumberOfPages().then((res) => {
        setNumberOfPages(res.data);
      });
      getCafe()
        .then((res) => {
          setCafe(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setCafe(null);
        });
    }, 3000);
  }, []);

  const bodyContent = (url) => (
    <div
      className={classes.modaldiv}
      style={{
        top: `45%`,
        left: `50%`,
        transform: `translate(-50%, -35%)`,
      }}
    >
      <p className="mapTitle">map</p>
      <iframe
        className="map"
        src={url}
        width="500"
        height="400"
        allowFullScreen=""
        loading="lazy"
        title="map"
      ></iframe>
    </div>
  );

  const handleChangePage = (event, page) => {
    setPage(page);
    getCafeInPage(page).then((res) => {
      setCafe(res.data);
    });
    window.scrollTo(0, 0);
  };

  const callBackSetCity = (citySelected) => {
    setCity(citySelected);
  };

  const callBackSetDistrict = (districtSelected) => {
    setDistrict(districtSelected);
  };

  const handleClickButton = () => {
    let body = {
      city: city,
      district: district,
    };
    if (!city) {
      setLoading(true);
      setTimeout(() => {
        getNumberOfPages().then((res) => {
          setNumberOfPages(res.data);
        });
        getCafe()
          .then((res) => {
            setCafe(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setCafe(null);
          });
      }, 3000);
    } else if (city && !district) {
      setLoading(true);
      setTimeout(() => {
        getNumberCitySelectedCafes(body).then((res) => {
          setNumberOfPages(res.data);
        });
        getSelectedCityCafes(body)
          .then((res) => {
            setCafe(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setCafe(null);
          });
      }, 3000);
    } else {
      setLoading(true);
      setTimeout(() => {
        getNumberSelectedCafes(body).then((res) => {
          setNumberOfPages(res.data);
        });
        getSelectedCafes(body)
          .then((res) => {
            setCafe(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            setCafe(null);
          });
      }, 2000);
      // getSelectedCafes(body).then((res) => {
      //   setCafe(res.data);
      // });
      // getNumberSelectedCafes(body).then((res) => {
      //   setNumberOfPages(res.data);
      // });
    }
  };

  const handleMap = () => {
    setOpenModal(true);
  };

  const renderCafe = (item, index) => {
    return (
      <div className={classes.root} key={index}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image} onClick={handleMap}>
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
                  <Typography gutterBottom variant="h5">
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
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
          disablePortal
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>{bodyContent(item.url)}</Fade>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Grid className={classes.root} container>
        <Hidden xsDown>
          <Grid container item xs={2}>
            {/* <SelectVenue
            district={callBackSetDistrict}
            city={callBackSetCity}
            click={handleClickButton}
          /> */}
            <SelectVenue
              district={callBackSetDistrict}
              city={callBackSetCity}
              click={handleClickButton}
            />
          </Grid>
        </Hidden>
        <Grid container item xs={width === "sm" ? 7 : width === "xs" ? 10 : 5} className={classes.middle}>
          {console.log(width)}
          {loading ? (
            <div class="shapes-5"></div>
          ) : cafe ? (
            <div>
              {cafe.map(renderCafe)}
              <Pagination
                className={classes.pagination}
                count={Math.ceil(numberOfPages / 10)}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </div>
          ) : (
            <p>Nothing matches</p>
          )}
        </Grid>
        <Hidden smDown>
          <Grid container item xs={4}>
            <img className="rightImg" alt="Đây là chỗ để ảnh" src={anh} />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

Venue.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(Venue);
