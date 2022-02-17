import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Divider
} from '@mui/material';
//
import Scrollbar from '../components/Scrollbar';
import { UserListHead } from '../components/_dashboard/profileHistory';
import { getRank } from '../_actions/user_actions';
import { TierImgAvatar } from '../utils/mockImages';

const TABLE_HEAD = [
  { id: 'name', label: 'Rank', alignRight: false },
  { id: 'starttime', label: 'Name', alignRight: false },
  { id: 'role', label: '티어', alignRight: false },
  { id: 'status', label: '경험치', alignRight: false }
];

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

export default function Ranking() {
  // STATE
  const [studyList, setStudyList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // INIT
  const dispatch = useDispatch();
  const getUserist = async () => {
    dispatch(getRank())
      .then((response) => {
        if (response) {
          setStudyList(response.payload.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {}, 3000);
      });
  };

  // RENDER
  useEffect(() => {
    getUserist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLE
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // FORM
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studyList.length) : 0;

  // PAGE
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        멘토 랭킹
      </Typography>
      <Divider sx={{ mt: 5, mb: 5 }} />
      <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} onRequestSort={handleRequestSort} />
                <TableBody>
                  {studyList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { mentorSeq, mentorRank, mentorNickname, tier, mentorExp } = row;
                      return (
                        <TableRow hover key={mentorSeq} tabIndex={-1}>
                          <TableCell component="th" scope="row" padding="3px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <TableCell align="left">{mentorRank + 1}</TableCell>
                            </Stack>
                          </TableCell>
                          <TableCell
                            align="left"
                            variant="contained"
                            component={RouterLink}
                            to={`/mentor/${mentorSeq}`}
                            sx={{ textDecorationLine: 'none', color: 'black', fontWeight: 'bold' }}
                          >
                            {mentorNickname}
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            <Avatar src={TierImgAvatar(tier.tierSeq)} />
                          </TableCell>
                          <TableCell align="left">{mentorExp}</TableCell>
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
            count={studyList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Container>
  );
}
