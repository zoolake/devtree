import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import jwtdecode from 'jwt-decode';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  // Button,
  Drawer,
  Typography,
  Avatar
  // Stack
} from '@mui/material';
// components
import Logo from '../../components/Logo_white';

import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import { RoleImgAvatar } from '../../utils/mockImages';
import './App.css';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
let token = localStorage.getItem('user') || '로그인 하기';
let a;
if (localStorage.getItem('user')) {
  token = `${jwtdecode(localStorage.getItem('user')).sub}님`;
  a = '/profile/menu';
} else {
  a = '/login';
}
const RootStyle = styled('div')(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.up('lg')]: { flexShrink: 0, width: DRAWER_WIDTH }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  let avatarname = '';
  if (localStorage.getItem('user')) {
    avatarname = jwtdecode(localStorage.getItem('user')).userRole;
  } else {
    avatarname = 'GUSET';
  }
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('user')]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        padding: '10px',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          // backgroundColor: '#C2DABC',
          background: 'url(/static/images/sidebar6.png)'
          //          ShadowRoot: '30'
        }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/Mainpage/app" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to={a}>
          <AccountStyle>
            <Avatar src={RoleImgAvatar(avatarname)} />
            <Box sx={{ ml: 2, width: '75%' }}>
              {avatarname === 'MENTOR' && <div className="SideName">멘토</div>}
              {avatarname === 'USER' && <div className="SideName">일반유저</div>}
              <Typography
                variant="subtitle2"
                sx={{ color: 'text.primary', fontSize: '20px' }}
                noWrap
              >
                {token}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <NavSection navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              borderRadius: '30px',
              margin: '10px'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          elevation="0"
          PaperProps={{
            sx: {
              elevation: 0,
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
