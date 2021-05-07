import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import socketIOClient from 'socket.io-client';

import { selectedVoucher } from '../../../../redux/actions/vouchers';
import { editModal } from '../../../../redux/actions/modal';
import {
  deleteVoucher,
  closeVoucher,
} from '../../../../services/voucher.service';
import { apiEndPoint } from '../../../../Config';
import './Table.css';

const API_ENDPOINT = apiEndPoint();

const TABLE_HEAD = ['ID', 'Amount', 'Status', 'Used', 'Completed', 'Action'];

const Table = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { vouchers, entries, selectedVoucher, editModal, user } = props;
  const [tableVouchers, setTableVouchers] = useState(vouchers);

  useEffect(() => {
    const tableEntries = vouchers.slice(0, parseInt(entries, 10));
    setTableVouchers(tableEntries);
  }, [setTableVouchers, vouchers, entries]);

  const openEditModal = (voucher) => {
    editModal(true);
    selectedVoucher(voucher);
  };

  const deleteUserVoucher = (id) => {
    deleteVoucher(id);
    socket.emit('refresh', {});
  };

  const markUserVoucher = (id) => {
    closeVoucher(id);
    socket.emit('refresh', {});
  };

  return (
    <div className='col-sm-12 table-responsive mx-auto'>
      <table className='table table-centered mb-0' id='ticketTable'>
        <thead className='font-14 bg-light'>
          <tr>
            {TABLE_HEAD.map((tableHead, i) => (
              <th key={i} className='font-weight-medium'>
                {tableHead} &nbsp;&nbsp;
                <i className='fas fa-angle-down icon'></i>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='font-14'>
          {tableVouchers.map((voucher) => (
            <tr key={voucher._id}>
              <td>#{voucher.voucherId}</td>
              <td>{voucher.amount}</td>
              <td>
                {voucher.status === 'Active' ? (
                  <span className='badge badge-success'>{voucher.status}</span>
                ) : (
                  <span className='badge badge-secondary'>
                    {voucher.status}
                  </span>
                )}
              </td>
              <td>{voucher.used}</td>
              <td>{moment(voucher.created).format('DD/MM/YYYY')}</td>
              {/* <td>{moment(voucher.expiredAt).format('DD/MM/YYYY')}</td> */}
              <td
                className={
                  user && user._id === voucher.user
                    ? 'actions actions-bg'
                    : 'actions'
                }
              >
                {user && user._id === voucher.user ? (
                  <>
                    <a
                      href='#!'
                      className='btn text-white btn-sm'
                      onClick={() => deleteUserVoucher(voucher._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </a>
                    <a
                      href='#!'
                      className={
                        voucher.status === 'Inactive'
                          ? 'btn text-white btn-sm disabled'
                          : 'btn text-white btn-sm'
                      }
                      onClick={() => markUserVoucher(voucher._id)}
                    >
                      <i className='fas fa-check'></i>
                    </a>
                    <a
                      href='#!'
                      className={
                        voucher.status === 'Inactive'
                          ? 'btn text-white btn-sm disabled'
                          : 'btn text-white btn-sm'
                      }
                      onClick={() => openEditModal(voucher)}
                    >
                      <i className='fas fa-pencil-alt'></i>
                    </a>
                  </>
                ) : user && user.role === 'Admin' ? (
                  <>
                    <a
                      href='#!'
                      className='btn text-white btn-sm'
                      onClick={() => deleteUserVoucher(voucher._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </a>
                    <a
                      href='#!'
                      className={
                        voucher.status === 'Inactive'
                          ? 'btn text-white btn-sm disabled'
                          : 'btn text-white btn-sm'
                      }
                      onClick={() => markUserVoucher(voucher._id)}
                    >
                      <i className='fas fa-check'></i>
                    </a>
                  </>
                ) : (
                  <>
                    <a href='#!' className='btn btn-sm disabled'>
                      <i className='fas fa-trash'></i>
                    </a>
                    <a href='#!' className='btn btn-sm disabled'>
                      <i className='fas fa-check'></i>
                    </a>
                    <a href='#!' className='btn btn-sm disabled'>
                      <i className='fas fa-pencil-alt'></i>
                    </a>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  vouchers: PropTypes.array.isRequired,
  entries: PropTypes.any,
  editModal: PropTypes.func.isRequired,
  selectedVoucher: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.vouchers,
  entries: state.vouchers.entries,
  user: state.user,
});

export default connect(mapStateToProps, { editModal, selectedVoucher })(Table);
