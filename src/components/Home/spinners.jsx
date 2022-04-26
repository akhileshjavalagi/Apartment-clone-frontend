

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    
    
    return (
        <Box style={{margin:"2% auto"}} sx={{ display: 'inline-block', width: "150px", height: "150px"}}>
        <CircularProgress color="success" />
    </Box>
  );
}