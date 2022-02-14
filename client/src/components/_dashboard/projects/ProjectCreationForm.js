import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//
import jwtdecode from 'jwt-decode';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Button, FormControl, InputLabel, NativeSelect, Stack } from '@mui/material';
//
import { createProject, getTechList, getPositionList } from '../../../_actions/project_actions';
import SelectPositionCnt from '../../team/SelectPositionCnt';

export default function ProjectCreationForm() {
  // STATE
  // 기술스택
  const [allTechList, setAllTech] = useState([]);
  const [myTechList, setMyTech] = useState([]);
  const [selectedTech, setSelectedTech] = useState('');
  // 포지션
  const [allPositionList, setAllPosition] = useState([]);
  const [myPositionList, setMyPosition] = useState([]);
  const [sendingPositionList, setsendingPositionList] = useState([]);
  const [selectedPos, setSelectedPos] = useState('');
  // 입력 조건
  const RegisterSchema = Yup.object().shape({
    teamName: Yup.string()
      .required('프로젝트 제목은 필수 값 입니다.')
      .min(5, '이름은 5자 이상이여야 합니다.')
      .max(20, '이름은 20자 이하이여야 합니다.'),
    teamDesc: Yup.string()
      .required('프로젝트 설명은 필수 값 입니다.')
      .min(10, '프로젝트 설명은 10자 이상이여야 합니다.')
  });

  // INIT
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      teamManagerSeq: '',
      teamName: '',
      teamDesc: '',
      teamState: '',
      teamType: '',
      teamTech: [],
      teamPosition: []
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // 프로젝트 생성시 요청할 데이터
        const dataToSubmit = {
          teamManagerSeq: jwtdecode(localStorage.getItem('user')).userSeq,
          teamName: values.teamName,
          teamDesc: values.teamDesc,
          teamState: 'RECRUIT', // RECRUIT, COMPLETED, FINISH
          teamType: 'PROJECT', // STUDY, PROJECT
          teamTech: myTechList.map((tech) => tech.techSeq),
          teamPosition: sendingPositionList
        };
        // 프로젝트 생성하기
        const createPjt = async () => {
          await dispatch(createProject(dataToSubmit))
            .then((response) => {
              console.log(response, '프로젝트 생성 성공');
            })
            .catch((error) => {
              console.log(dataToSubmit);
              console.log(error, '프로젝트 생성 실패');
            });
        };
        createPjt();
        setSubmitting(false);
      }, 500);
    }
  });
  const SetOption = async () => {
    // 기술스택 리스트 불러오기
    await dispatch(getTechList())
      .then((response) => {
        const techData = response.payload.data.data;
        console.log(techData, '기술스택 리스트 불러오기 성공');
        setAllTech(techData);
      })
      .catch((error) => {
        console.log(error, '기술스택 리스트 불러오기 실패');
      });
    // 포지션 리스트 불러오기
    await dispatch(getPositionList())
      .then((response) => {
        const positionData = response.payload.data.data;
        console.log(positionData, '포지션 리스트 불러오기 성공');
        setAllPosition(positionData);
      })
      .catch((error) => {
        console.log(error, '포지션 리스트 불러오기 실패');
      });
  };

  // RENDER
  useEffect(() => {
    SetOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLE
  const handleChange = (event, type) => {
    if (type === 'tech') {
      setSelectedTech(event.target.value);
      if (myTechList.includes(findOrigin(allTechList, 'techName', event.target.value))) {
        return;
      }
      setMyTech([...myTechList, findOrigin(allTechList, 'techName', event.target.value)]);
    } else {
      setSelectedPos(event.target.value);
      if (
        myPositionList.includes(
          findOrigin(allPositionList, 'detailPositionName', event.target.value)
        )
      ) {
        return;
      }
      setMyPosition([
        ...myPositionList,
        findOrigin(allPositionList, 'detailPositionName', event.target.value)
      ]);
    }
  };
  const handlePositionCntChange = (value, pos) => {
    setsendingPositionList([
      ...sendingPositionList,
      {
        position: findOrigin(allPositionList, 'detailPositionName', pos),
        positionRecruitCnt: value
      }
    ]);
  };

  // const getPositionData = useCallback(() => {
  //   const date = `${myPositionList}-${myPositionList.toString().padStart(2, '0')}`;
  //   console.log(date);
  // }, [searchYear, searchMonth]);
  // handle Tech Change
  // const handleTechs = useCallback(
  //   (inputValue, { action, removedValue }) => {
  //     switch (action) {
  //       case 'remove-value': // delete with 'x'
  //         setMyTech(orderOptions(myTechList.filter((tech) => tech !== removedValue)));
  //         return;
  //       case 'pop-value': {
  //         // delete with backspace
  //         if (removedValue.isFixed) {
  //           setMyTech(orderOptions([...inputValue, removedValue]));
  //         }
  //         return;
  //       }
  //       case 'clear': // clear button is clicked
  //         setMyTech(myTechList.filter((v) => v.isFixed));
  //         return;
  //       case 'select-option': {
  //         setMyTech(inputValue.map((each) => each.value));
  //         return;
  //       }
  //       default:
  //     }
  //     setTechValue(inputValue);
  //     // console.log(techValue);
  //   },
  //   [myTechList, orderOptions]
  // );

  // handle Position Change
  // const handlePositions = useCallback(
  //   (inputValue, { action, removedValue }) => {
  //     switch (action) {
  //       case 'remove-value': // delete with 'x'
  //         setMyPosition(orderOptions(myPositionList.filter((tech) => tech !== removedValue)));
  //         return;
  //       case 'pop-value': // delete with backspace
  //         if (removedValue.isFixed) {
  //           setMyPosition(orderOptions([...inputValue, removedValue]));
  //           return;
  //         }
  //         break;
  //       case 'clear': // clear button is clicked
  //         setMyPosition(myPositionList.filter((v) => v.isFixed));
  //         return;
  //       case 'select-option': {
  //         const newInput = inputValue.reduce((total, data) => {
  //           const ret = [
  //             ...total,
  //             {
  //               position: {
  //                 detailPositionName: data.label,
  //                 positionName: data.positionName
  //               },
  //               positionRecruitCnt: 10
  //             }
  //           ];
  //           return ret;
  //         }, []);
  //         console.log(newInput);
  //         setMyPosition(newInput);
  //         return;
  //       }
  //       default:
  //     }
  //     setPositionValue(inputValue);
  //     // console.log(positionValue);
  //   },
  //   [myPositionList, orderOptions]
  // );

  // const handleCallback = (childData) => {
  //   console.log('childData', childData[0]);
  //   const childkey = childData[0].position.position.detailPositionName;
  //   if (myPositionCnt.length === 0) {
  //     setMyPositionCnt([
  //       ...myPositionCnt,
  //       {
  //         position: childData[0].position.position,
  //         positionRecruitCnt: childData[0].cnt
  //       }
  //     ]);
  //     console.log('없음');
  //   } else if (
  //     myPositionCnt.map((position) => position.position.detailPositionName).includes(childkey)
  //   ) {
  //     myPositionCnt[
  //       myPositionCnt.map((position) => position.position.detailPositionName).indexOf(childkey)
  //     ].positionRecruitCnt = childData[0].cnt;
  //     console.log('있음');
  //   } else {
  //     setMyPositionCnt([
  //       ...myPositionCnt,
  //       {
  //         position: childData[0].position.position,
  //         positionRecruitCnt: childData[0].cnt
  //       }
  //     ]);
  //     console.log('없음');
  //   }
  //   console.log(myPositionCnt);
  // };

  // FUNC
  const findOrigin = (originArray, findKey, findValue) => {
    for (let i = 0; i < originArray.length; i += 1) {
      if (originArray[i][findKey] === findValue) {
        return originArray[i];
      }
    }
  };

  // PAGE
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          {/* teamName */}
          <TextField
            id="teamName"
            name="teamName"
            label="teamName"
            value={formik.values.teamName}
            onChange={formik.handleChange}
            error={formik.touched.teamName && Boolean(formik.errors.teamName)}
            helperText={formik.touched.teamName && formik.errors.teamName}
          />
          {/* teamDesc */}
          <TextField
            id="teamDesc"
            name="teamDesc"
            label="teamDesc"
            type="text"
            value={formik.values.teamDesc}
            onChange={formik.handleChange}
            error={formik.touched.teamDesc && Boolean(formik.errors.teamDesc)}
            helperText={formik.touched.teamDesc && formik.errors.teamDesc}
          />
          {/* teamTech */}
          <FormControl>
            <InputLabel htmlFor="select-tech">teamTech</InputLabel>
            <NativeSelect
              label="select-tech"
              defaultValue={selectedTech}
              value={selectedTech}
              onChange={(e) => handleChange(e, 'tech')}
            >
              {allTechList.map((tech) => (
                <option key={tech.techSeq} value={tech.techName}>
                  {tech.techName}
                </option>
              ))}
            </NativeSelect>
            <div>
              {myTechList.map((tech) => (
                <span key={tech.techSeq}>{tech.techName} </span>
              ))}
            </div>
          </FormControl>
          {/* teamPosition */}
          <FormControl>
            <InputLabel htmlFor="select-position">teamPosition</InputLabel>
            <NativeSelect
              label="select-position"
              defaultValue={selectedPos}
              value={selectedPos}
              onChange={(e) => handleChange(e, 'position')}
            >
              {allPositionList.map((pos) => (
                <option key={pos.detailPositionName} value={pos.detailPositionName}>
                  {pos.detailPositionName}
                </option>
              ))}
            </NativeSelect>
            <div>
              {myPositionList.map((pos) => (
                <div key={pos.detailPositionName}>
                  {pos.detailPositionName}
                  <SelectPositionCnt
                    onSetCnt={handlePositionCntChange}
                    pos={pos.detailPositionName}
                    defaultValue={1}
                  />
                </div>
              ))}
            </div>
          </FormControl>
          {/* Submit Btn */}
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}
