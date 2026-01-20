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
  DOCKERIGNORE_DATA,
  MULTISTAGE_BUILD_DATA,
  ENV_VS_ARG_DATA,
  TROUBLESHOOTING_DATA,
  SECURITY_BEST_PRACTICES_DATA,
  IMAGE_OPTIMIZATION_DATA,
  CICD_INTEGRATION_DATA
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
// Multi-stage Build Section
// ============================================================================

const MultistageBuildSection = () => {
  const data = MULTISTAGE_BUILD_DATA;
  const [selectedExample, setSelectedExample] = useState('java');

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f59e0b' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>

      {/* Analogy */}
      <div style={{
        background: 'rgba(251,191,36,0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(251,191,36,0.3)',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{data.analogy.icon}</div>
        <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>{data.analogy.title}</h4>
        <p style={{ color: '#fef3c7', fontSize: '0.9rem', marginBottom: '4px' }}>{data.analogy.description}</p>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>{data.analogy.detail}</p>
      </div>

      {/* Problem vs Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Problem */}
        <div style={{
          background: 'rgba(239,68,68,0.1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(239,68,68,0.3)'
        }}>
          <h4 style={{ color: '#f87171', marginBottom: '16px' }}>{data.problem.title}</h4>
          {data.problem.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <span style={{ color: '#fca5a5' }}>{item.label}</span>
              <span style={{ color: '#f87171', fontWeight: '600' }}>{item.size}</span>
            </div>
          ))}
          <div style={{
            marginTop: '12px',
            padding: '12px',
            background: 'rgba(239,68,68,0.2)',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#f87171', fontWeight: '600', fontSize: '1.1rem' }}>{data.problem.total}</div>
            <div style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{data.problem.actualNeed}</div>
          </div>
        </div>

        {/* Solution - Stages */}
        <div style={{
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(34,197,94,0.3)'
        }}>
          <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>{data.solution.title}</h4>
          {data.solution.stages.map((stage, i) => (
            <div key={i} style={{
              padding: '16px',
              background: `${stage.color}20`,
              borderRadius: '12px',
              marginBottom: '12px',
              borderLeft: `4px solid ${stage.color}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>{stage.icon}</span>
                <span style={{ color: stage.color, fontWeight: '600' }}>{stage.name}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '8px' }}>{stage.purpose}</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {stage.includes.map((item, j) => (
                  <span key={j} style={{
                    padding: '2px 8px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    color: '#e2e8f0'
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Examples */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
          {Object.entries(data.examples).map(([key, ex]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: selectedExample === key ? '2px solid #f59e0b' : '2px solid transparent',
                background: selectedExample === key ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                color: selectedExample === key ? '#fbbf24' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {ex.title}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <div style={{
            background: '#0d1117',
            borderRadius: '16px',
            padding: '20px',
            fontFamily: 'monospace',
            maxHeight: '350px',
            overflowY: 'auto'
          }}>
            <pre style={{ margin: 0, color: '#e6edf3', fontSize: '0.75rem', lineHeight: '1.6' }}>
              {data.examples[selectedExample].dockerfile}
            </pre>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              padding: '20px',
              background: 'rgba(239,68,68,0.1)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>Before</div>
              <div style={{ color: '#f87171', fontSize: '1.5rem', fontWeight: '600' }}>{data.examples[selectedExample].before}</div>
            </div>
            <div style={{
              padding: '20px',
              background: 'rgba(34,197,94,0.1)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '4px' }}>After</div>
              <div style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: '600' }}>{data.examples[selectedExample].after}</div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(139,92,246,0.1)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#a78bfa', fontSize: '1.1rem', fontWeight: '600' }}>{data.examples[selectedExample].reduction}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Points & Benefits */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>핵심 키워드</h4>
          {data.keyPoints.map((point, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <code style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{point.keyword}</code>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{point.desc}</span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid rgba(34,197,94,0.3)'
        }}>
          <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>장점</h4>
          {data.benefits.map((benefit, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>{benefit.icon}</span>
              <div>
                <div style={{ color: '#86efac', fontWeight: '600', fontSize: '0.85rem' }}>{benefit.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{benefit.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ENV vs ARG Section
// ============================================================================

const EnvVsArgSection = () => {
  const data = ENV_VS_ARG_DATA;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#10b981' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>

      {/* Analogies */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          background: 'rgba(16,185,129,0.1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(16,185,129,0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{data.analogy.env.icon}</div>
          <h4 style={{ color: '#34d399', marginBottom: '8px' }}>{data.analogy.env.title}</h4>
          <p style={{ color: '#a7f3d0', fontSize: '0.85rem', margin: 0 }}>{data.analogy.env.desc}</p>
        </div>
        <div style={{
          background: 'rgba(245,158,11,0.1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(245,158,11,0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{data.analogy.arg.icon}</div>
          <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>{data.analogy.arg.title}</h4>
          <p style={{ color: '#fef3c7', fontSize: '0.85rem', margin: 0 }}>{data.analogy.arg.desc}</p>
        </div>
      </div>

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
              <th style={{ padding: '12px', textAlign: 'center', color: '#34d399', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>ENV</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#fbbf24', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>ARG</th>
            </tr>
          </thead>
          <tbody>
            {data.comparison.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '12px', color: '#e2e8f0', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.feature}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#a7f3d0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.env}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#fef3c7', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.arg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Examples */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {Object.entries(data.examples).map(([key, example]) => (
          <div key={key} style={{
            background: key === 'combined' ? 'rgba(139,92,246,0.1)' : 'rgba(0,0,0,0.2)',
            borderRadius: '14px',
            padding: '16px',
            border: key === 'combined' ? '2px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.1)'
          }}>
            <h4 style={{
              color: key === 'arg' ? '#fbbf24' : key === 'env' ? '#34d399' : '#a78bfa',
              marginBottom: '4px',
              fontSize: '0.9rem'
            }}>
              {key === 'combined' && '✅ '}{example.title}
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '12px' }}>{example.subtitle}</p>
            <div style={{
              background: '#0d1117',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              maxHeight: '150px',
              overflowY: 'auto'
            }}>
              <pre style={{ margin: 0, color: '#e6edf3', whiteSpace: 'pre-wrap' }}>{example.dockerfile}</pre>
            </div>
            {example.useCases ? (
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.6' }}>
                {example.useCases.map((use, i) => <li key={i}>{use}</li>)}
              </ul>
            ) : (
              <p style={{ color: '#c4b5fd', fontSize: '0.8rem', margin: 0 }}>{example.explanation}</p>
            )}
          </div>
        ))}
      </div>

      {/* Best Practices & Warning */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid rgba(34,197,94,0.3)'
        }}>
          <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>베스트 프랙티스</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
            {data.bestPractices.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>

        <div style={{
          background: 'rgba(239,68,68,0.1)',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid rgba(239,68,68,0.3)'
        }}>
          <h4 style={{ color: '#f87171', marginBottom: '12px' }}>{data.warning.title}</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#fca5a5', fontSize: '0.85rem', lineHeight: '1.8' }}>
            {data.warning.points.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Troubleshooting Section
// ============================================================================

const TroubleshootingSection = () => {
  const data = TROUBLESHOOTING_DATA;
  const [selectedError, setSelectedError] = useState(null);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#ef4444' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>

      {/* Error Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '24px'
      }}>
        {data.errors.map((err) => (
          <div
            key={err.id}
            onClick={() => setSelectedError(selectedError === err.id ? null : err.id)}
            style={{
              padding: '16px',
              background: selectedError === err.id ? 'rgba(239,68,68,0.15)' : 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              cursor: 'pointer',
              border: selectedError === err.id ? '2px solid rgba(239,68,68,0.5)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.3rem' }}>{err.icon}</span>
              <code style={{ color: '#f87171', fontSize: '0.8rem', flex: 1 }}>{err.error}</code>
              <span style={{
                padding: '2px 8px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                fontSize: '0.65rem',
                color: '#94a3b8'
              }}>{err.category}</span>
            </div>

            {selectedError === err.id && (
              <div style={{ marginTop: '12px' }}>
                <div style={{
                  padding: '10px 12px',
                  background: 'rgba(251,191,36,0.1)',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}>
                  <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>원인: </span>
                  <span style={{ color: '#fef3c7', fontSize: '0.8rem' }}>{err.cause}</span>
                </div>
                <div style={{ color: '#86efac', fontSize: '0.8rem', marginBottom: '8px' }}>해결 방법:</div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.8rem', lineHeight: '1.7' }}>
                  {err.solutions.map((sol, i) => <li key={i}>{sol}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Debug Flow */}
      <div style={{
        background: 'rgba(139,92,246,0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(139,92,246,0.3)',
        marginBottom: '24px'
      }}>
        <h4 style={{ color: '#a78bfa', marginBottom: '16px', textAlign: 'center' }}>{data.debugFlow.title}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.debugFlow.steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '10px'
            }}>
              {step.question ? (
                <>
                  <span style={{ color: '#f87171', fontWeight: '600' }}>{step.question}</span>
                  <span style={{ color: '#94a3b8' }}>→</span>
                  <code style={{ color: '#86efac', fontSize: '0.8rem' }}>{step.action}</code>
                </>
              ) : (
                <>
                  <code style={{ color: '#fbbf24', fontSize: '0.8rem', minWidth: '100px' }}>{step.status}</code>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', minWidth: '80px' }}>{step.meaning}</span>
                  <span style={{ color: '#94a3b8' }}>→</span>
                  <span style={{ color: '#c4b5fd', fontSize: '0.8rem' }}>{step.action}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Useful Commands */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>유용한 디버깅 명령어</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {data.usefulCommands.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '10px'
            }}>
              <code style={{ color: '#67e8f9', fontSize: '0.8rem' }}>{item.cmd}</code>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Security Best Practices Section
// ============================================================================

const SecuritySection = () => {
  const data = SECURITY_BEST_PRACTICES_DATA;
  const [selectedCategory, setSelectedCategory] = useState('non-root');

  const selectedItem = data.categories.find(c => c.id === selectedCategory);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#ef4444' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: selectedCategory === cat.id ? `2px solid ${cat.color}` : '2px solid transparent',
              background: selectedCategory === cat.id ? `${cat.color}30` : 'rgba(255,255,255,0.05)',
              color: selectedCategory === cat.id ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Content */}
      {selectedItem && (
        <div style={{
          background: `${selectedItem.color}15`,
          borderRadius: '16px',
          padding: '24px',
          border: `1px solid ${selectedItem.color}40`,
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2rem' }}>{selectedItem.icon}</span>
            <div>
              <h4 style={{ color: selectedItem.color, margin: 0 }}>{selectedItem.title}</h4>
              <span style={{
                padding: '2px 8px',
                background: `${selectedItem.color}30`,
                borderRadius: '4px',
                fontSize: '0.7rem',
                color: selectedItem.color
              }}>중요도: {selectedItem.importance}</span>
            </div>
          </div>

          <div style={{
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.1)',
            borderRadius: '10px',
            marginBottom: '16px'
          }}>
            <span style={{ color: '#f87171', fontWeight: '600' }}>문제: </span>
            <span style={{ color: '#fca5a5' }}>{selectedItem.problem}</span>
          </div>

          {/* Solution */}
          {selectedItem.solution && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ color: '#86efac', marginBottom: '8px', fontWeight: '600' }}>해결 방법:</div>
              {selectedItem.solution.description && (
                <p style={{ color: '#bbf7d0', fontSize: '0.85rem', marginBottom: '12px' }}>{selectedItem.solution.description}</p>
              )}
              {selectedItem.solution.dockerfile && (
                <div style={{
                  background: '#0d1117',
                  borderRadius: '10px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem'
                }}>
                  <pre style={{ margin: 0, color: '#e6edf3', whiteSpace: 'pre-wrap' }}>{selectedItem.solution.dockerfile}</pre>
                </div>
              )}
              {selectedItem.solution.examples && (
                <div style={{ display: 'grid', gap: '8px' }}>
                  {selectedItem.solution.examples.map((ex, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 14px',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px'
                    }}>
                      <span style={{ color: '#f87171', fontSize: '0.8rem', flex: 1 }}>{ex.bad}</span>
                      <span style={{ color: '#94a3b8', margin: '0 12px' }}>→</span>
                      <span style={{ color: '#86efac', fontSize: '0.8rem', flex: 1 }}>{ex.good}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Hierarchy (for minimal-base) */}
          {selectedItem.hierarchy && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ color: '#e2e8f0', marginBottom: '12px', fontWeight: '600' }}>베이스 이미지 계층:</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedItem.hierarchy.map((h, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    flex: 1,
                    minWidth: '120px'
                  }}>
                    <code style={{ color: '#67e8f9', fontSize: '0.85rem' }}>{h.name}</code>
                    <div style={{ color: '#86efac', fontSize: '0.8rem', marginTop: '4px' }}>{h.size}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '2px' }}>{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bad/Good Practices (for secrets) */}
          {selectedItem.badPractices && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ color: '#f87171', marginBottom: '8px', fontWeight: '600' }}>나쁜 예:</div>
              {selectedItem.badPractices.map((bp, i) => (
                <div key={i} style={{
                  padding: '10px 14px',
                  background: 'rgba(239,68,68,0.1)',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <code style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{bp.code}</code>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>{bp.reason}</div>
                </div>
              ))}
            </div>
          )}

          {selectedItem.goodPractices && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ color: '#86efac', marginBottom: '8px', fontWeight: '600' }}>권장 방법:</div>
              {selectedItem.goodPractices.map((gp, i) => (
                <div key={i} style={{
                  padding: '12px 14px',
                  background: 'rgba(34,197,94,0.1)',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ color: '#86efac', fontWeight: '600', fontSize: '0.85rem', marginBottom: '4px' }}>{gp.title}</div>
                  {gp.code && (
                    <div style={{
                      background: '#0d1117',
                      borderRadius: '6px',
                      padding: '10px',
                      fontFamily: 'monospace',
                      fontSize: '0.7rem',
                      marginBottom: '6px'
                    }}>
                      <pre style={{ margin: 0, color: '#e6edf3', whiteSpace: 'pre-wrap' }}>{gp.code}</pre>
                    </div>
                  )}
                  {gp.options && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      {gp.options.map((opt, j) => (
                        <span key={j} style={{
                          padding: '4px 10px',
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: '#c4b5fd'
                        }}>{opt}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{gp.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tools (for scan) */}
          {selectedItem.tools && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ color: '#e2e8f0', marginBottom: '12px', fontWeight: '600' }}>스캔 도구:</div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {selectedItem.tools.map((tool, i) => (
                  <div key={i} style={{
                    padding: '12px 14px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ color: '#67e8f9', fontWeight: '600' }}>{tool.name}</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{tool.desc}</span>
                    </div>
                    <code style={{ color: '#86efac', fontSize: '0.75rem' }}>{tool.cmd}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {selectedItem.tips && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(251,191,36,0.1)',
              borderRadius: '10px'
            }}>
              <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>팁:</div>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.8rem', lineHeight: '1.7' }}>
                {selectedItem.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Checklist */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>보안 체크리스트</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {data.checklist.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px'
            }}>
              <span style={{
                padding: '2px 8px',
                background: item.priority === '필수' ? 'rgba(239,68,68,0.3)' : item.priority === '권장' ? 'rgba(251,191,36,0.3)' : 'rgba(107,114,128,0.3)',
                borderRadius: '4px',
                fontSize: '0.65rem',
                color: item.priority === '필수' ? '#fca5a5' : item.priority === '권장' ? '#fef3c7' : '#9ca3af'
              }}>{item.priority}</span>
              <span style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{item.item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Image Optimization Section
// ============================================================================

const OptimizationSection = () => {
  const data = IMAGE_OPTIMIZATION_DATA;
  const [selectedStrategy, setSelectedStrategy] = useState('layer-order');

  const strategy = data.strategies.find(s => s.id === selectedStrategy);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#22c55e' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>

      {/* Strategy Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data.strategies.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStrategy(s.id)}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: selectedStrategy === s.id ? `2px solid ${s.color}` : '2px solid transparent',
              background: selectedStrategy === s.id ? `${s.color}30` : 'rgba(255,255,255,0.05)',
              color: selectedStrategy === s.id ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{s.icon}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Strategy Content */}
      {strategy && (
        <div style={{
          background: `${strategy.color}15`,
          borderRadius: '16px',
          padding: '24px',
          border: `1px solid ${strategy.color}40`,
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2rem' }}>{strategy.icon}</span>
            <div>
              <h4 style={{ color: strategy.color, margin: 0 }}>{strategy.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0' }}>{strategy.principle}</p>
            </div>
          </div>

          {strategy.reason && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(251,191,36,0.1)',
              borderRadius: '10px',
              marginBottom: '16px'
            }}>
              <span style={{ color: '#fbbf24' }}>{strategy.reason}</span>
            </div>
          )}

          {/* Bad/Good Examples */}
          {strategy.bad && strategy.good && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <h5 style={{ color: '#f87171', marginBottom: '12px' }}>{strategy.bad.title}</h5>
                <div style={{
                  background: '#0d1117',
                  borderRadius: '8px',
                  padding: '12px',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem'
                }}>
                  <pre style={{ margin: 0, color: '#fca5a5', whiteSpace: 'pre-wrap' }}>{strategy.bad.dockerfile}</pre>
                </div>
                {strategy.bad.problem && (
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '8px' }}>{strategy.bad.problem}</div>
                )}
              </div>
              <div style={{
                background: 'rgba(34,197,94,0.1)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <h5 style={{ color: '#4ade80', marginBottom: '12px' }}>{strategy.good.title}</h5>
                <div style={{
                  background: '#0d1117',
                  borderRadius: '8px',
                  padding: '12px',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem'
                }}>
                  <pre style={{ margin: 0, color: '#86efac', whiteSpace: 'pre-wrap' }}>{strategy.good.dockerfile}</pre>
                </div>
                {strategy.good.benefit && (
                  <div style={{ color: '#86efac', fontSize: '0.75rem', marginTop: '8px' }}>{strategy.good.benefit}</div>
                )}
              </div>
            </div>
          )}

          {/* Tips */}
          {strategy.tips && (
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
              {strategy.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          )}

          {/* Package Manager Examples */}
          {strategy.examples && typeof strategy.examples === 'object' && !Array.isArray(strategy.examples) && strategy.id === 'apt-clean' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {Object.entries(strategy.examples).map(([key, ex]) => (
                <div key={key} style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px',
                  padding: '14px'
                }}>
                  <div style={{ color: '#67e8f9', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>{ex.title}</div>
                  <div style={{
                    background: '#0d1117',
                    borderRadius: '6px',
                    padding: '10px',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem'
                  }}>
                    <pre style={{ margin: 0, color: '#e6edf3', whiteSpace: 'pre-wrap' }}>{ex.code}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Build Args Examples */}
          {strategy.examples && Array.isArray(strategy.examples) && (
            <div style={{ display: 'grid', gap: '10px' }}>
              {strategy.examples.map((ex, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '10px'
                }}>
                  <span style={{ color: '#67e8f9', fontWeight: '600', minWidth: '80px' }}>{ex.lang}</span>
                  <code style={{ color: '#fbbf24', fontSize: '0.8rem' }}>{ex.arg}</code>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{ex.effect}</span>
                </div>
              ))}
            </div>
          )}

          {/* Comparison */}
          {strategy.comparison && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {strategy.comparison.map((c, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: i === 0 ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: i === 0 ? '#f87171' : '#4ade80', fontWeight: '600', marginBottom: '4px' }}>{c.type}</div>
                  <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600', marginBottom: '4px' }}>{c.size}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{c.includes}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Size Comparison */}
      <div style={{
        background: 'rgba(34,197,94,0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(34,197,94,0.3)',
        marginBottom: '24px'
      }}>
        <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>{data.sizeComparison.title}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {data.sizeComparison.examples.map((ex, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#e2e8f0', flex: 1 }}>{ex.app}</span>
              <span style={{ color: '#f87171' }}>{ex.before}</span>
              <span style={{ color: '#94a3b8' }}>→</span>
              <span style={{ color: '#4ade80' }}>{ex.after}</span>
              <span style={{
                padding: '2px 8px',
                background: 'rgba(34,197,94,0.3)',
                borderRadius: '4px',
                fontSize: '0.7rem',
                color: '#86efac'
              }}>{ex.reduction}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Commands */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{data.commands.title}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {data.commands.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '10px'
            }}>
              <code style={{ color: '#67e8f9', fontSize: '0.8rem' }}>{item.cmd}</code>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CI/CD Integration Section
// ============================================================================

const CicdSection = () => {
  const data = CICD_INTEGRATION_DATA;
  const [selectedPlatform, setSelectedPlatform] = useState(0);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#8b5cf6' }}>
        {data.title}
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
        {data.subtitle}
      </p>

      {/* CI/CD Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{
          background: 'rgba(59,130,246,0.1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(59,130,246,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>{data.overview.ci.icon}</span>
            <h4 style={{ color: '#93c5fd', margin: 0 }}>{data.overview.ci.name}</h4>
          </div>
          <p style={{ color: '#bfdbfe', fontSize: '0.85rem', marginBottom: '12px' }}>{data.overview.ci.desc}</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {data.overview.ci.steps.map((step, i) => (
              <span key={i} style={{
                padding: '4px 10px',
                background: 'rgba(59,130,246,0.2)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                color: '#93c5fd'
              }}>{i + 1}. {step}</span>
            ))}
          </div>
        </div>
        <div style={{
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(34,197,94,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>{data.overview.cd.icon}</span>
            <h4 style={{ color: '#86efac', margin: 0 }}>{data.overview.cd.name}</h4>
          </div>
          <p style={{ color: '#bbf7d0', fontSize: '0.85rem', marginBottom: '12px' }}>{data.overview.cd.desc}</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {data.overview.cd.steps.map((step, i) => (
              <span key={i} style={{
                padding: '4px 10px',
                background: 'rgba(34,197,94,0.2)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                color: '#86efac'
              }}>{i + 1}. {step}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px', textAlign: 'center' }}>{data.workflow.title}</h4>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {data.workflow.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                padding: '12px 16px',
                background: `${step.color}20`,
                borderRadius: '10px',
                textAlign: 'center',
                minWidth: '90px'
              }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{step.icon}</div>
                <div style={{ color: step.color, fontSize: '0.75rem', fontWeight: '600' }}>{step.name}</div>
              </div>
              {i < data.workflow.steps.length - 1 && (
                <span style={{ color: '#94a3b8' }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Platform Examples */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{data.platforms.title}</h4>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {data.platforms.items.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelectedPlatform(i)}
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                border: selectedPlatform === i ? '2px solid #8b5cf6' : '2px solid transparent',
                background: selectedPlatform === i ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
                color: selectedPlatform === i ? '#c4b5fd' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{p.icon}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div style={{
            background: 'rgba(139,92,246,0.1)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h5 style={{ color: '#c4b5fd', marginBottom: '8px' }}>{data.platforms.items[selectedPlatform].name}</h5>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>{data.platforms.items[selectedPlatform].desc}</p>
          </div>
          <div style={{
            background: '#0d1117',
            borderRadius: '12px',
            padding: '16px',
            fontFamily: 'monospace',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            <pre style={{ margin: 0, color: '#e6edf3', fontSize: '0.7rem', whiteSpace: 'pre-wrap' }}>
              {data.platforms.items[selectedPlatform].example}
            </pre>
          </div>
        </div>
      </div>

      {/* Tagging Strategies */}
      <div style={{
        background: 'rgba(251,191,36,0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(251,191,36,0.3)',
        marginBottom: '24px'
      }}>
        <h4 style={{ color: '#fbbf24', marginBottom: '16px' }}>{data.tagging.title}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {data.tagging.strategies.map((s, i) => (
            <div key={i} style={{
              padding: '14px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#fef3c7', fontWeight: '600' }}>{s.name}</span>
                <code style={{ color: '#67e8f9', fontSize: '0.75rem' }}>{s.example}</code>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem' }}>
                <span style={{ color: '#86efac' }}>장점: {s.pros}</span>
                <span style={{ color: '#fca5a5' }}>단점: {s.cons}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          padding: '12px 16px',
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#86efac', fontSize: '0.85rem' }}>💡 {data.tagging.bestPractice}</span>
        </div>
      </div>

      {/* Registries */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>{data.registries.title}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {data.registries.items.map((r, i) => (
            <div key={i} style={{
              padding: '14px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{r.icon}</div>
              <div style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '0.8rem', marginBottom: '4px' }}>{r.name}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{r.type}</div>
              <div style={{ color: '#86efac', fontSize: '0.65rem', marginTop: '4px' }}>{r.free}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div style={{
        background: 'rgba(34,197,94,0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(34,197,94,0.3)'
      }}>
        <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>베스트 프랙티스</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
          {data.bestPractices.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// Section Labels
// ============================================================================

const DOCKERFILE_SECTIONS = ['명령어', 'CMD vs ENTRYPOINT', '.dockerignore', '멀티스테이지', 'ENV vs ARG', '트러블슈팅', '보안', '최적화', 'CI/CD'];

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
      {activeSection === 3 && <MultistageBuildSection />}
      {activeSection === 4 && <EnvVsArgSection />}
      {activeSection === 5 && <TroubleshootingSection />}
      {activeSection === 6 && <SecuritySection />}
      {activeSection === 7 && <OptimizationSection />}
      {activeSection === 8 && <CicdSection />}
    </div>
  );
};
