import React, { useState } from 'react';
import Table from '../commonComponents/DataTable';
import HeaderComponent from './HeaderCommonComponent.js';
import backgroundImage from '../../images/homepage.jpg';
import { useLocation } from 'react-router-dom';
import Portal from '../commonComponents/PortalComponent.js';
import ConfirmationModal from './ConfirmationModal';
import { generateColumnsAndData } from '../../commonConfig/commonFunction';
import { Cancel, EDIT, VIEW, useReduxHelpers } from '../../commonConfig/commonConfig';
import { actionTypeInitialState, initialState } from '../../commonConfig/initialListComponent';
import ConditionalRender from './ConditionalRender';
import FormView from './CommonFormView';
import Form from './FormCommonComponent';

const List = () => {
  const location = useLocation();
  let { rawData, linkFields, linkLabels, fieldsToShowOnEdit,
    apisToCall, role, addToResponseIfActionSuccess } = location?.state;
  console.log(location?.state)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { dispatch } = useReduxHelpers();
  const [state, setState] = useState(initialState);

  const openModal = (item, i, actionType = null) => {

    switch (actionType) {
      case Cancel:
        setState({ ...state, ...actionTypeInitialState, isCancel: true })
        break;
      case VIEW:
        setState({ ...state, ...actionTypeInitialState, isView: true })
        break;
      case EDIT:
        setState({ ...state, ...actionTypeInitialState, isEdit: true })
        break;
    }

    setSelectedItem(rawData?.[i]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    setState({ ...state, ...actionTypeInitialState });
  };

  const handleItemClick = (item, i, k) => {

  };

  const { columns, data } = generateColumnsAndData(rawData, linkFields, linkLabels, openModal);


  const formattedColumns = columns.map((column) => {
    if (column.field === 'details' || column.field === 'Details') {
      return {
        ...column,
        onClick: (item, i) => openModal(item, i),
      };
    }
    return column;
  });

  const formattedData = data.map((item, i) => {

    const formattedItem = { ...item };
    linkFields.forEach((field, index) => {
      const linkText = linkLabels && linkLabels[index] ? linkLabels[index] : 'Link';
      formattedItem[field] = (
        <a className="link-list" style={{ color: 'blue', transition: 'color 0.3s', cursor: 'pointer' }} onClick={() => openModal(item, i, linkText)}>{linkText}</a>
      );
    });
    return formattedItem;
  });

  const onCancelConfirm = () => {

  }

  const handleOnEditFormSubmission = () => {

  }


  let { isView, isEdit, isCancel } = state;
  console.log(isView, isEdit, isCancel, selectedItem, fieldsToShowOnEdit)
  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <HeaderComponent />
      <h2>Data Table</h2>
      <div className="table-container">
        <Table columns={formattedColumns} data={formattedData} onItemClick={handleItemClick} />
      </div>
      <Portal isOpen={isModalOpen} onClose={closeModal}>
        <ConditionalRender
          conditions={[
            { condition: isView, content: <FormView formData /> },
            { condition: isCancel, content: <ConfirmationModal message='Please confirm your action' onConfirm={onCancelConfirm} onCancel={closeModal} /> },
            { condition: isEdit, content: <Form initialValues={selectedItem || ''} fields={!!fieldsToShowOnEdit ? fieldsToShowOnEdit : null} onSubmit={handleOnEditFormSubmission} formName="Edit Patient" submitButtonName="Edit Details" /> },
            // { condition: true, content: <Form fields={patientState.RaiseRequestFields} onSubmit={handleAppntFormSubmit} formName="Appointment" submitButtonName="Proceed to Payment" /> },
          ]}
        />
      </Portal>
    </div>
  );
};

export default List;
