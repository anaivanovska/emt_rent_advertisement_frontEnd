import React from 'react';
import {GOOGLE_API_KEY} from "../../Constants";
import './mapStyle.scss';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

const GoogleMapReact = withScriptjs(withGoogleMap(props => {
        const {latitude, longitude} = props;
        return (
            <GoogleMap
            defaultZoom={14}
            defaultCenter={{lat: latitude, lng: longitude}}
        className="map-box">

            <Marker position={{lat: latitude, lng: longitude}}/>

        </GoogleMap>
        );
    }
));

const MapContainer = (props) => {
    return (
        <GoogleMapReact
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div className="loadingElementStyle" />}
            containerElement={<div className="contatinerElementStyle" />}
            mapElement={<div className="mapElementStyle" />}
            location={props.location}
        />
    )
};

export default MapContainer;