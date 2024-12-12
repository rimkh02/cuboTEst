import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Box, Typography, Card } from '@mui/material';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import Iconify from 'src/components/iconify';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useNavigate } from 'react-router-dom';
// sections
import MadalConfigurationRepas from 'src/sections/@dashboard/advantage/dialog-configuration-repas';
// locales
import { useLocales } from 'src/locales';
// redux
import { useSelector } from 'src/redux/store';
// ----------------------------------------------------------------------

export default function RechargementHomePage() {
  const theme = useTheme();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();
  const [openConfirmRepas, setOpenConfirmRepas] = useState(false);

  const { company } = useSelector((state) => state.auth);

  const handleCloseConfirmRepas = () => {
    setOpenConfirmRepas(false);
  };
  const verifAccesToReloadMeals = () => {
    if (
      company?.ticketRestaurantFacialValue === null ||
      company?.ticketRestaurantFacialValueCoveragePercent === null
    ) {
      setOpenConfirmRepas(true);
    } else {
      navigate(PATH_DASHBOARD.rechargement.mealTicket);
    }
  };

  return (
    <>
      <Helmet>
        <title> {translate('Rechargment')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('Rechargment')}
          links={[
            { name: translate('Dashboard'), href: PATH_DASHBOARD.general.homeComany },
            {
              name: translate('Rechargment'),
              href: PATH_DASHBOARD.rechargement.root,
            },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack spacing={3}>
              <Card
                onClick={() => verifAccesToReloadMeals()}
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  color: 'common.white',
                  bgcolor: `secondary.darker`,
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h4">
                    {translate('rechargementPage.Meal_Ticket_Reloading')}
                  </Typography>
                </Box>

                <Iconify
                  icon={'ion:restaurant-sharp'}
                  sx={{
                    width: 80,
                    height: 80,
                    opacity: 0.12,
                    position: 'absolute',
                    right: theme.spacing(-2),
                  }}
                />
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Stack spacing={3}>
              <Stack
                onClick={() => navigate(PATH_DASHBOARD.rechargement.exceptionalEvents)}
                direction="row"
                alignItems="center"
                sx={{
                  cursor: 'pointer',
                  p: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  color: 'common.white',
                  bgcolor: `primary.main`,
                  height: 200,
                  //   ...sx,
                }}
              >
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h4">
                    {translate('rechargementPage.Reloading_exceptional_events')}
                  </Typography>
                </Box>

                <Iconify
                  icon={'bxs:gift'}
                  sx={{
                    cursor: 'pointer',
                    width: 90,
                    height: 90,
                    opacity: 0.12,
                    position: 'absolute',
                    right: theme.spacing(-2),
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <Stack
                onClick={() => navigate(PATH_DASHBOARD.rechargement.exceptionalEncouragement)}
                direction="row"
                alignItems="center"
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  color: 'common.white',
                  bgcolor: `secondary.dark`,
                  height: 200,
                }}
              >
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h4">
                    {translate('rechargementPage.Recharge_Encouragement')}
                  </Typography>
                </Box>

                <Iconify
                  icon={'vaadin:group'}
                  sx={{
                    width: 80,
                    height: 80,
                    opacity: 0.12,
                    position: 'absolute',
                    right: theme.spacing(-1),
                  }}
                />
              </Stack>
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
      <MadalConfigurationRepas
        open={openConfirmRepas}
        accessToReloadMeals
        onClose={handleCloseConfirmRepas}
      />
    </>
  );
}
