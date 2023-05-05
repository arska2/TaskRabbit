import { MapContainer } from "../map/MapContainer"
import { TaskContainer } from "./taskContainer"
import React from "react"


export const TaskPage = () => {


    return <div className="row">
        <div className="col-6">
            <TaskContainer />
        </div>
        <div className="col-6">
            <MapContainer />
        </div>
    </div>
}