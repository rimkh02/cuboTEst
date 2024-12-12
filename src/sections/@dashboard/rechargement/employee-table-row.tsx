import { useLocales } from 'src/locales';

// @mui
import { Stack, TableRow, TableCell, Typography } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { CustomAvatar } from 'src/components/custom-avatar';
import { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
};
export default function EmployeeRow({ row, selected }: Props) {
  const { translate } = useLocales();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={row.firstName} />

            <Typography variant="subtitle2" noWrap>
              {(row.lastName === '' && translate('unassigned')) || row.lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          {(row.firstName === '' && translate('unassigned')) || row.firstName}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {((row.category?.name === '' || row.category === null) && translate('unassigned')) ||
            row.category?.name}
        </TableCell>

        <TableCell align="left">
          <Iconify
            icon="material-symbols:phone-android"
            sx={{
              width: 20,
              height: 20,
              color: 'Grey',
            }}
          />
          {(row.phone === '' && translate('unassigned')) || row.phone}
        </TableCell>
        <TableCell align="left">
          <Iconify
            icon="ic:outline-mark-email-unread"
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
            }}
          />

          {(row.email === '' && translate('unassigned')) || ' ' + row.email}
        </TableCell>

        <TableCell align="right">
          <RHFTextField
            name="nbr"
            variant="standard"
            type="number"
            size="small"
            placeholder={translate('tax.writing')}
            sx={{ width: 100 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
