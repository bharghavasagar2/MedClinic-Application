
import React, { useState } from 'react';
import Table from '../commonComponents/DataTable';
import HeaderComponent from './HeaderCommonComponent.js';
import backgroundImage from '../../images/homepage.jpg';
import { useLocation } from 'react-router-dom';
import Portal from '../commonComponents/PortalComponent.js'
import ConfirmationModal from './ConfirmationModal';

const List = () => {
  const location = useLocation();
  console.log(location)
  const passedData = location.state && location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleItemClick = (item) => {
    const onClickFn = item.onClick;
    if (onClickFn) {
      onClickFn(item);
    }
  };

  const columns = [
    { id: 1, label: 'Name', field: 'name' },
    { id: 2, label: 'Age', field: 'age' },
    {
      id: 3,
      label: 'Details',
      field: 'details',
      onClick: (item) => openModal(item),
    },
  ];

  const data = [
    { id: 1, name: 'John', age: 30, details: 'Link 1' },
    { id: 2, name: 'Jane', age: 25, details: 'Link 2' },
    // Add more data objects as needed
  ];

  const formattedColumns = columns.map((column) => {
    if (column.field === 'details') {
      return {
        ...column,
        onClick: (item) => openModal(item),
      };
    }
    return column;
  });

  const formattedData = data.map((item) => {
    const formattedItem = { ...item };
    if (formattedItem.details) {
      formattedItem.details = (
        <a href="#" onClick={() => openModal(item)}>
          {formattedItem.details}
        </a>
      );
    }
    return formattedItem;
  });

  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <HeaderComponent />
      <h2>Data Table</h2>
      <Table columns={formattedColumns} data={formattedData} onItemClick={handleItemClick} />

      <Portal isOpen={isModalOpen} onClose={closeModal}>
        <ConfirmationModal />
      </Portal>

    </div>
  );
};

export default List;
