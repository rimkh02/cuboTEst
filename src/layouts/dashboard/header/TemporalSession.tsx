// @mui
import { Typography, Alert } from '@mui/material';
// utils
import { keyframes } from '@emotion/react';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------
const slideAnimation = keyframes`
  0% {
    transform: translateX(-10%);
  }

  100% {
    transform: translateX(100%);
  }
`;

export default function TemporalSession() {
  const { translate } = useLocales();
  return (
    <>
      <Alert
        sx={{
          height: '40px',
          position: 'relative',
          width: '90%',
          alignItems: 'center',
          direction: 'row',
          justifyContent: 'flex-end',
          '& .MuiAlert-icon': {
            display: 'none',
          },
        }}
        variant="filled"
        severity="error"
      >
        <Typography
          sx={{
            animation: `${slideAnimation} 10s linear infinite`,
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            mt: '10px',
            lineHeight: 1.5,
            fontSize: '1rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {translate('timeSession')}
        </Typography>
      </Alert>
    </>
  );
}
