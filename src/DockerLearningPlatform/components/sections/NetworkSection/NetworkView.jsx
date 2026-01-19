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
 * - Currently stateless (no props needed)
 * =============================================================================
 */

import React from 'react';
import {
  NETWORK_SERVICES,
  NETWORK_FEATURES,
  PORT_MAPPING_EXAMPLE
} from '../../../constants';

// ============================================================================
// Sub-components (Port Mapping)
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
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
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
    border: '1px solid rgba(251,191,36,0.3)'
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

// ============================================================================
// Sub-components (Container Communication)
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

const FeatureCards = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
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
          {feature.desc.includes('db') ? (
            <>
              {feature.desc.replace('db', '')}
              <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px' }}>db</code>
            </>
          ) : (
            feature.desc
          )}
        </p>
      </div>
    ))}
  </div>
);

// ============================================================================
// Main View Component
// ============================================================================

export const NetworkView = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Port Mapping Section */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        padding: '28px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f59e0b' }}>
          🔌 포트 매핑
        </h3>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
          컨테이너는 기본적으로 격리됨 → 외부 접근을 위해{' '}
          <strong style={{ color: '#22c55e' }}>-p</strong> 옵션 필요!
        </p>

        <PortMappingDiagram />
        <PortMappingComparison />
        <PortFormatExplainer />
      </div>

      {/* Container Communication Section */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#a78bfa' }}>
          🔗 컨테이너 간 통신
        </h3>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
          같은 네트워크 안의 컨테이너는{' '}
          <strong style={{ color: '#a78bfa' }}>서비스 이름</strong>으로 통신
        </p>

        <NetworkDiagram />
        <FeatureCards />
      </div>
    </div>
  );
};
