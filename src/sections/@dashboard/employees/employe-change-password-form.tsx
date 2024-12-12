import * as Yup from 'yup';
//react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, InputAdornment, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
// locales
import { useLocales } from 'src/locales';
//redux
import { useDispatch, useSelector } from 'src/redux/store';
import { resetPassword } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------
export default function EmployeePasswordForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, company, isLoading } = useSelector((state) => state.auth);

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required(translate('settings.old_password_is_required'))
      .min(8, translate('settings.Password_characters_long')),
    password: Yup.string().min(8, translate('settings.Password_characters_long')),
    confirmPassword: Yup.string()
      .min(8, translate('settings.Password_characters_long'))
      .required(translate('settings.confirm_password_is_required'))
      .oneOf([Yup.ref('password'), null], translate('settings.passwords_must_match')),
  });

  const defaultValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowcConfirmPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    /* dispatch(
      resetPassword({
        isLoading: false,
        data,
        user,
        company,
        toast: enqueueSnackbar,
        navigate: navigate,
        translate: translate,
        reset,
      })
    ); */
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{p:3}}>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 3 }}>
              {translate('employee.update_password')}
            </Typography>
        <Stack spacing={3} alignItems="flex-end" >
          <RHFTextField
            name="oldPassword"
            label={translate('settings.old_password')}
            type={showOldPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                    <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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

          <LoadingButton type="submit" variant="contained" loading={isLoading} >
            {translate('save')}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
