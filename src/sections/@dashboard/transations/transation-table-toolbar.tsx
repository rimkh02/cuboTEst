// @mui
import { Stack, TextField, Button, MenuItem } from '@mui/material';
import { defaultLang, useLocales } from 'src/locales';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// components
import Iconify from '../../../components/iconify';
import 'dayjs/locale/fr';
import 'dayjs/locale/en';
// ----------------------------------------------------------------------
type Props = {
  isFiltered: boolean;
  filterAdvantage: string;
  optionsAdvantages: any[];
  onResetFilter: VoidFunction;
  onFilterStartDate: (value: Date | null) => void;
  onFilterAdvantage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterStartDate: Date | null;
};
export default function TransactionTableToolbar({
  isFiltered,
  optionsAdvantages,
  filterAdvantage,
  onResetFilter,
  onFilterStartDate,
  onFilterAdvantage,
  filterStartDate,
}: Props) {
  const { translate } = useLocales();
  const lng = localStorage.getItem('i18nextLng') || defaultLang.value;

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        select
        label={translate('TransationsPage.type')}
        value={filterAdvantage}
        onChange={onFilterAdvantage}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsAdvantages.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
              '&:first-of-type': { mt: 0 },
              '&:last-of-type': { mb: 0 },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
