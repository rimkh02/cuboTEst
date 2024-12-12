import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import CategoryNewEditForm from 'src/sections/@dashboard/categories/category-new-edit-form';
//Translate
import { useLocales } from 'src/locales';
//redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getCategoryRequest } from 'src/redux/slices/categories';
import { getPlafondsAdvantagesRequest } from 'src/redux/slices/settings';

// ----------------------------------------------------------------------

export default function CagnotteEditPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { category } = useSelector((state) => state.categories);

  /* const currentCagnotte = useMemo(
    () => categories?.find((cagnotte: TCategory) => paramCase(cagnotte?.id.toString()) === id),
    [categories, id]
  );
  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [dispatch, refresh]); */

  useEffect(() => {
    dispatch(getCategoryRequest({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPlafondsAdvantagesRequest());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{translate('Advantages')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('Advantages')}
          links={[
            {
              name: translate('Dashboard'),
              href: PATH_DASHBOARD.general.homeComany,
            },
            {
              name: translate('cagnotte.cagnottes'),
              href: PATH_DASHBOARD.cagnotte.list,
            },
            { name: `${category?.name ? category?.name : ''}` },
          ]}
        />

        <CategoryNewEditForm isEdit currentCategory={category} />
      </Container>
    </>
  );
}
