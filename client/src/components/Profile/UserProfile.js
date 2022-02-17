import { useState } from 'react';
//
import { Container, Button, Card, Box } from '@mui/material';
//
import { GetUserProfile, UpdateUserProfileForm } from '.';

export default function UserProfile() {
  // STATE
  const [isUpdate, setIsUpdate] = useState(false);

  // HANDLE
  const handleChange = () => {
    setIsUpdate(!isUpdate);
  };

  // CONDITIONAL
  if (!isUpdate)
    return (
      <Container>
        <Card sx={{ minWidth: 275 }}>
          <GetUserProfile />
          <Box textAlign="right">
            <Button variant="contained" onClick={handleChange} sx={{ m: 3 }} size="large">
              수정하기
            </Button>
          </Box>
        </Card>
      </Container>
    );
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <UpdateUserProfileForm setIsUpdate={setIsUpdate} isUpdate={isUpdate} />
      </Card>
    </Container>
  );
}
