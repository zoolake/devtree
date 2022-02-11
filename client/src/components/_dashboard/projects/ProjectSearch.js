import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
import { styled } from '@mui/material/styles';
import { Box, TextField, Autocomplete } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------

ProjectSearch.propTypes = {
  pjtList: PropTypes.array.isRequired,
  setFilterKeyword: PropTypes.func
};

export default function ProjectSearch({ pjtList, setFilterKeyword }) {
  // state
  const [nameKeyword, setNameKeyword] = useState('zz');

  // handle
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(nameKeyword);
  };
  const myFilter = (params) => {
    console.log('!!!!!!!!', params);
  };
  return (
    <RootStyle>
      <TextField
        id="search-project-keyword"
        label="Search project"
        type="search"
        variant="standard"
        InputProps={{
          nameKeyword
        }}
      />
      <button type="submit">검색</button>
    </RootStyle>
  );
}
