import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import Web3 from 'web3';
// import { getWeb3 } from '../../../../utils';

import { FormInput } from '../../../reusable/FormInput';
import { Button } from '../../../reusable/Button';
import { addNewVoucher } from '../../../../services/voucher.service';
import { apiEndPoint } from '../../../../Config';
import Subscription from '../../../../contracts/Subscription.json';

const API_ENDPOINT = apiEndPoint();

const RANDOM_VALUE_MULTIPLIER = 10001;

const voucherGeneratedId = `${Math.floor(
  Math.random() * RANDOM_VALUE_MULTIPLIER
)}`;

const createVoucherOnChain = async (amount, voucherId) => {
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545')
    );
    // const web3 = new Web3(
    //   new Web3.providers.HttpProvider(`${process.env.INFURA_URL}`)
    // );
    const id = await web3.eth.net.getId();
    const deployedNetwork = Subscription.networks[id];
    const contract = new web3.eth.Contract(
      Subscription.abi,
      deployedNetwork.address
    );
    const addresses = await web3.eth.getAccounts();

    // const receipt = await contract.methods.createVoucher(voucherGeneratedId, amount).send({
    const receipt = await contract.methods
      .createVoucher(amount, voucherId)
      .send({
        from: addresses[0],
        gas: 4700000,
        gasPrice: '2000000000',
      });
    const voucher = await contract.methods.getVouchers(1).call();

    console.log('Receipt', receipt);
    console.log('Vouchers', voucher);
  } catch (error) {
    console.log(error);
  }
};

const AddVoucherForm = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { addModal } = props;

  const [voucher, setVoucher] = useState({
    data: {
      amount: '',
      voucherId: '',
    },
  });

  const { amount } = voucher.data;

  const onAddVoucher = async (e) => {
    createVoucherOnChain(amount, voucherGeneratedId);
    e.preventDefault();
    voucher.data.voucherId = voucherGeneratedId;
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
