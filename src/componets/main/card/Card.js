import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Box } from './Box';
import { Button } from '../../reusable/Button';
import { addModal } from '../../../redux/actions/modal';
import './Card.css';

const Card = (props) => {
  const { addModal, vouchers } = props;

  const findByStatus = (value) => {
    return _.filter(vouchers, ['status', value]).length;
  };

  return (
    <div>
      <Button
        type='submit'
        label='Add Voucher'
        className='btn btn-primary btn-add'
        handleClick={() => addModal(true)}
      />{' '}
      {}
      <div className='text-center mb-2'>
        <div className='row'>
          <Box
            title='Total Vouchers'
            cardValue={vouchers.length}
            iconClass='fas fa-tag'
            type='total'
            status='all'
          />
          <Box
            title='Active Vouchers'
            cardValue={findByStatus('Active')}
            iconClass='fas fa-archive'
            cardValueClass='text-success'
            type='Active'
            status='status'
          />
          <Box
            title='Inactive Vouchers'
            cardValue={findByStatus('Inactive')}
            iconClass='fas fa-shield-alt'
            cardValueClass='text-muted'
            type='Inactive'
            status='status'
          />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  vouchers: PropTypes.array.isRequired,
  addModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.vouchers,
  // balance: state.user.balance,
});

export default connect(mapStateToProps, { addModal })(Card);
