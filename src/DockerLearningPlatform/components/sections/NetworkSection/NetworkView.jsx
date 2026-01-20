/**
 * =============================================================================
 * Role: Network Section View (Presentation Only)
 * =============================================================================
 *
 * DO NOT put state management here (use hooks)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing network diagram layout
 * - Updating port mapping visualization
 * - Modifying container communication examples
 *
 * PROPS FROM CONTAINER:
 * - activeSection: number (current section index)
 * - onSectionChange: function (section change handler)
 * =============================================================================
 */

import React from 'react';
import { SectionNav } from '../../common';
import {
  NETWORK_SECTIONS,
  NETWORK_SERVICES,
  NETWORK_FEATURES,
  PORT_MAPPING_EXAMPLE,
  NETWORK_OVERVIEW,
  PORT_MAPPING_DATA,
  CONTAINER_COMMUNICATION_DATA,
  NETWORK_DRIVERS_DATA,
  LOCALHOST_TRAP_DATA,
  NETWORK_COMMANDS_DATA
} from '../../../constants';

// ============================================================================
// Overview Section (개요)
// ============================================================================

const OverviewSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#a78bfa' }}>
      🌐 {NETWORK_OVERVIEW.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {NETWORK_OVERVIEW.subtitle}
    </p>

    {/* Analogy Section */}
    <div style={{
      background: 'rgba(139,92,246,0.1)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid rgba(139,92,246,0.3)'
    }}>
      <h4 style={{ color: '#c4b5fd', marginBottom: '16px', textAlign: 'center' }}>
        {NETWORK_OVERVIEW.analogy.icon} {NETWORK_OVERVIEW.analogy.title}
      </h4>
      <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '20px' }}>
        {NETWORK_OVERVIEW.analogy.description}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {NETWORK_OVERVIEW.analogy.details.map((detail, i) => (
          <div key={i} style={{
            padding: '12px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#fbbf24', fontWeight: '600', marginBottom: '4px' }}>{detail.item}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>= {detail.equals}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>{detail.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Key Points */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {NETWORK_OVERVIEW.keyPoints.map((point, i) => (
        <div key={i} style={{
          padding: '20px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '14px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{point.icon}</div>
          <div style={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '8px' }}>{point.title}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{point.desc}</div>
        </div>
      ))}
    </div>

    {/* Default Network Info */}
    <div style={{
      padding: '16px',
      background: 'rgba(34,197,94,0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(34,197,94,0.3)'
    }}>
      <h5 style={{ color: '#4ade80', marginBottom: '8px' }}>💡 {NETWORK_OVERVIEW.defaultNetwork.title}</h5>
      <p style={{ color: '#86efac', margin: 0, fontSize: '0.9rem' }}>
        {NETWORK_OVERVIEW.defaultNetwork.description}
      </p>
      <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '0.85rem' }}>
        {NETWORK_OVERVIEW.defaultNetwork.note}
      </p>
    </div>
  </div>
);

// ============================================================================
// Port Mapping Section (포트 매핑)
// ============================================================================

const PortMappingDiagram = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '24px',
    padding: '24px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '16px'
  }}>
    <div style={{
      textAlign: 'center',
      padding: '20px 24px',
      background: 'rgba(139,92,246,0.2)',
      borderRadius: '16px',
      border: '2px solid rgba(139,92,246,0.4)'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🌐</div>
      <div style={{ color: '#c4b5fd', fontWeight: '600' }}>외부</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <code style={{
        padding: '8px 16px',
        background: 'rgba(34,197,94,0.3)',
        borderRadius: '8px',
        color: '#86efac'
      }}>
        -p 8080:8080
      </code>
      <div style={{ fontSize: '1.5rem', marginTop: '8px' }}>🚪→</div>
    </div>
    <div style={{
      textAlign: 'center',
      padding: '20px 24px',
      background: 'rgba(0,212,255,0.2)',
      borderRadius: '16px',
      border: '2px solid rgba(0,212,255,0.4)'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🐳</div>
      <div style={{ color: '#67e8f9', fontWeight: '600' }}>컨테이너</div>
    </div>
  </div>
);

const PortMappingComparison = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
    <div style={{
      padding: '20px',
      background: 'rgba(239,68,68,0.1)',
      borderRadius: '14px',
      border: '1px solid rgba(239,68,68,0.3)'
    }}>
      <h4 style={{ color: '#f87171', marginBottom: '12px' }}>🔒 -p 없이 실행하면?</h4>
      <code style={{
        display: 'block',
        background: 'rgba(0,0,0,0.3)',
        padding: '12px',
        borderRadius: '8px',
        color: '#fca5a5',
        fontSize: '0.85rem',
        marginBottom: '12px'
      }}>
        docker run -d myapp
      </code>
      <p style={{ color: '#fca5a5', fontSize: '0.9rem', margin: 0 }}>
        외부에서 <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>localhost:8080</code> 접근 불가!
      </p>
    </div>
    <div style={{
      padding: '20px',
      background: 'rgba(34,197,94,0.1)',
      borderRadius: '14px',
      border: '1px solid rgba(34,197,94,0.3)'
    }}>
      <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>✅ -p로 포트 열기</h4>
      <code style={{
        display: 'block',
        background: 'rgba(0,0,0,0.3)',
        padding: '12px',
        borderRadius: '8px',
        color: '#86efac',
        fontSize: '0.85rem',
        marginBottom: '12px'
      }}>
        docker run -d -p 8080:8080 myapp
      </code>
      <p style={{ color: '#86efac', fontSize: '0.9rem', margin: 0 }}>
        이제 <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>localhost:8080</code> 접근 가능!
      </p>
    </div>
  </div>
);

const PortFormatExplainer = () => (
  <div style={{
    padding: '20px',
    background: 'rgba(251,191,36,0.1)',
    borderRadius: '14px',
    border: '1px solid rgba(251,191,36,0.3)',
    marginBottom: '24px'
  }}>
    <h4 style={{ color: '#fbbf24', marginBottom: '16px', textAlign: 'center' }}>포트 형식</h4>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center', marginBottom: '12px' }}>
      <code style={{
        padding: '12px 20px',
        background: PORT_MAPPING_EXAMPLE.hostPort.color,
        borderRadius: '8px 0 0 8px',
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: '600'
      }}>
        {PORT_MAPPING_EXAMPLE.hostPort.label}
      </code>
      <code style={{ padding: '12px 8px', background: '#64748b', color: '#fff', fontSize: '1.1rem' }}>:</code>
      <code style={{
        padding: '12px 20px',
        background: PORT_MAPPING_EXAMPLE.containerPort.color,
        borderRadius: '0 8px 8px 0',
        color: '#0f172a',
        fontSize: '1.1rem',
        fontWeight: '600'
      }}>
        {PORT_MAPPING_EXAMPLE.containerPort.label}
      </code>
    </div>
    <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
      <span style={{ color: PORT_MAPPING_EXAMPLE.hostPort.color }}>{PORT_MAPPING_EXAMPLE.hostPort.desc}</span>
      {' : '}
      <span style={{ color: PORT_MAPPING_EXAMPLE.containerPort.color }}>{PORT_MAPPING_EXAMPLE.containerPort.desc}</span>
    </div>
  </div>
);

const PortFormats = () => (
  <div style={{ marginBottom: '24px' }}>
    <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>📝 다양한 포트 매핑 형식</h4>
    <div style={{ display: 'grid', gap: '12px' }}>
      {PORT_MAPPING_DATA.formats.map((format, i) => (
        <div key={i} style={{
          padding: '16px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '16px',
          alignItems: 'center'
        }}>
          <code style={{
            padding: '8px 16px',
            background: 'rgba(59,130,246,0.3)',
            borderRadius: '8px',
            color: '#93c5fd',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }}>
            {format.format}
          </code>
          <div>
            <div style={{ color: '#e2e8f0', marginBottom: '4px' }}>{format.desc}</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{format.example}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CommonPorts = () => (
  <div style={{ marginBottom: '24px' }}>
    <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>🔢 자주 사용하는 포트</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
      {PORT_MAPPING_DATA.commonPorts.map((port, i) => (
        <div key={i} style={{
          padding: '12px 16px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <div style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '4px' }}>{port.service}</div>
          <code style={{
            display: 'block',
            color: '#94a3b8',
            fontSize: '0.85rem'
          }}>
            {port.example}
          </code>
        </div>
      ))}
    </div>
  </div>
);

const PortMappingTips = () => (
  <div style={{
    padding: '16px',
    background: 'rgba(34,197,94,0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(34,197,94,0.3)'
  }}>
    <h5 style={{ color: '#4ade80', marginBottom: '12px' }}>💡 팁</h5>
    <ul style={{ margin: 0, paddingLeft: '20px', color: '#86efac' }}>
      {PORT_MAPPING_DATA.tips.map((tip, i) => (
        <li key={i} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>{tip}</li>
      ))}
    </ul>
  </div>
);

const PortMappingSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f59e0b' }}>
      🔌 {PORT_MAPPING_DATA.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {PORT_MAPPING_DATA.subtitle}
    </p>

    <PortMappingDiagram />
    <PortMappingComparison />
    <PortFormatExplainer />
    <PortFormats />
    <CommonPorts />
    <PortMappingTips />
  </div>
);

// ============================================================================
// Container Communication Section (컨테이너 통신)
// ============================================================================

const NetworkDiagram = () => (
  <div style={{
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px'
  }}>
    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
      <span style={{
        padding: '8px 16px',
        background: 'rgba(139,92,246,0.3)',
        borderRadius: '20px',
        color: '#c4b5fd',
        fontSize: '0.85rem'
      }}>
        🌐 Docker Network
      </span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
      {NETWORK_SERVICES.map((svc, i) => (
        <div
          key={i}
          style={{
            textAlign: 'center',
            padding: '20px',
            background: `linear-gradient(180deg, ${svc.color}, ${svc.color}99)`,
            borderRadius: '16px',
            minWidth: '120px'
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{svc.icon}</div>
          <div style={{ color: '#fff', fontWeight: '600' }}>{svc.name}</div>
          <code style={{
            display: 'block',
            marginTop: '8px',
            background: 'rgba(0,0,0,0.3)',
            padding: '4px 8px',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.75rem'
          }}>
            :{svc.port}
          </code>
          <div style={{
            marginTop: '8px',
            padding: '4px 8px',
            background: svc.external ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: svc.external ? '#fff' : '#fca5a5'
          }}>
            {svc.external ? '외부 노출 ✓' : '내부 전용'}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CommunicationScenarios = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
    {CONTAINER_COMMUNICATION_DATA.scenarios.map((scenario, i) => (
      <div key={i} style={{
        padding: '20px',
        background: `rgba(${scenario.color === '#22c55e' ? '34,197,94' : '239,68,68'},0.1)`,
        borderRadius: '14px',
        border: `1px solid ${scenario.color}50`
      }}>
        <h4 style={{ color: scenario.color, marginBottom: '12px' }}>
          {scenario.icon} {scenario.title}
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '12px' }}>
          {scenario.description}
        </p>
        <div style={{
          padding: '12px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '8px'
        }}>
          <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '8px' }}>
            {scenario.example.from} → {scenario.example.to}
          </div>
          <code style={{
            display: 'block',
            color: scenario.color,
            fontSize: '0.85rem',
            marginBottom: '4px'
          }}>
            {scenario.example.code}
          </code>
          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
            {scenario.example.note}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const DNSFlowDiagram = () => (
  <div style={{
    padding: '20px',
    background: 'rgba(59,130,246,0.1)',
    borderRadius: '14px',
    border: '1px solid rgba(59,130,246,0.3)',
    marginBottom: '24px'
  }}>
    <h4 style={{ color: '#60a5fa', marginBottom: '16px', textAlign: 'center' }}>
      🔍 {CONTAINER_COMMUNICATION_DATA.dnsFlow.title}
    </h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {CONTAINER_COMMUNICATION_DATA.dnsFlow.steps.map((step, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '600'
          }}>
            {step.step}
          </div>
          <div style={{ fontSize: '1.2rem' }}>{step.icon}</div>
          <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{step.action}</div>
        </div>
      ))}
    </div>
  </div>
);

const ComposeExampleBlock = () => (
  <div style={{
    padding: '20px',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '14px',
    marginBottom: '24px'
  }}>
    <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>
      📦 {CONTAINER_COMMUNICATION_DATA.composeExample.title}
    </h4>
    <pre style={{
      margin: 0,
      padding: '16px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '10px',
      overflowX: 'auto',
      fontSize: '0.85rem',
      lineHeight: '1.5'
    }}>
      <code style={{ color: '#94a3b8' }}>
        {CONTAINER_COMMUNICATION_DATA.composeExample.code}
      </code>
    </pre>
  </div>
);

const FeatureCards = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
    {NETWORK_FEATURES.map((feature, i) => (
      <div
        key={i}
        style={{
          padding: '16px',
          background: feature.bgColor,
          borderRadius: '12px',
          border: `1px solid ${feature.borderColor}`
        }}
      >
        <div style={{ color: feature.color, fontWeight: '600', marginBottom: '8px' }}>
          {feature.title}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          {feature.desc}
        </p>
      </div>
    ))}
  </div>
);

const CommunicationTips = () => (
  <div style={{
    padding: '16px',
    background: 'rgba(34,197,94,0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(34,197,94,0.3)'
  }}>
    <h5 style={{ color: '#4ade80', marginBottom: '12px' }}>💡 팁</h5>
    <ul style={{ margin: 0, paddingLeft: '20px', color: '#86efac' }}>
      {CONTAINER_COMMUNICATION_DATA.tips.map((tip, i) => (
        <li key={i} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>{tip}</li>
      ))}
    </ul>
  </div>
);

const ContainerCommunicationSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#a78bfa' }}>
      🔗 {CONTAINER_COMMUNICATION_DATA.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {CONTAINER_COMMUNICATION_DATA.subtitle}
    </p>

    <NetworkDiagram />
    <CommunicationScenarios />
    <DNSFlowDiagram />
    <ComposeExampleBlock />
    <FeatureCards />
    <CommunicationTips />
  </div>
);

// ============================================================================
// Network Drivers Section (네트워크 드라이버)
// ============================================================================

const DriverCard = ({ driver }) => (
  <div style={{
    padding: '24px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '16px',
    border: `2px solid ${driver.color}50`
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <span style={{ fontSize: '2rem' }}>{driver.icon}</span>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h4 style={{ color: driver.color, margin: 0 }}>{driver.name}</h4>
          {driver.isDefault && (
            <span style={{
              padding: '2px 8px',
              background: driver.color,
              borderRadius: '4px',
              fontSize: '0.7rem',
              color: '#fff'
            }}>기본</span>
          )}
        </div>
        <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '0.85rem' }}>
          {driver.description}
        </p>
      </div>
    </div>

    <div style={{
      padding: '12px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: '10px',
      marginBottom: '16px'
    }}>
      <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '4px' }}>주요 사용처</div>
      <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{driver.useCase}</div>
    </div>

    <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
      {driver.features.map((feature, i) => (
        <li key={i} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>
          {feature}
        </li>
      ))}
    </ul>

    <code style={{
      display: 'block',
      padding: '10px 14px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '8px',
      color: '#93c5fd',
      fontSize: '0.85rem'
    }}>
      {driver.command}
    </code>

    {driver.warning && (
      <div style={{
        marginTop: '12px',
        padding: '10px',
        background: 'rgba(239,68,68,0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(239,68,68,0.3)'
      }}>
        <span style={{ color: '#f87171', fontSize: '0.85rem' }}>⚠️ {driver.warning}</span>
      </div>
    )}
  </div>
);

const DriverComparisonTable = () => (
  <div style={{
    overflowX: 'auto',
    marginTop: '24px'
  }}>
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.9rem'
    }}>
      <thead>
        <tr style={{ background: 'rgba(139,92,246,0.2)' }}>
          {NETWORK_DRIVERS_DATA.comparison.headers.map((header, i) => (
            <th key={i} style={{
              padding: '12px 16px',
              textAlign: 'left',
              color: '#c4b5fd',
              fontWeight: '600',
              borderBottom: '2px solid rgba(139,92,246,0.4)'
            }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {NETWORK_DRIVERS_DATA.comparison.rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'transparent' }}>
            {row.map((cell, j) => (
              <td key={j} style={{
                padding: '12px 16px',
                color: j === 0 ? '#e2e8f0' : '#94a3b8',
                fontWeight: j === 0 ? '600' : '400',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const NetworkDriversSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#8b5cf6' }}>
      🔧 {NETWORK_DRIVERS_DATA.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {NETWORK_DRIVERS_DATA.subtitle}
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
      {NETWORK_DRIVERS_DATA.drivers.map((driver, i) => (
        <DriverCard key={i} driver={driver} />
      ))}
    </div>

    <DriverComparisonTable />
  </div>
);

// ============================================================================
// Localhost Trap Section (localhost 함정)
// ============================================================================

const LocalhostProblem = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(239,68,68,0.1)',
    borderRadius: '16px',
    border: '2px solid rgba(239,68,68,0.3)',
    marginBottom: '24px'
  }}>
    <h4 style={{ color: '#f87171', marginBottom: '16px' }}>
      ❌ {LOCALHOST_TRAP_DATA.problem.title}
    </h4>
    <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
      {LOCALHOST_TRAP_DATA.problem.scenario}
    </p>
    <div style={{
      padding: '16px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '10px',
      marginBottom: '12px'
    }}>
      <code style={{
        display: 'block',
        color: '#fca5a5',
        marginBottom: '8px'
      }}>
        {LOCALHOST_TRAP_DATA.problem.badConfig.code}
      </code>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
        padding: '8px',
        background: 'rgba(239,68,68,0.2)',
        borderRadius: '6px'
      }}>
        <span>💥</span>
        <code style={{ color: '#f87171', fontSize: '0.85rem' }}>
          {LOCALHOST_TRAP_DATA.problem.badConfig.error}
        </code>
      </div>
    </div>
    <p style={{ color: '#fca5a5', margin: 0, fontWeight: '600' }}>
      {LOCALHOST_TRAP_DATA.problem.reason}
    </p>
  </div>
);

const LocalhostExplanation = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(251,191,36,0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(251,191,36,0.3)',
    marginBottom: '24px'
  }}>
    <h4 style={{ color: '#fbbf24', marginBottom: '16px' }}>
      🤔 {LOCALHOST_TRAP_DATA.explanation.title}
    </h4>
    <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
      {LOCALHOST_TRAP_DATA.explanation.diagram.map((item, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '4px' }}>
              {item.location}
            </div>
            <code style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              localhost = {item.localhost}
            </code>
          </div>
        </div>
      ))}
    </div>
    <div style={{
      padding: '12px',
      background: 'rgba(251,191,36,0.2)',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <strong style={{ color: '#fbbf24' }}>
        ⚡ {LOCALHOST_TRAP_DATA.explanation.point}
      </strong>
    </div>
  </div>
);

const LocalhostSolution = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(34,197,94,0.1)',
    borderRadius: '16px',
    border: '2px solid rgba(34,197,94,0.3)',
    marginBottom: '24px'
  }}>
    <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>
      ✅ {LOCALHOST_TRAP_DATA.solution.title}
    </h4>
    <div style={{ display: 'grid', gap: '16px' }}>
      {LOCALHOST_TRAP_DATA.solution.options.map((option, i) => (
        <div key={i} style={{
          padding: '16px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          border: option.recommended ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: option.recommended ? '#4ade80' : '#e2e8f0', fontWeight: '600' }}>
              {option.method}
            </span>
            {option.recommended && (
              <span style={{
                padding: '2px 8px',
                background: '#22c55e',
                borderRadius: '4px',
                fontSize: '0.7rem',
                color: '#fff'
              }}>
                권장
              </span>
            )}
          </div>
          <code style={{
            display: 'block',
            padding: '10px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            color: '#86efac',
            fontSize: '0.85rem',
            marginBottom: '8px'
          }}>
            {option.code}
          </code>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.85rem' }}>{option.note}</p>
        </div>
      ))}
    </div>
  </div>
);

const CommonMistakes = () => (
  <div style={{ marginBottom: '24px' }}>
    <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>❌ → ✅ 흔한 실수와 해결</h4>
    <div style={{ display: 'grid', gap: '12px' }}>
      {LOCALHOST_TRAP_DATA.commonMistakes.map((mistake, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '12px',
          alignItems: 'center',
          padding: '12px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <code style={{
            padding: '8px 12px',
            background: 'rgba(239,68,68,0.2)',
            borderRadius: '6px',
            color: '#fca5a5',
            fontSize: '0.85rem',
            textAlign: 'center'
          }}>
            {mistake.wrong}
          </code>
          <span style={{ fontSize: '1.2rem' }}>→</span>
          <code style={{
            padding: '8px 12px',
            background: 'rgba(34,197,94,0.2)',
            borderRadius: '6px',
            color: '#86efac',
            fontSize: '0.85rem',
            textAlign: 'center'
          }}>
            {mistake.right}
          </code>
        </div>
      ))}
    </div>
  </div>
);

const SpecialCases = () => (
  <div style={{
    padding: '20px',
    background: 'rgba(139,92,246,0.1)',
    borderRadius: '14px',
    border: '1px solid rgba(139,92,246,0.3)'
  }}>
    <h4 style={{ color: '#c4b5fd', marginBottom: '16px' }}>
      🔮 {LOCALHOST_TRAP_DATA.specialCases.title}
    </h4>
    <div style={{ display: 'grid', gap: '12px' }}>
      {LOCALHOST_TRAP_DATA.specialCases.cases.map((item, i) => (
        <div key={i} style={{
          padding: '12px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <div style={{ color: '#e2e8f0', marginBottom: '8px' }}>{item.case}</div>
          <code style={{ color: '#a78bfa', fontSize: '0.85rem' }}>{item.solution}</code>
          {item.linuxNote && (
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>
              {item.linuxNote}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const LocalhostTrapSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#ef4444' }}>
      🚨 {LOCALHOST_TRAP_DATA.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {LOCALHOST_TRAP_DATA.subtitle}
    </p>

    <LocalhostProblem />
    <LocalhostExplanation />
    <LocalhostSolution />
    <CommonMistakes />
    <SpecialCases />
  </div>
);

// ============================================================================
// Commands Section (명령어)
// ============================================================================

const CommandCategory = ({ category }) => (
  <div style={{
    padding: '20px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '16px',
    marginBottom: '16px'
  }}>
    <h4 style={{ color: '#a78bfa', marginBottom: '16px' }}>{category.category}</h4>
    <div style={{ display: 'grid', gap: '12px' }}>
      {category.commands.map((cmd, i) => (
        <div key={i} style={{
          padding: '14px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>{cmd.icon}</span>
            <div style={{ flex: 1 }}>
              <code style={{
                display: 'block',
                padding: '8px 12px',
                background: 'rgba(59,130,246,0.2)',
                borderRadius: '6px',
                color: '#93c5fd',
                fontSize: '0.85rem',
                marginBottom: '8px'
              }}>
                {cmd.cmd}
              </code>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>{cmd.desc}</p>
              {cmd.output && (
                <pre style={{
                  margin: '8px 0 0 0',
                  padding: '10px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '6px',
                  color: '#64748b',
                  fontSize: '0.75rem',
                  overflow: 'auto'
                }}>
                  {cmd.output}
                </pre>
              )}
              {cmd.note && (
                <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '0.8rem' }}>
                  💡 {cmd.note}
                </p>
              )}
              {cmd.warning && (
                <p style={{ color: '#fca5a5', margin: '8px 0 0 0', fontSize: '0.8rem' }}>
                  ⚠️ {cmd.warning}
                </p>
              )}
              {cmd.shows && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {cmd.shows.map((item, j) => (
                    <span key={j} style={{
                      padding: '4px 8px',
                      background: 'rgba(139,92,246,0.2)',
                      borderRadius: '4px',
                      color: '#c4b5fd',
                      fontSize: '0.75rem'
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TroubleshootingGuide = () => (
  <div style={{
    padding: '20px',
    background: 'rgba(239,68,68,0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(239,68,68,0.3)'
  }}>
    <h4 style={{ color: '#f87171', marginBottom: '16px' }}>
      🔧 {NETWORK_COMMANDS_DATA.troubleshooting.title}
    </h4>
    <div style={{ display: 'grid', gap: '16px' }}>
      {NETWORK_COMMANDS_DATA.troubleshooting.issues.map((issue, i) => (
        <div key={i} style={{
          padding: '16px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px'
        }}>
          <code style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: 'rgba(239,68,68,0.2)',
            borderRadius: '6px',
            color: '#fca5a5',
            marginBottom: '12px'
          }}>
            {issue.error}
          </code>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '6px' }}>원인</div>
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                {issue.causes.map((cause, j) => (
                  <li key={j} style={{ marginBottom: '4px' }}>{cause}</li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ color: '#4ade80', fontSize: '0.8rem', marginBottom: '6px' }}>해결</div>
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#86efac', fontSize: '0.85rem' }}>
                {issue.solutions.map((sol, j) => (
                  <li key={j} style={{ marginBottom: '4px' }}>{sol}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CommandsSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#60a5fa' }}>
      ⌨️ {NETWORK_COMMANDS_DATA.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {NETWORK_COMMANDS_DATA.subtitle}
    </p>

    {NETWORK_COMMANDS_DATA.categories.map((category, i) => (
      <CommandCategory key={i} category={category} />
    ))}

    <TroubleshootingGuide />
  </div>
);

// ============================================================================
// Section Components Mapping
// ============================================================================

const SECTION_COMPONENTS = {
  0: OverviewSection,
  1: PortMappingSection,
  2: ContainerCommunicationSection,
  3: NetworkDriversSection,
  4: LocalhostTrapSection,
  5: CommandsSection
};

// ============================================================================
// Main View Component
// ============================================================================

export const NetworkView = ({ activeSection, onSectionChange }) => {
  const [localActiveSection, setLocalActiveSection] = React.useState(0);

  // props가 전달되면 controlled, 아니면 내부 state 사용
  const isControlled = activeSection !== undefined && onSectionChange !== undefined;
  const currentSection = isControlled ? activeSection : localActiveSection;
  const handleSectionChange = isControlled ? onSectionChange : setLocalActiveSection;

  const SectionComponent = SECTION_COMPONENTS[currentSection] || OverviewSection;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <SectionNav
        sections={NETWORK_SECTIONS}
        activeIndex={currentSection}
        onSelect={handleSectionChange}
        activeColor="#a78bfa"
      />
      <SectionComponent />
    </div>
  );
};
