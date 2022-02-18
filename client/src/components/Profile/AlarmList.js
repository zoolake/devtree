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
  CardContent,
  Box
} from '@mui/material';
// components
import Page from '../Page';
import Label from '../Label';
import Scrollbar from '../Scrollbar';
import { AlarmListHead } from '../_dashboard/user';
import { getMentoringlist, rejectMentoring, acceptMentoring } from '../../_actions/mentor_actions';
import { getAlarmdata, getAlarmList } from '../../_actions/user_actions';
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
  // STATE
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [alarms, getAlarms] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // INIT
  const dispatch = useDispatch();
  const makeAlarmList = () => {
    dispatch(getAlarmList())
      .then((response) => {
        if (response) {
          const alarmData = response.payload.data;
          alarmData.sort((a, b) => parseFloat(b.notificationSeq) - parseFloat(a.notificationSeq));
          getAlarms(alarmData);
        }
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {}, 3000);
      });
  };

  // HANDLE
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const confirmmsg = (event) => {
    dispatch(getAlarmdata(event.target.id))
      .then((response) => {
        if (response) {
          Swal.fire({
            title: '알림 메세지',
            html: `${response.payload.data.notificationContent}`,
            width: 600,
            content: '...',
            padding: '3em',
            color: '#12682f',
            background: '#fff',
            confirmButtonColor: '#12682f',
            footer: `${response.payload.data.notificationSendTime}`,
            backdrop: `
              rgba(167,201,181,0.2)
                no-repeat
              `
          });
        }
      })
      .then(() => {
        makeAlarmList();
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {}, 3000);
      });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // RENDER
  useEffect(() => {
    makeAlarmList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITIONAL
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alarms.length) : 0;
  const showContent = () => {
    if (alarms.length > 0)
      return (
        <Container>
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
                  {alarms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      notificationSeq,
                      check,
                      notificationSendUserName,
                      notificationSendTime,
                      notificationType,
                      notificationContent
                    } = row;
                    return (
                      <TableRow hover key={notificationSeq} tabIndex={-1}>
                        <TableCell align="left">
                          {notificationType == 'STUDY' ? (
                            <Chip label="STUDY" color="error" size="small" />
                          ) : null}{' '}
                          {notificationType == 'PROJECT' ? (
                            <Chip label="PROJECT" color="info" size="small" />
                          ) : null}
                          {notificationType == 'MENTORING' ? (
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
                            style={{ cursor: 'pointer' }}
                            color="primary"
                          >
                            {notificationContent.substring(0, 10)}...
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {!check && (
                            <Avatar
                              src="/static/images/mail.png"
                              sx={{ width: 25, height: 25 }}
                              variant="square"
                            />
                          )}
                          {check && (
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
        </Container>
      );
    return (
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="h4">
          <span style={{ color: '#00AB55' }}>알림</span>이 없습니다.
        </Typography>
      </Box>
    );
  };

  // PAGE
  return (
    <Container sx={{ minWidth: 120 }}>
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14, mb: 5 }} color="primary" gutterBottom>
            알림 내역
          </Typography>
          {showContent()}
        </CardContent>
      </Card>
    </Container>
  );
}
