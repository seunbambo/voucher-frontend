import { GET_USER, SET_ERROR, GET_USER_VOUCHERS } from '../types';
import { getUserData } from '../../services/user.service';

export const getUser = () => async (dispatch) => {
  try {
    const userData = await getUserData();
    const { user } = userData.data;
    dispatch({
      type: GET_USER,
      payload: user,
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

export const getUserVouchers = () => async (dispatch) => {
  try {
    const userData = await getUserData();
    const { vouchers } = userData.data.user;
    dispatch({
      type: GET_USER_VOUCHERS,
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
