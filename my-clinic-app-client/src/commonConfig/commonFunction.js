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

export const generateColumnsAndData = (array, linkConfiguration, openModalFn) => {
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

    if (linkConfiguration) {
      linkConfiguration.forEach((config) => {
        const columnLabel = config.label || 'Link';
        columns.push({ id: config.field, label: columnLabel, field: config.field });
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

      if (linkConfiguration) {
        linkConfiguration.forEach((config, index) => {
          const linkText = config.label || 'Link';
          const showLink = config.showLink === undefined || config.showLink;
          const conditionField = item[config.conditionField];

          if (showLink || (!showLink && conditionField !== config.condition)) {
            itemData[config.field] = showLink || (!showLink && conditionField !== config.condition) ? (
              <a
                key={`${config.field}_${i}`}
                disabled
                className="link-list"
                style={{ color: 'blue', transition: 'color 0.3s', cursor: 'pointer' }}
                onClick={() => openModalFn(item)}
              >
                {linkText}
              </a>
            ) : (
              config.customContent || 'Action not Applicable'
            );
          }
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