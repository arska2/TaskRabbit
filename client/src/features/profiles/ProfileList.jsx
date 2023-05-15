import { useGetProfilesQuery, useGetReviewsQuery, useReadAllImageInfoQuery } from "../../main/apiSlice"
import { CircleImage } from "../images/CircleImage";
import { Rating } from "@mui/material"


const ProfileSummary = ({ profile, imageInfo, reviews }) => {

    const headerUrl = imageInfo.find(info => info.profileId === profile.id)?.headerImageUrl;
    const profileUrl = imageInfo.find(info => info.profileId === profile.id)?.profileImageUrl;

    const filteredReviews = reviews.filter(review => review.targetuser_id === profile.id);
    const numReviews = filteredReviews.length;
    const totalRating = filteredReviews.reduce((acc, review) => acc + review.value, 0) / numReviews;
    const labels = {
        1: 'Rotten Rodent',
        2: 'Hasty Hopper',
        3: 'Respectable Rabbit',
        4: 'Blessed Bunny',
        5: 'Heroic Hare',
    };

    const headerStyle = {
        backgroundImage: `url(${headerUrl})`,
        backgroundSize: "cover",
        width: "100%",
        height: "200px",
        border: "1px solid #ccc"
    };

    const profileStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px"
    };


    return (
        <div style={headerStyle}>
            <div style={profileStyle}>
                <CircleImage size={180} imageSrc={profileUrl} />
                <p style={{
                    marginLeft: "20px",
                    fontSize: "48px",
                    color: "#fff",
                    textShadow: `
        -1px -1px 0 rgb(0, 0, 0),
         1px -1px 0 rgb(0, 0, 0),
        -1px  1px 0 rgb(0, 0, 0),
         1px  1px 0 rgb(0, 0, 0),
         0    0   5px rgba(255, 255, 255, 0.5),
         0    0   10px rgba(255, 255, 255, 0.3),
         0    0   20px rgba(255, 255, 255, 0.2)
    `,
                }}>
                    {profile.username}
                </p>
                {!isNaN(totalRating) && (
                    <>
                        <Rating name="size-large" defaultValue={totalRating} size="large" readOnly />
                        <h4 className="nickName">"{labels[Math.round(totalRating)]}"</h4>
                    </>
                )}
            </div>
        </div>
    );
}

export const ProfileList = () => {

    const { data: profiles = [], isLoading: isLoadingProfiles } = useGetProfilesQuery()
    const { data: imageInfo = [], isLoading: isLoadingInfo } = useReadAllImageInfoQuery()
    const { data: reviews = [], isLoading: isLoadingReviews } = useGetReviewsQuery()

    const profileIds = imageInfo.map(info => info.profileId)
    const profileList = profiles.filter(profile => profileIds.includes(profile.id))



    if (isLoadingInfo || isLoadingProfiles || isLoadingReviews) return <p>Loading...</p>

    return (
        <div>
            {profileList.map(profile => <ProfileSummary key={profile.id} profile={profile} imageInfo={imageInfo} reviews={reviews} />)}
        </div>
    )
}