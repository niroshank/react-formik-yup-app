import React from "react";

const ErrorMessageWrapper = ({ isDirty, errors, touched, fieldName }) => {
  const hasError = (isDirty && errors[fieldName]) || (errors[fieldName] && touched[fieldName]);

  return hasError ? (
    <div className="text-red-400 text-xs">{errors[fieldName]}</div>
  ) : null;
};

export default ErrorMessageWrapper;
