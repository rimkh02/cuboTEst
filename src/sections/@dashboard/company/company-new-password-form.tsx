import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
// locales
import useLocales from 'src/locales/useLocales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { resetPassword } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

type FormValuesProps = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export default function CompanyNewPasswordForm() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNexPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.auth.company);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const VerifyCodeSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, translate('errors.password'))
      .required(translate('errors.Password_is_required')),
    password: Yup.string()
      .min(8, translate('errors.password'))
      .required(translate('errors.Password_is_required')),
    confirmPassword: Yup.string()
      .required(translate('errors.Password_is_required'))
      .oneOf([Yup.ref('password'), null], translate('errors.passwords_must_match')),
  });

  const defaultValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    dispatch(
      resetPassword({
        isLoading: false,
        data,
        user,
        company,
        toast: enqueueSnackbar,
        navigate: navigate,
        translate: translate,
        setting: false,
      })
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="oldPassword"
          label={translate('old_password')}
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
          label={translate('new_password')}
          type={showNexPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNexPassword)} edge="end">
                  <Iconify icon={showNexPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label={translate('confirm_new_password')}
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{ mt: 3 }}
        >
          {translate('update_Password')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
