import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets/illustrations';
// locales
import { useLocales } from 'src/locales';
// ----------------------------------------------------------------------

export default function Page403() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('Page403.title')}</title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {translate('Page403.description')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            {translate('Page403.second_description')}
            <br />
            {translate('Page403.third_description')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button to="/" component={RouterLink} size="large" variant="contained">
          {translate('Page403.go_home')}
        </Button>
      </MotionContainer>
    </>
  );
}
