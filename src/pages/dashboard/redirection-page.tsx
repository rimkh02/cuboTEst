import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { Typography } from '@mui/material';
// components
import { varBounce } from '../../components/animate';
import Image from 'src/components/image';
// router
import { useNavigate } from 'react-router';
// locales
import { useLocales } from 'src/locales';
import { getUserByTokenBowi } from 'src/redux/slices/auth';
// redux
import { useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

export default function PageRedirection() {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    dispatch(
      getUserByTokenBowi({
        token,
        navigate,
      })
    );
  }, [dispatch, navigate, token]);

  return (
    <>
      <Helmet>
        <title> {translate('redirectionPage.title')}</title>
      </Helmet>

      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ color: '#007B55' }}>
          {translate('redirectionPage.description')}
        </Typography>

        <Image
          sx={{ mt: 3, filter: 'hue-rotate(310deg)' }}
          src={'/assets/images/dashboard/DgyG.gif'}
        />
      </m.div>
    </>
  );
}
