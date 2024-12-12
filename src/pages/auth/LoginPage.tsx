import { Helmet } from 'react-helmet-async';
import { useLocales } from 'src/locales';
// sections
import Login from '../../sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title> {translate('sign')}</title>
      </Helmet>

      <Login />
    </>
  );
}
