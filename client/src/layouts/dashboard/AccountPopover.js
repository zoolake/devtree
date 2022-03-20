import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import {
  Button,
  Box,
  Link,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
  Stack
} from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import account from '../../_mocks_/account';

const MENU_OPTIONS_SIGNED = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/MainPage/profile'
  }
];

const MENU_OPTIONS_GUEST = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'SignUp',
    icon: personFill,
    linkTo: '/Register'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  let btn;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
    document.location.assign('/');
  };
  if (localStorage.getItem('user')) {
    btn = (
      <Button fullWidth color="inherit" variant="outlined" onClick={logout}>
        Logout
      </Button>
    );
  } else {
    btn = (
      <Button fullWidth color="inherit" variant="outlined">
        <Link underline="none" component={RouterLink} to="/login">
          Login
        </Link>
      </Button>
    );
  }
  let MENU_OPTIONS;
  if (localStorage.getItem('user')) {
    MENU_OPTIONS = MENU_OPTIONS_SIGNED;
  } else {
    MENU_OPTIONS = MENU_OPTIONS_GUEST;
  }
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Menu
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>{btn}</Box>
      </MenuPopover>
    </>
  );
}
