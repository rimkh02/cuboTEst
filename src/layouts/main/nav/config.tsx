// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },

  {
    title: 'About_us',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.about,
  },
];

export default navConfig;
