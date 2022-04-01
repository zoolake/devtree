// material
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  background: 'url(/static/images/main_mentoring.gif)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  width: '90%',
  height: '100%'
}));

// ----------------------------------------------------------------------

export default function AppMentorMain() {
  return (
    <RootStyle>
      <p
        style={{
          position: 'absolute',
          bottom: '0',
          right: '4em',
          width: '120px',
          padding: '4px',
          color: 'black',
          fontWeight: 'bold',
          fontSize: '30px'
        }}
      >
        MENTORING
      </p>
    </RootStyle>
  );
}
