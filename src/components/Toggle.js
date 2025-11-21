import React from 'react';
import { useApp } from '../context/AppContext';
import './Toggle.css';

const Toggle = ({
  label,
  checked,
  onChange,
  disabled = false,
  ariaLabel,
  className = '',
}) => {
  const { fontSize } = useApp();

  const toggleClasses = `
    toggle
    toggle-font-${fontSize}
    ${disabled ? 'toggle-disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <label className={toggleClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel || label}
        className="toggle-input"
      />
      <span className="toggle-slider" aria-hidden="true"></span>
      {label && <span className="toggle-label">{label}</span>}
    </label>
  );
};

export default Toggle;

