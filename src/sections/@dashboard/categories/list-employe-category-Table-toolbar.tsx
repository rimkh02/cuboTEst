// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
type Props = {
  filterName: string;
  isFiltered: boolean;
  onResetFilter: VoidFunction;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EmployeCategoryTableToolbar({
  filterName,
  isFiltered,
  onFilterName,
  onResetFilter,
}: Props) {
  const { translate } = useLocales();
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder={translate('cagnotte.search_name_only')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

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