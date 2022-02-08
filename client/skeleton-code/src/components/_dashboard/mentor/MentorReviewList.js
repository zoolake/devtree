import faker from 'faker';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import AsyncCreatableSelect from 'react-select/creatable';
import {
  Grid,
  Box,
  Button,
  Container,
  Stack,
  Card,
  Typography,
  CardHeader,
  CardContent
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
import { ReviewCard, MentorSearch, MentorSort } from '.';
// utils
import { fDateTime } from '../../../utils/formatTime';
import POSTS from '../../../_mocks_/mentor';
import { getReview } from '../../../_actions/mentor_actions';
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
    <Box>
      <Container>
        <CardHeader title="멘토링 리뷰" />{' '}
        <ScrollMenu>
          {POSTS.map((post, index) => (
            <ReviewCard key={post.id} post={post} index={index} />
          ))}
        </ScrollMenu>
      </Container>
    </Box>
  );
}
