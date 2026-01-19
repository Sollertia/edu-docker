/**
 * =============================================================================
 * Role: Step Progress Indicator UI
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing progress bar appearance
 * - Adding step labels/tooltips
 *
 * PROPS:
 * - currentStep: Current step index (0-based)
 * - totalSteps: Total number of steps
 * - onStepClick: Optional click handler for steps
 * - showNumbers: Show step numbers (default: true)
 * =============================================================================
 */

import React from 'react';

export const StepProgress = ({
  currentStep,
  totalSteps,
  onStepClick,
  showNumbers = true
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '4px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    }}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          onClick={() => onStepClick?.(i)}
          style={{
            width: showNumbers ? '32px' : (currentStep === i ? '100px' : '40px'),
            height: showNumbers ? '32px' : '8px',
            borderRadius: showNumbers ? '50%' : '4px',
            background: i < currentStep
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : i === currentStep
                ? 'linear-gradient(135deg, #f472b6, #8b5cf6)'
                : 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: i <= currentStep ? '#fff' : '#64748b',
            cursor: onStepClick ? 'pointer' : 'default',
            transition: 'all 0.3s'
          }}
        >
          {showNumbers && (i < currentStep ? '✓' : i + 1)}
        </div>
      ))}
    </div>
  );
};

export const ProgressBar = ({ current, total, color = '#f472b6' }) => {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }}>
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>진행률</span>
        <span style={{ color, fontSize: '0.85rem' }}>{current + 1} / {total}</span>
      </div>
      <div style={{
        height: '8px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: `linear-gradient(90deg, ${color}, #8b5cf6)`,
          transition: 'width 0.5s'
        }} />
      </div>
    </div>
  );
};
