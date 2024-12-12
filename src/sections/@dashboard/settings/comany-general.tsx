import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'yup-phone';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { useLocales } from 'src/locales';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import RHFTextFieldPhone from 'src/components/hook-form/RHTextFieldPhone';
// utils
import { DEFAULT_PHONE_CODE, REMOVE_COUNTRY_PATTERN } from 'src/utils/const';
//redux
import { useDispatch, useSelector } from 'src/redux/store';
import { updatePorfilCompanyRequest } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentCompany?: any;
};

export default function EditProfilCompanyForm({ isEdit = false, currentCompany }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user, isLoadingUpdate } = useSelector((state) => state.auth);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string()
      .required(translate('companies.name_is_required'))
      .max(64, translate('companies.company_name_max'))
      .matches(/^[a-zA-ZÀ-ÿ\s]+$/, translate('companies.name_alpha')),
    address: Yup.string()
      .required(translate('companies.address_is_required'))
      .max(100, translate('companies.address_length')),
    siret: Yup.string()
      .required(translate('companies.SIRET_is_required'))
      .min(14, translate('settings.siret_long'))
      .max(14, translate('settings.siret_long')),
    tax: Yup.number()
      .required(translate('companies.tax_is_required'))
      .typeError(translate('invalid_value'))
      //.transform((value, originalValue) => (originalValue?.trim() === '' ? null : value))
      .transform((value, originalValue) => {
        const trimmedValue =
          typeof originalValue === 'string' ? originalValue.trim() : originalValue;
        return trimmedValue === '' ? null : value;
      })
      .nullable()
      .moreThan(0, translate('companies.tax_must_be_more_than'))
      .max(99, translate('companies.tax_must_be_less_than')),
    website: Yup.string()
      .required(translate('companies.website_is_required'))
      .max(120, translate('companies.website_length')),
    invoiceEmail: Yup.string()
      .required(translate('companies.email_is_required'))
      .email(translate('companies.invoice_mail_invalid'))
      .max(100, translate('companies.invoice_mail_invalid')),
    invoiceAddress: Yup.string()
      .required(translate('companies.address_is_required'))
      .max(100, translate('companies.address_length')),
    phone: Yup.string()
      .required(translate('companies.phone_is_required'))
      // .matches(/^((\+)33)(\d{9})$/, translate('employee.phone_invalid')),
      .matches(/^((\d{9}))$/, translate('employee.phone_invalid')),
    phoneCode: Yup.string().default(DEFAULT_PHONE_CODE),
  });

  const defaultValues = useMemo(
    () => ({
      name: user?.company.name || '',
      website: user?.company.website || '',
      address: user?.company.address || '',
      siret: user?.company.siret || '',
      tax: user?.company.tax || 0,
      invoiceAddress: user?.company.invoiceAddress || '',
      invoiceEmail: user?.company.invoiceEmail || '',
      phone:
        user?.company?.phone && user?.company?.phone !== null
          ? user?.company?.phone.replace(REMOVE_COUNTRY_PATTERN, '')
          : '',
      phoneCode:
        user?.company?.phone && user?.company?.phone !== null
          ? user?.company.phone.slice(
              0,
              user?.company.phone.length -
                user?.company.phone.replace(REMOVE_COUNTRY_PATTERN, '').length
            )
          : DEFAULT_PHONE_CODE,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCompany]
  );

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (isEdit && currentCompany) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCompany]);

  const onSubmit = async (data: any) => {
    const companyData = {
      name: data.name,
      website: data.website,
      address: data.address,
      siret: data.siret,
      tax: data.tax,
      invoiceAddress: data.invoiceAddress,
      invoiceEmail: data.invoiceEmail,
      phone: `${data.phoneCode}${data.phone}`,
    };

    dispatch(
      updatePorfilCompanyRequest({
        isLoading: false,
        data: companyData,
        user,
        id,
        toast: enqueueSnackbar,
        navigate: navigate,
        translate: translate,
      })
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 3, mb: 3 }}>
              {translate('companies.informationscompany')}
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" placeholder="Spinka" label={translate('companies.name')} />
              <RHFTextField
                name="address"
                placeholder="France"
                label={translate('companies.address')}
              />
              <RHFTextField
                name="siret"
                placeholder="23252187900034"
                type="number"
                label={translate('companies.SIRET')}
              />
              <RHFTextField name="tax" placeholder="20" label={translate('companies.tax')} />
              <RHFTextField
                name="website"
                placeholder="https://exemple.com"
                label={translate('companies.website')}
              />
              <RHFTextField
                name="invoiceAddress"
                placeholder="23 rue du Paradis, 75004 Paris"
                label={translate('companies.invoiceAddress')}
              />
              <RHFTextField
                name="invoiceEmail"
                placeholder="john@exemple.com"
                label={translate('companies.invoiceEmail')}
              />
              {/* <RHFTextField
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
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoadingUpdate}
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
