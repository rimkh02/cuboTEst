// @mui
import { Stack, TextField } from '@mui/material';
// components
import { RHFTextField } from '../../../components/hook-form';
// locales
import { useLocales } from 'src/locales';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function CategoryNewEditStatus() {
  const { translate } = useLocales();
  const { control } = useFormContext();

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3 }}>
      <RHFTextField name="name" label={translate('categorie.name')} />
     {/* <Controller
        name="startPeriod"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            label={translate('categorie.startPeriod')}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                size="medium"
                fullWidth
                {...params}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />
      <Controller
        name="endPeriod"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            label={translate('categorie.endPeriod')}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                size="medium"
                fullWidth
                {...params}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      /> */}
    </Stack>
  );
}
