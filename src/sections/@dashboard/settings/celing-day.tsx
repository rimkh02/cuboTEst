import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField } from '../../../components/hook-form';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type FormValuesProps = {
  plafond: number;
};

export default function CelingDayPage() {
  const { translate } = useLocales();

  const UpdateUserSchema = Yup.object().shape({
    plafond: Yup.number()
      .required(translate('tax.ceiling_per_day_is_required'))
      .typeError(translate('tax.Must_be_more_than'))
      .min(1, translate('tax.Must_be_more_than')),
  });

  const defaultValues = {
    plafond: 0,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <RHFTextField name="plafond" type="number" label={translate('tax.ceiling_per_day')} />

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {translate('save')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
