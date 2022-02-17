import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import { useInterval } from 'react-use';
import Swal from 'sweetalert2';
import 'moment/locale/ko';
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
  TablePagination
} from '@mui/material';
// components
import Page from '../Page';
import Label from '../Label';
import Scrollbar from '../Scrollbar';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../_dashboard/profileHistory';

import {
  getMentoringlist,
  rejectMentoring,
  acceptMentoring,
  changeState
} from '../../_actions/mentor_actions';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'mentoringCreateTime', label: '신청일', alignRight: false },
  { id: 'teamname', label: '팀이름', alignRight: false },
  { id: 'teamtype', label: '팀타입', alignRight: false },
  { id: 'mentoringStartDate', label: '멘토링 일정', alignRight: false },
  { id: 'mentoringmsg', label: '신청 메세지', alignRight: false },
  { id: 'mentoringState', label: '상태', alignRight: false }
];
const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log('nowTime');
console.log(nowTime);
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MentoringList() {
  const [seconds, setSeconds] = useState(Date.now());
  const [projectList, setProjectList] = useState([]);
  const getMentoringLists = async () => {
    dispatch(getMentoringlist())
      .then((response) => {
        if (response) {
          console.log('멘토링신청리스트');
          console.log(response);
          const sortdata = response.payload.data;
          sortdata.sort((a, b) => parseFloat(b.mentoringSeq) - parseFloat(a.mentoringSeq));
          console.log('sort가 완료되었습니다><', sortdata);
          setProjectList(sortdata);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };
  useInterval(() => {
    setSeconds(Date.now());
  }, 1000);

  const startTime = new Date('2022-02-14T18:00:00');
  const nowTimeFormat = new Date(seconds);

  useEffect(() => {
    getMentoringLists();
  }, []);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = projectList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const accept = (event) => {
    const dataToSubmit = {
      mentoringSeq: event.target.id,
      responseType: 'ACCEPT'
    };
    console.log(dataToSubmit);
    Swal.fire({
      title: '멘토링 수락',
      text: '멘토링을 수락하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(acceptMentoring(dataToSubmit))
          .then((response) => {
            console.log('멘토링 수락');
            if (response) {
              console.log(response.payload.data);
            }
          })
          .catch((err) => {
            setTimeout(() => {}, 3000);
          });
        Swal.fire('수락', '수락이 완료되었습니다.', 'success');
        getMentoringLists();
      }
    });
  };
  const reject = (event) => {
    const dataToSubmit = {
      mentoringSeq: event.target.id,
      responseType: 'REJECT'
    };
    Swal.fire({
      title: '멘토링 거절',
      text: '멘토링을 거절하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectMentoring(dataToSubmit))
          .then((response) => {
            console.log('멘토링 거절');
            if (response) {
              console.log(response.payload);
            }
          })
          .catch((err) => {
            setTimeout(() => {}, 3000);
          });
        Swal.fire('거절', '거절이 완료되었습니다.', 'success');
        getMentoringLists();
      }
    });
  };
  const sessionOpen = (event) => {
    const dataToSubmit = {
      mentoringSeq: event.target.id
    };
    dispatch(changeState(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log(response);
          localStorage.removeItem('mentoringSeq');
          localStorage.setItem('mentoringSeq', event.target.id);
          document.location.assign(`/session/join`);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };

  const sessionEnter = (event) => {
    console.log();
    localStorage.removeItem('mentoringSeq');
    localStorage.setItem('mentoringSeq', event.target.id);
    document.location.assign(`/session/join`);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectList.length) : 0;
  const filteredUsers = applySortFilter(projectList, getComparator(order, orderBy), filterName);
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            멘토링 신청 리스트
          </Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        mentoringCreateTime,
                        mentoringSeq,
                        teamType,
                        teamName,
                        mentoringStartDate,
                        mentoringStartTime,
                        mentoringApplyComment,
                        mentoringState
                      } = row;
                      const time = new Date(`${mentoringStartDate}T${mentoringStartTime}`);

                      return (
                        <TableRow hover key={mentoringSeq} tabIndex={-1}>
                          <TableCell align="left">
                            {`${mentoringCreateTime}`.substr(0, 19)}
                          </TableCell>
                          <TableCell component="th" scope="row" padding="3px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{teamName}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (teamType === 'STUDY' && 'warning') ||
                                (teamType === 'PROJECT' && 'primary')
                              }
                            >
                              {teamType === 'STUDY' ? <p>STUDY</p> : null}
                              {teamType === 'PROJECT' ? <p>PROJECT</p> : null}
                            </Label>
                          </TableCell>
                          <TableCell align="left">
                            {mentoringStartDate} {`${mentoringStartTime}`.substr(0, 5)}
                          </TableCell>
                          <TableCell align="left">{mentoringApplyComment}</TableCell>
                          <TableCell align="left">
                            {mentoringState === 'WAIT' ? (
                              <div>
                                <Button id={mentoringSeq} onClick={accept}>
                                  수락
                                </Button>
                                <Button id={mentoringSeq} onClick={reject}>
                                  거절
                                </Button>
                              </div>
                            ) : null}
                            {mentoringState === 'ACCEPT' ? (
                              <div>
                                {time - nowTimeFormat > 0 ? (
                                  <>
                                    <Moment fromNow>{time}</Moment>
                                    &nbsp;멘토링
                                  </>
                                ) : (
                                  <Button id={mentoringSeq} onClick={sessionOpen}>
                                    세션 생성하기
                                  </Button>
                                )}
                              </div>
                            ) : null}
                            {mentoringState === 'ACTIVATE' ? (
                              <Button id={mentoringSeq} onClick={sessionEnter}>
                                세션입장
                              </Button>
                            ) : null}
                            {mentoringState === 'FINISH' ? <Button>완료</Button> : null}
                          </TableCell>
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
            count={projectList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
