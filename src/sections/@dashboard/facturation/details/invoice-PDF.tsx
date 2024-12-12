/* eslint-disable jsx-a11y/alt-text */
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
import { INVOICE_STATUS } from 'src/utils/const';
// styles
import styles from './invoice-style';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function InvoicePDF({ invoice }: any) {
  const { translate } = useLocales();
  const {
    amount,
    status,
    invoiceTo,
    createDate,
    invoiceMonth,
    employeeFees,
    overageFees,
    usedBonusesFees,
  } = invoice;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/WAWASHI LOGO VIVATECH_10.png" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>
              {(status === INVOICE_STATUS.pending_payment && translate('facturationPage.unpaid')) ||
                (status === INVOICE_STATUS.paid && translate('facturationPage.paid')) ||
                (status === INVOICE_STATUS.canceled && translate('facturationPage.CANCELLED'))}
            </Text>
          </View>
        </View>
        <View style={[styles.gridContainer]}>
          <Text style={[styles.overline, styles.mb8]}>
            7 rue de la croix Martre 91120 Palaiseau
          </Text>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <Text style={[styles.overline, styles.mb8]}>support@wawashi.fr</Text>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>
              {translate('facturationPage.invoice_to')}
            </Text>
            <Text style={styles.body1}>{invoiceTo?.name}</Text>
            <Text style={styles.body1}>{invoiceTo?.company?.name}</Text>
            <Text style={styles.body1}>{invoiceTo?.company?.address}</Text>
            <Text style={styles.body1}>{invoiceTo?.company?.phone}</Text>
            <Text style={styles.body1}>{invoiceTo?.company?.invoiceEmail}</Text>
          </View>
          <View style={[styles.mb30]}>
            <View style={styles.col6}>
              <Text style={[styles.overline2]}>
                {/*translate('facturationPage.date_create')*/}
                Date
              </Text>
              <Text style={styles.body1}>{fDate(createDate)}</Text>

              <Text style={[styles.overline2, { marginTop: 10 }]}>
                {translate('facturationPage.fields.Month')}
              </Text>
              <Text style={styles.body1}>{invoiceMonth}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>
          {translate('facturationPage.invoice_details')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>{translate('facturationPage.description')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text>1</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}> {translate('facturationPage.lineOne')}</Text>
                <Text> {translate('facturationPage.lineOne')}</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text />
              </View>

              <View style={styles.tableCell_3}>
                <Text />
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{employeeFees} € </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text>2</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}> {translate('facturationPage.lineTwo')}</Text>
                <Text> {translate('facturationPage.lineTwo')}</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text />
              </View>

              <View style={styles.tableCell_3}>
                <Text />
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{usedBonusesFees} € </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text>3</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}> {translate('facturationPage.lineThree')}</Text>
                <Text> {translate('facturationPage.lineThree')}</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text />
              </View>

              <View style={styles.tableCell_3}>
                <Text />
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{overageFees} € </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>{translate('facturationPage.SUBTOTAL')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{amount} €</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>{translate('facturationPage.VAT_RATE')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text> 20%</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}> {translate('facturationPage.total')}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}> {fCurrency(amount * (1 + 20 / 100))}€</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={styles.body1}>
              {translate('facturationPage.Payment_by_bank_transfer')}
            </Text>
            <Text style={[styles.mb8]}>
              {translate('facturationPage.establishment_of_the_account')}

              <Text style={styles.subtitle2}>
                &nbsp; {invoiceTo.company?.paymentInformations?.[0]?.bankName} &nbsp;,
                {invoiceTo.company?.paymentInformations?.[0]?.bankAddress}
              </Text>
            </Text>

            <Text style={styles.body1}>{translate('facturationPage.Bank_details')} </Text>
            <Text style={styles.body1}>
              iban : {invoiceTo.company?.paymentInformations?.[0]?.iban}
            </Text>
            <Text style={styles.body1}>
              BIC : {invoiceTo.company?.paymentInformations?.[0]?.bic}
            </Text>
          </View>
        </View>
        <View style={[styles.gridContainer, styles.footer]}>
          <View style={[styles.col8, { alignItems: 'center' }]}>
            <Text style={styles.subtitle2}>Wawashi</Text>
            <Text>
              S.A.S. au capital de 11 348 euros - 848 275 103 R.C.S. Evry - TVA Intracommunautaire :
              FR57848275103 7 rue de la croix Martre – 91120 Palaiseau
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
