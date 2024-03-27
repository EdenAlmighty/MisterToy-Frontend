import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Marker } from "./Marker";
// const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// console.log(googleMapsApiKey);
export function GoogleMap() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function handleClick({ lat, lng }) {
        setCoords({ lat, lng })
    }


    function distanceToMouse({ x, y }, { x: mouseX, y: mouseY }) {
        return Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY))
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCtWYZsx0vrY5eK3uLqlT9hpmNHt0_rDJo" }}
                center={coords}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}

                // yesIWantToUseGoogleMapApiInternals

                onClick={handleClick}
            >
                {/* {markers} */}

                <Marker

                    {...coords}
                    text="HERE!"
                />

            </GoogleMapReact>
        </div>
    );
}