// @mui
import { TableRow, TableCell, Typography, IconButton, Tooltip } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
// utils
import { fDate } from 'src/utils/formatTime';
// locales
import { defaultLang, useLocales } from 'src/locales';
// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onViewRow: VoidFunction;
};

export default function TransationTableRow({ row, selected, onViewRow }: Props) {
  const { translate } = useLocales();

  const lng = localStorage.getItem('i18nextLng') || defaultLang.value;

  const { amount, reloadMonth, reloadAdvantageType, createdAt } = row;

  const date = new Date(reloadMonth);

  const month = date.toLocaleString(lng, { month: 'long' });

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="center">
          <Typography key={row.id} variant="subtitle2">
            {translate('advantagesConst.' + reloadAdvantageType)}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="subtitle2">{amount} €</Typography>
        </TableCell>
        <TableCell align="center">
          {reloadMonth !== null ? <>{month}</> : translate('not_specified')}
        </TableCell>
        <TableCell align="center">
          <Iconify
            icon="ic:baseline-calendar-month"
            sx={{
              width: 20,
              height: 20,
              color: 'Grey',
            }}
          />
          {fDate(createdAt)}
        </TableCell>

        <TableCell align="right">
          <Tooltip title={translate('facturationPage.view')} placement="top" arrow>
            <IconButton
              onClick={() => {
                onViewRow();
              }}
            >
              <Iconify icon="lucide:eye" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}
