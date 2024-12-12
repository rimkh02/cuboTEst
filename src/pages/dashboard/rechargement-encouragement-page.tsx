import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getRechargement,
  createEmployeList,
  resetRechargementEncouragement,
} from '../../redux/slices/rechargement';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// locales
import { useLocales } from 'src/locales';
// sections
import StepOne from 'src/sections/@dashboard/rechargement/rechargement-encouragement-step-one';
import StepTwo from 'src/sections/@dashboard/rechargement/rechargement-encouragement-step-two';
import RechargementEncouragementComplete from 'src/sections/@dashboard/rechargement/rechargement-encouragement-complete';
import CheckoutSteps from 'src/sections/@dashboard/rechargement/checkout-step';

// ----------------------------------------------------------------------

export default function RechargmentPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { translate } = useLocales();

  const STEPS = [translate('Categories'), translate('Advantages')];

  const { rechargementEncouragement } = useSelector((state) => state?.rechargement);

  const { activeStep } = rechargementEncouragement;

  const completed = activeStep === STEPS.length;

  useEffect(() => {
    dispatch(getRechargement());

    if (activeStep === 0) {
      dispatch(createEmployeList(null));
    }
  }, [dispatch, activeStep]);

  useEffect(() => {
    dispatch(resetRechargementEncouragement());
  }, [dispatch]);

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
            {
              name: translate('rechargementPage.Recharge_Encouragement'),
            },
          ]}
        />

        <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={12}>
            <CheckoutSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <RechargementEncouragementComplete open={completed} />
        ) : (
          <>
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
          </>
        )}
      </Container>
    </>
  );
}
