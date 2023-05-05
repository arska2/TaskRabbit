import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useCreateTaskMutation } from '../../main/apiSlice';
import { AddMarkerMap } from '../map/AddMarkerMap';
import { useSelector } from 'react-redux';
import '../../App.css';
import InputAdornment from '@mui/material/InputAdornment';


export default function FormDialog() {
    const user = useSelector(state => state.userReducer.user) || {};
    const [open, setOpen] = React.useState(false);
    const [selectedStartDate, setSelectedStartDate] = React.useState(null);
    const [selectedEndDate, setSelectedEndDate] = React.useState(null);
    const [createTask] = useCreateTaskMutation();
    const [task, setTask] = React.useState({});

    const [marker, setMarker] = React.useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const title = document.getElementById('title')?.value;
        const description = document.getElementById('description')?.value;
        const location = document.getElementById('location')?.value;
        const availableFrom = selectedStartDate;
        const availableTo = selectedEndDate;
        const payment = document.getElementById('payment')?.value;
        const durationinminutes = document.getElementById('duration')?.value;




        updateTask({
            title,
            description,
            status: "available",
            latitude: marker.lat,
            longitude: marker.lng,
            location,
            availableFrom,
            availableTo,
            payment,
            durationinminutes,
            creatorId: user.id,
        });
        setOpen(false);

        return {
            title,
            description,
            status: "available",
            latitude: marker.lat,
            longitude: marker.lng,
            location,
            availableFrom,
            availableTo,
            payment,
            durationinminutes,
            creatorId: user.id,
        };
    };

    const updateTask = (newValue) => {
        setTask({ ...task, ...newValue });
    };

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };


    const onCreateButtonClicked = () => {

        // kenttien data pitää määritellä, jotta voi käyttää täällä
        const title = document.getElementById('title')?.value;
        const description = document.getElementById('description')?.value;
        const location = document.getElementById('location')?.value;
        const payment = document.getElementById('payment')?.value;
        const durationinminutes = document.getElementById('duration')?.value;
        const availableFrom = selectedStartDate;
        const availableTo = selectedEndDate;
        const validateDates = () => {
            if (selectedStartDate && selectedEndDate && selectedStartDate >= selectedEndDate) {
              alert('Starting date and time must be before end date and time');
              return false;
            }
            return true;
          };

        // tarkistaa onko kentät tyhjiä
        if (!title || !description || !location || !selectedStartDate || !selectedEndDate || !payment || !availableFrom || !availableTo || !durationinminutes) {
            alert('Täytä kaikki kentät.');
            return;
        }
        if (!validateDates()) {
            return;
        }
        const newTask = {
            title,
            description,
            status: "available",
            latitude: marker.lat,
            longitude: marker.lng,
            location,
            availableFrom: selectedStartDate,
            availableTo: selectedEndDate,
            payment,
            durationinminutes,
            creatorId: user.id,
        };
        createTask(newTask).unwrap().then(response => console.log(response));
        setOpen(false);
    };


    return (
        <div>
            <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a task!</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        label="Write a title that describes shortly your task."
                        type="title"
                        fullWidth
                        variant="standard"
                        className='taskTitle'
                    />

                    <TextField
                        required
                        margin="normal"
                        id="description"
                        label="Describe the task in detail."
                        type="description"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        className='taskDescription'

                    />
                    <TextField
                        required
                        margin="normal"
                        id="location"
                        label="Location"
                        type="location"
                        fullWidth
                        variant="standard"
                    />
                    <AddMarkerMap
                        marker={marker}
                        setMarker={setMarker}

                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    required
                                    format="dd.MM.yyyy HH:mm"
                                    margin="normal"
                                    id="startDateTime"
                                    label="Starting date and time"
                                    value={selectedStartDate}
                                    onChange={handleStartDateChange}
                                    fullWidth
                                    variant="standard"
                                    textField={(params) => <TextField {...params} />}
                                    
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    required
                                    format="dd.MM.yyyy HH:mm"
                                    margin="normal"
                                    id="endDateTime"
                                    label="Ending date and time"
                                    value={selectedEndDate}
                                    onChange={handleEndDateChange}
                                    fullWidth
                                    variant="standard"
                                    textField={(params) => <TextField {...params} />}
                                    
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    width: 247
                                }}
                                margin="dense"
                                required
                                id="duration"
                                label="Duration"
                                type="number"
                                fullWidth
                                variant="outlined"
                                inputProps={{ pattern: "[0-9]*" }}
                                InputProps={{ endAdornment: <InputAdornment position="end">minutes</InputAdornment> }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    width: 247
                                }}
                                margin="dense"
                                required
                                id="payment"
                                label="Payment"
                                type="number"
                                fullWidth
                                variant="outlined"
                                inputProps={{ pattern: "[0-9]*", min: "0" }}
                                InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }}
                            />

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onCreateButtonClicked}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}