// @mui
import { TableRow, TableCell, IconButton, Typography } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Label from 'src/components/label';
// utils
import { fCurrency } from 'src/utils/formatNumber';
import { fDate } from 'src/utils/formatTime';
import { INVOICE_STATUS } from 'src/utils/const';
// locales
import { defaultLang, useLocales } from 'src/locales';
// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onViewRow: VoidFunction;
};

export default function InvoiceTableRow({ row, selected, onViewRow }: Props) {
  const { amount, createdAt, status, invoiceMonth } = row;
  const date = new Date(invoiceMonth);

  const lng = localStorage.getItem('i18nextLng') || defaultLang.value;
  const month = date.toLocaleString(lng, { month: 'long' });

  const { translate } = useLocales();
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="center">
          <Typography variant="subtitle2"> {fCurrency(amount * (1 + 20 / 100))}€</Typography>
        </TableCell>

        <TableCell align="center"> {month}</TableCell>

        <TableCell align="center" sx={{ color: 'Grey' }}>
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

        <TableCell align="center">
          <Label
            variant="soft"
            color={
              (status === INVOICE_STATUS.pending_payment && 'warning') ||
              (status === INVOICE_STATUS.canceled && 'error') ||
              (status === INVOICE_STATUS.paid && 'success') ||
              'default'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {(status === INVOICE_STATUS.pending_payment && translate('facturationPage.unpaid')) ||
              (status === INVOICE_STATUS.paid && translate('facturationPage.paid')) ||
              (status === INVOICE_STATUS.canceled && translate('facturationPage.CANCELLED'))}
          </Label>
        </TableCell>

        <TableCell align="center">
          <IconButton
            title={translate('facturationPage.view')}
            onClick={() => {
              onViewRow();
            }}
          >
            <Iconify icon="lucide:eye" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
