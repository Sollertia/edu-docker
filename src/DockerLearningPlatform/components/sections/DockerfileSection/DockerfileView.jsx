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

import React, { useState } from 'react';
import {
  IMAGE_LAYERS_DETAIL,
  getInstructionKeyword,
  getInstructionArgs,
  CMD_VS_ENTRYPOINT,
  DOCKERIGNORE_DATA
} from '../../../constants';
import { SectionNav } from '../../common';

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

    {/* Tips (if available) */}
    {layer.tips && (
      <div style={{
        padding: '12px',
        background: 'rgba(34,197,94,0.1)',
        borderRadius: '10px',
        marginBottom: '16px',
        border: '1px solid rgba(34,197,94,0.3)'
      }}>
        <div style={{ color: '#4ade80', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>팁</div>
        <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.8rem', lineHeight: '1.6' }}>
          {layer.tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>
    )}

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
// CMD vs ENTRYPOINT Comparison
// ============================================================================

const CmdVsEntrypoint = () => {
  const data = CMD_VS_ENTRYPOINT;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#ec4899' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>

      {/* Comparison Table */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        overflowX: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.1)' }}></th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#ec4899', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>CMD</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#ef4444', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>ENTRYPOINT</th>
            </tr>
          </thead>
          <tbody>
            {data.comparison.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '12px', color: '#e2e8f0', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.feature}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#f9a8d4', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.cmd}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#fca5a5', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.entrypoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Examples */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {Object.entries(data.examples).map(([key, example]) => (
          <div key={key} style={{
            background: key === 'both' ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.2)',
            borderRadius: '14px',
            padding: '16px',
            border: key === 'both' ? '2px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.1)'
          }}>
            <h4 style={{ color: key === 'both' ? '#4ade80' : '#e2e8f0', marginBottom: '12px', fontSize: '0.9rem' }}>
              {key === 'both' && '✅ '}{example.title}
            </h4>
            <div style={{
              background: '#0d1117',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
              fontFamily: 'monospace',
              fontSize: '0.75rem'
            }}>
              <pre style={{ margin: 0, color: '#e6edf3', whiteSpace: 'pre-wrap' }}>{example.dockerfile}</pre>
            </div>
            <div style={{ fontSize: '0.8rem' }}>
              <div style={{ marginBottom: '8px' }}>
                <code style={{ color: '#93c5fd' }}>{example.run1}</code>
                <div style={{ color: '#86efac', marginLeft: '8px' }}>{example.result1}</div>
              </div>
              <div>
                <code style={{ color: '#93c5fd' }}>{example.run2}</code>
                <div style={{ color: '#fbbf24', marginLeft: '8px' }}>{example.result2}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Best Practice */}
      <div style={{
        background: 'rgba(139,92,246,0.1)',
        borderRadius: '14px',
        padding: '20px',
        border: '1px solid rgba(139,92,246,0.3)'
      }}>
        <h4 style={{ color: '#a78bfa', marginBottom: '12px' }}>{data.bestPractice.title}</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#c4b5fd', fontSize: '0.85rem', lineHeight: '1.8' }}>
          {data.bestPractice.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// .dockerignore Section
// ============================================================================

const DockerignoreSection = () => {
  const data = DOCKERIGNORE_DATA;
  const [selectedExample, setSelectedExample] = useState('common');

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#06b6d4' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '8px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>
      <p style={{ textAlign: 'center', color: '#fbbf24', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.analogy}
      </p>

      {/* Benefits */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {data.benefits.map((item, i) => (
          <div key={i} style={{
            padding: '16px',
            background: 'rgba(6,182,212,0.1)',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(6,182,212,0.3)'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{item.icon}</div>
            <div style={{ color: '#67e8f9', fontWeight: '600', fontSize: '0.85rem', marginBottom: '4px' }}>{item.title}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Example Tabs and Content */}
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {Object.entries(data.examples).map(([key, example]) => (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: selectedExample === key ? '2px solid #06b6d4' : '2px solid transparent',
                  background: selectedExample === key ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)',
                  color: selectedExample === key ? '#67e8f9' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                {example.title}
              </button>
            ))}
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            {data.examples[selectedExample].items.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <code style={{ color: '#67e8f9', fontSize: '0.85rem' }}>{item.pattern}</code>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Example */}
        <div>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '12px', fontWeight: '600' }}>
            전체 예시 (.dockerignore)
          </div>
          <div style={{
            background: '#0d1117',
            borderRadius: '12px',
            padding: '16px',
            fontFamily: 'monospace',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <pre style={{ margin: 0, color: '#8b949e', fontSize: '0.75rem', lineHeight: '1.6' }}>
              {data.fullExample}
            </pre>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'rgba(239,68,68,0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(239,68,68,0.3)'
      }}>
        <h4 style={{ color: '#f87171', marginBottom: '12px' }}>{data.warning.title}</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#fca5a5', fontSize: '0.85rem', lineHeight: '1.8' }}>
          {data.warning.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// Dockerfile Instructions (Original Content)
// ============================================================================

const DockerfileInstructions = ({ dockerfileStep, setDockerfileStep, currentLayer, layers }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#a78bfa' }}>
      Dockerfile 명령어
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
);

// ============================================================================
// Section Labels
// ============================================================================

const DOCKERFILE_SECTIONS = ['명령어', 'CMD vs ENTRYPOINT', '.dockerignore'];

// ============================================================================
// Main View Component
// ============================================================================

export const DockerfileView = ({
  dockerfileStep,
  setDockerfileStep,
  currentLayer,
  layers
}) => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <SectionNav
        sections={DOCKERFILE_SECTIONS}
        activeIndex={activeSection}
        onSelect={setActiveSection}
        activeColor="#a78bfa"
      />

      {activeSection === 0 && (
        <DockerfileInstructions
          dockerfileStep={dockerfileStep}
          setDockerfileStep={setDockerfileStep}
          currentLayer={currentLayer}
          layers={layers}
        />
      )}
      {activeSection === 1 && <CmdVsEntrypoint />}
      {activeSection === 2 && <DockerignoreSection />}
    </div>
  );
};
