import React from 'react';
import { useApp } from '../context/AppContext';
import './Card.css';

const Card = ({
  children,
  onClick,
  icon,
  title,
  subtitle,
  className = '',
  ariaLabel,
  ...props
}) => {
  const { fontSize, highContrast } = useApp();

  const cardClasses = `
    card
    card-font-${fontSize}
    ${highContrast ? 'card-high-contrast' : ''}
    ${onClick ? 'card-clickable' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      aria-label={ariaLabel || title}
      {...props}
    >
      {icon && (
        <div className="card-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      {(title || subtitle) && (
        <div className="card-content">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      {children && <div className="card-body">{children}</div>}
    </div>
  );
};

export default Card;

