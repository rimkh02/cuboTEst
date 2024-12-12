// @mui
import { TableRow, TableCell } from '@mui/material';
// components
import EmptyContent from 'src/components/empty-content';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
};

export default function TableNoEmployeAssign({ isNotFound }: Props) {
  const { translate } = useLocales();
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title={translate('empty_table.no_employe_assign')}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
