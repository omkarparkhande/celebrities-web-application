import React from "react";

const GenderEditForm = ({ editedGender, onGenderChange }) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">Gender:</label>
      <select
        value={editedGender}
        onChange={(e) => onGenderChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="transgender">Transgender</option>
        <option value="rather_not_say">Rather not say</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default GenderEditForm;