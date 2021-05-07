import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import Card from '../card/Card';
import { TableElements } from '../table-elements/TableElements';
import AddVoucher from '../vouchers/add/AddVoucher';
import './Dashboard.css';
import { AuthToken } from '../../../helpers/AuthToken';
import { allVouchers } from '../../../redux/actions/vouchers';
import { updateTableEntries } from '../../../redux/actions/vouchers';
import { getUser } from '../../../redux/actions/user';
import EditVoucher from '../vouchers/edit/EditVoucher';
import { apiEndPoint } from '../../../Config';

const API_ENDPOINT = apiEndPoint();

const Dashboard = (props) => {
  const socket = socketIOClient(API_ENDPOINT);

  const { token, allVouchers, updateTableEntries, getUser } = props;

  useEffect(() => {
    const dashboardMethods = () => {
      AuthToken(token);
      allVouchers();
      updateTableEntries(5);
      getUser();
    };

    dashboardMethods();

    socket.on('refreshPage', () => {
      dashboardMethods();
    });
  }, [token, allVouchers, socket, updateTableEntries, getUser]);

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <div className='card-box'>
            <Card />
            <TableElements />
            <AddVoucher />
            <EditVoucher />
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  token: PropTypes.string,
  allVouchers: PropTypes.func.isRequired,
  updateTableEntries: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  allVouchers,
  updateTableEntries,
  getUser,
})(Dashboard);
