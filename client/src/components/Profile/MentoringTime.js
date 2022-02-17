// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { MentoringDaySelect, MentoringList } from '.';

export default function MentoringTime() {
  return (
    <Card>
      <CardHeader title="멘토링 가능 시간" />
      <Box sx={{ p: 3 }}>
        <MentoringDaySelect />
      </Box>
    </Card>
  );
}
