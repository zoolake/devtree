import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
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

import { getMentoringlist } from '../../_actions/mentor_actions';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'mentoringCreateTime', label: '신청일', alignRight: false },
  { id: 'teamname', label: '팀이름', alignRight: false },
  { id: 'teamtype', label: '팀타입', alignRight: false },
  { id: 'mentoringStartDate', label: '멘토링 날짜', alignRight: false },
  { id: 'mentoringStartTime', label: '멘토링 시간', alignRight: false },
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

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const getProjectList = async () => {
    dispatch(getMentoringlist())
      .then((response) => {
        if (response) {
          console.log(response.payload);
          setProjectList(response.payload);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };
  useEffect(() => {
    getProjectList();
  }, []);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

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
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
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
                        id,

                        teamtype,
                        teamname,
                        mentoringStartDate,
                        mentoringStartTime,

                        mentoringmsg,
                        mentoringState
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">{mentoringCreateTime}</TableCell>
                          <TableCell component="th" scope="row" padding="3px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{teamname}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (teamtype === 'STUDY' && 'warning') ||
                                (teamtype === 'PROJECT' && 'primary')
                              }
                            >
                              {teamtype === 'STUDY' ? <p>STUDY</p> : null}
                              {teamtype === 'PROJECT' ? <p>PROJECT</p> : null}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{mentoringStartDate}</TableCell>
                          <TableCell align="left">{mentoringStartTime}</TableCell>
                          <TableCell align="left">{mentoringmsg}</TableCell>
                          <TableCell align="left">
                            {mentoringState === 'WAIT' ? (
                              <div>
                                <Button>수락</Button>
                                <Button>거절</Button>
                              </div>
                            ) : null}
                            {mentoringState === 'ACCEPT' ? (
                              <div>
                                <Button>대기중</Button>
                              </div>
                            ) : null}
                            {mentoringState === 'ACTIVATE' ? <Button>세션생성</Button> : null}
                            {mentoringState === 'FINISH' ? <Button>완료</Button> : null}
                            {mentoringState}
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
