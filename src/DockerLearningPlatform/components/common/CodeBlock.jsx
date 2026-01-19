/**
 * =============================================================================
 * Role: Code Block UI Component
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing code block appearance
 * - Adding syntax highlighting
 *
 * PROPS:
 * - code: Code string to display
 * - title: Optional title above code
 * - language: Optional language label
 * =============================================================================
 */

import React from 'react';

export const CodeBlock = ({ code, title, language }) => {
  return (
    <div style={{
      background: '#0d1117',
      borderRadius: '16px',
      padding: '20px',
      fontFamily: '"JetBrains Mono", monospace'
    }}>
      {(title || language) && (
        <div style={{
          color: '#8b949e',
          fontSize: '0.8rem',
          marginBottom: '12px'
        }}>
          {title || `📄 ${language}`}
        </div>
      )}
      <pre style={{
        color: '#e6edf3',
        margin: 0,
        fontSize: '0.8rem',
        lineHeight: '1.7',
        whiteSpace: 'pre-wrap'
      }}>
        {code}
      </pre>
    </div>
  );
};

export const InlineCode = ({ children, color = '#86efac' }) => (
  <code style={{
    background: 'rgba(0,0,0,0.3)',
    padding: '2px 6px',
    borderRadius: '4px',
    color,
    fontSize: '0.85rem'
  }}>
    {children}
  </code>
);
