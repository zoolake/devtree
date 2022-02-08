import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
// import personAddFill from '@iconify/icons-eva/person-add-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Main',
    path: '/MainPage/app',
    icon: getIcon(pieChart2Fill)
  },

  {
    title: 'product',
    path: '/MainPage/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/MainPage/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'project',
    path: '/project',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'study',
    path: '/study',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'mentor',
    path: '/mentor',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'user',
    path: '/MainPage/user',
    icon: getIcon(peopleFill)
  }
];

export default sidebarConfig;
