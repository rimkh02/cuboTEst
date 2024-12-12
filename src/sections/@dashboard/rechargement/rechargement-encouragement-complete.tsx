import { useNavigate } from 'react-router-dom';
// @mui
import { Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
// assets
import { CompletedStep } from 'src/assets/illustrations';
// locales
import { useLocales } from 'src/locales';
// redux
import { resetRechargementEncouragement } from 'src/redux/slices/rechargement';
import { useDispatch } from 'src/redux/store';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// components
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

interface Props extends DialogProps {}

export default function RechargementEncouragementComplete({ open }: Props) {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    navigate(PATH_DASHBOARD.rechargement.root);
    dispatch(resetRechargementEncouragement());
  };
  return (
    <DialogAnimate
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          maxWidth: { md: 'calc(100% - 48px)' },
          maxHeight: { md: 'calc(100% - 48px)' },
        },
      }}
    >
      <Stack
        spacing={5}
        sx={{
          m: 'auto',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">
          {translate('rechargementPage.encouragement.completed')}
        </Typography>

        <CompletedStep sx={{ height: 260 }} />

        <Typography>
          <br /> {translate('rechargementPage.encouragement.continue')}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: 'column-reverse', sm: 'row' }}
        >
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleReset}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            {translate('rechargementPage.encouragement.buttonContinue')}
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
