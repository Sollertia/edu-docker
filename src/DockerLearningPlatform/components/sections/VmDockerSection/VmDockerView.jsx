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

import React, { useState } from 'react';
import { SectionNav } from '../../common';
import {
  VM_ANALOGY,
  KEY_DIFFERENCE,
  KITCHEN_ANALOGY,
  COST_COMPARISON,
  SIMULATION_CONFIG,
  VIRTUALIZATION_HISTORY,
  WHY_CONTAINER_LIGHT,
  VM_DOCKER_SECTIONS
} from '../../../constants';

// ============================================================================
// Section 0: 가상화 역사
// ============================================================================

const HistoryEraCard = ({ era }) => (
  <div style={{
    padding: '24px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '16px',
    border: `2px solid ${era.color}50`
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <span style={{ fontSize: '2.5rem' }}>{era.icon}</span>
      <div>
        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{era.era}</div>
        <h4 style={{ color: era.color, margin: 0 }}>{era.title}</h4>
      </div>
    </div>

    {/* 자동차 비유 */}
    <div style={{
      padding: '12px',
      background: `${era.color}20`,
      borderRadius: '10px',
      marginBottom: '16px',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '1.5rem' }}>{era.analogy.emoji}</span>
      <div style={{ color: era.color, fontWeight: '600', marginTop: '4px' }}>{era.analogy.title}</div>
      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{era.analogy.desc}</div>
    </div>

    {/* 문제점 또는 해결책 */}
    {era.problem && (
      <div style={{
        padding: '10px',
        background: 'rgba(239,68,68,0.1)',
        borderRadius: '8px',
        marginBottom: '12px',
        textAlign: 'center',
        color: '#fca5a5',
        fontWeight: '600'
      }}>
        {era.problem}
      </div>
    )}
    {era.solution && (
      <div style={{
        padding: '10px',
        background: 'rgba(34,197,94,0.1)',
        borderRadius: '8px',
        marginBottom: '12px',
        textAlign: 'center',
        color: '#86efac',
        fontWeight: '600'
      }}>
        {era.solution}
      </div>
    )}

    {/* 이슈 또는 장점 */}
    {era.issues && (
      <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', color: '#fca5a5', fontSize: '0.85rem' }}>
        {era.issues.map((issue, i) => (
          <li key={i} style={{ marginBottom: '4px' }}>{issue}</li>
        ))}
      </ul>
    )}
    {era.benefits && (
      <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', color: '#86efac', fontSize: '0.85rem' }}>
        {era.benefits.map((benefit, i) => (
          <li key={i} style={{ marginBottom: '4px' }}>{benefit}</li>
        ))}
      </ul>
    )}
    {era.remaining && (
      <div style={{ marginBottom: '12px' }}>
        <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginBottom: '4px' }}>⚠️ 남은 문제</div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#fcd34d', fontSize: '0.85rem' }}>
          {era.remaining.map((item, i) => (
            <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
          ))}
        </ul>
      </div>
    )}

    {/* 실제 사례 */}
    {era.realWorld && (
      <div style={{
        padding: '10px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        fontSize: '0.8rem',
        color: '#94a3b8'
      }}>
        📌 {era.realWorld}
      </div>
    )}
  </div>
);

const KeyInsightSection = () => (
  <div style={{
    marginTop: '24px',
    padding: '24px',
    background: 'rgba(251,191,36,0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(251,191,36,0.3)'
  }}>
    <h4 style={{ color: '#fbbf24', marginBottom: '16px', textAlign: 'center' }}>
      {VIRTUALIZATION_HISTORY.keyInsight.icon} {VIRTUALIZATION_HISTORY.keyInsight.title}
    </h4>
    <div style={{ display: 'grid', gap: '12px' }}>
      {VIRTUALIZATION_HISTORY.keyInsight.points.map((point, i) => (
        <div key={i} style={{
          padding: '14px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <div style={{ color: '#fbbf24', fontWeight: '600', marginBottom: '6px' }}>
            Q. {point.question}
          </div>
          <div style={{ color: '#fef3c7', fontSize: '0.9rem' }}>
            A. {point.answer}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VirtualizationHistorySection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#a78bfa' }}>
      📜 {VIRTUALIZATION_HISTORY.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {VIRTUALIZATION_HISTORY.subtitle}
    </p>

    {/* 비유 소개 */}
    <div style={{
      padding: '16px',
      background: 'rgba(139,92,246,0.1)',
      borderRadius: '12px',
      marginBottom: '24px',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '2rem' }}>{VIRTUALIZATION_HISTORY.analogy.icon}</span>
      <h4 style={{ color: '#c4b5fd', margin: '8px 0 4px 0' }}>{VIRTUALIZATION_HISTORY.analogy.title}</h4>
      <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
        {VIRTUALIZATION_HISTORY.analogy.description}
      </p>
    </div>

    {/* 시대별 카드 */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {VIRTUALIZATION_HISTORY.eras.map((era, i) => (
        <HistoryEraCard key={i} era={era} />
      ))}
    </div>

    <KeyInsightSection />
  </div>
);

// ============================================================================
// Section 1: VM vs Docker (기존 비유)
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

const VmVsDockerSection = () => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,191,36,0.02))',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(251,191,36,0.3)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#fbbf24' }}>
      🏠 쉬운 비유: 단독주택 vs 아파트
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      VM과 Docker의 차이를 집으로 비유해볼게요!
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      <VmCard />
      <DockerCard />
    </div>

    <KeyDifferenceSection />
    <KitchenAnalogy />
  </div>
);

// ============================================================================
// Section 2: 왜 가벼운가? (기술적 설명)
// ============================================================================

const ArchitectureDiagram = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
    {/* VM 구조 */}
    <div style={{
      padding: '20px',
      background: 'rgba(139,92,246,0.1)',
      borderRadius: '16px',
      border: '2px solid rgba(139,92,246,0.3)'
    }}>
      <h4 style={{ color: '#a78bfa', textAlign: 'center', marginBottom: '16px' }}>
        {WHY_CONTAINER_LIGHT.comparison.vm.icon} {WHY_CONTAINER_LIGHT.comparison.vm.title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {WHY_CONTAINER_LIGHT.comparison.vm.layers.map((layer, i) => (
          <div key={i} style={{
            padding: layer.highlight ? '14px' : '10px',
            background: layer.color,
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '0.85rem',
            border: layer.highlight ? '2px dashed #fff' : 'none',
            fontWeight: layer.highlight ? '600' : '400'
          }}>
            {layer.name} {layer.size && <span style={{ opacity: 0.8 }}>({layer.size})</span>}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '12px',
        padding: '10px',
        background: 'rgba(239,68,68,0.2)',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#fca5a5',
        fontSize: '0.85rem'
      }}>
        ❌ {WHY_CONTAINER_LIGHT.comparison.vm.problem}
      </div>
    </div>

    {/* Container 구조 */}
    <div style={{
      padding: '20px',
      background: 'rgba(14,165,233,0.1)',
      borderRadius: '16px',
      border: '2px solid rgba(14,165,233,0.3)'
    }}>
      <h4 style={{ color: '#0ea5e9', textAlign: 'center', marginBottom: '16px' }}>
        {WHY_CONTAINER_LIGHT.comparison.container.icon} {WHY_CONTAINER_LIGHT.comparison.container.title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {WHY_CONTAINER_LIGHT.comparison.container.layers.map((layer, i) => (
          <div key={i} style={{
            padding: layer.highlight ? '14px' : '10px',
            background: layer.color,
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '0.85rem',
            border: layer.highlight ? '2px dashed #7dd3fc' : 'none',
            fontWeight: layer.highlight ? '600' : '400'
          }}>
            {layer.name}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '12px',
        padding: '10px',
        background: 'rgba(34,197,94,0.2)',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#86efac',
        fontSize: '0.85rem'
      }}>
        ✅ {WHY_CONTAINER_LIGHT.comparison.container.solution}
      </div>
    </div>
  </div>
);

const KernelSharingExplanation = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(251,191,36,0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(251,191,36,0.3)',
    marginBottom: '24px'
  }}>
    <h4 style={{ color: '#fbbf24', marginBottom: '16px', textAlign: 'center' }}>
      {WHY_CONTAINER_LIGHT.kernelSharing.icon} {WHY_CONTAINER_LIGHT.kernelSharing.title}
    </h4>

    {/* 비유 */}
    <div style={{
      padding: '16px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: '12px',
      marginBottom: '16px'
    }}>
      <div style={{ color: '#fbbf24', fontWeight: '600', marginBottom: '12px', textAlign: 'center' }}>
        🏢 {WHY_CONTAINER_LIGHT.kernelSharing.analogy.title}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ padding: '12px', background: 'rgba(244,114,182,0.2)', borderRadius: '8px' }}>
          <div style={{ color: '#f472b6', fontWeight: '600', marginBottom: '4px' }}>VM</div>
          <div style={{ color: '#fda4af', fontSize: '0.85rem' }}>{WHY_CONTAINER_LIGHT.kernelSharing.analogy.vm}</div>
        </div>
        <div style={{ padding: '12px', background: 'rgba(34,197,94,0.2)', borderRadius: '8px' }}>
          <div style={{ color: '#22c55e', fontWeight: '600', marginBottom: '4px' }}>Container</div>
          <div style={{ color: '#86efac', fontSize: '0.85rem' }}>{WHY_CONTAINER_LIGHT.kernelSharing.analogy.container}</div>
        </div>
      </div>
    </div>

    {/* 설명 */}
    <div style={{ display: 'grid', gap: '10px' }}>
      {WHY_CONTAINER_LIGHT.kernelSharing.explanation.map((item, i) => (
        <div key={i} style={{
          padding: '12px 16px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px'
        }}>
          <span style={{ color: '#fbbf24', fontWeight: '600' }}>{item.term}</span>
          <span style={{ color: '#94a3b8' }}> - {item.desc}</span>
        </div>
      ))}
    </div>
  </div>
);

const IsolationTechnologies = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(139,92,246,0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(139,92,246,0.3)'
  }}>
    <h4 style={{ color: '#a78bfa', marginBottom: '8px', textAlign: 'center' }}>
      {WHY_CONTAINER_LIGHT.isolation.icon} {WHY_CONTAINER_LIGHT.isolation.title}
    </h4>
    <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
      {WHY_CONTAINER_LIGHT.isolation.subtitle}
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
      {WHY_CONTAINER_LIGHT.isolation.technologies.map((tech, i) => (
        <div key={i} style={{
          padding: '20px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          border: `1px solid ${tech.color}50`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
            <span style={{ color: tech.color, fontWeight: '600', fontSize: '1.1rem' }}>{tech.name}</span>
          </div>
          <p style={{ color: '#e2e8f0', margin: '0 0 12px 0', fontSize: '0.9rem' }}>{tech.desc}</p>
          <div style={{
            padding: '10px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '4px' }}>비유</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{tech.analogy}</div>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {tech.types.map((type, j) => (
              <span key={j} style={{
                padding: '4px 10px',
                background: `${tech.color}30`,
                borderRadius: '6px',
                color: tech.color,
                fontSize: '0.75rem'
              }}>
                {type}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* 요약 */}
    <div style={{
      padding: '16px',
      background: 'rgba(34,197,94,0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(34,197,94,0.3)',
      textAlign: 'center'
    }}>
      <div style={{ color: '#4ade80', fontWeight: '600', marginBottom: '6px' }}>
        {WHY_CONTAINER_LIGHT.isolation.summary.text}
      </div>
      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
        {WHY_CONTAINER_LIGHT.isolation.summary.note}
      </div>
    </div>
  </div>
);

const WhyLightSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#0ea5e9' }}>
      🧠 {WHY_CONTAINER_LIGHT.title}
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      {WHY_CONTAINER_LIGHT.subtitle}
    </p>

    <ArchitectureDiagram />
    <KernelSharingExplanation />
    <IsolationTechnologies />
  </div>
);

// ============================================================================
// Section 3: 성능 비교 (시뮬레이션)
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

const PerformanceSection = ({ vmSimulation, runVmSimulation, showCostDetail, setShowCostDetail }) => (
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

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      <VmSimulationPanel vms={vmSimulation.vms} />
      <ContainerSimulationPanel containers={vmSimulation.containers} />
    </div>

    <CostTable showDetail={showCostDetail} setShowDetail={setShowCostDetail} />
  </div>
);

// ============================================================================
// Section Components Mapping
// ============================================================================

const SECTION_COMPONENTS = {
  0: VirtualizationHistorySection,
  1: VmVsDockerSection,
  2: WhyLightSection,
  3: PerformanceSection
};

// ============================================================================
// Main View Component
// ============================================================================

export const VmDockerView = ({
  vmSimulation,
  runVmSimulation,
  showCostDetail,
  setShowCostDetail
}) => {
  const [activeSection, setActiveSection] = useState(0);

  const renderSection = () => {
    switch (activeSection) {
      case 0:
        return <VirtualizationHistorySection />;
      case 1:
        return <VmVsDockerSection />;
      case 2:
        return <WhyLightSection />;
      case 3:
        return (
          <PerformanceSection
            vmSimulation={vmSimulation}
            runVmSimulation={runVmSimulation}
            showCostDetail={showCostDetail}
            setShowCostDetail={setShowCostDetail}
          />
        );
      default:
        return <VirtualizationHistorySection />;
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <SectionNav
        sections={VM_DOCKER_SECTIONS}
        activeIndex={activeSection}
        onSelect={setActiveSection}
        activeColor="#fbbf24"
      />
      {renderSection()}
    </div>
  );
};
