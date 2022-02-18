// material
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 0),
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  width: '100%',
  height: '100%'
}));

// ----------------------------------------------------------------------

export default function AppRankMain() {
  const [index, setIndex] = useState([]);
  function Item({ item }) {
    return (
      <div
        style={{
          backgroundRepeat: 'no-repeat',
          height: '500px',
          background: `url(${item.img})`,
          width: '100%',
          borderRadius: '40px',
          boxShadow: 30
        }}
      >
        {' '}
        {}
      </div>
    );
  }
  const items = [
    {
      img: '/static/images/banner/devtree3.gif'
    }
  ];
  const handleChange = (cur, prev) => {
    setIndex(items);
  };

  useEffect(() => {
    setIndex(items);
    setIndex(0);
    setIndex(1);
    setIndex(2);
    setIndex(3);
  }, []);
  return (
    <RootStyle>
      <Carousel animation="slide" onChange={handleChange}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </RootStyle>
  );
}
