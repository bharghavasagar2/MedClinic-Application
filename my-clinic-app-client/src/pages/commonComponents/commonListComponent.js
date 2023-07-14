import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import Table from '../commonComponents/DataTable';
import HeaderComponent from './HeaderCommonComponent.js';
import backgroundImage from '../../images/homepage.jpg';
import { useLocation } from 'react-router-dom';
import Portal from '../commonComponents/PortalComponent.js';
import ConfirmationModal from './ConfirmationModal';
import { filterRequestArray, generateColumnsAndData } from '../../commonConfig/commonFunction';
import { ASSIGN_DOC, CHANGE_APPOINTMENT_STATUS, Cancel, EDIT, PRESCRIBE, USER_ROLES, VIEW, VIEW_PRESCRIPTION, useReduxHelpers } from '../../commonConfig/commonConfig';
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
  let { linkConfigurations,
    conditionValue2, rawData, linkFields, linkLabels, fieldsToShowOnEdit, condtionToRenderAllData, confirmationMessage,
    apisToCall, role, addToResponseIfActionSuccess, mainRecordId, omitForViewFields } = location?.state;

  console.log(location?.state)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewItem, setViewItem] = useState({});
  const { dispatch, globalState } = useReduxHelpers();
  const [action, setAction] = useState(null);
  const [state, setState] = useState({ ...initialState, dataArrayList: rawData || [] });

  const { common } = globalState;

  const { dataById } = common;

  let { isView, isEdit, isCancel, dataArrayList, isAssignDoc, isPrescribe } = state;

  const openModal = (item, i, actionType = null) => {
    switch (actionType) {
      case Cancel:
        setState({ ...state, ...actionTypeInitialState, isCancel: true })
        break;
      case VIEW://VIEW_PRESCRIPTION
      case VIEW_PRESCRIPTION:
        setState({ ...state, ...actionTypeInitialState, isView: true })
        dispatch(getDataById({ endpoint: apisToCall.view.endpoint, id: dataArrayList?.[i][mainRecordId] }))
        break;
      case EDIT:
      case CHANGE_APPOINTMENT_STATUS:
        setState({ ...state, ...actionTypeInitialState, isEdit: true })
        break;
      case PRESCRIBE:
        setState({ ...state, ...actionTypeInitialState, isPrescribe: true });
        dispatch(getDataById({ endpoint: apisToCall.view.endpoint, id: dataArrayList?.[i][mainRecordId] }))
        break;
      case ASSIGN_DOC:
        setState({ ...state, ...actionTypeInitialState, isAssignDoc: true })
        break;
    }
    setSelectedItem(dataArrayList?.[i]);
    setIsModalOpen(true);
    setAction(actionType);
    setViewItem({})
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
    linkFields && Array.isArray(linkFields) && linkFields.forEach((field, index) => {
      const linkText = linkLabels && linkLabels[index] ? linkLabels[index] : 'Link';
      formattedItem[field] = (
        <a disabled className="link-list" style={{ color: 'blue', transition: 'color 0.3s', cursor: 'pointer' }} onClick={() => openModal(item, i, linkText)}>{linkText}</a>
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

  const handleOnPrescribeFormSubmission = (formValues) => {
    let formVal = formValues;
    if (!!addToResponseIfActionSuccess && !!addToResponseIfActionSuccess[action]) {
      formVal = { ...formVal, ...addToResponseIfActionSuccess[action] }
    }
    let id = !!selectedItem['prescription_id'] ? selectedItem['prescription_id'] : null
    dispatch(createUpdateDataById({ endpoint: apisToCall.create.endpoint, data: formVal, id }));
    setState({ ...state, getAddUpdateFlag: true })
  }

  useEffect(() => {
    if (common && !!state.isCancel && !!common.deleteDataById && !!common.deleteDataById.message) {
      toast("Successfully Cancelled");
      closeModal({ getAlldataFlag: true, dataArrayList: [] });
      resetCommonSlice(dispatch, resetProperty, 'deleteDataById');

      if (!!apisToCall.getAll) {
        dispatch(getAllData(apisToCall?.getAll?.endpoint))
      }
    }
    if (common && !!state.getAddUpdateFlag && !!common.createUpdateDataById) {
      toast("Record successfully saved/updated");
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
        let omitKeys = !!condtionToRenderAllData.omit ? condtionToRenderAllData.omit : null;
        dataArrayList = filterRequestArray(dataArrayList, condtionToRenderAllData.key, condtionToRenderAllData.filterKeys, null, omitKeys)
      }
      closeModal({ getAlldataFlag: false, dataArrayList });
    }
    if (common.dataById && Object.keys(dataById).length > 0) {
      toast("Successfully fetched Record");
      resetCommonSlice(dispatch, resetProperty, 'dataById');
      setSelectedItem({ ...selectedItem, ...dataById });
      setViewItem(dataById);
    }
  }, [common, dataById])

  console.log(isView, isEdit, isCancel, selectedItem, dataById, fieldsToShowOnEdit)
  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <HeaderComponent />
      <h2>Data Table</h2>
      <div className="table-container">
        <Table columns={formattedColumns} data={formattedData} />
      </div>
      <Portal isOpen={isModalOpen} onClose={closeModal}>
        <ConditionalRender
          conditions={[
            { condition: isView, content: <FormView formData={viewItem ? _.omit(viewItem, !!omitForViewFields ? omitForViewFields : []) : {}} /> },
            { condition: isCancel, content: <ConfirmationModal message={confirmationMessage} onConfirm={onCancelConfirm} onCancel={closeModal} /> },
            { condition: isAssignDoc, content: <Form initialValues={selectedItem || ''} fields={!!fieldsToShowOnEdit ? fieldsToShowOnEdit : null} onSubmit={handleOnEditFormSubmission} formName="Assign Doc" submitButtonName="Assign & Approve" /> },
            { condition: isEdit, content: <Form initialValues={selectedItem || ''} fields={!!fieldsToShowOnEdit ? fieldsToShowOnEdit : null} onSubmit={handleOnEditFormSubmission} formName="Edit Patient" submitButtonName="Edit Details" /> },
            { condition: isPrescribe, content: <Form initialValues={selectedItem} fields={!!fieldsToShowOnEdit ? fieldsToShowOnEdit : null} onSubmit={handleOnPrescribeFormSubmission} formName="Prescription" submitButtonName="Prescribe" isPrescribe={true} /> },
            // { condition: true, content: <Form fields={patientState.RaiseRequestFields} onSubmit={handleAppntFormSubmit} formName="Appointment" submitButtonName="Proceed to Payment" /> },
          ]}
        />
      </Portal>
    </div>
  );
};

export default List;
