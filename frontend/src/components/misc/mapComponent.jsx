// MapComponent.js
import React,{useState,useEffect} from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { SymbolPath } from "@react-google-maps/api";

// Set up default center and zoom

const googleMapsApiKey = "AIzaSyBwoLWpuPwnNaY1ZXY7vXg4mPjRdOlW7SE"

const geocodeLocation = async (location, apiKey) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status === "OK") {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } else {
    console.error("Geocoding error:", data.status, data.error_message);
    return null;
  }
};

const MapComponent = ({location}) => {
  const defaultCenter = { lat: 45.9442858, lng: 25.0094303 }; // Romania
  const [coordinates, setCoordinates] = useState(defaultCenter);

  let defaultZoom=15;

  useEffect(() => {
    if (location) {
      geocodeLocation(location, googleMapsApiKey)
        .then((coords) => {
          if (coords) setCoordinates(coords);
        })
        .catch((error) => console.error("Error in geocoding:", error));
    }
  }, [location, googleMapsApiKey]);

  if(coordinates===defaultCenter) defaultZoom = 6;
  
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={coordinates}
        zoom={defaultZoom}
      >
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
