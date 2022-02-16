import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// material
import { Divider, Box, CardHeader } from '@mui/material';
// utils
import { detailUser } from '../../_actions/user_actions';

// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function MyProfile() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div>
      <CardHeader title="멘토링 가능 시간" />
      <Box sx={{ p: 3 }}>
        멘토링 가능 시간
        <Divider />
      </Box>
    </div>
  );
}
