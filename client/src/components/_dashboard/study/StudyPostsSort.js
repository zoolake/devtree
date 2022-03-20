import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@mui/material';

StudyPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function StudyPostsSort({ options, onSort }) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
