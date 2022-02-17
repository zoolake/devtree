import { Container } from '@mui/material';
//
import { StudyCreationForm } from '../../components/_dashboard/study';

export default function StudyCreate() {
  return (
    <Container sx={{ mt: 10 }}>
      <h1>스터디 생성</h1>
      <StudyCreationForm />
    </Container>
  );
}
