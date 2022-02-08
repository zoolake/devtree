import faker from 'faker';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// material
import AsyncCreatableSelect from 'react-select/creatable';
import { Box, Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------
const animatedComponents = makeAnimated();
// ----------------------------------------------------------------------
export default function MentorStack() {
  const options = useMemo(
    () => [
      { value: 'vue', label: 'Vue.js' },
      { value: 'react', label: 'React.js' },
      { value: 'angular', label: 'Angular.js' },
      { value: 'spring', label: 'Spring' }
    ],
    []
  );

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
  const [value, setValue] = useState(orderOptions(options));

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
          setValue(options.filter((v) => v.isFixed));
          return;
        default:
      }
      setValue(inputValue);
    },
    [options, orderOptions]
  );

  return (
    <Box sx={{ p: 3 }}>
      <CardHeader title="멘토의 기술 스택" />
      <div>
        <Select
          isMulti // show multiple options
          components={animatedComponents} // animate builtin components
          isClearable={value.some((v) => !v.isFixed)} // clear button shows conditionally
          styles={styles} // styles that do not show 'x' for fixed options
          options={options} // all options
          value={value} // selected values
          onChange={handleChange} // handler for changes
        />
      </div>
    </Box>
  );
}
