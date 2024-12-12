// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress, CardProps } from '@mui/material';
// utils
import { fCurrency, fPercent } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

type ItemProps = {
  label: string;
  used: number;
  usedPercent: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[];
}

export default function StatsEmployees({ title, subheader, data, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={4} sx={{ p: 3 }}>
        {data.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
  progress: ItemProps;
};

function ProgressItem({ progress }: ProgressItemProps) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">
          {progress.used === 0 ? 0 : fCurrency(progress.used) + ' €'}
        </Typography>
        {progress.usedPercent !== 0 && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp;({fPercent(progress.usedPercent)})
          </Typography>
        )}
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.usedPercent ? progress.usedPercent : 0}
        color={(progress.usedPercent === 0 && 'secondary') || 'primary'}
      />
    </Stack>
  );
}
