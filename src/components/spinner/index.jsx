import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const styles = {
  root: {
    padding: 10,
    display: 'flex',
    justifyContent: "center",
    '& > * + *': {
      marginLeft: 2,
    },
  },
};

export default function CircularIndeterminate() {
  return (
    <Box sx={styles.root}>
      <CircularProgress />
    </Box>
  );
}