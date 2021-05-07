import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FormInput } from '../../../reusable/FormInput';
import { Button } from '../../../reusable/Button';
import { editVoucher } from '../../../../services/voucher.service';
import { apiEndPoint } from '../../../../Config';

const API_ENDPOINT = apiEndPoint();

const EditVoucherForm = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { editModal, selectedVoucher } = props;
  //   let departments = departmentsArray();
  //   let priorities = prioritiesArray();

  const [voucher, setVoucher] = useState({
    data: {
      amount: '',
    },
  });

  const { amount } = voucher.data;

  useEffect(() => {
    if (selectedVoucher) {
      setVoucher({
        data: {
          amount: selectedVoucher.amount,
        },
      });
    }
  }, [selectedVoucher]);

  //   const getDropDownValue = (item) => {
  //     if (item.key === 'departments') {
  //       setDepartment(item.title);
  //     } else {
  //       setPriority(item.title);
  //     }
  //   };

  const onEditVoucher = async (e) => {
    e.preventDefault();
    const { data } = voucher;
    // data.priority = priority;
    // data.department = department;

    await editVoucher(selectedVoucher._id, data);
    socket.emit('refresh', {});
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const { data } = voucher;
    setVoucher({
      data: {
        ...data,
        [name]: value,
      },
    });
  };

  return (
    <>
      <form onSubmit={onEditVoucher}>
        <div className='form-group'>
          <FormInput
            type='text'
            name='amount'
            label='Amount'
            className='form-control'
            placeholder='Enter Amount'
            value={amount}
            error=''
            onChange={onChange}
          />
        </div>
        {/* <div className='form-group'>
          <FormInput
            type='text'
            name='email'
            label='Email'
            className='form-control'
            placeholder='Enter Email'
            value={email}
            error=''
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <DropDown
            title={department}
            label='Departments'
            list={departments}
            getDropDownValue={getDropDownValue}
          />
        </div>
        <div className='form-group'>
          <DropDown
            title={priority}
            label='Priority'
            list={priorities}
            getDropDownValue={getDropDownValue}
          />
        </div>
        <div className='form-group'>
          <FormInput
            type='text'
            name='subject'
            label='Subject'
            className='form-control'
            placeholder='Enter Subject'
            value={subject}
            error=''
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            className='form-control'
            name='description'
            row='5'
            col='40'
            value={description}
            onChange={onChange}
          ></textarea>
        </div> */}
        <Button
          className='btn btn-primary'
          label='Edit'
          disabled={
            !amount
            // !email ||
            // !subject ||
            // !description ||
            // !department ||
            // !priority
          }
        />
        &nbsp;&nbsp;&nbsp;
        <Button
          className='btn btn-danger'
          label='CANCEL'
          handleClick={() => editModal(false)}
        />
      </form>
    </>
  );
};

EditVoucherForm.propTypes = {
  selectedVoucher: PropTypes.object,
};

const mapStateToProps = (state) => ({
  selectedVoucher: state.vouchers.selectedVoucher,
});

export default connect(mapStateToProps, {})(EditVoucherForm);
