// @mui
import { Card, Button, Stack, Box, Typography, Grid, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
// locales
import useLocales from 'src/locales/useLocales';
// redux
import { setTotalMeals } from 'src/redux/slices/rechargement';
import { useDispatch, useSelector } from 'src/redux/store';
// ----------------------------------------------------------------------

type Props = {
  rechargementData: any;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
};

export default function FormStepResume({ rechargementData, onNextStep, onBackStep }: Props) {
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const [totalNbrDays, setTotalNbreDays] = useState(0);
  const { ticketRestaurantFacialValueCoveragePercent, ticketRestaurantFacialValue } = useSelector(
    (state) => state.auth.company
  );
  const { linesToSend } = useSelector((state) => state.rechargement.rechargementData);
  useEffect(() => {
    let nbrs = 0;
    for (let i = 0; i < linesToSend.lines.length; i++) {
      nbrs = nbrs + linesToSend.lines[i].presenceDaysCount;
    }
    setTotalNbreDays(nbrs);
  }, [linesToSend.lines]);

  const handleNextStep = () => {
    dispatch(
      setTotalMeals(
        (totalNbrDays * ticketRestaurantFacialValue * ticketRestaurantFacialValueCoveragePercent) /
          100
      )
    );
    onNextStep();
  };
  return (
    <Card
      sx={{
        // p: 3,
        mb: 3,
      }}
    >
      <Stack flexGrow={1} spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} spacing={3}>
            <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line', pl: 3, pt: 3, pr: 3 }}>
              {translate('rechargementPage.meals.details_cmd')}
            </Typography>
            <Stack sx={{ flexDirection: 'row' }}>
              <Stack
                sx={{
                  padding: 3,
                  width: '70%',
                }}
              >
                <Typography
                  paragraph
                  variant="body1"
                  sx={{ whiteSpace: 'pre-line', mb: 1, fontWeight: 400 }}
                >
                  {translate('rechargementPage.meals.reload_month')}
                </Typography>
                <Typography
                  paragraph
                  variant="body2"
                  sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}
                >
                  {translate('rechargementPage.meals.amount_reload')}
                </Typography>
                <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        display: 'flex',
                        borderRadius: 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify
                        width={16}
                        icon={'heroicons:ticket'}
                        color={'text.secondary'}
                        sx={{ width: 40, height: 40 }}
                      />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">{ticketRestaurantFacialValue} €</Typography>
                      <Stack direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
                        <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                          {translate('rechargementPage.meals.per_title')}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <Iconify
                    width={16}
                    icon={'twemoji:heavy-multiplication-x'}
                    color={'text.secondary'}
                    sx={{ mt: '15px', mr: '20px', ml: '15px' }}
                  />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        display: 'flex',
                        borderRadius: 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify
                        width={16}
                        icon={'ph:handbag-simple'}
                        color={'text.secondary'}
                        sx={{ width: 40, height: 40 }}
                      />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">{totalNbrDays}</Typography>
                      <Stack direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
                        <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                          {translate('rechargementPage.meals.title')}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                alignItems="flex-end"
                sx={{ padding: 3, width: '30%', textAlign: { xs: 'center', md: 'left' } }}
              >
                <Typography paragraph variant="h6" sx={{ whiteSpace: 'pre-line', mb: 0 }}>
                  {(totalNbrDays *
                    ticketRestaurantFacialValue *
                    ticketRestaurantFacialValueCoveragePercent) /
                    100}
                  €
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}
                >
                  {translate('rechargementPage.meals.not_tva')}
                  {translate('rechargementPage.meals.tva')}
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{ flexDirection: 'row' }}>
              <Stack sx={{ padding: 3, width: '70%' }}>
                <Typography
                  paragraph
                  variant="body1"
                  sx={{ whiteSpace: 'pre-line', mb: 1, fontWeight: 400 }}
                >
                  {translate('rechargementPage.meals.nbr_benifciaries')}
                </Typography>

                <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        display: 'flex',
                        borderRadius: 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify
                        width={16}
                        icon={'bi:person'}
                        color={'text.secondary'}
                        sx={{ width: 40, height: 40 }}
                      />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">{linesToSend.lines.length}</Typography>
                      <Stack direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
                        <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                          {translate('rechargementPage.meals.beneficiaries')}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ ml: 3 }} />
            <Stack sx={{ flexDirection: 'row' }}>
              <Stack sx={{ padding: 3, width: '70%' }}>
                <Typography
                  paragraph
                  variant="h5"
                  sx={{ whiteSpace: 'pre-line', mb: 1, fontWeight: 700, color: 'primary.main' }}
                >
                  {translate('rechargementPage.meals.total')}
                </Typography>
              </Stack>
              <Stack
                alignItems="flex-end"
                sx={{ padding: 3, width: '30%', textAlign: { xs: 'center', md: 'left' } }}
              >
                <Typography
                  paragraph
                  variant="h5"
                  sx={{
                    whiteSpace: 'pre-line',
                    mb: 1,
                    fontWeight: 700,
                    color: 'primary.main',
                    flex: 'dispay',
                  }}
                >
                  {(totalNbrDays *
                    ticketRestaurantFacialValue *
                    ticketRestaurantFacialValueCoveragePercent) /
                    100}
                  €
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={'space-between'}
              sx={{ mt: 3, mb: 3, ml: 3 }}
            >
              <Button
                size="small"
                color="inherit"
                onClick={onBackStep}
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              >
                {translate('back')}
              </Button>

              <Box sx={{ textAlign: 'right' }}>
                <Button type="submit" variant="contained" onClick={() => handleNextStep()}>
                  {translate('next')}
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack
              flexGrow={1}
              justifyContent="center"
              alignItems="center"
              sx={{ p: 3, backgroundColor: '#F4F6F8', height: '100%' }}
            >
              <Typography paragraph variant="h6" sx={{ whiteSpace: 'pre-line' }}>
                {translate('rechargementPage.meals.summary')}
              </Typography>

              <Stack sx={{ flexDirection: 'row' }}>
                <Stack
                  alignItems="center"
                  sx={{
                    padding: 2,
                    mr: 1,
                    backgroundColor: '#fff',
                    border: 'dashed',
                    borderRadius: '8px',
                    borderColor: '#00AB55',
                    borderWidth: '0.12em',
                    width: '50%',
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: 'pre-line',
                      color: 'text.secondary',
                      fontSize: 16,
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {translate('rechargementPage.meals.restaurant_amount')}
                  </Typography>

                  <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    {ticketRestaurantFacialValue} €
                  </Typography>
                </Stack>
                <Stack
                  alignItems="center"
                  sx={{
                    padding: 2,
                    backgroundColor: '#fff',
                    border: 'dashed',
                    borderRadius: '8px',
                    borderColor: '#00AB55',
                    borderWidth: '0.12em',
                    width: '50%',
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: 'pre-line',
                      color: 'text.secondary',
                      fontSize: 16,
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {translate('rechargementPage.meals.prise_en_charge')}
                  </Typography>

                  <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    {ticketRestaurantFacialValueCoveragePercent} %
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                variant="body2"
                sx={{ mt: { xs: 1, xl: 3 }, mb: { xs: 1, xl: 3 }, color: 'text.disabled' }}
              >
                {translate('rechargementPage.meals.description')}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
