import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCreatedTasksQuery, useGetImageInfoQuery, useGetTasksDoneQuery, useGetTasksInAreaQuery, useGetTasksQuery } from "../../main/apiSlice";
import { TimeAgo } from './timeAgo'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormDialog from "./createTask";
import DraggableDialog from "./viewTask";
import '../../App.css';
import { CircleImage } from "../images/CircleImage";
import { setTasks } from "../../main/mapSlice";



const TaskExcerpt = ({ task }) => {
    const [open, setOpen] = React.useState(false)
    const { data: imageInfo } = useGetImageInfoQuery(task.creator.id)

    return (
        <article className="task-excerpt" onClick={() => { if (!open) setOpen(true) }}>
            {imageInfo?.profileImageUrl && <CircleImage size={50} imageSrc={imageInfo.profileImageUrl} />}
            <p className="task-title"><strong>{task.title}</strong></p>
            <div className="task-info">
                by {task.creator.username}
                <TimeAgo timestamp={task.created} />
                <div className="dialog-container">
                    <p>{task.status}</p>
                    <DraggableDialog task={task} open={open} setOpen={setOpen} />
                </div>
            </div>
        </article>
    )
}

export const TaskContainer = ({ ws }) => {

    const [durationRange, setDurationRange] = React.useState('all')
    const [sortBy, setSortBy] = React.useState('all')
    const [searchText, setSearchText] = React.useState('')
    const [searchOption, setSearchOption] = React.useState('task')
    const dispatch = useDispatch()

    const [showAll, setShowAll] = React.useState(false)
    const [showOnlyAvailable, setShowOnlyAvailable] = React.useState(true)
    const bounds = useSelector(state => state.mapReducer.bounds)
    const {
        data: tasks = [],
        isLoading
    } = useGetTasksInAreaQuery(bounds)

    const {
        data: allTasks = [],
    } = useGetTasksQuery()


    //Filter tasks
    let filteredTasks = [...tasks]
    if (showAll) filteredTasks = [...allTasks]

    //take out done tasks
    filteredTasks = filteredTasks.filter(task => {
        return task.status !== 'done'
    })

    //filter based on search results
    if (searchOption === 'task') filteredTasks = filteredTasks.filter(task => {
        return (task.description.includes(searchText) || task.title.includes(searchText))
    })

    if (searchOption === 'username') filteredTasks = filteredTasks.filter(task => {
        return task.creator.username.includes(searchText)
    })



    //filter based on duration
    if (durationRange === 'short') filteredTasks = filteredTasks.filter(task => {
        return task.durationinminutes <= 10
    })
    if (durationRange === 'medium') filteredTasks = filteredTasks.filter(task => {
        return (task.durationinminutes > 10 && task.durationinminutes <= 30)
    })
    if (durationRange === 'long') filteredTasks = filteredTasks.filter(task => {
        return task.durationinminutes > 30
    })

    if (showOnlyAvailable == true) filteredTasks = filteredTasks.filter(task => {
        return task.status == 'available'
    })


    //Sort tasks
    const sortedTasks = [...filteredTasks]
    if (sortBy === 'time') sortedTasks.sort((a, b) => b.created.localeCompare(a.created))
    if (sortBy === 'price') sortedTasks.sort((a, b) => b.payment > a.payment ? 1 : -1)


    dispatch(setTasks(sortedTasks))

    let content = sortedTasks.map(task => <TaskExcerpt key={task.id} task={task} ws={ws} />)

    return (

        <section className="task-container">
            <div className="row d-flex text-start task-settings" style={{ height: "40px" }}>
                <div className="col-4 ">
                    <p className="mb-1">Search</p>
                    {/* <select className="" aria-label="Default select example" onChange={ev => setSearchOption(ev.target.value)} >
                        <option value="task">Task</option>
                        <option value="username">Username</option>
                    </select> */}
                    <input placeholder="Search" onChange={ev => setSearchText(ev.target.value)} style={{ backgroundColor: "#845EC2", color: "#000000" }}></input>
                </div>



                <div className="col-2">
                    <p className="mb-1">Duration</p>
                    <select className="" aria-label="Default select example" onChange={ev => setDurationRange(ev.target.value)} style={{ backgroundColor: "#845EC2", color: "#000000" }}>
                        <option value="all">All</option>
                        <option value="short">0-10 min</option>
                        <option value="medium">10-30 min</option>
                        <option value="long">+30 min</option>
                    </select>
                </div>

                <div className="col-3">
                    <p className="mb-1">Sort by</p>
                    <select className="" aria-label="Default select example" onChange={ev => setSortBy(ev.target.value)} style={{ backgroundColor: "#845EC2", color: "#000000" }}>
                        <option value="all">All</option>
                        <option value="time">Most Recent</option>
                        <option value="price">Price</option>
                    </select>
                </div>

                <div className="col-1 text-center">
                    <a>Available</a>
                    <Checkbox checked={showOnlyAvailable} onChange={event => setShowOnlyAvailable(!showOnlyAvailable)} inputProps={{ 'aria-label': 'Show Available' }} />
                </div>
                <div className="col-1 text-center">
                    <a>All</a>
                    <Checkbox checked={showAll} onChange={event => setShowAll(!showAll)} inputProps={{ 'aria-label': 'Show all' }} />
                </div>

            </div>

            <div className="task-list">
                {content}
            </div>
            <div className="plus-button">
                <FormDialog />
            </div>
        </section>

    )

}

//        <p className="task-content">{task.content.substring(0,100)}</p>
//        <TimeAgo timestamp={date}/>
//     let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(task.created)

