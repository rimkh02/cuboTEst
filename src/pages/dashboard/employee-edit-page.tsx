import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import { Container, CircularProgress, Box, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmployeeNewEditForm from 'src/sections/@dashboard/employees/employe-new-edit-form';
// locales
import { useLocales } from 'src/locales';
//redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getInfoEmployee } from 'src/redux/slices/employee';
import EmployeePasswordForm from 'src/sections/@dashboard/employees/employe-change-password-form';

// ----------------------------------------------------------------------

export default function EmployeeEditPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { employee, isLoading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getInfoEmployee({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title> {translate('employee.employees')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('employee.edit_employee')}
          links={[
            {
              name: translate('Dashboard'),
              href: PATH_DASHBOARD.general.homeComany,
            },
            {
              name: translate('employee.employees'),
              href: PATH_DASHBOARD.employee.list,
            },
            { name: employee?.employee?.firstName },
          ]}
        />
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
              width: '100%',
            }}
          >
            <CircularProgress size={40} color={'primary'} />
          </Box>
        ) : (
          <> {employee && <Stack spacing={4}>
          <EmployeeNewEditForm isEdit currentEmployee={employee} /> 
         {/* <EmployeePasswordForm  /> */}
          </Stack> }
          </>
        )}
      </Container>
    </>
  );
}
