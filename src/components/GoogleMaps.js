import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const GoogleMaps = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error in retrieving your location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  const onMapLoad = (map) => {
    setMap(map);
  };

  const renderMarkers = () => {
    return (
      <Marker
        position={currentLocation}
        icon={{
          url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
      />
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || { lat: 0, lng: 0 }}
        zoom={10}
        onLoad={onMapLoad}
      >
        {currentLocation && renderMarkers()}
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;
