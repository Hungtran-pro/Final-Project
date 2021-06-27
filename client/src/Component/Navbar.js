import React, { useContext, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PlaceIcon from "@material-ui/icons/Place";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  navappbar: {
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    height: "11vh",
  },
  func: {
    color: "black",
    marginLeft: "5vw",
    fontFamily: "Monda, sans-serif",
    fontWeight: "500",
    cursor: "pointer",
    '&:hover': {
      fontWeight: "700",
      letterSpacing: "2px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  title: {
    paddingLeft: "1vw",
    fontWeight: "600",
    fontFamily: "Monda, sans-serif",
    color: "black",
    cursor: "pointer",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    alignItems: "center",
  },
  sectionDesktop1: {
    marginRight: "1vw",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    alignItems: "center",
    color: "black",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "black",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));

  const goToBlog = () => {
    history.push("/");
  };

  const goToVenue = () => {
    history.push("/venue");
  };

  const goToStats = () => {
    history.push("/");
    alert("Function chưa xong😥");
  };

  // const Logout = async () => {
  //   localStorage.clear();
  //   dispatch({ type: "CLEAR" });
  // };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseProfile = () => {
    history.push("/profile");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseManageUser = () => {
    history.push("/admin");
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleMenuCloseLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuCloseProfile}>Profile</MenuItem>
      {user?.role === "admin" ? (<MenuItem onClick={handleMenuCloseManageUser}>Manage Users</MenuItem>) : ""}
      <MenuItem onClick={handleMenuCloseLogout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={goToBlog}>
        <IconButton aria-label="Blog" color="inherit">
          <LibraryBooksIcon />
        </IconButton>
        <p>Blog</p>
      </MenuItem>
      <MenuItem onClick={goToStats}>
        <IconButton aria-label="Stats" color="inherit">
          <InsertChartIcon />
        </IconButton>
        <p>Stats</p>
      </MenuItem>
      <MenuItem onClick={goToVenue}>
        <IconButton aria-label="Venue" color="inherit">
          <PlaceIcon />
        </IconButton>
        <p>Venue</p>
      </MenuItem>
      {state ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            {state ? <Avatar
              src={state.pic}
              style={{
                width: "25px",
                height: "25px",
                // marginLeft: "-30%",
              }}
            /> : <AccountCircle />}
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            history.push("/signin");
          }}
        >
          <IconButton aria-label="Log in" color="inherit">
            <LockOpenIcon />
          </IconButton>
          <p>Log in</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.navappbar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h4"
            noWrap
            onClick={goToBlog}
          >
            CACTUS
          </Typography>
          <div className={classes.sectionDesktop}>
            <Typography className={classes.func} onClick={goToBlog}>
              Blog
            </Typography>
            <Typography className={classes.func} onClick={goToStats}>
              Stats
            </Typography>
            <Typography className={classes.func} onClick={goToVenue}>
              Venue
            </Typography>
          </div>
          <div className={classes.grow} />
          {state ? (
            <IconButton
              className={classes.sectionDesktop1}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {state ? <Avatar
                src={state.pic}
                style={{
                  width: "40px",
                  height: "40px",
                  // marginLeft: "-30%",
                }}
              /> : <AccountCircle />}

            </IconButton>
          ) : (
            <Button
              className={classes.sectionDesktop1}
              size="small"
              variant="outlined"
              onClick={() => {
                history.push("/signin");
              }}
            >
              Login
            </Button>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {state ? renderMenu : ""}
    </div>
  );
}
