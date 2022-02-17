import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// material
import jwtdecode from 'jwt-decode';
import { Divider, Box, CardHeader, Button, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
// utils
import { setMentor } from '../../_actions/mentor_actions';
import { emailAuth, authCode } from '../../_actions/user_actions';
// ----------------------------------------------------------------------
export default function MyProfile() {
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(false);
  const [users, setUsers] = useState(null);
  const [domain, setDomain] = useState(false);
  const [userid, setUserid] = useState(false);
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();
  const sendEmail = () => {
    const dataToSubmit = {
      userSeq: jwtdecode(localStorage.getItem('user')).userSeq,
      userEmailId: userid,
      userEmailDomain: domain
    };
    console.log(dataToSubmit);
    dispatch(emailAuth(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log(response);
          console.log('메일 테스트');
          setVisible(true);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };

  const setAuthCode = () => {
    const dataToSubmit = {
      enteredCode: code
    };
    dispatch(authCode(dataToSubmit)).then((response) => {
      if (response) {
        console.log(response);
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

  const handleChange = (event) => {
    setDomain(event.target.value);
  };

  const idhandleChange = (event) => {
    setUserid(event.target.value);
  };

  const codehandleChange = (event) => {
    setCode(event.target.value);
  };

  const getToken = () => {
    if (jwtdecode(localStorage.getItem('user')).userRole === 'MENTOR') {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      {!token && (
        <Box sx={{ minWidth: 120 }}>
          <CardHeader title="멘토를 인증해주세요" />
          <FormControl>
            <InputLabel id="demo-simple-select-label">domain</InputLabel>
            <Stack>
              {!visible && (
                <div>
                  <TextField onChange={idhandleChange} id="outlined-basic" variant="outlined" />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={domain}
                    label="이메일 인증"
                    onChange={handleChange}
                  >
                    <MenuItem value="naver">naver.com</MenuItem>
                    <MenuItem value="google">gmail.com</MenuItem>
                  </Select>
                  <Button onClick={sendEmail}>인증 보내기</Button>
                </div>
              )}
              {visible && (
                <div>
                  <TextField
                    onChange={codehandleChange}
                    id="filled-basic"
                    label="인증번호"
                    variant="filled"
                  />
                  <Button onClick={setAuthCode}>인증번호 전송</Button>
                </div>
              )}
            </Stack>
          </FormControl>
        </Box>
      )}
      {token && (
        <Box sx={{ minWidth: 120 }}>
          <CardHeader title="멘토 인증이 완료되었습다." />
        </Box>
      )}
    </div>
  );
}
