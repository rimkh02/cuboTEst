// @mui
import { TableRow, TableCell } from '@mui/material';
import EmptyContent from 'src/components/empty-content';
import { useLocales } from 'src/locales';
//

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
};

export default function NoEmploye({ isNotFound }: Props) {
  const { translate } = useLocales();
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title={translate('empty_table.no_employe_for_reload_event')}
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
