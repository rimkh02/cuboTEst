// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  invoice: icon('ic_invoice'),
  dashboard: icon('ic_dashboard'),
  home: icon('ic_home'),
  company: icon('ic_company'),
  employee: icon('ic_employee'),
  advantage: icon('ic_advantage'),
  money: icon('ic_money'),
  reporting: icon('ic_reporting'),
  category: icon('ic_category'),
  history: icon('ic_history'),
};

export const navConfigComapny = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'Home', path: PATH_DASHBOARD.general.homeComany, icon: ICONS.home }],
  },

  // MANAGEMENT
  {
    subheader: 'management',
    items: [
      {
        title: 'Employees',
        path: PATH_DASHBOARD.employee.root,
        icon: ICONS.employee,
      },
      {
        title: 'Advantages',
        path: PATH_DASHBOARD.category.list,
        icon: ICONS.advantage,
      },
      {
        title: 'Categories',
        path: PATH_DASHBOARD.cagnotte.root,
        icon: ICONS.category,
      },
      {
        title: 'Rechargment',
        path: PATH_DASHBOARD.rechargement.root,
        icon: ICONS.money,
      },
    ],
  },

  {
    subheader: 'reporting',
    items: [
      {
        title: 'reporting',
        path: PATH_DASHBOARD.reporting.root,
        icon: ICONS.reporting,
      },

     {
        title: 'Facturation',
        path: PATH_DASHBOARD.facturation.list,
        icon: ICONS.invoice,
      }, 
    ],
  },
  {
    subheader: 'History',
    items: [
      {
        title: 'Transations',
        path: PATH_DASHBOARD.transations.list,
        icon: ICONS.history,
      },
    ],
  },
];
