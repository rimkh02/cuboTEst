import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  Divider,
  Stack,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
import { INVOICE_STATUS } from 'src/utils/const';
// types
import { TInvoice } from '../../../../@types/invoice';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
// locales
import { defaultLang, useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getInfoCompanyRequest } from 'src/redux/slices/auth';
//
import InvoiceToolbar from './invoice-toolbar';
// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  invoice?: TInvoice;
};

export default function FactureDetails({ invoice }: Props) {
  const { user, company } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoCompanyRequest());
  }, [dispatch]);

  const { translate } = useLocales();
  if (!invoice) {
    return null;
  }

  const { createdAt, status, amount, invoiceMonth, employeeFees, overageFees, usedBonusesFees } =
    invoice;

  const date = new Date(invoiceMonth);

  const lng = localStorage.getItem('i18nextLng') || defaultLang.value;
  const month = date.toLocaleString(lng, { month: 'long' });

  return (
    <>
      <InvoiceToolbar
        invoice={{
          id: '',
          status: status,
          amount: amount,
          invoiceTo: {
            id: '',
            name: user?.name,
            address: '',
            company: company,
            email: user?.email,
            phone: user?.phone,
          },
          createDate: createdAt,
          invoiceMonth: month,
          dueDate: 0,
          employeeFees: employeeFees,
          overageFees: overageFees,
          usedBonusesFees: usedBonusesFees,
        }}
      />

      <Card sx={{ pt: 5, px: 5, py: 3 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image
              disabledEffect
              alt="logo"
              src="/logo/WAWASHI LOGO VIVATECH_10.png"
              sx={{ maxWidth: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (status === INVOICE_STATUS.pending_payment && 'warning') ||
                  (status === INVOICE_STATUS.canceled && 'error') ||
                  (status === INVOICE_STATUS.paid && 'success') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {(status === INVOICE_STATUS.pending_payment &&
                  translate('facturationPage.unpaid')) ||
                  (status === INVOICE_STATUS.paid && translate('facturationPage.paid')) ||
                  (status === INVOICE_STATUS.canceled && translate('facturationPage.CANCELLED'))}
              </Label>
            </Box>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ mb: 3 }}>
              <Typography variant="subtitle2">7 rue de la croix Martre 91120 Palaiseau</Typography>

              <Typography variant="body2">support@wawashi.fr</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              {translate('facturationPage.invoice_to')}
            </Typography>

            <Typography variant="body2">{user?.name}</Typography>
            <Typography variant="body2">{user?.company?.name}</Typography>
            <Typography variant="body2">{user?.company?.address}</Typography>
            <Typography variant="body2">{user?.company?.phone}</Typography>
            <Typography variant="body2">{user?.company?.invoiceEmail}</Typography>

            {user?.phone && (
              <Typography variant="body2">
                {translate('Phone')}: {user?.phone}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={3} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Date
            </Typography>

            <Typography variant="body2">{fDate(createdAt)}</Typography>
          </Grid>

          <Grid item xs={12} sm={3} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              {translate('facturationPage.fields.Month')}
            </Typography>

            <Typography variant="body2">{month}</Typography>
          </Grid>
        </Grid>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left"> {translate('facturationPage.description')}</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <TableCell>1</TableCell>

                  <TableCell align="left">
                    <Box sx={{ maxWidth: 560 }}>
                      <Typography variant="subtitle2">
                        {translate('facturationPage.lineOne')}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {translate('facturationPage.lineOne')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left" />

                  <TableCell align="right" />
                  <TableCell align="right"> {employeeFees} € </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <TableCell>2</TableCell>

                  <TableCell align="left">
                    <Box sx={{ maxWidth: 560 }}>
                      <Typography variant="subtitle2">
                        {translate('facturationPage.lineTwo')}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {translate('facturationPage.lineTwo')}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="left" />

                  <TableCell align="right" />

                  <TableCell align="right">{usedBonusesFees} €</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <TableCell>3</TableCell>

                  <TableCell align="left">
                    <Box sx={{ maxWidth: 560 }}>
                      <Typography variant="subtitle2">
                        {translate('facturationPage.lineThree')}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {translate('facturationPage.lineThree')}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="left" />

                  <TableCell align="right">{/*fCurrency(20)*/}</TableCell>

                  <TableCell align="right">{overageFees} €</TableCell>
                </TableRow>
                <StyledRowResult>
                  <TableCell colSpan={3} sx={{ mt: 3 }} />

                  <TableCell align="right" sx={{ typography: 'body2' }}>
                    {translate('facturationPage.SUBTOTAL')}
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'body2' }}>
                    {amount} €
                  </TableCell>
                </StyledRowResult>
                <TableCell colSpan={3} sx={{ mt: 3 }} />

                <TableCell align="right" sx={{ typography: 'body2' }}>
                  {translate('facturationPage.VAT_RATE')}
                </TableCell>

                <TableCell align="right" width={140} sx={{ typography: 'body2' }}>
                  20%
                </TableCell>

                <StyledRowResult>
                  <TableCell colSpan={3} sx={{ mt: 3 }} />

                  <TableCell align="right" sx={{ typography: 'h6' }}>
                    {translate('facturationPage.total')}
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                    {fCurrency(amount * (1 + 20 / 100))}€
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Grid item xs={12} sm={3} sx={{ mb: 5 }}>
          <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
            {translate('facturationPage.Payment_by_bank_transfer')}
          </Typography>
          <Stack direction="row">
            <Typography variant="subtitle2">
              {translate('facturationPage.establishment_of_the_account')}
            </Typography>
            <Typography variant="body2">
              &nbsp; {company?.paymentInformations?.[0]?.bankName} &nbsp;,
              {company?.paymentInformations?.[0]?.bankAddress}
            </Typography>
          </Stack>
          <Typography variant="subtitle2">{translate('facturationPage.Bank_details')}</Typography>
          <Typography variant="body2">iban : {company?.paymentInformations?.[0]?.iban}</Typography>
          <Typography variant="body2">BIC : {company?.paymentInformations?.[0]?.bic}</Typography>
        </Grid>
        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={12} sx={{ py: 3 }}>
            <Typography variant="subtitle2">Wawashi</Typography>

            <Typography variant="body2">
              S.A.S. au capital de 11 348 euros - 848 275 103 R.C.S. Evry - TVA Intracommunautaire :
              FR57848275103 7 rue de la croix Martre – 91120 Palaiseau
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
