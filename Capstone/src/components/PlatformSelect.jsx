import React from "react";
import "../App.css";

const PlatformSelect = ({ innerProps, label, isSelected }) => (
  <div className="customOption" {...innerProps}>
    <label className="customLabel">
      <input type="checkbox" checked={isSelected} className="customCheckbox" />
      {label}
    </label>
  </div>
);

export default PlatformSelect;
