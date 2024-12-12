import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import RHFTextFieldPhone from 'src/components/hook-form/RHTextFieldPhone';
// locales
import { useLocales } from 'src/locales';
// utils
import { DEFAULT_PHONE_CODE, REMOVE_COUNTRY_PATTERN } from 'src/utils/const';
// redux
import { updatePorfilRequest } from 'src/redux/slices/auth';
import { dispatch, useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  email: string;
  phone: string;
  position: string;
  phoneCode: string;
};

export default function AccountGeneralPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required(translate('companies.name_is_required'))
      .max(30, translate('companies.name_max'))
      .matches(/^[a-zA-ZÀ-ÿ\s]+$/, translate('companies.name_alpha')),
    email: Yup.string()
      .email(translate('companies.mail_invalid'))
      .max(100, translate('companies.mail_invalid')),
    phone: Yup.string()
      .required(translate('employee.phone_required'))
      .matches(/^((\d{9}))$/, translate('employee.phone_invalid')),
    // .matches(/^((\+33|\+262)(\d{9}))$/, translate('employee.phone_invalid')),
    phoneCode: Yup.string().default(DEFAULT_PHONE_CODE),
    position: Yup.string()
      .required(translate('companies.position_required'))
      .max(40, translate('employee.position_max'))
      .min(2, translate('employee.position_min')),
  });

  const defaultValues = {
    name: user?.name || '',
    email: user?.email || '',
    position: user?.position || '',
    phone:
      user?.phone && user?.phone !== null ? user?.phone?.replace(REMOVE_COUNTRY_PATTERN, '') : '',
    phoneCode:
      user?.phone && user?.phone !== null
        ? user?.phone.slice(
            0,
            user?.phone?.length - user?.phone?.replace(REMOVE_COUNTRY_PATTERN, '').length
          )
        : DEFAULT_PHONE_CODE,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const dataAccount = {
      name: data?.name,
      email: data?.email,
      position: data?.position,
      phone: `${data.phoneCode}${data.phone}`,
    };
    dispatch(
      updatePorfilRequest({
        isLoading: false,
        data: dataAccount,
        toast: enqueueSnackbar,
        translate: translate,
        navigate,
      })
    );
  };

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
              <RHFTextField
                name="name"
                placeholder="John Durand"
                label={translate('companies.name')}
              />
              {/*  <RHFTextField
                name="phone"
                placeholder="+33234567890"
                label={translate('companies.phone')}
              /> */}

              <RHFTextFieldPhone
                name="phone"
                label={translate('companies.phone')}
                itemName="phoneCode"
                type="phone"
                placeholder="234567890"
              />
              <RHFTextField
                name="email"
                placeholder="john@exemple.com"
                label={translate('companies.email')}
              />
              <RHFTextField
                placeholder="DG"
                name="position"
                label={translate('companies.position')}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={!isDirty}
              >
                {translate('save')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
