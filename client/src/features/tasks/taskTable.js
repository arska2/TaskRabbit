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
import { TimeAgoInProgress } from './timeAgoInProgress'


export function Row({task}) {

    const [open, setOpen] = React.useState(false);

    //päivämäärämuotoilut
    const dateCreated = task.created ? new Date(task.created) : null;
    const formattedDateCreated = dateCreated ? dateCreated.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}) : null;

    const dateAvailableFrom  = task.availableFrom ? new Date(task.availableFrom) : null;
    const formattedAvailableFromDate = dateAvailableFrom ? dateAvailableFrom.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}) : null;

    const dateAvailableTo = task.availableTo ? new Date(task.availableTo) : null;
    const formattedAvailableToDate = dateAvailableTo ? dateAvailableTo.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}) : null;

  
    return (
      <React.Fragment>
        <TableRow style={{ position: 'relative'}}>
          <TableCell  style={{ borderBottom: 'none' }}>
            <IconButton 
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              style={{ color: 'violet' }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell class="lowercell" component="th" scope="row">
            {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
          </TableCell>
          <TableCell class="lowercell" align="left">{task.creator.username.charAt(0).toUpperCase()+task.creator.username.slice(1)}</TableCell>
          <TableCell class="lowercell" align="left"><TimeAgoInProgress timestamp={task.availableTo}/></TableCell>
          <TableCell class="lowercell" align="left">{task.location}</TableCell>
          <TableCell class="lowercell" align="left" >{task.payment}</TableCell>
          <TableCell class="lowercell" align="left" style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}} >
            <AlertDialogSlide task={task} ></AlertDialogSlide></TableCell> 

        </TableRow>
        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: '70px' }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography class="lowertitle" variant="h6" gutterBottom component="div">
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#E5E5E5' }}>
                      <TableCell class="lowertext" align="left">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ backgroundColor: '#f5e6fa' }}>                 
                        <TableCell class="lowercell" >{task.description}</TableCell>
                  </TableBody>
                  </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  


