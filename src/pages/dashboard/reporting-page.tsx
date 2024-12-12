import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import { StatsCategory, StatsEmployees } from '../../sections/@dashboard/reporting';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getStatsUsageAllEmployees } from 'src/redux/slices/statsiqtique';

// ----------------------------------------------------------------------

export default function ReportingPage() {
  const theme = useTheme();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { usageEmployees } = useSelector((state) => state.statistiques);

  const { themeStretch } = useSettingsContext();

  useEffect(() => {
    dispatch(getStatsUsageAllEmployees());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> {translate('Reporting')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('reporting_suivi')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <StatsEmployees
              title={translate('statsPage.statEmploye')}
              data={[
                {
                  label: translate('avantages.billets_restaurant'),
                  used: usageEmployees?.RESTAURANT?.used,
                  usedPercent: usageEmployees?.RESTAURANT?.usedPercent,
                },
                {
                  label: translate('avantages.Culture'),
                  used: usageEmployees?.CULTURE?.used,
                  usedPercent: usageEmployees?.CULTURE?.usedPercent,
                },
                {
                  label: translate('avantages.Sport'),
                  used: usageEmployees?.SPORT?.used,
                  usedPercent: usageEmployees?.SPORT?.usedPercent,
                },
                {
                  label: translate('avantages.Holidays'),
                  used: usageEmployees?.HOLIDAYS?.used,
                  usedPercent: usageEmployees?.HOLIDAYS?.usedPercent,
                },
                {
                  label: translate('avantages.Personal_assistance'),
                  used: usageEmployees?.HELP?.used,
                  usedPercent: usageEmployees?.HELP?.usedPercent,
                },
                {
                  label: translate('avantages.Gifts'),
                  used: usageEmployees?.GIFT?.used,
                  usedPercent: usageEmployees?.GIFT?.usedPercent,
                },
                {
                  label: translate('avantages.Mobility'),
                  used: usageEmployees?.MOBILITY?.used,
                  usedPercent: usageEmployees?.MOBILITY?.usedPercent,
                },
                {
                  label: translate('avantages.Telework'),
                  used: usageEmployees?.REMOTE?.used,
                  usedPercent: usageEmployees?.REMOTE?.usedPercent,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <StatsCategory
              title={translate('statsPage.statCategory')}
              chart={{
                colors: [theme.palette.secondary.darker, theme.palette.primary.main],
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
