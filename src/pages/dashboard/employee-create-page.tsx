import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmployeeNewEditForm from 'src/sections/@dashboard/employees/employe-new-edit-form';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function EmployeeCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('employee.new_employee')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('employee.add_new_employee')}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.general.homeComany,
            },
            {
              name: translate('employee.employees'),
              href: PATH_DASHBOARD.employee.list,
            },
            { name: translate('employee.new_employee') },
          ]}
        />
        <EmployeeNewEditForm />
      </Container>
    </>
  );
}
