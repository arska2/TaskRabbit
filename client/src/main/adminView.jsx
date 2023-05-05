import React from "react"
import { useGetProfilesQuery, useGetReviewsQuery, useGetSimpleTasksQuery, useDeleteTaskMutation, useDeleteReviewMutation, useReadAllImageInfoQuery, useGetProfileLocationsQuery } from "./apiSlice"
import { useSelector } from "react-redux";









export const AdminView = () => {


    const { data: tasks, isLoading: isLoadingTasks } = useGetSimpleTasksQuery()
    const { data: reviews, isLoading: isLoadingReviews } = useGetReviewsQuery();
    const { data: profiles, isLoading: isLoadingProfiles } = useGetProfilesQuery();
    const { data: imageInfo, isLoading: isLoadingImageInfo } = useReadAllImageInfoQuery()
    const { data: locations, isLoading: isLoadingLocations } = useGetProfileLocationsQuery()
    const user = useSelector(state => state.userReducer.user) || {};
    const [deleteTask] = useDeleteTaskMutation()
    const [deleteReview] = useDeleteReviewMutation()

    let profileKeys
    let reviewKeys
    let taskKeys
    let imageInfoKeys
    let locationKeys
    if (!isLoadingProfiles) profileKeys = Object.keys(profiles[1])
    if (!isLoadingTasks) taskKeys = Object.keys(tasks[1])
    if (!isLoadingReviews) reviewKeys = Object.keys(reviews[1])
    if (!isLoadingImageInfo) imageInfoKeys = Object.keys(imageInfo[1])
    if (!isLoadingLocations) locationKeys = Object.keys(locations[1])




    if (isLoadingProfiles || isLoadingReviews || isLoadingTasks || isLoadingImageInfo || isLoadingLocations || user.id !== 3) return <p>Loading...</p>

    return (
        <div>
            <h2>Admin View</h2>
            <div>

                <div>
                    <h3>Profiles</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {profileKeys.map(key => <th key={key}>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map(profile =>
                                <tr>
                                    {profileKeys.map(key => <td>{profile[key]}</td>)}
                                </tr>)}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>Tasks</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {taskKeys.map(key => <th key={key}>{key}</th>)}
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => <tr>
                                {taskKeys.map(key => <td>{task[key]}</td>)}
                                <td><button onClick={() => deleteTask(task.id).unwrap().then(response => {
                                    console.log('deleted', response)
                                })}>Delete</button></td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>

                <div>

                    <h3>Reviews</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {reviewKeys.map(key => <th key={key}>{key}</th>)}
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review =>
                                <tr>
                                    {reviewKeys.map(key => <td>{review[key]}</td>)}
                                    <td><button onClick={() => deleteReview(review.id).unwrap().then(response => {
                                        console.log('deleted', response)
                                    })}>Delete</button></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>

                <div>

                    <h3>Locations</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {locationKeys.map(key => <th key={key}>{key}</th>)}

                            </tr>
                        </thead>
                        <tbody>
                            {locations.map(location =>
                                <tr>
                                    {locationKeys.map(key => <td>{location[key]}</td>)}

                                </tr>)}
                        </tbody>
                    </table>
                </div>

                <div>

                    <h3>Images</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {imageInfoKeys.map(key => <th key={key}>{key}</th>)}

                            </tr>
                        </thead>
                        <tbody>
                            {imageInfo.map(info =>
                                <tr>
                                    {imageInfoKeys.map(key => <td>{info[key]}</td>)}

                                </tr>)}
                        </tbody>
                    </table>
                </div>





            </div>


        </div>
    )
}