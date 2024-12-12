import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthResetPasswordForm from '../../sections/auth/AuthResetPasswordForm';
// assets
import { PasswordIcon } from '../../assets/icons';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title> {translate('PageForgetPassword.Reset_Password')}</title>
      </Helmet>

      <PasswordIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h5" paragraph>
        {translate('PageForgetPassword.Reset_Password')}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5, fontSize: '14px' }}>
        {translate('PageForgetPassword.description')}
      </Typography>

      <AuthResetPasswordForm />

      <Link
        to={PATH_AUTH.login}
        component={RouterLink}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        {translate('PageForgetPassword.return')}
      </Link>
    </>
  );
}
