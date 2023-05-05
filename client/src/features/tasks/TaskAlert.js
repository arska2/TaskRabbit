import { Alert, Typography } from '@mui/material';

export const TaskAlert = ({task}) => {
    if (task.status==='available'){
    return (
      <Alert severity="success">
      This task is still available!
      </Alert>
    )}
    return (
        <Alert severity="warning">
      This task is not available anymore!
      </Alert>
    )
  }