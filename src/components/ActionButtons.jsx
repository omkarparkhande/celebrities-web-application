// ActionButtons.jsx
import React from "react";

const ActionButtons = ({ editMode, onEditClick, onSaveClick, onCancelClick, onDeleteClick }) => {
  return (
    <div className="flex justify-end items-start space-x-4 mt-2 py-3">
      {!editMode ? (
        <>
          {/* Delete button */}
          <svg className="feather feather-trash-2" onClick={onDeleteClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          {/* edit button */}
          <svg className="feather feather-edit-2" onClick={onEditClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0096FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </>
      ) : (
        <>
          {/* cancel button */}
          <svg className="feather feather-x-circle hover:fill-gray-100" onClick={onCancelClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          {/* save button  */}
          <svg className="feather feather-check-circle hover:fill-gray-100" onClick={onSaveClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CBB17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
