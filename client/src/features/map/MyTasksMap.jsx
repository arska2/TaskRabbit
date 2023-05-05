import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useGetCreatedTasksQuery, useGetTasksInProgressQuery, useGetTasksQuery } from "../../main/apiSlice";
import DraggableDialog from "../tasks/viewTask";
import { setBounds } from "../../main/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { MarkerIcons } from "./MarkerIcons";

const libraries = ["places"];

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



export const MyTasksMap = () => {
    const [selectedTask, setSelectedTask] = React.useState({})
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })
    const user = useSelector(state => state.userReducer.user)
    const { data: tasksInProgress = [] } = useGetTasksInProgressQuery(user.id)
    const { data: tasksCreated = [] } = useGetCreatedTasksQuery(user.id)

    const tasks = [...tasksCreated, ...tasksInProgress]
    const markers = tasks.map(task => ({ lat: task.latitude, lng: task.longitude }))


    const userLocation = getUserLocation()

    const center = userLocation || { lat: 60.19, lng: 24.94 }





    const onMarkerClick = (index) => {
        setSelectedTask(tasks[index])
    }

    if (!isLoaded) return <div>Loading...</div>
    return (<div>
        <GoogleMap

            options={{
                tilt: 0,
                disableDefaultUI: true,
                zoomControl: true,
            }}
            zoom={12}
            center={center}
            mapContainerClassName="map-container"
        >
            {tasks.map((task, index) => {
                let icon
                if (task.status === 'available') icon = MarkerIcons.green
                if (task.status === 'unavailable') icon = MarkerIcons.yellow
                if (task.status === 'done') icon = MarkerIcons.color1




                return (<Marker key={index} position={{ lat: task.latitude, lng: task.longitude }} onClick={() => onMarkerClick(index)} icon={icon} />)
            })}
            {userLocation ? <Marker icon={{
                fillColor: `#4285F4`,
                fillOpacity: 1,
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeColor: `rgb(255,255,255)`,
                strokeWeight: 2,
            }} /> : ""}
        </GoogleMap>
    </div>)

}