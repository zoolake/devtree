import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import jwtdecode from 'jwt-decode';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// material
import { styled } from '@mui/material/styles';
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Card,
  Grid,
  CardContent,
  Button,
  Stack
} from '@mui/material';
import {
  getReservedList,
  getCheckedtimeList,
  saveMentoringTime
} from '../../../_actions/mentor_actions';

// eslint-disable-next-line prefer-const
let testdata = [
  {
    time: '00:00',
    reserved: false,
    checked: false
  },
  {
    time: '02:00',
    reserved: false,
    checked: false
  },
  {
    time: '04:00',
    reserved: false,
    checked: false
  },
  {
    time: '06:00',
    reserved: false,
    checked: false
  },
  {
    time: '08:00',
    reserved: false,
    checked: false
  },
  {
    time: '10:00',
    reserved: false,
    checked: false
  },
  {
    time: '12:00',
    reserved: false,
    checked: false
  },
  {
    time: '14:00',
    reserved: false,
    checked: false
  },
  {
    time: '16:00',
    reserved: false,
    checked: false
  },
  {
    time: '18:00',
    reserved: false,
    checked: false
  },
  {
    time: '20:00',
    reserved: false,
    checked: false
  },
  {
    time: '22:00',
    reserved: false,
    checked: false
  }
];

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

export default function Week1({ week, day, date }) {
  console.log(date);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [times, setTime] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
    console.log(checkedInputs);
  };

  const MySwal = withReactContent(Swal);

  const getCheckedTime = () => {
    const dataToSubmit = {
      mentorDate: date,
      mentorSeq: jwtdecode(localStorage.getItem('user')).userSeq
    };
    dispatch(getCheckedtimeList(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log(response);
          console.log('test!><');
          const filter1 = response.payload.data;
          // eslint-disable-next-line guard-for-in
          for (const i in filter1) {
            const hours = filter1[i].substring(0, 4);
            //     setCheckedInputs(hours);
          }

          console.log(filter1);
          setCheckedInputs(filter1);
          // setCheckedInputs(filter1);
          // eslint-disable-next-line guard-for-in
          for (const i in filter1) {
            const hour = filter1[i].substring(0, 2);
            const hournum = Number(hour / 2);
            console.log(checkedInputs);
            testdata[hournum].checked = true;
          }
        }
        setTime(testdata);
        console.log(times);
      })
      .catch((err) => {
        console.log('error!T.T');
        console.log(err);
        setTimeout(() => {}, 3000);
      });
  };

  const getReservedTeam = () => {
    const dataToSubmit = {
      mentorDate: date,
      mentorSeq: jwtdecode(localStorage.getItem('user')).userSeq
    };
    dispatch(getReservedList(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log('????????????', response.payload.data);
          const filter2 = response.payload.data;
          // eslint-disable-next-line guard-for-in
          for (const i in filter2) {
            const hour = filter2[i].substring(0, 2);
            const hournum = Number(hour / 2);
            testdata[hournum].reserved = true;
          }
        }
        setTime(testdata);
      })
      .catch((err) => {
        console.log('????????? ??? ??????');
        setTimeout(() => {}, 3000);
      });
  };

  const submit = async () => {
    console.log(checkedInputs);
    const dataToSubmit = {
      mentorDate: date,
      mentorTime: checkedInputs
    };
    await dispatch(saveMentoringTime(dataToSubmit))
      .then((response) => {
        if (response) {
          Swal.fire('??????', '?????? ????????? ?????????????????????.', 'success').then(() => {});
        }
      })
      .catch((err) => {
        setTimeout(() => {
          Swal.fire({
            icon: 'error',
            title: '??????',
            text: '????????? ????????? ?????????????????????.'
          });
        }, 3000);
      });
  };

  useEffect(() => {
    console.log('??????!');
    getCheckedTime();
    getReservedTeam();
  }, [times]);

  return (
    <Grid item xs={0} sm={0} md={0}>
      <CardContent sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '-20px' }}>
        {day}??? ?????? ?????? ??????
      </CardContent>
      <CardContent>
        {' '}
        <ScrollMenu>
          <FormControl sx={{ padding: '20px' }}>
            <FormLabel sx={{ fontWeight: 'bold' }}>?????? ??????</FormLabel>

            <Stack direction="row">
              {times.map((post, index) => (
                // eslint-disable-next-line react/jsx-key
                <FormControlLabel
                  disabled={post.reserved}
                  control={<Checkbox defaultChecked={post.checked} />}
                  onChange={(e) => {
                    changeHandler(e.currentTarget.checked, post.time);
                  }}
                  value={post.time}
                  label={post.time}
                />
              ))}
            </Stack>
          </FormControl>{' '}
        </ScrollMenu>
      </CardContent>

      <Button onClick={submit}>????????????</Button>
    </Grid>
  );
}
