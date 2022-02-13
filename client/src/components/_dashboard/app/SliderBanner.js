// material
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import { useState } from 'react';
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
    console.log(item);
    return (
      <div
        style={{
          textAlign: 'center',
          background: 'url(https://picsum.photos/2000/400)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          height: '300px',
          width: '100%',
          borderRadius: '40px'
        }}
      >
        <h2>{item.name}</h2>
        <p className="CheckButton">{item.description}</p>
      </div>
    );
  }
  const items = [
    {
      name: 'Random Name #0',
      description: '0 - Probably the most random thing you have ever seen!',
      img: 'https://picsum.photos/2000/400'
    },
    {
      name: 'Random Name #1',
      description: '1 - Probably the most random thing you have ever seen!',
      img: 'https://picsum.photos/2000/400'
    },
    {
      name: 'Random Name #2',
      description: '2- Hello World!',
      img: 'https://picsum.photos/2000/400'
    },
    {
      name: 'Random Name #3',
      description: '3 - Hello World!',
      img: 'https://picsum.photos/2000/400'
    }
  ];
  const handleChange = (cur, prev) => {
    setIndex(cur);
    console.log(cur, prev);
  };
  return (
    <RootStyle>
      <Carousel
        index={index}
        onChange={handleChange}
        interval={5000}
        animation="slide"
        indicators
        stopAutoPlayOnHover
        swipe
        className="my-carousel"
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </RootStyle>
  );
}
