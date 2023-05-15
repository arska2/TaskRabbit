import { Rating } from "@mui/material"
import { useGetImageInfoQuery, useGetProfileByIdQuery } from "../../main/apiSlice"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetReviewsQuery } from "../../main/apiSlice"
import '../../App.css';
import { CircleImage } from "../images/CircleImage"
import './ProfileStyles.css';


export const ProfileOverview = () => {
    let user = useSelector(state => state.userReducer.user) || {};
    const { data: profile, isLoading: isLoadingProfile } = useGetProfileByIdQuery(user.id)
    const { data: reviews = [], isLoading: isLoadingReviews } = useGetReviewsQuery();
    const { data: imageInfo, isLoading: isLoadingInfo } = useGetImageInfoQuery(user.id);
    console.log(imageInfo)
    if (isLoadingInfo || isLoadingProfile || isLoadingReviews) return <p>Loading...</p>

    const filteredReviews = reviews.filter(review => review.targetuser_id === user.id);
    const numReviews = filteredReviews.length;
    const totalRating = filteredReviews.reduce((acc, review) => acc + review.value, 0) / numReviews;
    const labels = {
        1: 'Rotten Rodent',
        2: 'Hasty Hopper',
        3: 'Respectable Rabbit',
        4: 'Blessed Bunny',
        5: 'Heroic Hare',
    };



    return (
        <div className="row bg-image" style={{ backgroundImage: `url("${imageInfo?.headerImageUrl}")` }}>
            <div className="col-3">
                {imageInfo?.profileImageUrl && <div><CircleImage size={190} imageSrc={imageInfo?.profileImageUrl} /></div>}
            </div>
            <div className="col-9">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="mx-auto">
                        <h2 className="text-center">{user.username}</h2>
                        {!isNaN(totalRating) && (
                            <>
                                <Rating name="size-large" defaultValue={totalRating} size="large" readOnly />
                                <h4 className="nickName">"{labels[Math.round(totalRating)]}"</h4>
                            </>
                        )}
                    </div>
                    <Link className="button muted-button" to={`/profile/edit`}>Edit Profile</Link>
                </div>
            </div>
        </div>



    )
}