// @mui
import { Box, Card, Typography, Stack, Divider, CircularProgress, Container } from '@mui/material';
import { paramCase } from 'change-case';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// locales
import { defaultLang, useLocales } from 'src/locales';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getTransations } from 'src/redux/slices/transations';

// ----------------------------------------------------------------------

export default function TransationDetails() {
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const { id } = useParams();

  const lng = localStorage.getItem('i18nextLng') || defaultLang.value;

  const { transations, isLoading } = useSelector((state) => state.transation);

  const currentTransation = useMemo(
    () => transations?.find((transations: any) => paramCase(transations?.id.toString()) === id),
    [transations, id]
  );

  useEffect(() => {
    dispatch(getTransations({}));
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="md">
        <CustomBreadcrumbs
          heading={translate('TransationsPage.title_details')}
          links={[
            { name: translate('Dashboard'), href: PATH_DASHBOARD.general.homeComany },
            { name: translate('Transations'), href: PATH_DASHBOARD.transations.list },
            { name: translate('TransationsPage.title') },
          ]}
        />
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {translate('TransationsPage.title')}
            </Typography>
          </Stack>

          {isLoading ? (
            <Stack spacing={3} alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          ) : (
            <>
              <Typography variant="subtitle1">
                <Box sx={{ mr: 0.5, mb: 1 }}>
                  {translate('facturationPage.total')} : {currentTransation?.amount} €
                </Box>
              </Typography>
              <Typography variant="subtitle1">
                <Box sx={{ mr: 0.5, mb: 1, color: 'text.secondary' }}>
                  {translate('TransationsPage.type')} :{' '}
                  {translate('advantagesConst.' + currentTransation?.reloadAdvantageType)}
                </Box>
              </Typography>
              {currentTransation?.reloadMonth !== null && (
                <Typography variant="subtitle2" sx={{ mb: 3 }}>
                  <Box component="span" sx={{ mr: 0.5, color: 'text.secondary' }}>
                    {translate('facturationPage.fields.Month')}
                    {' : '}
                    {currentTransation?.reloadMonth &&
                      new Date(currentTransation?.reloadMonth).toLocaleString(lng, {
                        month: 'long',
                      })}
                  </Box>
                </Typography>
              )}
              <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
              <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                {currentTransation?.reloadLines.map((item: any) => (
                  <Stack spacing={1} key={item.id}>
                    <Typography variant="subtitle2">
                      <Box component="span" sx={{ mr: 0.5, color: 'text.secondary' }}>
                        {translate('employee.new_employee')}
                        {' : '}
                        {item.forEmployee?.firstName + ' ' + item.forEmployee?.lastName}
                      </Box>
                    </Typography>
                    <Typography variant="subtitle1">{item?.amount} €</Typography>

                    {item?.presenceDaysCount !== null && (
                      <Typography variant="body2">
                        <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                          {translate('TransationsPage.Number_of_days')}
                        </Box>
                        {(item?.presenceDaysCount === null && translate('unassigned')) ||
                          item?.presenceDaysCount}
                      </Typography>
                    )}
                    {item?.reason !== null && (
                      <Typography variant="body2">
                        <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                          {translate('TransationsPage.reason')}
                        </Box>
                        {(item?.reason === null && translate('unassigned')) || item?.reason}
                      </Typography>
                    )}
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
