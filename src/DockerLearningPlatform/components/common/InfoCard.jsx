/**
 * =============================================================================
 * Role: Info Card UI Component
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing card appearance
 * - Adding card variants
 *
 * PROPS:
 * - title: Card title
 * - color: Theme color
 * - children: Card content
 * - icon: Optional icon/emoji
 * =============================================================================
 */

import React from 'react';

export const InfoCard = ({ title, color, children, icon }) => {
  const bgColor = `${color}15`;
  const borderColor = `${color}40`;

  return (
    <div style={{
      padding: '16px',
      background: bgColor,
      borderRadius: '12px',
      border: `1px solid ${borderColor}`
    }}>
      {title && (
        <h4 style={{ color, marginBottom: '8px' }}>
          {icon && <span style={{ marginRight: '6px' }}>{icon}</span>}
          {title}
        </h4>
      )}
      {children}
    </div>
  );
};

export const SuccessCard = ({ title, children, icon }) => (
  <InfoCard title={title} color="#4ade80" icon={icon}>{children}</InfoCard>
);

export const WarningCard = ({ title, children, icon }) => (
  <InfoCard title={title} color="#fbbf24" icon={icon}>{children}</InfoCard>
);

export const ErrorCard = ({ title, children, icon }) => (
  <InfoCard title={title} color="#f87171" icon={icon}>{children}</InfoCard>
);

export const PrimaryCard = ({ title, children, icon }) => (
  <InfoCard title={title} color="#00d4ff" icon={icon}>{children}</InfoCard>
);

export const AccentCard = ({ title, children, icon }) => (
  <InfoCard title={title} color="#a78bfa" icon={icon}>{children}</InfoCard>
);
