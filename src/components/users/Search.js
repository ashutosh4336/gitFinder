import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ clearUsers, searchUser, showClear, setAlert }) => {
  const [text, setText] = useState('');
  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please Enter Something', 'light');
    } else {
      // console.log(e);
      // console.log(text);
      searchUser(text);
      setText('');
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
        />
      </form>

      {showClear && (
        <button className='btn btn-block btn-danger mb-2' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
