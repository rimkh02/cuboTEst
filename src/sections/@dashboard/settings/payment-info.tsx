import { useEffect, useMemo } from 'react';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { Box, Grid, Card, TextField } from '@mui/material';
// components
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { DatePicker } from '@mui/x-date-pickers';
// locales
import { useLocales } from 'src/locales';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { getInfoCompanyRequest } from 'src/redux/slices/auth';
// ----------------------------------------------------------------------

export default function InfosPaymentPage() {
  const { translate } = useLocales();

  const { company } = useSelector((state) => state.auth);

  const defaultValues = useMemo(
    () => ({
      iban: company?.paymentInformations?.[0]?.iban || '',
      bic: company?.paymentInformations?.[0]?.bic || '',
      signatory: company?.paymentInformations?.[0]?.signatory || '',
      mandateDate: company?.paymentInformations?.[0]?.mandateDate || null,
      mandateIdentifier: company?.paymentInformations?.[0]?.mandateIdentifier || '',
      bankAddress: company?.paymentInformations?.[0]?.bankAddress || '',
      bankName: company?.paymentInformations?.[0]?.bankName || '',
    }),
    [company]
  );
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, control, reset } = methods;

  const onSubmit = async (data: any) => {};

  useEffect(() => {
    dispatch(getInfoCompanyRequest());
  }, []);

  useEffect(() => {
    if (company?.paymentInformations) {
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
              <RHFTextField name="iban" disabled label="IBAN" />
              <RHFTextField name="bic" disabled label="BIC" />
              <RHFTextField name="bankName" disabled label={translate('companies.bankName')} />
              <RHFTextField
                name="bankAddress"
                disabled
                label={translate('companies.bankAddress')}
              />
              <Controller
                name="mandateDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    disabled
                    {...field}
                    label={translate('companies.mandateDate')}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
              <RHFTextField
                name="mandateIdentifier"
                label={translate('companies.mandateIdentifier')}
                disabled
              />
              <RHFTextField name="signatory" disabled label={translate('companies.Signing')} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
