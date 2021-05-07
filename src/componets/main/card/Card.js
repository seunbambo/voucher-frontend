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

  //   const findByPriority = (value) => {
  //     return _.filter(vouchers, ['priority', value]).length;
  //   };

  return (
    <div>
      <Button
        type='submit'
        label='Add Voucher'
        className='btn btn-primary btn-add'
        handleClick={() => addModal(true)}
      />
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
          {/* <Box 
                        title="High Priority Vouchers"
                        cardValue={findByPriority('High')}
                        iconClass="fas fa-temperature-high"
                        cardValueClass="text-danger"
                        type="High"
                        status="priority"
                    />
                    <Box 
                        title="Medium Priority Vouchers"
                        cardValue={findByPriority('Medium')}
                        iconClass="fas fa-folder-minus"
                        cardValueClass="text-warning"
                        type="Medium"
                        status="priority"
                    />
                    <Box 
                        title="Low Priority Vouchers"
                        cardValue={findByPriority('Low')}
                        iconClass="fas fa-battery-quarter"
                        cardValueClass="text-muted"
                        type="Low"
                        status="priority"
                    /> */}
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
});

export default connect(mapStateToProps, { addModal })(Card);
