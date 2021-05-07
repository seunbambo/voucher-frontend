import axios from 'axios';

import { apiEndPoint, configHeader } from '../Config';

const API_ENDPOINT = apiEndPoint();
const config = configHeader();

export const addNewVoucher = async (voucherData) => {
  const response = await axios.post(
    `${API_ENDPOINT}/vouchers/add`,
    voucherData,
    config
  );
  return response;
};

export const getAllVouchers = async () => {
  const response = await axios.get(`${API_ENDPOINT}/vouchers`, config);
  return response;
};

export const editVoucher = async (id, voucherData) => {
  const response = await axios.put(
    `${API_ENDPOINT}/vouchers/${id}`,
    voucherData,
    config
  );
  return response;
};

export const deleteVoucher = async (id) => {
  const response = await axios.delete(`${API_ENDPOINT}/vouchers/${id}`, config);
  return response;
};

export const closeVoucher = async (id) => {
  const response = await axios.put(
    `${API_ENDPOINT}/vouchers/mark-voucher/${id}`,
    config
  );
  return response;
};
