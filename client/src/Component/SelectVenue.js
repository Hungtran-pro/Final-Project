import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { citiesByState } from "../city/city";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 150,
    width: "14vw",
  },
  divSelect: {
    marginTop: "11vh",
    paddingTop: "2vh",
    position: "fixed",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px #c2c2c2 solid",
    borderRadius: "10px",
    height: "40vh",
    padding: "0 1vw",
  },
  buttonSelect: {
    width: 100,
    marginTop: 15,
    fontWeight: "bold",
    letterSpacing: 1,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 170,
    },
  },
};
export default function SelectVenue(props) {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const handleChangeCity = (e) => {
    setCity(e.target.value);
    props.city(e.target.value);
  };

  const hangleChangeDistrict = (e) => {
    setDistrict(e.target.value);
    props.district(e.target.value);
  };

  const handle = () => {
    props.click();
  };

  const displayDistrict = (district, index) => {
    return (
      <MenuItem value={district} key={index}>
        {district}
      </MenuItem>
    );
  };

  return (
    <div className={classes.divSelect}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={city}
          onChange={handleChangeCity}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Hà Nội"}>Hà Nội</MenuItem>
          <MenuItem value={"Hồ Chí Minh"}>Hồ Chí Minh</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">District</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={district}
          onChange={hangleChangeDistrict}
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {city.length === 0 ? null : citiesByState[city].map(displayDistrict)}
        </Select>
      </FormControl>
      {/* <button class="custom-btn btn-12">
        <span>Click!</span>
        <span>Read More</span>
      </button> */}
      <Button
        size="small"
        className={classes.buttonSelect}
        id="btn-filter"
        onClick={handle}
      >
        Filter
      </Button>
    </div>
  );
}
