import { useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
// redux
import { useSelector } from '../../redux/store';
// locales
import useLocales from 'src/locales/useLocales';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { translate } = useLocales();

  const { isLoading } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(translate('check_email')).required(translate('email_required')),
    password: Yup.string().required(translate('password_required')),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    await login(data.email, data.password, navigate);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!error &&
          error?.error !== 'Company is not active' &&
          error?.error !== 'Account is not active' && (
            <Alert severity="error">
              {
                translate('check_email_and_password')
                //+ error.error
              }
            </Alert>
          )}
        {(error?.error === 'Company is not active' || error?.error === 'Account is not active') && (
          <Alert severity="error">{translate('your_account_is_blocked')}</Alert>
        )}

        <RHFTextField name="email" label={translate('Email')} />

        <RHFTextField
          name="password"
          label={translate('password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 3 }}>
        <Link
          to={PATH_AUTH.resetPassword}
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="always"
        >
          {translate('PageForgetPassword.forgot_password')}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          textTransform: 'unset',
          bgcolor: 'primary.main',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'secondary.dark',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        {translate('sign')}
      </LoadingButton>
    </FormProvider>
  );
}
