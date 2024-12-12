import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from 'notistack';
// locales
import { useLocales } from 'src/locales';
// resux
import { useDispatch, useSelector } from 'src/redux/store';
import { ForgotPasswordStepOneRequest } from 'src/redux/slices/auth';
// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { isLoadingForget } = useSelector((state) => state.auth);

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(translate('errors.mail_invalid'))
      .required(translate('errors.email_required')),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      sessionStorage.setItem('email-recovery', data.email);
      const dataToSend = {
        email: data.email,
      };
      dispatch(
        ForgotPasswordStepOneRequest({
          data: dataToSend,
          translate,
          navigate,
          toast: enqueueSnackbar,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label={translate('PageForgetPassword.adresse_mail')} />

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
    </FormProvider>
  );
}
