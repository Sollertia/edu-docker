/**
 * =============================================================================
 * Role: Section Navigation Buttons UI
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing section navigation button styles
 * - Adding navigation animations
 *
 * PROPS:
 * - sections: Array of section labels
 * - activeIndex: Currently active section index
 * - onSelect: Callback when section is selected
 * - activeColor: Color for active state (default: #00d4ff)
 * =============================================================================
 */

import React from 'react';

export const SectionNav = ({
  sections,
  activeIndex,
  onSelect,
  activeColor = '#00d4ff'
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    }}>
      {sections.map((name, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            border: activeIndex === i ? `2px solid ${activeColor}` : '2px solid transparent',
            background: activeIndex === i ? `${activeColor}33` : 'rgba(255,255,255,0.05)',
            color: activeIndex === i ? '#fff' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
