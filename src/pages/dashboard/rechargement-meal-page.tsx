import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getRechargement,
  nextStep,
  backStep,
  createEmployeList,
  addMonth,
  resetRechargement,
} from '../../redux/slices/rechargement';
// locales
import { useLocales } from 'src/locales';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import FormStepOne from 'src/sections/@dashboard/rechargement/rechargement-meals-step-one';
import FormStepTwo from 'src/sections/@dashboard/rechargement/rechargement-meals-step-two';
import RechargementMealsComplete from 'src/sections/@dashboard/rechargement/rechargement-meals-complete';
import CheckoutSteps from 'src/sections/@dashboard/rechargement/checkout-step';
import FormStepThree from 'src/sections/@dashboard/rechargement/rechargement-meals-step-three';
import FormStepFour from 'src/sections/@dashboard/rechargement/rechargement-meals-step-four';

// ----------------------------------------------------------------------

export default function RechargmentPage() {
  const navigate = useNavigate();

  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();
  const { translate } = useLocales();

  const STEPS = [
    translate('cagnotte.month'),
    translate('employee.employees') + ' & ' + translate('avantages.billets_restaurant'),
    translate('resume'),
    translate('rechargementPage.meals.sampling'),
  ];

  const { rechargementData } = useSelector((state) => state?.rechargement);

  const { activeStep } = rechargementData;

  const completed = activeStep === STEPS.length;

  useEffect(() => {
    dispatch(getRechargement());

    if (activeStep === 1) {
      dispatch(createEmployeList(null));
    }
  }, [dispatch, activeStep]);

  useEffect(() => {
    dispatch(resetRechargement());
  }, []);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const handleAddMonth = (month: string) => {
    dispatch(addMonth(month));
  };

  const handleReset = () => {
    dispatch(resetRechargement());
    navigate(PATH_DASHBOARD.rechargement.root);
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
            {
              name: translate('rechargementPage.Meal_Ticket_Reloading'),
            },
          ]}
        />

        <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={12}>
            <CheckoutSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <RechargementMealsComplete open={completed} onReset={handleReset} />
        ) : (
          <>
            {activeStep === 0 && (
              <FormStepOne
                rechargementData={rechargementData}
                onNextStep={handleNextStep}
                onAddMonth={handleAddMonth}
              />
            )}
            {activeStep === 1 && (
              <>
                <FormStepTwo
                  rechargementData={rechargementData}
                  onNextStep={handleNextStep}
                  onBackStep={handleBackStep}
                  onReset={handleReset}
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                <FormStepThree
                  rechargementData={rechargementData}
                  onNextStep={handleNextStep}
                  onBackStep={handleBackStep}
                />
              </>
            )}
            {activeStep === 3 && (
              <>
                <FormStepFour
                  rechargementData={rechargementData}
                  onNextStep={handleNextStep}
                  onBackStep={handleBackStep}
                />
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
