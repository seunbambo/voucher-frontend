import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal } from '../../../reusable/modal/Modal';
import AddVoucherForm from './AddVoucherForm';
import { addModal } from '../../../../redux/actions/modal';

const AddVoucher = (props) => {
  const { add, addModal } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(add);
  }, [setVisible, add]);

  const dismiss = () => {
    addModal(false);
  };

  return (
    <>
      <Modal
        header='Add New Voucher'
        visible={visible}
        dismiss={dismiss}
        children={<AddVoucherForm addModal={addModal} />}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  add: state.modal.add,
});

export default connect(mapStateToProps, { addModal })(AddVoucher);
