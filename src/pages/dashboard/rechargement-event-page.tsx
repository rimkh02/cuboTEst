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
  resetRechargementEvent,
  setEmployeListEvent,
} from '../../redux/slices/rechargement';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// locales
import { useLocales } from 'src/locales';
// sections
import StepTwo from 'src/sections/@dashboard/rechargement/rechargement-event-step-two';
import StepOne from 'src/sections/@dashboard/rechargement/rechargement-event-step-one';
import RechargementEventComplete from 'src/sections/@dashboard/rechargement/rechargement-event-complete';
import CheckoutSteps from 'src/sections/@dashboard/rechargement/checkout-step';

// ----------------------------------------------------------------------

export default function RechargmentPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { translate } = useLocales();

  const STEPS = [translate('employee.employees'), translate('rechargementPage.gifts')];

  const { rechargementEvent } = useSelector((state) => state?.rechargement);

  const { activeStep } = rechargementEvent;

  const completed = activeStep === STEPS.length;

  useEffect(() => {
    dispatch(getRechargement());

    if (activeStep === 0) {
      dispatch(setEmployeListEvent(null));
    }
  }, [dispatch, activeStep]);

  useEffect(() => {
    dispatch(resetRechargementEvent());
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
              name: translate('rechargementPage.Reloading_exceptional_events'),
            },
          ]}
        />

        <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={12}>
            <CheckoutSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <RechargementEventComplete open={completed} />
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
