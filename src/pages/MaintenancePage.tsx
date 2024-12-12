import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Stack } from '@mui/material';
// assets
import { MaintenanceIllustration } from '../assets/illustrations';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title> Maintenance </title>
      </Helmet>

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          {translate('MaintenancePage.description')}
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          {translate('MaintenancePage.second_description')}
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button to="/" component={RouterLink} size="large" variant="contained">
          {translate('MaintenancePage.go_home')}
        </Button>
      </Stack>
    </>
  );
}
