import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo } from 'react';
// @mui
import { Container } from '@mui/material';
import { paramCase } from 'change-case';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useParams } from 'react-router-dom';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// locales
import { useLocales } from 'src/locales';
// sections
import FactureDetails from 'src/sections/@dashboard/facturation/details';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getAllInvoices } from 'src/redux/slices/invoice';

// ----------------------------------------------------------------------

export default function FacturationPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { invoices } = useSelector((state) => state.invoice);

  const currentInvoice = useMemo(
    () => invoices?.find((invoice: any) => paramCase(invoice?.id.toString()) === id),
    [invoices, id]
  );

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title> {translate('Facturation')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('Facturation')}
          links={[
            { name: translate('Dashboard'), href: PATH_DASHBOARD.general.homeComany },
            {
              name: translate('Facturation'),
              href: PATH_DASHBOARD.facturation.list,
            },
            { name: translate('invoice') },
          ]}
        />

        <FactureDetails invoice={currentInvoice} />
      </Container>
    </>
  );
}
