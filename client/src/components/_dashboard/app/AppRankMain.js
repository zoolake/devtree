// material
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(15, 0),
  background: 'url(/static/images/main_rank.gif)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  width: '90%',
  height: '10%'
}));

// ----------------------------------------------------------------------

export default function AppRankMain() {
  return (
    <RootStyle>
      <p
        style={{
          position: 'absolute',
          bottom: '0',
          right: '1em',
          width: '120px',
          padding: '1px',
          color: 'black',
          fontWeight: 'bold',
          fontSize: '40px'
        }}
      >
        RANK
      </p>
    </RootStyle>
  );
}
