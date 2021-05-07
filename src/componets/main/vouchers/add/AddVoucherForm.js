import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

import { FormInput } from '../../../reusable/FormInput';
import { Button } from '../../../reusable/Button';
import { addNewVoucher } from '../../../../services/voucher.service';
import { apiEndPoint } from '../../../../Config';

const API_ENDPOINT = apiEndPoint();

const AddVoucherForm = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { addModal } = props;

  const [voucher, setVoucher] = useState({
    data: {
      amount: '',
    },
  });

  const { amount } = voucher.data;

  const onAddVoucher = async (e) => {
    e.preventDefault();
    const { data } = voucher;
    await addNewVoucher(data);
    socket.emit('refresh', {});
    clearFormFields();
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

  const clearFormFields = () => {
    setVoucher({
      data: {
        amount: '',
      },
    });
  };

  return (
    <>
      <form onSubmit={onAddVoucher}>
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
          label='ADD'
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
          handleClick={() => addModal(false)}
        />
      </form>
    </>
  );
};

export default AddVoucherForm;