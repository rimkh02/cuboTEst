/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card } from '@mui/material';

// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useLocales } from 'src/locales';
import { dispatch, useSelector } from 'src/redux/store';
import { useNavigate } from 'react-router-dom';
import { getInfoCompanyRequest } from 'src/redux/slices/auth';
import { useEffect, useMemo } from 'react';

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  //price: number | null;
  configPricePerEmployee: number | null;
  configExtraChargesThreshold: number | null;
};

export default function OffrePage() {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const navigate = useNavigate();

  const { company } = useSelector((state) => state.auth);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required(translate('settings.offer.errors.name'))
      .max(20, translate('companies.name_max')),
    /*  numberEmployes: Yup.string()
      .matches(/^[1-9][0-9]*(\.[0-9]+)?$/, translate('settings.offer.errors.numberEmployesValid'))
      .required(translate('settings.offer.errors.numberEmployes')),
    price: Yup.string()
      .matches(/^[1-9][0-9]*(\.[0-9]+)?$/, translate('settings.offer.errors.priceValid'))
      .required(translate('settings.offer.errors.price')),
    percent: Yup.number()
      .typeError(translate('settings.offer.errors.percent'))
      .min(1, translate('settings.offer.errors.percentValid'))
      .max(100, translate('settings.offer.errors.percentValid'))
      .required(translate('settings.offer.errors.percent')),*/
  });

  const defaultValues = useMemo(
    () => ({
      //  name: company?.wiBoostOffer?.name || '',
      configPricePerEmployee: company?.configPricePerEmployee || 0,
      configExtraChargesThreshold: company?.configExtraChargesThreshold || 0,
      configExtraChargesPercent: company?.configExtraChargesPercent || 0,
    }),
    [company]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    /*dispatch(
      editPorfilCompanyRequest({
        isLoading: false,
        data,
        id: user?.companyId,
        toast: enqueueSnackbar,
        translate: translate,
        user,
        navigate,
      })
    );*/
  };

  useEffect(() => {
    dispatch(getInfoCompanyRequest());
  }, []);

  useEffect(() => {
    if (company?.wiBoostOffer) {
      reset(defaultValues);
    }
  }, [company, defaultValues, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* <RHFTextField name="name" label={translate('settings.offer.fileds.name')} disabled /> */}
              {/*<RHFTextField
                name="numberEmployes"
                type="number"
                label={translate('settings.offer.fileds.numberEmployes')}
                disabled
              />*/}

              <RHFTextField
                name="configPricePerEmployee"
                type="number"
                label={translate('settings.offer.fileds.fixed_price')}
                disabled
              />
              <RHFTextField
                name="configExtraChargesThreshold"
                type="number"
                label={translate('settings.offer.fileds.loading_threshold')}
                disabled
              />
              <RHFTextField
                name="configExtraChargesPercent"
                type="number"
                label={translate('settings.offer.fileds.Percentage_over_threshold_loading')}
                disabled
              />
            </Box>

            {/* <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {translate('save')}
              </LoadingButton>
            </Stack> */}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
