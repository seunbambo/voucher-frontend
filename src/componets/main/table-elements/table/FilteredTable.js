import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';

import {
  deleteVoucher,
  closeVoucher,
} from '../../../../services/voucher.service';
import Entries from '../elements/Entries';
import { apiEndPoint } from '../../../../Config';
import './Table.css';

const API_ENDPOINT = apiEndPoint();

const TABLE_HEAD = ['ID', 'Amount', 'Status', 'Used', 'Completed', 'Action'];

const FilteredTable = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { vouchers, entries, user } = props;
  const [tableVouchers, setTableVouchers] = useState(vouchers);
  const [title, setTitle] = useState('');

  const history = useHistory();
  const { type, status } = useParams();

  const filterVouchers = (type) => {
    if (status === 'all') {
      const tableEntries = vouchers.slice(0, parseInt(entries, 10));
      setTableVouchers(tableEntries);
      setTitle('All Vouchers');
    } else if (status === 'priority') {
      const result = _.filter(vouchers, ['priority', type]);
      const tableEntries = result.slice(0, parseInt(entries, 10));
      setTableVouchers(tableEntries);
      setTitle(`${type} Priority Vouchers`);
    } else {
      const result = _.filter(vouchers, ['status', type]);
      const tableEntries = result.slice(0, parseInt(entries, 10));
      setTableVouchers(tableEntries);
      setTitle(`${type} Vouchers`);
    }
  };

  useEffect(() => {
    filterVouchers(type);

    // eslint-disable-next-line
  }, [entries]);

  const deleteUserVoucher = (id) => {
    deleteVoucher(id);
    socket.emit('refresh', {});
  };

  const markUserVoucher = (id) => {
    closeVoucher(id);
    socket.emit('refresh', {});
  };

  const goBackToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <>
      <div className='row'>
        <div className='col-sm-5'>
          <div onClick={() => goBackToDashboard()}>
            <i className='fas fa-arrow-left back'></i>
          </div>
          <Entries />
        </div>
        <div className='col-sm-5 title'>
          <h3>{title}</h3>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table table-centered mb-0' id='voucherTable'>
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
                    <span className='badge badge-success'>
                      {voucher.status}
                    </span>
                  ) : (
                    <span className='badge badge-secondary'>
                      {voucher.status}
                    </span>
                  )}
                </td>
                <td>{voucher.used}</td>
                <td>{moment(voucher.created).format('DD/MM/YYYY')}</td>
                {/* <td>{moment(voucher.dueDate).format('DD/MM/YYYY')}</td> */}
                <td
                  className={
                    user && user._id === voucher.user
                      ? 'actions actions-bg'
                      : 'actions'
                  }
                >
                  {user && user.role === 'Admin' ? (
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
                          voucher.status === 'Closed'
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
    </>
  );
};

FilteredTable.propTypes = {
  vouchers: PropTypes.array.isRequired,
  entries: PropTypes.any,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.vouchers,
  entries: state.vouchers.entries,
  user: state.user,
});

export default connect(mapStateToProps, {})(FilteredTable);
