import React from "react";

const PlatformSelect = ({ label, isSelected, onChange }) => (
  <div>
    <label>
      <input type="checkbox" checked={isSelected} onChange={onChange} />
      {label}
    </label>
  </div>
);

export default PlatformSelect;
