import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

// @mui
import { Container, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// locales
import { useLocales } from 'src/locales';
// sections
import ItemAdvantage from 'src/sections/@dashboard/advantage/item-advantage';
import ItemAdvantageRepas from 'src/sections/@dashboard/advantage/item-advantage-repas';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getPlafondsAdvantagesRequest, getTextsAdvantagesRequest } from 'src/redux/slices/settings';
// ----------------------------------------------------------------------

export default function AdvantagesListPage() {
  const { themeStretch } = useSettingsContext();
  const { translate, currentLang } = useLocales();
  const dispatch = useDispatch();

  const { plafonds, texts } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getPlafondsAdvantagesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTextsAdvantagesRequest());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> {translate('advantagesPage.advantages')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('advantagesPage.list_advantages')}
          links={[
            {
              name: translate('Dashboard'),
              href: PATH_DASHBOARD.general.homeComany,
            },
            {
              name: translate('advantagesPage.advantages'),
              href: PATH_DASHBOARD.category.list,
            },
            {
              name: translate('list'),
            },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantageRepas
              color="primary"
              title={translate('avantages.billets_restaurant')}
              src={'/assets/icons/categories/Meals.png'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantage
              title={translate('avantages.Telework')}
              color="secondary"
              src={'/assets/icons/categories/Telework.png'}
              description={
                texts !== null ? texts?.REMOTE : translate('advantagesPage.descriptions.telework')
              }
              plafond={plafonds !== null ? plafonds?.REMOTE : 999999}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantage
              title={translate('avantages.Culture')}
              src={'/assets/icons/categories/Culture.png'}
              description={
                texts !== null ? texts?.CULTURE : translate('advantagesPage.descriptions.culture')
              }
              plafond={plafonds !== null ? plafonds?.CULTURE : 999999}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantage
              title={translate('avantages.Holidays')}
              color="secondary"
              src={'/assets/icons/categories/Holidays.png'}
              description={
                texts !== null ? texts?.HOLIDAYS : translate('advantagesPage.descriptions.holidays')
              }
              plafond={plafonds !== null ? plafonds?.HOLIDAYS : 999999}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantage
              title={translate('avantages.Mobility')}
              color="secondary"
              src={'/assets/icons/categories/Mobility.png'}
              description={
                texts !== null ? texts?.MOBILITY : translate('advantagesPage.descriptions.mobility')
              }
              plafond={plafonds !== null ? plafonds?.MOBILITY : 999999}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantage
              title={translate('avantages.Gifts')}
              src={'/assets/icons/categories/Gifts.png'}
              description={
                texts !== null ? texts?.GIFT : translate('advantagesPage.descriptions.gifts')
              }
              plafond={plafonds !== null ? plafonds?.GIFT : 999999}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantage
              title={translate('avantages.Personal_assistance')}
              color="secondary"
              src={'/assets/icons/categories/PersonalServices.png'}
              description={
                texts !== null ? texts?.HELP : translate('advantagesPage.descriptions.help')
              }
              plafond={plafonds !== null ? plafonds?.HELP : 999999}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ItemAdvantage
              title={translate('avantages.Sport')}
              src={'/assets/icons/categories/Sport.png'}
              description={
                texts !== null ? texts?.SPORT : translate('advantagesPage.descriptions.sport')
              }
              plafond={plafonds !== null ? plafonds?.SPORT : 999999}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
