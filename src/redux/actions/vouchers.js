import {
  GET_ALL_VOUCHERS,
  UPDATE_TABLE_ENTRIES,
  SELECTED_VOUCHER,
  SET_ERROR,
} from '../types';
import { getAllVouchers } from '../../services/voucher.service';

export const allVouchers = () => async (dispatch) => {
  try {
    const allVouchers = await getAllVouchers();
    const { vouchers } = allVouchers.data;
    dispatch({
      type: GET_ALL_VOUCHERS,
      payload: vouchers,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data.message,
      });
    }
  }
};

export const updateTableEntries = (entryNumber) => async (dispatch) => {
  dispatch({
    type: UPDATE_TABLE_ENTRIES,
    payload: entryNumber,
  });
};

export const selectedVoucher = (voucher) => async (dispatch) => {
  dispatch({
    type: SELECTED_VOUCHER,
    payload: voucher,
  });
};

export const clearSelectedVoucher = () => async (dispatch) => {
  dispatch({
    type: SELECTED_VOUCHER,
    payload: null,
  });
};
