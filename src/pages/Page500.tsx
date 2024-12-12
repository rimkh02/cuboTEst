import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { SeverErrorIllustration } from '../assets/illustrations';
// locales
import { useLocales } from 'src/locales';
// ----------------------------------------------------------------------

export default function Page500() {
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title>
          {translate('page500.title')} | {translate('appName')}
        </title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {translate('page500.subtitle')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            {translate('page500.description')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button to="/" component={RouterLink} size="large" variant="contained">
          {translate('page500.actions.goHome')}
        </Button>
      </MotionContainer>
    </>
  );
}
