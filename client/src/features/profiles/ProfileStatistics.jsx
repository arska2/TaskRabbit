import { useSelector } from "react-redux"
import { useGetProfileStatisticsQuery } from "../../main/apiSlice"
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const ProfileStatistics = () => {
    const user = useSelector(state => state.userReducer.user)
    const { data: statistics, isLoading } = useGetProfileStatisticsQuery(user.id)


    console.log(statistics)
    if (isLoading || !statistics) return <p> Loading...</p>
    return (
        <div className="text-style" style={{ color: "#00C2A8" }}>
            <h2 style={{ color: "#00C2A8" }}>Overview</h2>
            <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ textAlign: "center" }} columns={6}>
                <Grid item xs={2}>
                    <PlaylistAddCheckRoundedIcon />
                </Grid>
                <Grid item xs={2}>
                    <Typography>Tasks Done</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{statistics.completedTaskCount}</Typography>
                </Grid>

                <Grid item xs={2}>
                    <DirectionsRunRoundedIcon />
                </Grid>
                <Grid item xs={2}>
                    <Typography>Tasks In Progress</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{statistics.inProgressTaskCount}</Typography>
                </Grid>

                <Grid item xs={2}>
                    <AddReactionRoundedIcon />
                </Grid>
                <Grid item xs={2}>
                    <Typography>Tasks Created</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{statistics.tasksCreatedCount}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Diversity1RoundedIcon />
                </Grid>
                <Grid item xs={2}>
                    <Typography>TaskRabbit Rank</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{statistics.taskRabbitRank == -1 ? "undefined" : statistics.taskRabbitRank}</Typography>
                </Grid>

            </Grid>

        </div>
    )
}