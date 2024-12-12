// @mui
import { Card } from '@mui/material';
//
import Advantages from './form-advantages-encouragement';

// ----------------------------------------------------------------------

export default function StepTwo() {
  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Advantages />
    </Card>
  );
}
