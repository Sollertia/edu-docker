/**
 * =============================================================================
 * Role: VM vs Docker Section View (Presentation Only)
 * =============================================================================
 *
 * DO NOT put state management here (use hooks)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing VM vs Docker comparison layout
 * - Updating analogy visualizations
 * - Modifying simulation display
 *
 * PROPS FROM CONTAINER:
 * - vmSimulation: { running, elapsed, vms, containers }
 * - runVmSimulation: () => void
 * - showCostDetail, setShowCostDetail
 * =============================================================================
 */

import React from 'react';
import {
  VM_ANALOGY,
  KEY_DIFFERENCE,
  KITCHEN_ANALOGY,
  COST_COMPARISON,
  SIMULATION_CONFIG
} from '../../../constants';

// ============================================================================
// Sub-components (Analogy Section)
// ============================================================================

const VmCard = () => (
  <div style={{
    background: 'linear-gradient(180deg, rgba(244,114,182,0.15), rgba(244,114,182,0.02))',
    borderRadius: '16px',
    padding: '24px',
    border: '2px solid rgba(244,114,182,0.4)'
  }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '8px' }}>{VM_ANALOGY.vm.emoji}</div>
      <h4 style={{ color: '#f472b6', fontSize: '1.2rem' }}>{VM_ANALOGY.vm.title}</h4>
    </div>
    <div style={{
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {VM_ANALOGY.vm.layers.map((item, i) => (
          <div
            key={i}
            style={{
              padding: item.bold ? '12px' : '10px',
              background: item.bg,
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: item.bold ? '0.85rem' : '0.8rem',
              fontWeight: item.bold ? '600' : '400'
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
    <div style={{ color: '#fda4af', fontSize: '0.85rem', lineHeight: '1.7' }}>
      {VM_ANALOGY.vm.points.map((point, i) => (
        <div key={i} style={{ marginBottom: i < VM_ANALOGY.vm.points.length - 1 ? '8px' : 0 }}>
          <strong>{point.title}</strong><br />{point.desc}
        </div>
      ))}
    </div>
  </div>
);

const DockerCard = () => (
  <div style={{
    background: 'linear-gradient(180deg, rgba(34,211,238,0.15), rgba(34,211,238,0.02))',
    borderRadius: '16px',
    padding: '24px',
    border: '2px solid rgba(34,211,238,0.4)'
  }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '8px' }}>{VM_ANALOGY.docker.emoji}</div>
      <h4 style={{ color: '#22d3ee', fontSize: '1.2rem' }}>{VM_ANALOGY.docker.title}</h4>
    </div>
    <div style={{
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {VM_ANALOGY.docker.apps.map((app, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '10px',
                background: VM_ANALOGY.docker.appColors[i],
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '0.75rem'
              }}
            >
              {app}
            </div>
          ))}
        </div>
        <div style={{
          padding: '12px',
          background: '#0284c7',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
          Docker Engine (건물 관리인)
        </div>
        <div style={{
          padding: '12px',
          background: '#0369a1',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '0.85rem',
          fontWeight: '600',
          border: '2px dashed #7dd3fc'
        }}>
          공용 OS 커널 (건물 기초)
        </div>
        <div style={{
          padding: '10px',
          background: '#075985',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '0.8rem'
        }}>
          공용 전기/수도/가스
        </div>
      </div>
    </div>
    <div style={{ color: '#67e8f9', fontSize: '0.85rem', lineHeight: '1.7' }}>
      {VM_ANALOGY.docker.points.map((point, i) => (
        <div key={i} style={{ marginBottom: i < VM_ANALOGY.docker.points.length - 1 ? '8px' : 0 }}>
          <strong>{point.title}</strong><br />{point.desc}
        </div>
      ))}
    </div>
  </div>
);

const KeyDifferenceSection = () => (
  <div style={{
    marginTop: '24px',
    padding: '20px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '14px',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '1.3rem', marginBottom: '12px' }}>💡 핵심 차이점</div>
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: '16px',
      alignItems: 'center'
    }}>
      <div style={{ padding: '14px', background: 'rgba(244,114,182,0.2)', borderRadius: '10px' }}>
        <div style={{ color: '#f472b6', fontWeight: '600' }}>{KEY_DIFFERENCE.vm.title}</div>
        <div style={{ color: '#fda4af', fontSize: '0.85rem', marginTop: '4px' }}>
          집마다 <strong>OS 전체</strong>를 따로 설치
        </div>
      </div>
      <div style={{ fontSize: '1.5rem' }}>⚔️</div>
      <div style={{ padding: '14px', background: 'rgba(34,211,238,0.2)', borderRadius: '10px' }}>
        <div style={{ color: '#22d3ee', fontWeight: '600' }}>{KEY_DIFFERENCE.docker.title}</div>
        <div style={{ color: '#67e8f9', fontSize: '0.85rem', marginTop: '4px' }}>
          <strong>OS 커널을 공유</strong>하고 방만 분리
        </div>
      </div>
    </div>
  </div>
);

const KitchenAnalogy = () => (
  <div style={{
    marginTop: '20px',
    padding: '16px',
    background: 'rgba(139,92,246,0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(139,92,246,0.3)'
  }}>
    <div style={{ color: '#c4b5fd', fontSize: '0.9rem', marginBottom: '8px' }}>🍳 다른 비유: 요리하기</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div style={{ color: '#fda4af', fontSize: '0.85rem' }}>
        <strong style={{ color: '#f472b6' }}>{KITCHEN_ANALOGY.vm.title}</strong> = {KITCHEN_ANALOGY.vm.desc}
        <br /><span style={{ color: '#94a3b8' }}>{KITCHEN_ANALOGY.vm.note}</span>
      </div>
      <div style={{ color: '#67e8f9', fontSize: '0.85rem' }}>
        <strong style={{ color: '#22d3ee' }}>{KITCHEN_ANALOGY.docker.title}</strong> = {KITCHEN_ANALOGY.docker.desc}
        <br /><span style={{ color: '#94a3b8' }}>{KITCHEN_ANALOGY.docker.note}</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// Sub-components (Simulation Section)
// ============================================================================

const SimulationButton = ({ running, elapsed, onClick }) => (
  <button
    onClick={onClick}
    disabled={running}
    style={{
      padding: '16px 40px',
      borderRadius: '14px',
      border: 'none',
      background: running
        ? 'rgba(255,255,255,0.1)'
        : 'linear-gradient(135deg, #f472b6, #8b5cf6)',
      color: running ? '#666' : '#fff',
      cursor: running ? 'not-allowed' : 'pointer',
      fontSize: '1.1rem',
      fontWeight: '700'
    }}
  >
    {running ? `⏳ 실행 중... ${(elapsed / 1000).toFixed(1)}초` : '🚀 시뮬레이션 시작!'}
  </button>
);

const VmSimulationPanel = ({ vms }) => (
  <div style={{
    background: 'linear-gradient(180deg, rgba(244,114,182,0.1), transparent)',
    borderRadius: '16px',
    padding: '20px',
    border: '2px solid rgba(244,114,182,0.4)'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <h4 style={{ color: '#f472b6' }}>🏠 VM × {SIMULATION_CONFIG.vmCount}</h4>
      <span style={{
        background: '#f472b6',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem'
      }}>
        {vms.filter(v => v.progress >= 100).length} / {SIMULATION_CONFIG.vmCount}
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '180px' }}>
      {vms.map(vm => (
        <div key={vm.id} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#fda4af' }}>VM-{vm.id + 1}</span>
            <span style={{
              color: vm.progress >= 100 ? '#86efac' : '#fda4af',
              fontSize: '0.8rem'
            }}>
              {vm.stage}
            </span>
          </div>
          <div style={{
            height: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${vm.progress}%`,
              background: vm.progress >= 100 ? '#22c55e' : '#f472b6',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContainerSimulationPanel = ({ containers }) => (
  <div style={{
    background: 'linear-gradient(180deg, rgba(34,211,238,0.1), transparent)',
    borderRadius: '16px',
    padding: '20px',
    border: '2px solid rgba(34,211,238,0.4)'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <h4 style={{ color: '#22d3ee' }}>🐳 Docker × {SIMULATION_CONFIG.containerCount}</h4>
      <span style={{
        background: '#22d3ee',
        color: '#0f172a',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem'
      }}>
        {containers.filter(c => c.progress >= 100).length} / {SIMULATION_CONFIG.containerCount}
      </span>
    </div>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      minHeight: '180px'
    }}>
      {containers.map(c => (
        <div
          key={c.id}
          style={{
            background: c.progress >= 100 ? 'rgba(34,197,94,0.3)' : 'rgba(0,0,0,0.3)',
            borderRadius: '10px',
            padding: '12px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '1.5rem' }}>{c.progress >= 100 ? '🟢' : '🔵'}</div>
          <div style={{ color: '#67e8f9', fontSize: '0.75rem' }}>C-{c.id + 1}</div>
        </div>
      ))}
    </div>
  </div>
);

const CostTable = ({ showDetail, setShowDetail }) => (
  <div style={{
    marginTop: '24px',
    padding: '20px',
    background: 'rgba(251,191,36,0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(251,191,36,0.3)'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <h4 style={{ color: '#fbbf24' }}>💰 비용 분석</h4>
      <button
        onClick={() => setShowDetail(!showDetail)}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          background: 'rgba(251,191,36,0.3)',
          color: '#fef3c7',
          cursor: 'pointer'
        }}
      >
        {showDetail ? '접기' : '상세 보기'}
      </button>
    </div>
    {showDetail && (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>항목</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#f472b6' }}>VM</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#22d3ee' }}>Docker</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#22c55e' }}>절감</th>
          </tr>
        </thead>
        <tbody>
          {COST_COMPARISON.map((row, i) => (
            <tr key={i}>
              <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e2e8f0' }}>{row.item}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#fda4af' }}>{row.vm}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#67e8f9' }}>{row.docker}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#86efac', fontWeight: '600' }}>{row.save}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

// ============================================================================
// Main View Component
// ============================================================================

export const VmDockerView = ({
  vmSimulation,
  runVmSimulation,
  showCostDetail,
  setShowCostDetail
}) => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Analogy Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,191,36,0.02))',
        borderRadius: '20px',
        padding: '28px',
        marginBottom: '20px',
        border: '1px solid rgba(251,191,36,0.3)'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#fbbf24' }}>
          🏠 쉬운 비유: 단독주택 vs 아파트
        </h3>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
          VM과 Docker의 차이를 집으로 비유해볼게요!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <VmCard />
          <DockerCard />
        </div>

        <KeyDifferenceSection />
        <KitchenAnalogy />
      </div>

      {/* Performance Simulation */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>
          ⚡ VM vs Docker 성능 비교
        </h3>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <SimulationButton
            running={vmSimulation.running}
            elapsed={vmSimulation.elapsed}
            onClick={runVmSimulation}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <VmSimulationPanel vms={vmSimulation.vms} />
          <ContainerSimulationPanel containers={vmSimulation.containers} />
        </div>

        <CostTable showDetail={showCostDetail} setShowDetail={setShowCostDetail} />
      </div>
    </div>
  );
};
