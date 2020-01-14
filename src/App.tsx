import React from 'react';
import './App.css';
import { Box, Button, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Button variant='contained' color='primary'>
        Hello World!
      </Button>
    </Box>
  );
};

export default App;
