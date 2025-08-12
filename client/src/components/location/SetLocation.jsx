import React, { useCallback, useEffect, useState } from "react";
import { FormControl} from "@mui/material";
import Geosearch from "./Geosearch";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useGeolocated } from "react-geolocated";

export default function SetLocation({ setData }) {
  const [position, setPosition] = useState(null);
  const [value, setValue] = useState("");
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const reverseSearch = useCallback(async () => {
    const GEOCODE_URL =
      "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
    const data = await (
      await fetch(GEOCODE_URL + `${position[1]},${position[0]}`)
    ).json();
    setValue(`${data["address"]["District"]}, ${data["address"]["Region"]}`);
    setData((prev) => ({
      ...prev,
      "location_attributes": {
        "latitude": position[0],
        "longitude": position[1],
        "city": data["address"]["City"]
      },
    }));
  }, [position]);
  useEffect(() => {
    !!position && reverseSearch();
  }, [reverseSearch, position]);
  useEffect(() => {
    !value && !!coords && setPosition([coords.latitude, coords.longitude]);
    console.log(coords);
  }, [coords]);
  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <>
      <FormControl
        fullWidth
        sx={{ display: "flex", flexDirection: "column" }}
        variant="outlined"
      >
        <p>
          <AddLocationAltIcon /> Your location
        </p>
        <Geosearch
          setPosition={setPosition}
          value={value}
          setValue={setValue}
        />
      </FormControl>
    </>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}
