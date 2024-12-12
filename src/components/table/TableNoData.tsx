// @mui
import { TableRow, TableCell } from '@mui/material';
import { useLocales } from 'src/locales';
//
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
  title?: string;
};

export default function TableNoData({ isNotFound, title }: Props) {
  const { translate } = useLocales();
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title={title ? title : translate('no_data')}
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
