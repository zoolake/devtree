import { Container } from '@mui/material';
//
import { ProjectCreationForm } from '../../components/_dashboard/projects';

export default function ProjectCreate() {
  return (
    <Container sx={{ mt: 10 }}>
      <h1>프로젝트 생성</h1>
      <ProjectCreationForm />
    </Container>
  );
}
