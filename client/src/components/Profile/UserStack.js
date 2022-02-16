import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
// material
import AsyncCreatableSelect from 'react-select/creatable';
import { Box, CardHeader, Button } from '@mui/material';
import { getTech } from '../../_actions/user_actions';
// utils

// ----------------------------------------------------------------------
const animatedComponents = makeAnimated();
// ----------------------------------------------------------------------
export default function UserStack() {
  const dispatch = useDispatch();
  const [opti, setOptions] = useState([]);

  const techGet = () => {
    dispatch(getTech())
      .then((response) => {
        const data = response.payload;
        const all = data.reduce((total, data) => {
          total = [...total, { value: data.techSeq, label: data.techName }];
          return total;
        }, []);
        setOptions(all);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    techGet();
    setValue([{ value: 1, label: 'Java' }]);
  }, []);

  // styles that do not show 'x' for fixed options
  const styles = useMemo(
    () => ({
      multiValueRemove: (base, state) => (state.data.isFixed ? { ...base, display: 'none' } : base)
    }),
    []
  );
  // sort options with alphabet order
  const orderByLabel = useCallback((a, b) => a.label.localeCompare(b.label), []);

  // listed fixed options first and then the delete-able options
  const orderOptions = useCallback(
    (values) =>
      values
        .filter((v) => v.isFixed)
        .sort(orderByLabel)
        .concat(values.filter((v) => !v.isFixed).sort(orderByLabel)),
    [orderByLabel]
  );

  // selected values, initially it lists all options in order
  const [value, setValue] = useState(orderOptions(opti));

  useEffect(() => {
    console.log(value);
  }, [value]);

  // handler for changes
  const handleChange = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
        case 'pop-value': // delete with backspace
          if (removedValue.isFixed) {
            setValue(orderOptions([...inputValue, removedValue]));
            return;
          }
          break;
        case 'clear': // clear button is clicked
          setValue(opti.filter((v) => v.isFixed));
          return;
        default:
      }
      setValue(inputValue);
    },
    [opti, orderOptions]
  );

  return (
    <Box sx={7}>
      <CardHeader title="관심있는 기술 스택" />
      <div>
        <Select
          isMulti // show multiple options
          components={animatedComponents} // animate builtin components
          isClearable={value.some((v) => !v.isFixed)} // clear button shows conditionally
          styles={styles} // styles that do not show 'x' for fixed options
          options={opti} // all options
          value={value} // selected values
          onChange={handleChange} // handler for changes
        />
      </div>
    </Box>
  );
}
