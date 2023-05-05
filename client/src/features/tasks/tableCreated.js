import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AlertDialogSlide } from './slideAlert'
import ReviewDialog from '../reviews/reviewCont';
import { useSelector } from 'react-redux';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Button from '@mui/material/Button';
import { useGetReviewForTaskQuery } from '../../main/apiSlice';



export function RowCreated({ task }) {

  const [open, setOpen] = React.useState(false);
  let user = useSelector((state) => state.userReducer.user) || {};
  // let task = useSelector((state) => state.userReducer.task) || {};

  const [reviewVisible, setReviewVisible] = React.useState(false);
 
 

  //päivämäärämuotoilut
  const dateCreated = task.created ? new Date(task.created) : null;
  const formattedDateCreated = dateCreated ? dateCreated.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : null;

  const dateAvailableFrom = task.availableFrom ? new Date(task.availableFrom) : null;
  const formattedAvailableFromDate = dateAvailableFrom ? dateAvailableFrom.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : null;

  const dateAvailableTo = task.availableTo ? new Date(task.availableTo) : null;
  const formattedAvailableToDate = dateAvailableTo ? dateAvailableTo.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : null;


  const { data: taskwithReview = [], isLoading } = useGetReviewForTaskQuery(task.id);

  console.log("Done task reviews", taskwithReview);


  let hideTask = false;
  if (taskwithReview.length > 0 && taskwithReview[0].performer_id === user.id) {
    hideTask = true;
  }

  if (hideTask) {
    return null;
  }


  return (
    <React.Fragment>
      <TableRow style={{ position: 'relative' }}>
        <TableCell style={{ borderBottom: 'none' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{ color: 'violet' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell class="lowercell" component="th" scope="row">{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</TableCell>
        <TableCell class="lowercell" component="th" scope="row">{task.performer?.username.charAt(0).toUpperCase() + task.performer?.username.slice(1)}</TableCell>
        <TableCell class="lowercell" align="left">{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</TableCell>
        <TableCell class="lowercell" align="left">{task.location}</TableCell>
        <TableCell class="lowercell" align="left" >{task.payment}</TableCell>
        {task.status === "done" && (
          <TableCell align="left">
            <Button onClick={() => setReviewVisible(true)} variant="contained" color="primary" size="small">
              Feedback!
            </Button>
            {reviewVisible && <ReviewDialog performer_id={user.id} targetuser_id={task.performer.id} taskId={task.id} />}  {/* tekee reviewistä näkyvän kun agree klikattu*/}
          </TableCell>
        )}
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: '115px' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography class="lowertitle" variant="h6" gutterBottom component="div">
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: '#E5E5E5' }}>
                    <TableCell class="lowertext">Created</TableCell>
                    <TableCell class="lowertext" align="left">Start Date</TableCell>
                    <TableCell class="lowertext" align="left">End Date</TableCell>
                    <TableCell class="lowertext" align="left">Description</TableCell>
                    <TableCell class="lowertext" align="left">Duration (min)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: '#f5e6fa' }}>
                  <TableRow key={task.created}>
                    <TableCell class="lowercell" component="th" scope="row">{formattedDateCreated}</TableCell>
                    <TableCell class="lowercell" >{formattedAvailableFromDate}</TableCell>
                    <TableCell class="lowercell" >{formattedAvailableToDate}</TableCell>
                    <TableCell class="lowercell" >{task.description}</TableCell>
                    <TableCell class="lowercell" >{task.durationinminutes}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


