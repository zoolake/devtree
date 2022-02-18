import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Grid, Card, Button, Container, Stack, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Page from '../../components/Page';
import { WeekdayReserv } from '../../components/_dashboard/mentor';
import {
  Week1,
  Week2,
  Week3,
  Week4,
  Week5,
  Week6,
  Week7
} from '../../components/_dashboard/mentor/Week';

function MentoringReservation() {
  const now = new Date();
  const todayWeak = now.getDay() + 1;
  const today = now.getDate() + 1;
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const year = now.getFullYear();
  const month = `0${now.getMonth() + 1}`.slice(-2);
  const day = `0${now.getDate()}`.slice(-2);
  console.log(now.getDate() + 3);
  const dateString = `${year}-${month}-${day}`;
  console.log(dateString);
  const [daylist, setDaylist] = useState([]);
  const [weeklist, setWeeklist] = useState([]);
  const [weeknum, setWeeknum] = useState([]);
  const [value, setValue] = useState('1');

  function addDays(date, days) {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days);
    const year = clone.getFullYear();
    const month = `0${clone.getMonth() + 1}`.slice(-2);
    const day = `0${clone.getDate()}`.slice(-2);
    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }

  const getAllweak = (todayWeek) => {
    const strWeak = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklists = [];
    const weekday = [];
    weeklists[0] = strWeak[todayWeek];
    weekday[0] = todayWeek;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 6; i++) {
      // eslint-disable-next-line no-plusplus
      todayWeek++;
      if (todayWeek > 6) {
        todayWeek = 0;
        weeklists[i] = strWeak[todayWeek];
        weekday[i] = todayWeek;
      } else {
        weeklists[i] = strWeak[todayWeek];
        weekday[i] = todayWeek;
      }
    }
    setWeeklist(weeklists);
    setWeeknum(weekday);
  };

  const getAlldate = (today, lastday) => {
    const dates = [];

    dates[0] = today;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 6; i++) {
      // eslint-disable-next-line no-plusplus
      today++;
      if (today > lastday) {
        today = 1;
        dates[i] = today;
      } else {
        dates[i] = today;
      }
    }
    setDaylist(dates);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllweak(todayWeak);
    getAlldate(today, lastday);
  }, []);

  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography sx={{ color: '#545b56' }} variant="h4" gutterBottom>
            멘토링 예약
          </Typography>
        </Stack>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label={`${weeklist[0]} / ${daylist[0]}일`} value="1" />
                <Tab label={`${weeklist[1]} / ${daylist[1]}일`} value="2" />
                <Tab label={`${weeklist[2]} / ${daylist[2]}일`} value="3" />
                <Tab label={`${weeklist[3]} / ${daylist[3]}일`} value="4" />
                <Tab label={`${weeklist[4]} / ${daylist[4]}일`} value="5" />
                <Tab label={`${weeklist[5]} / ${daylist[5]}일`} value="6" />
                <Tab label={`${weeklist[6]} / ${daylist[6]}일`} value="7" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={8}>
                  <Week1 week={weeknum[0]} day={daylist[0]} date={addDays(now, 1)} />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid item xs={12} md={6} lg={8}>
                <Week2 week={weeknum[1]} day={daylist[1]} date={addDays(now, 2)} />
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Grid item xs={12} md={6} lg={8}>
                <Week3 week={weeknum[2]} day={daylist[2]} date={addDays(now, 3)} />
              </Grid>
            </TabPanel>
            <TabPanel value="4">
              <Grid item xs={12} md={6} lg={8}>
                <Week4 week={weeknum[3]} day={daylist[3]} date={addDays(now, 4)} />
              </Grid>
            </TabPanel>
            <TabPanel value="5">
              <Grid item xs={12} md={6} lg={8}>
                <Week5 week={weeknum[4]} day={daylist[4]} date={addDays(now, 5)} />
              </Grid>
            </TabPanel>
            <TabPanel value="6">
              <Grid item xs={12} md={6} lg={8}>
                <Week6 week={weeknum[5]} day={daylist[5]} date={addDays(now, 6)} />
              </Grid>
            </TabPanel>
            <TabPanel value="7">
              <Grid item xs={12} md={6} lg={8}>
                <Week7 week={weeknum[6]} day={daylist[6]} date={addDays(now, 7)} />
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
export default MentoringReservation;
