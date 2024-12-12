import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
//
import BackgroundIllustration from './BackgroundIllustration';

// ----------------------------------------------------------------------

function CompletedStep({ ...other }: BoxProps) {
  const theme = useTheme();

  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box {...other}>
      <svg width="100%" height="100%" viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
        <BackgroundIllustration />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          x="150"
          y="100"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke={PRIMARY_DARK}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="9" />
            <path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="14;0" />
            </path>
          </g>
        </svg>
      </svg>
    </Box>
  );
}

export default memo(CompletedStep);
