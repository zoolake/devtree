import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
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
  TablePagination
} from '@mui/material';
// components
import Page from '../Page';
import Label from '../Label';
import Scrollbar from '../Scrollbar';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../_dashboard/profileHistory';
//
import USERLIST from '../../_mocks_/project';
import { getProject } from '../../_actions/user_actions';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: '주제', alignRight: false },
  { id: 'starttime', label: '시작일', alignRight: false },
  { id: 'endtime', label: '종료일', alignRight: false },
  { id: 'role', label: '역할', alignRight: false },
  { id: 'status', label: '상태', alignRight: false }
];

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
    dispatch(getProject())
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
            프로젝트
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
                      const { id, name, role, status, starttime, endtime } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell component="th" scope="row" padding="3px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{starttime}</TableCell>
                          <TableCell align="left">{endtime}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === 'RECRUIT' && 'warning') ||
                                (status === 'FINISH' && 'error') ||
                                'success'
                              }
                            >
                              {status === 'RECRUIT' ? <p>진행전</p> : null}
                              {status === 'FINISH' ? <p>종료</p> : null}
                              {status === 'COMPLETED' ? <p>진행중</p> : null}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
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
