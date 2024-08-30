import React from 'react';

const InputField = ({ label, value, onChange }) => (
  <div>
    <label>
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />%
    </label>
  </div>
);

export default InputField;
