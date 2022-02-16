import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import homefill from '@iconify/icons-eva/home-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
// import personAddFill from '@iconify/icons-eva/person-add-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: '메인',
    path: '/MainPage/app',
    icon: getIcon(homefill)
  },

  // {
  //   title: 'product',
  //   path: '/MainPage/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'blog',
  //   path: '/MainPage/blog',
  //   icon: getIcon(fileTextFill)
  // },
  {
    title: '프로젝트',
    path: '/project',
    icon: getIcon(fileTextFill)
  },
  {
    title: '스터디',
    path: '/study',
    icon: getIcon(fileTextFill)
  },
  {
    title: '멘토',
    path: '/mentor',
    icon: getIcon(fileTextFill)
  },
  {
    title: '랭크',
    path: '/MainPage/ranking',
    icon: getIcon(peopleFill)
  }
];

export default sidebarConfig;
