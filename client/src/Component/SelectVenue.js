import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { citiesByState } from "../city/city";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 170,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 170,
    },
  },
};

export default function SelectVenue() {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const handleChangeCity = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const hangleChangeDistrict = (e) => {
    console.log(e.target.value);
    setDistrict(e.target.value);
  };

  const displayDistrict = (district, index) => {
    return (
        <MenuItem value={district} key={index}>{district}</MenuItem>
    )
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">
          Choose City
        </InputLabel>
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
        <InputLabel id="demo-simple-select-helper-label">
          Choose District
        </InputLabel>
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
    </div>
  );
}
