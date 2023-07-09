import React from 'react';

function ConditionalRender({ conditions }) {
  const renderContent = () => {
    for (const condition of conditions) {
      if (condition.condition) {
        console.log(condition.condition, condition.content)
        return condition.content;
      }
    }
    return null;
  };

  return <>{renderContent()}</>;
}

export default ConditionalRender;
