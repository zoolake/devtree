// material
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  background: 'url(/static/images/main_project.gif)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  width: '100%',
  height: '100%'
}));

// ----------------------------------------------------------------------

export default function AppProjectMain() {
  return (
    <RootStyle>
      <p
        style={{
          position: 'absolute',
          bottom: '0',
          right: '2em',
          width: '120px',
          padding: '4px',
          color: 'black',
          fontWeight: 'bold',
          fontSize: '40px'
        }}
      >
        PROJECT
      </p>
    </RootStyle>
  );
}
