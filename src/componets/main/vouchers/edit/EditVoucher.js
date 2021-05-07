import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal } from '../../../reusable/modal/Modal';
import EditVoucherForm from './EditVoucherForm';
import { editModal } from '../../../../redux/actions/modal';

const EditVoucher = (props) => {
  const { edit, editModal } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(edit);
  }, [setVisible, edit]);

  const dismiss = () => {
    editModal(false);
  };

  return (
    <>
      <Modal
        header='Edit Voucher'
        visible={visible}
        dismiss={dismiss}
        children={<EditVoucherForm editModal={editModal} />}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  edit: state.modal.edit,
});

export default connect(mapStateToProps, { editModal })(EditVoucher);
