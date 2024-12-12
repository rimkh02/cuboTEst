// @mui
import { Box, Card, Typography, CardProps, LinearProgress } from '@mui/material';
// utils
import { fNumber } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number | null;
  isLoading: boolean;
}

export default function AppStatHome({ title, isLoading, total, sx, ...other }: Props) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        {isLoading ? (
          <LinearProgress sx={{ mt: 3, width: '50%' }} />
        ) : (
          <Typography variant="h3">{fNumber(total)}</Typography>
        )}
      </Box>
    </Card>
  );
}
