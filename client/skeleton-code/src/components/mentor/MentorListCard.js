import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';

export default function MentorListCard({ mentor }) {
  console.log(mentor);
  // ***
  // * api 구조가 바뀌는대로 고치시면 됩니다.
  const { mentor_seq, user_name } = mentor;

  return (
    <RouterLink to={`/mentor/${mentor_seq}`}>
      <Card>
        {/*

        여기에 개별 카드에 대한 스타일링을 해주시면 됩니다.
        
        */}
        <Box sx={{ pt: '100%', position: 'relative' }}>{user_name}</Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {user_name}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{mentor_seq}</Typography>
          </Stack>
        </Stack>
      </Card>
    </RouterLink>
  );
}
