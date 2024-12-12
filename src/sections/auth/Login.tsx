// @mui
import { Stack, Typography } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import useLocales from 'src/locales/useLocales';

// ----------------------------------------------------------------------

export default function Login() {
  const { translate } = useLocales();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{translate('sign')}</Typography>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
