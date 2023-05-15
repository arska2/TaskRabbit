import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete, InfoBox } from "@react-google-maps/api";
import { useGetProfileLocationsQuery, useGetTasksQuery, useReadAllImageInfoQuery } from "../../main/apiSlice";
import DraggableDialog from "../tasks/viewTask";
import { setBounds } from "../../main/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { MarkerIcons } from "./MarkerIcons";
import Checkbox from '@mui/material/Checkbox';
import { CircleImage } from "../images/CircleImage";



const libraries = ["places"]

const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            // console.log("User at: ", userLocation)
        })
    } else {
        // console.log("Broswer has no geolocation :(")
    }

}



export const MapContainer = () => {
    const [open, setOpen] = React.useState(false)
    const [selectedTask, setSelectedTask] = React.useState({})
    const [selectedProfile, setSelectedProfile] = React.useState({})

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })

    const [selectedPlace, setSelectedPlace] = React.useState(null)
    const autoCompleteRef = useRef(null);

    const [showUsers, setShowUsers] = React.useState(true)
    const [showProfile, setShowProfile] = React.useState(false)

    //const { data: tasks = [] } = useGetTasksQuery()
    const tasks = useSelector(state => state.mapReducer.tasks)
    const { data: profileLocations = [] } = useGetProfileLocationsQuery()

    const { data: imageInfo = [] } = useReadAllImageInfoQuery()

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const userLocation = getUserLocation()
    const center = useMemo(() => selectedPlace
        ? { lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }
        : userLocation || { lat: 60.19, lng: 24.94 },
        [selectedPlace, userLocation]);


    const dispatch = useDispatch()

    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }

    const onMarkerClick = (index) => {
        setSelectedTask(tasks[index])
        setOpen(true)
    }


    const onBoundsChanged = useCallback(() => {
        if (!mapRef.current) return;
        const bounds = mapRef.current.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        dispatch(setBounds({
            minLat: sw.lat(),
            maxLat: ne.lat(),
            minLng: sw.lng(),
            maxLng: ne.lng(),
        }))

    }, [mapRef, dispatch]);




    const onPlaceSelect = useCallback((place) => {
        setSelectedPlace(place);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        mapRef.current.panTo({ lat, lng });
    }, []);

    function getMarkerIcon(index, list) {
        const icons = list;
        const iconIndex = index % icons.length;
        return icons[iconIndex];
    }

    if (!isLoaded) return <div>Loading...</div>

    return (<div>
        <div className="row d-flex align-middle task-settings text-start" style={{ height: "40px" }}>
            <div className="col-3">
                Search Map
                <Autocomplete
                    onLoad={(autoComplete) => autoCompleteRef.current = autoComplete}
                    onPlaceChanged={() => onPlaceSelect(autoCompleteRef.current.getPlace())}
                >
                    <input
                        type="text"
                        placeholder="Enter an address"
                        style={{ backgroundColor: "#845EC2", color: "#000000" }}
                    />
                </Autocomplete>

            </div>
            <div className="col-3">

            </div>
            <div className="col-2 text-center">
                <a>Show Users</a>
                <Checkbox checked={showUsers} onChange={event => setShowUsers(!showUsers)} inputProps={{ 'aria-label': 'Show Users' }} />
            </div>

            <div className="col-1">

            </div>
        </div>
        <GoogleMap
            onLoad={onMapLoad}
            options={options}
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
            onBoundsChanged={onBoundsChanged}
        >
            {tasks.map((task, index) => {
                let icon
                task.status === 'available' ? icon = MarkerIcons.color3 : icon = MarkerIcons.color1
                return (<Marker key={index} position={{ lat: task.latitude, lng: task.longitude }} onClick={() => onMarkerClick(index)} icon={icon} />)
            })}
            {showUsers && profileLocations.map((location, index) => (<Marker key={index} position={{ lat: location.latitude, lng: location.longitude }} onClick={() => { setSelectedProfile(location); setShowProfile(true) }} icon={getMarkerIcon(index, MarkerIcons.rabbitList)} />))}
            {showUsers && showProfile && <InfoBox
                position={{ lat: selectedProfile.latitude + 0.0009, lng: selectedProfile.longitude }}
                options={{
                    boxStyle: {
                        width: '80px',
                        height: '80px',
                    },
                }}


            >
                <div onClick={() => setShowProfile(false)}>
                    <CircleImage size={50} imageSrc={imageInfo.find(info => info.profileId === selectedProfile.profileId)?.profileImageUrl} />
                </div>
            </InfoBox>}
        </GoogleMap>
        <DraggableDialog task={selectedTask} open={open} setOpen={setOpen} />
    </div>)

}