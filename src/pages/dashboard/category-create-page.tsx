import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import CategoryNewEditForm from 'src/sections/@dashboard/categories/category-new-edit-form';
// locales
import { useLocales } from 'src/locales';
import { useEffect } from 'react';
import { useDispatch } from 'src/redux/store';
import { getPlafondsAdvantagesRequest } from 'src/redux/slices/settings';

// ----------------------------------------------------------------------

export default function CagnotteCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlafondsAdvantagesRequest());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title> {translate('cagnotte.add_cagnotte')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('cagnotte.new_add_cagnotte')}
          links={[
            {
              name: translate('Dashboard'),
              href: PATH_DASHBOARD.general.homeComany,
            },
            {
              name: translate('cagnotte.cagnottes'),
              href: PATH_DASHBOARD.cagnotte.list,
            },
            {
              name: translate('cagnotte.add_cagnotte'),
            },
          ]}
        />

        <CategoryNewEditForm />
      </Container>
    </>
  );
}
