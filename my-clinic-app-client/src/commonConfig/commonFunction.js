export const filterRequestArray = (array, key, filterKey) => {
  if (Array.isArray(array) && array.length > 0) {
    return array.filter(
      (data) => data[key] === filterKey
    );
  } else {
    return [];
  }
};

export const generateColumnsAndData = (array, linkFields, linkLabels, openModalFn) => {
  const columns = [];
  const data = [];

  // Generate columns
  if (Array.isArray(array) && array.length > 0) {
    const sampleItem = array[0];
    for (const key in sampleItem) {
      if (sampleItem.hasOwnProperty(key) && !key.endsWith('_id')) {
        const column = { id: key, label: key, field: key };
        columns.push(column);
      }
    }
    if (linkFields) {
      linkFields.forEach((field, index) => {
        const label = columns.find((column) => column.field === field)?.label || 'Link';
        const linkLabel = linkLabels && linkLabels[index] ? linkLabels[index] : label;
        columns.push({ id: field, label: linkLabel, field: field });
      });
    }
  }

  // Generate data
  if (Array.isArray(array) && array.length > 0) {
    array.forEach((item, i) => {
      const itemData = {};
      for (const key in item) {
        if (item.hasOwnProperty(key) && !key.endsWith('_id')) {
          itemData[key] = item[key] !== undefined && item[key] !== null ? item[key] : 'NA';
        }
      }
      if (linkFields) {
        linkFields.forEach((field, index) => {
          const linkText = linkLabels && linkLabels[index] ? linkLabels[index] : 'Link';
          itemData[field] = (
            <a href="#" onClick={() => openModalFn(item)}>
              {linkText}
            </a>
          );
        });
      }
      data.push(itemData);
    });
  }

  return { columns, data };
};


