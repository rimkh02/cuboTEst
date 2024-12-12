// @mui
import { Stack, TextField, Button } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// locales
import { defaultLang, useLocales } from 'src/locales';
import 'dayjs/locale/fr';
import 'dayjs/locale/en';
// ----------------------------------------------------------------------
type Props = {
  isFiltered: boolean;
  onResetFilter: VoidFunction;
  onFilterStartDate: (value: Date | null) => void;
  filterStartDate: Date | null;
};
export default function InvoiceTableToolbar({
  isFiltered,
  onResetFilter,
  onFilterStartDate,
  filterStartDate,
}: Props) {
  const { translate } = useLocales();
  const lng = localStorage.getItem('i18nextLng') || defaultLang.value;

  return (
    <Stack
      spacing={2}
      alignItems="flex-end"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{
        px: 2.5,
        py: 3,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lng}>
        <DatePicker
          views={['month']}
          label={translate('tax.month')}
          value={filterStartDate}
          inputFormat="MMMM"
          onChange={onFilterStartDate}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {translate('clear')}
        </Button>
      )}
    </Stack>
  );
}
