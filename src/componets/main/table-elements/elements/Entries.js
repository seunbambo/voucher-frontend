import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTableEntries } from '../../../../redux/actions/vouchers';

const Entries = (props) => {
  const { entries, vouchers, updateTableEntries } = props;
  const [tableEntries, setTableEntries] = useState();

  useEffect(() => {
    setTableEntries(entries);
  }, [entries, setTableEntries]);

  const onSelectTag = (event) => {
    updateTableEntries(parseInt(event.target.value, 10));
  };

  return (
    <div className='form-group'>
      <select
        name='entries'
        className='form-control form-control-sm'
        value={tableEntries}
        onChange={onSelectTag}
        style={selectTagStyle}
      >
        <option value='5'>5</option>
        <option value='7'>7</option>
        <option value='10'>10</option>
        <option value={vouchers.length}>All</option>
      </select>
    </div>
  );
};

const selectTagStyle = {
  backgroundColor: '#8a929a',
  color: 'white',
  border: 'none',
  width: '100px',
  height: 'auto',
};

Entries.propTypes = {
  updateTableEntries: PropTypes.func.isRequired,
  entries: PropTypes.any.isRequired,
  vouchers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  entries: state.vouchers.entries,
  vouchers: state.vouchers.vouchers,
});

export default connect(mapStateToProps, { updateTableEntries })(Entries);
