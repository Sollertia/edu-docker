/**
 * =============================================================================
 * Role: Dockerfile Section View (Presentation Only)
 * =============================================================================
 *
 * DO NOT put state management here (use hooks)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing Dockerfile visualization layout
 * - Updating layer explanation display
 * - Modifying instruction highlighting
 *
 * PROPS FROM CONTAINER:
 * - dockerfileStep: number
 * - setDockerfileStep: (step: number) => void
 * - currentLayer: object (current layer data)
 * - layers: array (all layer data)
 * =============================================================================
 */

import React from 'react';
import {
  IMAGE_LAYERS_DETAIL,
  getInstructionKeyword,
  getInstructionArgs
} from '../../../constants';

// ============================================================================
// Sub-components
// ============================================================================

const InstructionTabs = ({ layers, currentStep, onStepChange }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  }}>
    {layers.map((layer, i) => (
      <button
        key={i}
        onClick={() => onStepChange(i)}
        style={{
          padding: '10px 16px',
          borderRadius: '10px',
          border: currentStep === i ? '2px solid #a78bfa' : '2px solid transparent',
          background: currentStep === i ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.05)',
          color: currentStep === i ? '#fff' : '#94a3b8',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}
      >
        {getInstructionKeyword(layer.instruction)}
      </button>
    ))}
  </div>
);

const DockerfileCode = ({ layers, currentStep, onStepChange }) => (
  <div style={{
    background: '#0d1117',
    borderRadius: '16px',
    padding: '20px',
    fontFamily: '"JetBrains Mono", monospace'
  }}>
    <div style={{ color: '#8b949e', fontSize: '0.8rem', marginBottom: '16px' }}>
      Dockerfile
    </div>
    {layers.map((layer, i) => (
      <div
        key={i}
        onClick={() => onStepChange(i)}
        style={{
          padding: '10px 12px',
          borderRadius: '6px',
          background: i === currentStep ? 'rgba(167,139,250,0.2)' : 'transparent',
          borderLeft: i === currentStep ? '3px solid #a78bfa' : '3px solid transparent',
          marginBottom: '4px',
          cursor: 'pointer'
        }}
      >
        <span style={{ color: '#ff7b72' }}>{getInstructionKeyword(layer.instruction)}</span>
        <span style={{ color: '#c9d1d9' }}> {getInstructionArgs(layer.instruction)}</span>
      </div>
    ))}
  </div>
);

const LayerDetails = ({ layer }) => (
  <div style={{
    background: 'rgba(167,139,250,0.1)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(167,139,250,0.3)'
  }}>
    <h4 style={{ color: '#c4b5fd', marginBottom: '16px' }}>{layer.name}</h4>

    {/* Analogy */}
    <div style={{
      padding: '12px',
      background: 'rgba(251,191,36,0.1)',
      borderRadius: '10px',
      marginBottom: '16px',
      border: '1px solid rgba(251,191,36,0.3)'
    }}>
      <span style={{ color: '#fbbf24' }}>{layer.analogy}</span>
    </div>

    {/* Description */}
    <p style={{
      color: '#e2e8f0',
      fontSize: '0.9rem',
      lineHeight: '1.6',
      marginBottom: '16px'
    }}>
      {layer.description}
    </p>

    {/* Stats */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <div style={{
        padding: '12px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>크기</div>
        <div style={{ color: '#fff', fontWeight: '600' }}>{layer.size}</div>
      </div>
      <div style={{
        padding: '12px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>캐시</div>
        <div style={{
          color: layer.cached ? '#86efac' : '#fbbf24',
          fontWeight: '600'
        }}>
          {layer.cached ? '캐시됨' : '매번 실행'}
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// Main View Component
// ============================================================================

export const DockerfileView = ({
  dockerfileStep,
  setDockerfileStep,
  currentLayer,
  layers
}) => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#a78bfa' }}>
          Dockerfile 이해하기
        </h3>

        <InstructionTabs
          layers={layers}
          currentStep={dockerfileStep}
          onStepChange={setDockerfileStep}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <DockerfileCode
            layers={layers}
            currentStep={dockerfileStep}
            onStepChange={setDockerfileStep}
          />
          <LayerDetails layer={currentLayer} />
        </div>
      </div>
    </div>
  );
};
