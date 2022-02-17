import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import jwtdecode from 'jwt-decode';
//
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  MenuItem,
  FormControl,
  Select,
  TextField
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';
//
import { emailAuth, authCode } from '../../_actions/user_actions';

export default function UserAuthMentor() {
  // STATE
  const [token, setToken] = useState(false);
  const [domain, setDomain] = useState(false);
  const [code, setCode] = useState(null);
  const [email, setEmail] = useState('');

  // INIT
  const dispatch = useDispatch();
  const getToken = () => {
    if (jwtdecode(localStorage.getItem('user')).userRole === 'MENTOR') {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  // RENDER
  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SUBMIT
  const sendEmail = () => {
    const dataToSubmit = {
      // userSeq: jwtdecode(localStorage.getItem('user')).userSeq,
      userEmailId: email,
      userEmailDomain: domain
    };
    dispatch(emailAuth(dataToSubmit))
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
        console.log(err);
      });
  };
  const setAuthCode = async () => {
    const dataToSubmit = {
      enteredCode: code
    };
    await dispatch(authCode(dataToSubmit)).then((response) => {
      if (response) {
        Swal.fire({
          title: '멘토 인증 성공',
          text: '정상적인 사용을 위해 로그아웃 하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('확인', '로그아웃이 완료되었습니다.', 'success');
            localStorage.removeItem('user');
            window.location.reload();
            document.location.assign('/');
          }
        });
      }
    });
  };

  // HANDLE
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };
  const codehandleChange = (event) => {
    setCode(event.target.value);
  };

  // CONDITIONAL
  const showContent = () => {
    if (token) {
      return (
        <Box textAlign="center">
          <Typography variant="h3">
            <CheckIcon sx={{ mr: 1 }} color="primary" />
            멘토 인증되었습니다.
          </Typography>
        </Box>
      );
    }
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ mx: 10, width: '100%' }}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <Typography variant="h4" sx={{ mr: 5 }}>
                이메일
              </Typography>
              <Stack direction="row">
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  id="email-for-mentor-auth"
                  variant="standard"
                />
                <Typography variant="h5">@</Typography>
              </Stack>
              <Select
                id="doami-for-mentor-auth"
                value={domain}
                onChange={handleDomainChange}
                sx={{ width: 200, height: 40 }}
              >
                <MenuItem value="naver">naver.com</MenuItem>
                <MenuItem value="google">gmail.com</MenuItem>
              </Select>
              <Button onClick={sendEmail}>인증 메일 전송</Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="h4" sx={{ mr: 5 }}>
                인증번호
              </Typography>
              <TextField
                onChange={codehandleChange}
                id="filled-basic"
                variant="filled"
                sx={{ width: '49%' }}
              />
              <Button onClick={setAuthCode}>인증번호 확인</Button>
            </Stack>
          </Stack>
        </FormControl>
      </Box>
    );
  };

  // PAGE
  return (
    <Container fixed>
      <Card sx={{ minWidth: 275, minHeight: 350 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14, mb: 10 }} color="primary" gutterBottom>
            멘토 인증
          </Typography>
          {showContent()}
        </CardContent>
      </Card>
    </Container>
  );
}
