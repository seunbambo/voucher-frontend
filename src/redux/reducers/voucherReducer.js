import {
  GET_USER_VOUCHERS,
  GET_ALL_VOUCHERS,
  UPDATE_TABLE_ENTRIES,
  SELECTED_VOUCHER,
} from '../types';

const intialState = {
  userVouchers: [],
  vouchers: [],
  selectedVoucher: null,
  entries: 0,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_USER_VOUCHERS:
      return {
        ...state,
        userVouchers: action.payload,
      };
    case GET_ALL_VOUCHERS:
      return {
        ...state,
        vouchers: action.payload,
      };
    case UPDATE_TABLE_ENTRIES:
      return {
        ...state,
        entries: action.payload,
      };
    case SELECTED_VOUCHER:
      return {
        ...state,
        selectedVoucher: action.payload,
      };
    default:
      return state;
  }
};
