/**
 * =============================================================================
 * Role: Section Card Container UI
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing section card appearance
 * - Adding card variants
 *
 * PROPS:
 * - title: Section title
 * - subtitle: Section subtitle
 * - titleColor: Title color
 * - children: Section content
 * =============================================================================
 */

import React from 'react';

export const SectionCard = ({ title, subtitle, titleColor = '#00d4ff', children }) => {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      {title && (
        <h3 style={{
          textAlign: 'center',
          marginBottom: subtitle ? '8px' : '24px',
          color: titleColor
        }}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          marginBottom: '24px',
          fontSize: '0.9rem'
        }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

export const GridLayout = ({ columns = 2, gap = '24px', children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap
  }}>
    {children}
  </div>
);

export const FlexCenter = ({ gap = '16px', wrap = true, children }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap,
    flexWrap: wrap ? 'wrap' : 'nowrap'
  }}>
    {children}
  </div>
);
