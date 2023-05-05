import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useCreateReviewMutation } from '../../main/apiSlice';
import { useSelector } from 'react-redux';
import { useGetTasksInProgressQuery } from '../../main/apiSlice';
import { Task } from '@mui/icons-material';



const labels = {
  1: 'Rotten Rodent',
  2: 'Hasty Hopper',
  3: 'Respectable Rabbit',
  4: 'Blessed Bunny',
  5: 'Heroic Hare',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function ReviewDialog({performer_id, targetuser_id, taskId}) {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [createReview] = useCreateReviewMutation();
  const [comment, setComment] = useState('');
  // const [rating, setRating] = useState();

  const user = useSelector(state => state.userReducer.user) || {};

  const { data, isLoading: isTasksLoading, refetch: refetchPerformerTasks } = useGetTasksInProgressQuery(user?.id)

  const onSendClicked = () => {
    createReview({
      comment: comment,
      value: value,
      targetuser_id: targetuser_id, // katso että kaikkialla
      performer_id: performer_id,
      task_id: taskId
    }).unwrap().then(response => console.log(response));
    handleClose();
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    refetchPerformerTasks();
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle class="cell2" style={{marginLeft:'20px', marginTop:'20px'}}>Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText class="cell">
            Write honest feedback about the performance of the person performing the task. The evaluation will be visible to everyone.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Word is free!"
            type="description"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            color="secondary" 
          />
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
                console.log(newValue);

                
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary"  onClick={handleCloseCancel}>Cancel</Button> 
          <Button color="secondary"  onClick={onSendClicked}>Send review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
