// @mui
import { Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
import { CompletedStep } from 'src/assets/illustrations';
// locales
import { useLocales } from 'src/locales';
// components
import { DialogAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

interface Props extends DialogProps {
  onReset: VoidFunction;
}

export default function RechargementMealsComplete({ open, onReset }: Props) {
  const { translate } = useLocales();

  const handleReset = () => {
    onReset();
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
        <Typography variant="h4">{translate('rechargementPage.meals.completed')}</Typography>

        <CompletedStep sx={{ height: 260 }} />

        <Typography>
          <br /> {translate('rechargementPage.meals.continue')}
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
            {translate('rechargementPage.meals.buttonContinue')}
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
