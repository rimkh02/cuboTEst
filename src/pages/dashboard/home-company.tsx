import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { Container, Grid } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import { AppWelcome, AppFeatured, AppStatHome } from '../../sections/@dashboard/home';
// assets
import { SeoIllustration } from '../../assets/illustrations';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getStatisquesCompanyRequest } from 'src/redux/slices/statsiqtique';

// ----------------------------------------------------------------------

export default function HomeCompany() {
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { themeStretch } = useSettingsContext();

  const user = useSelector((state) => state.auth.user);
  const { managersCount, adminsCount, employeesCount, categoriesCount, isLoading } = useSelector(
    (state) => state.statistiques
  );

  useEffect(() => {
    dispatch(getStatisquesCompanyRequest());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> {translate('Dashboard')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title={
                translate('Welcome_back') +
                ` ! \n ` +
                user?.name?.charAt(0).toUpperCase() +
                user?.name?.slice(1)
              }
              description={translate('you_view_manage_information')}
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppStatHome
              isLoading={isLoading}
              title={translate('total_employees')}
              total={employeesCount}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppStatHome
              isLoading={isLoading}
              title={translate('total_cagnotte')}
              total={categoriesCount}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppStatHome
              isLoading={isLoading}
              title={translate('total_admins')}
              total={adminsCount}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppStatHome
              isLoading={isLoading}
              title={translate('total_managers')}
              total={managersCount}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
