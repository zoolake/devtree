import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import homefill from '@iconify/icons-eva/home-fill';
import starfill from '@iconify/icons-eva/star-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
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
    icon: getIcon(bookOpenFill)
  },
  {
    title: '멘토',
    path: '/mentor',
    icon: getIcon(starfill)
  },
  {
    title: '랭킹',
    path: '/MainPage/ranking',
    icon: getIcon(peopleFill)
  }
];

export default sidebarConfig;
