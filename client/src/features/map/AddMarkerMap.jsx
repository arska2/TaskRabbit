import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";


const libraries = ["places"]


const findUser = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
})


export const AddMarkerMap = ({ marker, setMarker }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })
    // const [marker, setMarker] = React.useState({})
    const [selectedPlace, setSelectedPlace] = React.useState(null);
    const autocompleteRef = useRef(null);


    const center = useMemo(() => {
        if (selectedPlace) {
            return {
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng()
            };
        }
        return marker;
    }, [selectedPlace, marker]);

    React.useEffect(() => {
        findUser.then(location => {
            console.log('Found user at location', location)
            setMarker(location)
        }).catch(error => {
            console.log("Error getting user location: ", error)
            setMarker({ lat: 62.19, lng: 26.94 })
        })
    }, [])



    const onPlaceSelect = useCallback((place) => {
        setSelectedPlace(place);
        setMarker({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
    }, []);


    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }

    const onCurrentLocationClicked = () => {
        findUser.then(location => {
            // console.log('Found user at location', location)
            setMarker(location)
            setSelectedPlace(null)
        }).catch(error => {
            // console.log("User location was not found")
        })
    }


    if (!isLoaded) return <div>Loading...</div>
    return (<div>
        <div className="marker-map-container">
            <Autocomplete
                onLoad={(autocomplete) => {
                    autocompleteRef.current = autocomplete;
                    console.log('loaded', autocomplete)
                }}
                onPlaceChanged={() => {
                    const place = autocompleteRef.current.getPlace();
                    onPlaceSelect(place);
                }}
            >
                <input className="marker-map-autocomplete-input" type="text" placeholder="Enter location" />
            </Autocomplete>
            <button className="marker-map-current-location-btn" onClick={onCurrentLocationClicked}>Current Location</button>
        </div>
        <div className="marker-map">
            <GoogleMap
                options={options}
                zoom={16}
                center={center}
                mapContainerClassName="map-container"
            >


                <Marker
                    key={1}
                    position={marker}
                    draggable={true}
                    onDragEnd={event => {
                        const newPosition = {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng()
                        };
                        setMarker(newPosition);
                    }}
                />

            </GoogleMap>
        </div>
    </div>)

}