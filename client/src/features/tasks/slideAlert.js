import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useUpdateTaskMutation,useGetTasksInProgressQuery,useGetPerformerTasksQuery } from '../../main/apiSlice';
import { useState } from 'react'
import { useSelector } from "react-redux";
import ReviewDialog from '../reviews/reviewCont';
import { useContext } from 'react';
import { WebSocketClient } from '../../websocket/socketPage';
import WebSocketContext from '../../websocket/socket';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AlertDialogSlide({task}) {
  const [open, setOpen] = React.useState(false)
  const user = useSelector(state => state.userReducer.user)
  const [status, setStatus] = useState('done')
  const [mutate, { isLoading }] = useUpdateTaskMutation()
  const { data, isLoading: isTasksLoading, refetch: refetchPerformerTasks } = useGetTasksInProgressQuery(user?.id)
  const [reviewVisible, setReviewVisible] = React.useState(false) // review aluksi piilossa. Review jutut pitää siirtää oikeaan nappiin kun sellainen tulee task in progressiin;
  let ws = useContext(WebSocketContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = async () => {
    setOpen(false);
    await mutate({...task, status: 'done', creatorId: task.creator.id, performerId: task.performer.id});
    ws.send(user.username + " " + task.creator.id);
    setReviewVisible(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Change Status
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      
      >
        <DialogTitle style={{ marginTop: '10px' }}>{"Have you completed the task?"}</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description" class="cell" style={{ marginTop: '20px' }}>
            Do you want to mark task completed? The owner of the task will receive a notification 
            when you have marked the task as complete🐰
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose1} disabled={isLoading}>Agree</Button>
          <Button color="secondary" onClick={handleClose2}>Go back</Button>
        </DialogActions>
      </Dialog>
      {reviewVisible && <ReviewDialog performer_id={user.id} targetuser_id={task.creator.id} taskId={task.id} />}  {/* tekee reviewistä näkyvän kun agree klikattu*/}
    </div>
  );
}


