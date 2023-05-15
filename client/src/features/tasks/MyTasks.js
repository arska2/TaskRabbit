import React from "react";
import { useGetCreatedTasksQuery, useGetTasksInProgressQuery } from "../../main/apiSlice";
import { Row } from './taskTable'
import { RowCreated } from './tableCreated'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './mytasksstyles.css';
import { useState } from 'react'
import { useSelector } from "react-redux";
import { MyTasksMap } from "../map/MyTasksMap";
import ReviewDialog from "../reviews/reviewCont";


export const MyTasks = () => {
  // const { data: user = [], isLoading: isLoadingUser} =   useGetUserQuery();
  const user = useSelector(state => state.userReducer.user);

  const { data: createdTasks = [], isLoading: isLoadingCreatedTasks } = useGetCreatedTasksQuery(user?.id);
  const { data: performerTasks = [], isLoading: isLoadingPerformerTasks } = useGetTasksInProgressQuery(user?.id);

  const filteredCreatedTasks = createdTasks.filter(task => task.status === "available" || task.status === "unavailable" || task.status === "done");


  //tulee päivittää tieto statuksen muutoksesta saman tien

  const [showPerformedTasks, setShowPerformedTasks] = useState(true);
  const [showCreatedTasks, setShowCreatedTasks] = useState(false);
  const [activeButton, setActiveButton] = useState('performed');

  //console.log(createdTasks)
  console.log(performerTasks)


  const handlePerformedTasksClick = () => {
    setShowPerformedTasks(true);
    setShowCreatedTasks(false);
    setActiveButton('performed');
  };

  const handleCreatedTasksClick = () => {
    setShowPerformedTasks(false);
    setShowCreatedTasks(true);
    setActiveButton('created');
  };


  if (isLoadingCreatedTasks || isLoadingPerformerTasks) return (<p>Login to see My Tasks</p>)

  return (
    <div >

      <div>
        <ButtonGroup class="buttongroup" color="secondary" style={{ marginBottom: '20px', marginLeft: '10px' }}>
          <Button variant={activeButton === 'created' ? 'contained' : 'outlined'} onClick={handleCreatedTasksClick}>Created Tasks</Button>
          <Button variant={activeButton === 'performed' ? 'contained' : 'outlined'} onClick={handlePerformedTasksClick}>Tasks In Progress</Button>
        </ButtonGroup>

      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gridColumnGap: '20px', gridRowGap: '20px' }} >
        <TableContainer class="txtb" component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              {showPerformedTasks && <TableRow >
                <TableCell class="cell" />
                <TableCell class="cell" >Task</TableCell>
                <TableCell class="cell" align="left" >Creator</TableCell>
                <TableCell class="cell" align="left">Time left</TableCell>
                <TableCell class="cell" align="left">Location</TableCell>
                <TableCell class="cell" align="left">Payment (€)</TableCell>
                <TableCell class="cell" align="left">Progress</TableCell>
              </TableRow>}
              {showCreatedTasks && <TableRow>
                <TableCell class="cell" />
                <TableCell class="cell">Created Task</TableCell>
                <TableCell class="cell" align="left">Performer</TableCell>
                <TableCell class="cell" align="left">Status</TableCell>
                <TableCell class="cell" align="left">Location</TableCell>
                <TableCell class="cell" align="left">Payment (€)</TableCell>
                <TableCell class="cell" align="left"></TableCell>
              </TableRow>}
            </TableHead>
            <TableBody>
              {showPerformedTasks &&
                performerTasks
                  .filter((task) => task.performer.id === user.id)
                  .map((task) => <Row key={task.id} task={task} />)}
              {showCreatedTasks &&
                filteredCreatedTasks
                  .filter((task) => task.creator.id === user.id)
                  .map((task) => <RowCreated key={task.id} task={task} />)}

            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ position: 'fixed', right: '0', top: '120px', bottom: '0.5px', width: '35%', margin: '0 15px 50px 20px' }} className="col-4">
          <MyTasksMap />
        </div>
      </div>
    </div>
  );
};
