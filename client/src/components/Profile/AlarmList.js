/* eslint-disable jsx-a11y/alt-text */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Chip,
  Box
} from '@mui/material';
// components
import Page from '../Page';
import Label from '../Label';
import Scrollbar from '../Scrollbar';
import { AlarmListHead } from '../_dashboard/user';
import { getMentoringlist, rejectMentoring, acceptMentoring } from '../../_actions/mentor_actions';
import { setAlarmCheck, getAlarmdata, getAlarmList } from '../../_actions/user_actions';
//
import USERLIST from '../../_mocks_/user';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'NotificationType', label: '타입', alignRight: false },
  { id: 'notificationSendUserName', label: '보내는 사람', alignRight: false },
  { id: 'notificationContent', label: '알림내용', alignRight: false },
  { id: 'isCheck', label: '확인', alignRight: false },
  { id: 'isVerified', label: '시간', alignRight: false }
];

// ----------------------------------------------------------------------

export default function AlarmList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [alarms, getList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const Alarmlistget = () => {
    dispatch(getAlarmList())
      .then((response) => {
        if (response) {
          console.log('alarmlist!');
          console.log(response.payload);
          getList(response.payload);
        }
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {}, 3000);
      });
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const confirmmsg = (event) => {
    console.log(event.target.id);

    dispatch(setAlarmCheck(event.target.id))
      .then((response) => {
        if (response) {
          console.log('읽음으로 체크하기');
        }
      })
      .then(
        dispatch(getAlarmdata(event.target.id)).then((response) => {
          if (response) {
            console.log(response);
            Swal.fire({
              title: '알림 메세지',
              html: `
              ${response.payload.notificationSendUserName}님이 ${response.payload.notificationContent}`,
              width: 600,
              content: '...',
              padding: '3em',
              color: '#12682f',
              background: '#fff',
              confirmButtonColor: '#12682f',
              footer: `${response.payload.notificationSendTime}`,
              backdrop: `
              rgba(167,201,181,0.2)
                no-repeat
              `
            });
          }
        })
      );
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alarms.length) : 0;
  useEffect(() => {
    Alarmlistget();
  }, []);

  return (
    <Page title="User">
      {!alarms && (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              알림내역
            </Typography>
          </Stack>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <AlarmListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={alarms.length}
                  />
                  <TableBody>
                    <TableCell component="th" scope="row" padding="none">
                      {' '}
                    </TableCell>
                    <TableCell align="left"> </TableCell>
                    <TableCell align="left"> 알림이 없습니다.</TableCell>
                    <TableCell align="left"> </TableCell> <TableCell align="left"> </TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        </Container>
      )}
      {alarms && (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              알림내역
            </Typography>
          </Stack>

          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <AlarmListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={alarms.length}
                    numSelected={selected.length}
                  />
                  <TableBody>
                    {alarms
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          notificationSeq,
                          isCheck,
                          notificationSendUserName,
                          notificationSendTime,
                          NotificationType,
                          notificationContent
                        } = row;
                        return (
                          <TableRow hover key={notificationSeq} tabIndex={-1}>
                            <TableCell align="left">
                              {NotificationType == 'STUDY' ? (
                                <Chip label="STUDY" color="error" size="small" />
                              ) : null}{' '}
                              {NotificationType == 'PROJECT' ? (
                                <Chip label="PROJECT" color="info" size="small" />
                              ) : null}
                              {NotificationType == 'MENTORING' ? (
                                <Chip label="MENTORING" color="success" size="small" />
                              ) : null}
                            </TableCell>
                            <TableCell align="left">{notificationSendUserName}</TableCell>
                            <TableCell align="left">
                              <Typography
                                id={notificationSeq}
                                variant="subtitle2"
                                noWrap
                                onClick={confirmmsg}
                              >
                                {notificationContent.substring(0, 10)}...
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              {isCheck && (
                                <Avatar
                                  src="/static/images/mail.png"
                                  sx={{ width: 25, height: 25 }}
                                  variant="square"
                                />
                              )}
                              {!isCheck && (
                                <Avatar
                                  src="/static/images/open-mail.png"
                                  sx={{ width: 25, height: 25 }}
                                  variant="square"
                                />
                              )}
                            </TableCell>
                            <TableCell align="left">{notificationSendTime}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={alarms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      )}
    </Page>
  );
}
