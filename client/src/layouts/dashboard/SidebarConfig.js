import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import homefill from '@iconify/icons-eva/home-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: '메인',
    path: '/Mainpage/app',
    icon: getIcon(homefill)
  },
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
