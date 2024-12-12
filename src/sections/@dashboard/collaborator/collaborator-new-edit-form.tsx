import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'yup-phone';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
// utils
import { DEFAULT_PHONE_CODE, REMOVE_COUNTRY_PATTERN } from 'src/utils/const';
// locales
import { useLocales } from 'src/locales';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFRadioGroup, RHFTextField } from '../../../components/hook-form';
import Iconify from 'src/components/iconify';
import RHFTextFieldPhone from 'src/components/hook-form/RHTextFieldPhone';
//redux
import { useDispatch, useSelector } from 'src/redux/store';
import { createAccountRequest } from 'src/redux/slices/accounts';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentCollaborartor?: any;
  onClose: VoidFunction;
};

export default function CollaboratorNewEditForm({
  isEdit = false,
  currentCollaborartor,
  onClose,
}: Props) {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading } = useSelector((state) => state.accounts);
  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowcConfirmPassword] = useState(false);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string()
      .required(translate('settings.errors.first_name'))
      .max(30, translate('companies.name_max'))
      .matches(/^[a-zA-ZÀ-ÿ\s]+$/, translate('companies.name_alpha')),
    position: Yup.string()
      .required(translate('settings.errors.Poste'))
      .max(40, translate('employee.poste_max'))
      .min(2, translate('employee.poste_min')),
    phone: Yup.string()
      .required(translate('settings.errors.Phone'))
      // .matches(/^((\+33|\+262)(\d{9}))$/, translate('employee.phone_invalid')),
      .matches(/^((\d{9}))$/, translate('employee.phone_invalid')),
    phoneCode: Yup.string().default(DEFAULT_PHONE_CODE),
    email: Yup.string()
      .required(translate('settings.errors.Email'))
      .email(translate('settings.errors.mail_invalid'))
      .max(100, translate('settings.errors.mail_invalid')),
    accountType: Yup.string().required(translate('settings.errors.Access_level')),
    password: Yup.string().min(8, translate('settings.Password_characters_long')),
    confirmPassword: Yup.string()
      .min(8, translate('settings.Password_characters_long'))
      .required(translate('settings.confirm_password_is_required'))
      .oneOf([Yup.ref('password'), null], translate('settings.passwords_must_match')),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCollaborartor?.name || '',
      position: currentCollaborartor?.position || '',
      // phone: currentCollaborartor?.phone || '',
      phone:
        currentCollaborartor?.phone && currentCollaborartor?.phone !== null
          ? currentCollaborartor?.phone?.replace(REMOVE_COUNTRY_PATTERN, '')
          : '',
      phoneCode:
        currentCollaborartor?.phone && currentCollaborartor?.phone !== null
          ? currentCollaborartor?.phone.slice(
              0,
              currentCollaborartor?.phone?.length -
                currentCollaborartor?.phone?.replace(REMOVE_COUNTRY_PATTERN, '').length
            )
          : DEFAULT_PHONE_CODE,
      email: currentCollaborartor?.email || '',
      accountType: currentCollaborartor?.accountType || '',
    }),
    [currentCollaborartor]
  );

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isEdit && currentCollaborartor) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCollaborartor]);

  const onSubmit = async (data: any) => {
    const dataToSend = {
      accountType: data.accountType,
      name: data.name,
      email: data.email,
      position: data.position,
      phone: `${data.phoneCode}${data.phone}`,
      temporaryPassword: data.password,
    };

    dispatch(
      createAccountRequest({
        isLoading: false,
        data: dataToSend,
        toast: enqueueSnackbar,
        translate: translate,
        reset,
        onClose,
      })
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{ mt: '10px' }}
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        <RHFTextField name="name" label={translate('settings.fields.last_name')} />
        <RHFTextField name="position" label={translate('settings.fields.Poste')} />
        {/* <RHFTextField name="phone" label={translate('settings.fields.Phone')} /> */}
        <RHFTextFieldPhone
          name="phone"
          label={translate('settings.fields.Phone')}
          itemName="phoneCode"
          type="phone"
          placeholder="234567890"
        />
        <RHFTextField name="email" label={translate('settings.fields.Email')} />
        <RHFTextField
          name="password"
          label={translate('settings.new_password')}
          type={showpassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showpassword)} edge="end">
                  <Iconify icon={showpassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label={translate('settings.confirm_new_password')}
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowcConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Stack spacing={1} sx={{ mt: '10px' }}>
        <Typography variant="subtitle1" sx={{ color: '#919EAB', fontWeight: 400 }}>
          {translate('settings.fields.Access_level')}
        </Typography>
        <RHFRadioGroup
          name="accountType"
          options={[
            { label: translate('settings.fields.Administrator'), value: 'ADMIN' },
            { label: translate('settings.fields.Manager'), value: 'MANAGER' },
          ]}
          row={true}
        />
      </Stack>
      <Stack justifyContent="flex-end" direction="row" sx={{ mt: 3, mb: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isLoading}>
          {translate('save')}
        </LoadingButton>
        <Button sx={{ ml: '10px' }} onClick={onClose}>
          {translate('Cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
}
