import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// locales
import { useLocales } from 'src/locales';
//redux
import { useSelector } from 'src/redux/store';
// sections
import EditProfilCompanyForm from 'src/sections/@dashboard/settings/comany-general';
import InfosPaymentPage from 'src/sections/@dashboard/settings/payment-info';
import Collabortors from 'src/sections/@dashboard/settings/Collaborators';
import OffrePage from 'src/sections/@dashboard/settings/offre';
import AccountChangePasswordPage from 'src/sections/@dashboard/settings/account-change-password';
import AccountGeneralPage from 'src/sections/@dashboard/settings/account-general';
// ----------------------------------------------------------------------

export default function SettingPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  const [currentTab, setCurrentTab] = useState('profile');
  const { user } = useSelector((state) => state.auth);

  const TABADMIN = [
    {
      value: 'profile',
      label: translate('profile'),
      icon: <Iconify icon="ic:round-account-box" />,
      component: (
        <Stack spacing={3}>
          <AccountGeneralPage />
          <EditProfilCompanyForm />
        </Stack>
      ),
    },

    {
      value: 'change_password',
      label: translate('settings.change_password'),
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePasswordPage />,
    },
    {
      value: 'collaborators',
      label: translate('settings.collaborators'),
      icon: <Iconify icon="carbon:collaborate" />,
      component: <Collabortors />,
    },
    {
      value: 'offre',
      label: translate('settings.offer.offer'),
      icon: <Iconify icon="mdi:offer" />,
      component: <OffrePage />,
    },
    {
      value: 'payment',
      label: translate('settings.payment'),
      icon: <Iconify icon="fluent:payment-20-filled" />,
      component: <InfosPaymentPage />,
    },
  ];

  const TABMANAGER = [
    {
      value: 'profile',
      label: translate('profile'),
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneralPage />,
    },

    {
      value: 'change_password',
      label: translate('settings.change_password'),
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePasswordPage />,
    },

    {
      value: 'offre',
      label: translate('settings.offer.offer'),
      icon: <Iconify icon="mdi:offer" />,
      component: <OffrePage />,
    },
  ];
  return (
    <>
      <Helmet>
        <title> {translate('settings.settings')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('settings.settings')}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.homeComany },
            {
              name: translate('settings.settings'),
              href: PATH_DASHBOARD.general.setting,
            },
            { name: translate(currentTab) },
          ]}
        />
        {user.accountType === 'ADMIN' ? (
          <>
            <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
              {TABADMIN.map((tab) => (
                <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
              ))}
            </Tabs>
            {TABADMIN.map(
              (tab) =>
                tab.value === currentTab && (
                  <Box key={tab.value} sx={{ mt: 5 }}>
                    {tab.component}
                  </Box>
                )
            )}
          </>
        ) : (
          <>
            <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
              {TABMANAGER.map((tab) => (
                <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
              ))}
            </Tabs>
            {TABMANAGER.map(
              (tab) =>
                tab.value === currentTab && (
                  <Box key={tab.value} sx={{ mt: 5 }}>
                    {tab.component}
                  </Box>
                )
            )}
          </>
        )}
      </Container>
    </>
  );
}
