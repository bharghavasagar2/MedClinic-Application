import { getData } from "../security/sessionStorage";

import { USER_DETAILS } from "./commonConfig";

import { filter, omit } from 'lodash';

export const filterRequestArray = (array, key, filterKeys, keyAssociatedWithUserId = null, keysToOmit = null) => {
  const userId = getData(USER_DETAILS)?.userId;
  if (Array.isArray(array) && array.length > 0) {
    return filter(array, (data) => {
      const filterKeyIndex = filterKeys.indexOf(data[key]);
      return (
        filterKeyIndex !== -1 &&
        (!keyAssociatedWithUserId || data[keyAssociatedWithUserId] === userId)
      );
    }).map((filteredData) => (keysToOmit ? omit(filteredData, keysToOmit) : filteredData));
  } else {
    return [];
  }
};





export const getCountAsString = (array) => {
  const count = array.length;
  return count.toString();
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



export const createSelectArray = (isCheck, lookUpData, labelObjectToShow) => {
  if (!!isCheck && Array.isArray(lookUpData) && lookUpData.length > 0 && !!labelObjectToShow) {
    return lookUpData.map(el => {
      return ({ label: el[labelObjectToShow.label], value: el[labelObjectToShow.value] });
    })
  } else {
    return []
  }
}