// @mui
import { Box, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: '100%',
        backgroundColor: 'red',
      }}
    >
      <CircularProgress size={40} color={'primary'} />
    </Box>
  );
}
