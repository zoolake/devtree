import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function MyProgress() {
  return (
    <Box
      sx={{ textAlign: 'center', mt: 10, width: '100%' }}
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
}
