/**
 * =============================================================================
 * Role: Terminal UI Component
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing terminal appearance
 * - Adding terminal features (copy button, etc.)
 *
 * PROPS:
 * - title: Terminal window title
 * - history: Array of { input, isCorrect, output }
 * - inputValue: Current input value
 * - onInputChange: Input change handler
 * - onKeyDown: Key press handler
 * - terminalRef: Ref for auto-scroll
 * - height: Optional height (default: 420px)
 * - showPromptPath: Optional path in prompt (default: false)
 * =============================================================================
 */

import React from 'react';

export const Terminal = ({
  title = 'Terminal',
  history = [],
  inputValue,
  onInputChange,
  onKeyDown,
  terminalRef,
  height = '420px',
  showPromptPath = false
}) => {
  return (
    <div style={{
      background: '#0d1117',
      borderRadius: '16px',
      padding: '16px',
      fontFamily: 'monospace',
      display: 'flex',
      flexDirection: 'column',
      height
    }}>
      {/* Window Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        flexShrink: 0
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ marginLeft: '8px', color: '#8b949e', fontSize: '0.8rem' }}>{title}</span>
      </div>

      {/* History */}
      <div
        ref={terminalRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          fontSize: '0.75rem',
          marginBottom: '12px'
        }}
      >
        {history.map((entry, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div>
              {showPromptPath ? (
                <>
                  <span style={{ color: '#7ee787' }}>user@docker</span>
                  <span style={{ color: '#8b949e' }}>:</span>
                  <span style={{ color: '#79c0ff' }}>~/myapp</span>
                  <span style={{ color: '#8b949e' }}>$ </span>
                </>
              ) : (
                <span style={{ color: '#7ee787' }}>$ </span>
              )}
              <span style={{ color: entry.isCorrect ? '#e6edf3' : '#f85149' }}>
                {entry.input}
              </span>
            </div>
            <pre style={{
              color: entry.isCorrect ? '#8b949e' : '#f85149',
              whiteSpace: 'pre-wrap',
              margin: '4px 0 0 0',
              lineHeight: '1.4'
            }}>
              {entry.output}
            </pre>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        flexShrink: 0
      }}>
        <span style={{ color: '#7ee787' }}>$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="명령어를 입력하세요..."
          style={{
            flex: 1,
            marginLeft: '8px',
            background: 'transparent',
            border: 'none',
            color: '#e6edf3',
            fontSize: '0.85rem',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
      </div>
    </div>
  );
};
