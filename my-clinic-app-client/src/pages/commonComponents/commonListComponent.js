import React, { useEffect, useState } from 'react';
import Table from '../commonComponents/DataTable';
import HeaderComponent from './HeaderCommonComponent.js';
import backgroundImage from '../../images/homepage.jpg';
import { useLocation } from 'react-router-dom';
import Portal from '../commonComponents/PortalComponent.js';
import ConfirmationModal from './ConfirmationModal';
import { filterRequestArray, generateColumnsAndData } from '../../commonConfig/commonFunction';
import { ASSIGN_DOC, Cancel, EDIT, USER_ROLES, VIEW, useReduxHelpers } from '../../commonConfig/commonConfig';
import { actionTypeInitialState, initialState, resetCommonSlice } from '../../commonConfig/initialListComponent';
import ConditionalRender from './ConditionalRender';
import FormView from './CommonFormView';
import Form from './FormCommonComponent';
import { resetProperty } from '../../redux/reducers/resetSlice';
import {
  getAllData,
  getDataById,
  deleteDataById,
  createUpdateDataById
} from '../../redux/commonSlice/slice.js';
import { getStorageValue } from '../../security/sessionStorage';

const List = () => {
  const location = useLocation();
  let { rawData, linkFields, linkLabels, fieldsToShowOnEdit, condtionToRenderAllData, confirmationMessage,
    apisToCall, role, addToResponseIfActionSuccess, mainRecordId } = location?.state;

  console.log(location?.state)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { dispatch, globalState } = useReduxHelpers();
  const [action, setAction] = useState(null);
  const [state, setState] = useState({ ...initialState, dataArrayList: rawData || [] });

  const { common } = globalState;

  let { isView, isEdit, isCancel, dataArrayList, isAssignDoc } = state;

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
      case ASSIGN_DOC:
        setState({ ...state, ...actionTypeInitialState, isAssignDoc: true })
        break;
    }
    setSelectedItem(dataArrayList?.[i]);
    setIsModalOpen(true);
    setAction(actionType);
  };

  const { columns, data } = generateColumnsAndData(dataArrayList, linkFields, linkLabels, openModal);

  useEffect(() => {
    return () => {
      resetCommonSlice(dispatch, resetProperty);
    }
  }, []);



  const closeModal = (obj = false) => {
    setSelectedItem(null);
    setIsModalOpen(false);
    setAction(null);
    if (!!obj) {
      setState({ ...state, ...actionTypeInitialState, ...obj });
    } else {
      setState({ ...state, ...actionTypeInitialState });
    }
  };

  const handleItemClick = (item, i, k) => {

  };



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
    if (!!addToResponseIfActionSuccess && !!addToResponseIfActionSuccess[action]) {
      handleOnEditFormSubmission(selectedItem)
    } else {
      dispatch(deleteDataById({ endpoint: apisToCall?.delete?.endpoint, id: selectedItem[mainRecordId] }));
    }
  }

  const handleOnEditFormSubmission = (formValues) => {
    let formVal = formValues;
    if (!!addToResponseIfActionSuccess && !!addToResponseIfActionSuccess[action]) {
      formVal = { ...formVal, ...addToResponseIfActionSuccess[action] }
    }
    dispatch(createUpdateDataById({ endpoint: apisToCall.update.endpoint, id: formValues[mainRecordId], data: formVal }));
    setState({ ...state, getAddUpdateFlag: true })
  }

  useEffect(() => {
    if (common && !!state.isCancel && !!common.deleteDataById && !!common.deleteDataById.message) {
      closeModal({ getAlldataFlag: true, dataArrayList: [] });
      resetCommonSlice(dispatch, resetProperty, 'deleteDataById');

      if (!!apisToCall.getAll) {
        dispatch(getAllData(apisToCall?.getAll?.endpoint))
      }
    }
    if (common && !!state.getAddUpdateFlag && !!common.createUpdateDataById) {
      closeModal({ getAlldataFlag: true, dataArrayList: [] });
      resetCommonSlice(dispatch, resetProperty, 'createUpdateDataById');

      if (!!apisToCall.getAll) {
        dispatch(getAllData(apisToCall?.getAll?.endpoint))
      }
    }
    if (Array.isArray(common.allData) && common.allData.length > 0 && !!state.getAlldataFlag) {
      resetCommonSlice(dispatch, resetProperty, 'allData');

      let dataArrayList = common.allData;
      if (USER_ROLES.indexOf(role) !== -1) {
        console.log(getStorageValue('userId'))
        dataArrayList = common.allData.filter((data) => data[`${role}_id`] === getStorageValue('userId'));
      }
      if (!!condtionToRenderAllData) {
        dataArrayList = filterRequestArray(dataArrayList, condtionToRenderAllData.key, condtionToRenderAllData.filterKeys)
      }
      closeModal({ getAlldataFlag: false, dataArrayList });
    }
  }, [common])

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
            { condition: isCancel, content: <ConfirmationModal message={confirmationMessage} onConfirm={onCancelConfirm} onCancel={closeModal} /> },
            { condition: isAssignDoc, content: <Form initialValues={selectedItem || ''} fields={!!fieldsToShowOnEdit ? fieldsToShowOnEdit : null} onSubmit={handleOnEditFormSubmission} formName="Assign Doc" submitButtonName="Assign & Approve" /> },
            { condition: isEdit, content: <Form initialValues={selectedItem || ''} fields={!!fieldsToShowOnEdit ? fieldsToShowOnEdit : null} onSubmit={handleOnEditFormSubmission} formName="Edit Patient" submitButtonName="Edit Details" /> },
            // { condition: true, content: <Form fields={patientState.RaiseRequestFields} onSubmit={handleAppntFormSubmit} formName="Appointment" submitButtonName="Proceed to Payment" /> },
          ]}
        />
      </Portal>
    </div>
  );
};

export default List;
