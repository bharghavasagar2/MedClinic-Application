import React, { useEffect, useState } from 'react';
import Table from '../commonComponents/DataTable';
import HeaderComponent from './HeaderCommonComponent.js';
import backgroundImage from '../../images/homepage.jpg';
import { useLocation } from 'react-router-dom';
import Portal from '../commonComponents/PortalComponent.js';
import ConfirmationModal from './ConfirmationModal';
import { generateColumnsAndData } from '../../commonConfig/commonFunction';
import { Cancel, EDIT, VIEW, useReduxHelpers } from '../../commonConfig/commonConfig';
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

const List = () => {
  const location = useLocation();
  let { rawData, linkFields, linkLabels, fieldsToShowOnEdit, reducer, specificState,
    apisToCall, role, addToResponseIfActionSuccess, mainRecordId } = location?.state;

  console.log(location?.state)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { dispatch, globalState } = useReduxHelpers();
  const [state, setState] = useState({ ...initialState, dataArrayList: rawData || [] });

  const { common } = globalState;

  let { isView, isEdit, isCancel, dataArrayList } = state;

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
    setSelectedItem(dataArrayList?.[i]);
    setIsModalOpen(true);
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

  }

  const handleOnEditFormSubmission = (formValues) => {
    dispatch(createUpdateDataById({ endpoint: apisToCall.update.endpoint, id: formValues[mainRecordId], data: formValues }));
    setState({ ...state, getAddUpdateFlag: true })
  }

  useEffect(() => {
    if (common && !!state.getAddUpdateFlag && !!common.createUpdateDataById) {
      closeModal({ getAlldataFlag: true });
      resetCommonSlice(dispatch, resetProperty, 'createUpdateDataById');

      if (!!apisToCall.getAll) {
        dispatch(getAllData(apisToCall?.getAll?.endpoint))
      }
    }
    if (Array.isArray(common.allData) && common.allData.length > 0 && !!state.getAlldataFlag) {
      closeModal({ getAlldataFlag: false, dataArrayList: common.allData });
      resetCommonSlice(dispatch, resetProperty, 'allData');
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
