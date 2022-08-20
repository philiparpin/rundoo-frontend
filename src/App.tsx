import React, { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const useStyles = makeStyles()({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
});

function App() {
  const { classes } = useStyles();

  const baseURL = "http://localhost:8080/api/supplier";

  const [companyName, setCompanyName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [logoAttached, setLogoAttached] = useState(false);

  const formData = new FormData();

  const loadFile = (e: any) => {
    e.preventDefault();
    setLogoAttached(true);
    formData.append("logo", e.target.files[0]);
    console.log(formData.get("logo"));
  };

  const postSupplier = (e: any) => {
    e.preventDefault();
    formData.append("name", companyName);
    formData.append("streetAddress", streetAddress);
    formData.append("city", city);
    formData.append("state", usState);
    formData.append("zipCode", zip);
    formData.append("country", country);
    axios
      .post(baseURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="App">
      <h1>Add a supplier!</h1>
      <form className={classes.root} onSubmit={postSupplier}>
        <TextField
          id="text-field"
          label="Company Name"
          variant="outlined"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
        {!logoAttached ? (
          <Button variant="contained" component="label" color="primary">
            {" "}
            <AddIcon /> Attach Logo
            <input
              type="file"
              id="company-logo"
              name="company-logo"
              onChange={loadFile}
              hidden
            />
          </Button>
        ) : (
          <Button variant="contained" component="label" color="primary">
            Change Logo
            <input
              type="file"
              id="company-logo"
              name="company-logo"
              onChange={loadFile}
              hidden
            />
          </Button>
        )}
        <TextField
          id="text-field"
          label="Street Address"
          variant="outlined"
          onChange={(e) => setStreetAddress(e.target.value)}
          value={streetAddress}
        />
        <TextField
          id="text-field"
          label="City"
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <TextField
          id="text-field"
          label="State"
          variant="outlined"
          onChange={(e) => setUsState(e.target.value)}
          value={usState}
        />
        <TextField
          id="text-field"
          label="Zip Code"
          variant="outlined"
          onChange={(e) => setZip(e.target.value)}
          value={zip}
        />
        <TextField
          id="text-field"
          label="Country"
          variant="outlined"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
        <Button type="submit" variant={"contained"} color={"primary"}>
          Add Supplier
        </Button>
      </form>
    </div>
  );
}

export default App;
