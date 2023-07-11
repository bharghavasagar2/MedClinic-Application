import React, { useEffect, useState } from 'react';
import Table from '../commonComponents/DataTable';
import HeaderComponent from './HeaderCommonComponent.js';
import backgroundImage from '../../images/homepage.jpg';
import * as patientsReducer from '../../redux/reducers/patientsSlice.js';
import * as appointmentReducer from '../../redux/reducers/appointmentsSlice.js'
import * as notificationReducer from '../../redux/reducers/notificationSlice.js'
import * as doctorsReducer from '../../redux/reducers/doctorsSlice.js'
import * as videosReducer from '../../redux/reducers/videoSlice.js';
import * as prescriptionReducer from '../../redux/reducers/prescriptionsSlice.js'
import * as paymentsReducer from '../../redux/reducers/paymentSlice.js';
import { useLocation } from 'react-router-dom';
import Portal from '../commonComponents/PortalComponent.js';
import ConfirmationModal from './ConfirmationModal';
import { generateColumnsAndData } from '../../commonConfig/commonFunction';
import { Cancel, EDIT, VIEW, useReduxHelpers } from '../../commonConfig/commonConfig';
import { actionTypeInitialState, initialState } from '../../commonConfig/initialListComponent';
import ConditionalRender from './ConditionalRender';
import FormView from './CommonFormView';
import Form from './FormCommonComponent';
import { resetProperty } from '../../redux/reducers/resetSlice';
import {
  getAllData,
  getDataById,
  deleteDataById,
  createUpdateDataById
} from '../../redux/commonSlice/slice.js'

const List = () => {
  const location = useLocation();
  let { rawData, linkFields, linkLabels, fieldsToShowOnEdit, reducer, specificState,
    apisToCall, role, addToResponseIfActionSuccess, mainRecordId } = location?.state;
  console.log(location?.state)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { dispatch, globalState } = useReduxHelpers();
  const [state, setState] = useState(initialState);




  const handleApiCall = (reducer, apiAction) => {
    let actionCreators;//ssds
    switch (reducer) {
      case 'patientsReducer':
        actionCreators = patientsReducer[apiAction];
        break;
      case 'appointmentReducer':
        actionCreators = appointmentReducer[apiAction];
        break;
      case 'notificationReducer':
        actionCreators = notificationReducer[apiAction];
        break;
      case 'doctorsReducer':
        actionCreators = doctorsReducer[apiAction];
        break;
      case 'videosReducer':
        actionCreators = patientsReducer[apiAction];
        break;
      case 'prescriptionReducer':
        actionCreators = prescriptionReducer[apiAction];
        break;
      case 'paymentsReducer':
        actionCreators = paymentsReducer[apiAction];
        break;
      default:
        break;
    }
    return actionCreators;
  }
  console.log(handleApiCall(reducer, apisToCall.update))
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

  const handleOnEditFormSubmission = (formValues) => {
    //  let actionCreator = handleApiCall(reducer, apisToCall[actionType]);
    dispatch(createUpdateDataById({ endpoint: apisToCall.update.endpoint, id: formValues[mainRecordId], data: formValues }));
    setState({ ...state, getAddUpdateFlag: true })
  }

  useEffect(() => {
    if (globalState.common && !!state.getAddUpdateFlag && !!globalState.common.createUpdateDataById) {
      closeModal()
      dispatch(resetProperty('common', 'createUpdateDataById'))
    }
  }, [globalState.common])

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
