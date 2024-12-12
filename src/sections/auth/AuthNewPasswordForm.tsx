import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField, RHFCodes } from '../../components/hook-form';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { requestForgotPasswordStepTwo } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  code7: string;
  code8: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthNewPasswordForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { translate } = useLocales();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { isLoadingForget } = useSelector((state) => state.auth);

  const emailRecovery =
    typeof window !== 'undefined' ? sessionStorage.getItem('email-recovery') : '';

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required(translate('PageForgetPassword.Code_required')),
    code2: Yup.string().required(translate('PageForgetPassword.Code_required')),
    code3: Yup.string().required(translate('PageForgetPassword.Code_required')),
    code4: Yup.string().required(translate('PageForgetPassword.Code_required')),
    code5: Yup.string().required(translate('PageForgetPassword.Code_required')),
    code6: Yup.string().required(translate('PageForgetPassword.Code_required')),
    code7: Yup.string().required(translate('PageForgetPassword.Code_required')),
    code8: Yup.string().required(translate('PageForgetPassword.Code_required')),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .min(8, translate('errors.password'))
      .required(translate('errors.Password_is_required')),
    confirmPassword: Yup.string()
      .required(translate('settings.confirm_password_is_required'))
      .oneOf([Yup.ref('password'), null], translate('errors.passwords_must_match')),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
    code7: '',
    code8: '',
    email: emailRecovery || '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const dataToSend = {
      email: data.email,
      resetToken: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}${data.code7}${data.code8}`,
      newPassword: data.password,
    };

    dispatch(
      requestForgotPasswordStepTwo({
        data: dataToSend,
        toast: enqueueSnackbar,
        translate: translate,
        navigate,
      })
    );
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="email"
          label="Email"
          disabled={!!emailRecovery}
          InputLabelProps={{ shrink: true }}
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <RHFCodes
            keyName="code"
            inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6', 'code7', 'code8']}
            InputProps={{
              sx: {
                //  width: { xs: 35, sm: 35 },
                '& input': { padding: '16.5px 14px', textAlign: 'center', height: '1.4375em' },
              },
            }}
            inputProps={{
              maxLength: 1,
            }}
          />
        </Stack>

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6 ||
          !!errors.code7 ||
          !!errors.code8) && (
          <FormHelperText error sx={{ px: 2 }}>
            {translate('PageForgetPassword.Code_required')}
          </FormHelperText>
        )}

        <RHFTextField
          name="password"
          label={translate('settings.new_password')}
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

        <RHFTextField
          name="confirmPassword"
          label={translate('settings.confirm_new_password')}
          type={showPassword2 ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                  <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
          loading={isLoadingForget}
          sx={{ mt: 3 }}
        >
          {translate('send')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
