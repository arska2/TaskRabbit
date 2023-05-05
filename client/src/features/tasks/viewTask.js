import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Alert, Typography } from '@mui/material';
import { useUpdateTaskMutation, useGetProfileByIdQuery } from '../../main/apiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { id } from 'date-fns/locale';
import { TaskOutlined } from '@mui/icons-material';
import * as ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import { TaskAlert } from './TaskAlert'
import WebSocketContext from '../../websocket/socket';
//import Popup from './Popup'; // assuming Popup is a component that renders the notification pop-up
//import { AlertTitle } from '@material-ui/lab';


function PaperComponent(props) {

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ task, open, setOpen}) {
  let user = useSelector((state) => state.userReducer.user) || {};
  const [status, setStatus] = useState(task.status)
  const [alert, setAlert] = useState(null);
  let ws = useContext(WebSocketContext);


  const dateAvailableFrom  = task.availableFrom ? new Date(task.availableFrom) : null;
  const formattedAvailableFromDate = dateAvailableFrom ? dateAvailableFrom.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}) : null;

  const dateAvailableTo = task.availableTo ? new Date(task.availableTo) : null;
  const formattedAvailableToDate = dateAvailableTo ? dateAvailableTo.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}) : null;


  const [changeStatus, { isLoading }] = useUpdateTaskMutation()

  const navigate = useNavigate()

  function wsSend() {
    ws.send(user.username + " " + task.creator.id + " " + task.title);
  }


  const onTakeTask = async () => {
    setStatus('Taken by somebody')
    await changeStatus({
      id: task.id,
      status: 'unavailable',
      title: task.title,
      description: task.description,
      latitude: task.latitude,
      longitude: task.longitude,
      location: task.location,
      availableFrom: task.availableFrom,
      availableTo: task.availableTo,
      payment: task.payment,
      durationinminutes: task.durationinminutes,
      creatorId: task.creator.id,
      performerId: user.id
    })
    wsSend();
    setOpen(false)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        </DialogTitle>
        <DialogContent >
          <Typography class="cell2" variant="body1">
          <strong> Description: </strong> {task.description}
          </Typography>
          <Typography class="cell2" variant="body1">
          <strong> Location:  </strong> {task.location}
          </Typography>
          <Typography class="cell2" variant="body1">
          <strong>  Payment:  </strong> {task.payment} €
          </Typography>
          <Typography class="cell2" variant="body1">
          <strong>  Available from:  </strong> {formattedAvailableFromDate}
          </Typography>
          <Typography class="cell2" variant="body1">
          <strong>  Available to:  </strong> {formattedAvailableToDate}
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="contained" onClick={onTakeTask}>Take Task</Button>
          <Button color="secondary" onClick={() => { setOpen(false); }}>
            Go Back
          </Button >
        </DialogActions>
        <TaskAlert task={task} />
      </Dialog>
    </div>
  );
}
