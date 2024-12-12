import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// assets
import { SentIcon } from '../../assets/icons';
// locales
import { useLocales } from 'src/locales';
// sections
import AuthNewPasswordForm from '../../sections/auth/AuthNewPasswordForm';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title> {translate('PageForgetPassword.New_Password')}</title>
      </Helmet>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h5" paragraph>
        {translate('PageForgetPassword.new_password_description1')}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5, fontSize: '14px' }}>
        {translate('PageForgetPassword.new_password_description2')}
        <br />
        {translate('PageForgetPassword.new_password_description3')}
      </Typography>

      <AuthNewPasswordForm />

      <Link
        to={PATH_AUTH.login}
        component={RouterLink}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
          my: 3,
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        {translate('PageForgetPassword.return')}
      </Link>
    </>
  );
}
