import { Helmet } from 'react-helmet-async';
// @mui
import { Typography } from '@mui/material';
// assets
import { SentIcon } from '../../assets/icons';
// locales
import useLocales from 'src/locales/useLocales';
// sections
import CompanyNewPasswordForm from 'src/sections/@dashboard/company/company-new-password-form';

// ----------------------------------------------------------------------

export default function NewPasswordCompanyPage() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('password')}</title>
      </Helmet>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        {translate('change_password')}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        {translate('change_password_after_sign_in')}
        <br />
        {translate('enter_password')}
      </Typography>

      <CompanyNewPasswordForm />
    </>
  );
}
