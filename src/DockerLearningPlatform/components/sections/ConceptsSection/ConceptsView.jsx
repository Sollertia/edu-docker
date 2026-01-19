/**
 * =============================================================================
 * Role: Concepts Section Pure UI
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing concepts section appearance
 * - Adding new concept visualizations
 *
 * PROPS:
 * - conceptSection: Current section index
 * - setConceptSection: Section change handler
 * - sectionLabels: Array of section names
 * =============================================================================
 */

import React from 'react';
import { SectionNav } from '../../common';
import {
  CONCEPT_IMAGE_FEATURES,
  CONCEPT_CONTAINER_FEATURES,
  CONCEPT_ANALOGIES,
  CONCEPT_LAYER_STRUCTURE,
  CONCEPT_LAYER_BENEFITS,
  CONCEPT_LAYER_TIPS,
  CONCEPT_LIFECYCLE_STATES,
  CONCEPT_LIFECYCLE_TRANSITIONS,
  CONCEPT_STATE_DETAILS,
  CONCEPT_REGISTRY_EXAMPLES,
  CONCEPT_IMAGE_NAME_PARTS
} from '../../../constants';

export const ConceptsView = ({ conceptSection, setConceptSection, sectionLabels }) => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <SectionNav
        sections={sectionLabels}
        activeIndex={conceptSection}
        onSelect={setConceptSection}
        activeColor="#00d4ff"
      />

      {conceptSection === 0 && <ImageVsContainer />}
      {conceptSection === 1 && <LayerStructure />}
      {conceptSection === 2 && <Lifecycle />}
      {conceptSection === 3 && <Registry />}
      {conceptSection === 4 && <Volumes />}
    </div>
  );
};

// Section 0: Image vs Container
const ImageVsContainer = () => (
  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#00d4ff' }}>📦 이미지 vs 🏃 컨테이너</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>Docker의 가장 기본이 되는 두 가지 개념</p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
      <ConceptCard type="image" title="이미지 (Image)" subtitle="읽기 전용 템플릿" emoji="📦" color="#60a5fa" features={CONCEPT_IMAGE_FEATURES} analogies={CONCEPT_ANALOGIES.image} />
      <ConceptCard type="container" title="컨테이너 (Container)" subtitle="실행 중인 인스턴스" emoji="🏃" color="#4ade80" features={CONCEPT_CONTAINER_FEATURES} analogies={CONCEPT_ANALOGIES.container} />
    </div>

    <RelationshipDiagram />
  </div>
);

const ConceptCard = ({ title, subtitle, emoji, color, features, analogies }) => {
  const bgGradient = color === '#60a5fa' ? 'rgba(59,130,246,0.15), rgba(59,130,246,0.02)' : 'rgba(34,197,94,0.15), rgba(34,197,94,0.02)';
  const borderColor = color === '#60a5fa' ? 'rgba(59,130,246,0.4)' : 'rgba(34,197,94,0.4)';
  const textColors = color === '#60a5fa' ? { primary: '#93c5fd', secondary: '#bfdbfe' } : { primary: '#86efac', secondary: '#bbf7d0' };

  return (
    <div style={{ background: `linear-gradient(180deg, ${bgGradient})`, borderRadius: '16px', padding: '24px', border: `2px solid ${borderColor}` }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>{emoji}</div>
        <h4 style={{ color, fontSize: '1.3rem' }}>{title}</h4>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>{subtitle}</div>
      </div>
      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ color: textColors.primary, fontSize: '0.9rem', marginBottom: '12px', fontWeight: '600' }}>🎯 핵심 특징</div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: textColors.secondary, fontSize: '0.85rem', lineHeight: '1.8' }}>
          {features.map((f, i) => <li key={i}><strong>{f.text}</strong> - {f.desc}</li>)}
        </ul>
      </div>
      <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
        <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '8px' }}>🍳 비유</div>
        <div style={{ color: '#fef3c7', fontSize: '0.85rem' }}>
          {analogies.map((a, i) => <div key={i}><strong>{a.type}</strong> - {a.desc}</div>)}
        </div>
      </div>
    </div>
  );
};

const RelationshipDiagram = () => (
  <div style={{ background: 'rgba(139,92,246,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(139,92,246,0.3)' }}>
    <h4 style={{ color: '#c4b5fd', marginBottom: '16px', textAlign: 'center' }}>💡 핵심 관계</h4>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <code style={{ display: 'block', padding: '8px 16px', background: 'rgba(59,130,246,0.3)', borderRadius: '8px', color: '#93c5fd', marginBottom: '4px' }}>myapp:1.0</code>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>1개의 이미지</span>
      </div>
      <div style={{ fontSize: '1.5rem' }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3].map(n => <code key={n} style={{ padding: '8px 12px', background: 'rgba(34,197,94,0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.8rem' }}>컨테이너{n}</code>)}
        </div>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>N개의 컨테이너 생성 가능!</span>
      </div>
    </div>
    <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center' }}>
      <code style={{ color: '#86efac' }}>docker run myapp:1.0</code>
      <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}> → 이미지로부터 새 컨테이너 생성</span>
    </div>
  </div>
);

// Section 1: Layer Structure
const LayerStructure = () => (
  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#a78bfa' }}>📚 이미지 레이어 구조</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>Docker 이미지는 여러 개의 읽기 전용 레이어로 구성됩니다</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>🐳 이미지 레이어 (아래→위 순서로 쌓임)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {CONCEPT_LAYER_STRUCTURE.map((layer, i) => (
            <div key={i} style={{ padding: '12px 16px', background: `${layer.color}30`, borderLeft: `4px solid ${layer.color}`, borderRadius: '0 8px 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: layer.color, fontWeight: '600', fontSize: '0.85rem' }}>{layer.name}</span>
                {layer.rw && <span style={{ marginLeft: '8px', padding: '2px 6px', background: 'rgba(34,197,94,0.3)', borderRadius: '4px', fontSize: '0.7rem', color: '#86efac' }}>쓰기 가능</span>}
              </div>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{layer.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(34,197,94,0.3)' }}>
          <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>✅ 레이어의 장점</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
            {CONCEPT_LAYER_BENEFITS.map((b, i) => <li key={i}><strong>{b.title}</strong> - {b.desc}</li>)}
          </ul>
        </div>
        <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(251,191,36,0.3)' }}>
          <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>⚠️ 레이어 최적화 팁</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
            {CONCEPT_LAYER_TIPS.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Section 2: Lifecycle
const Lifecycle = () => (
  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f59e0b' }}>🔄 컨테이너 생명주기</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>컨테이너의 상태 변화와 관련 명령어</p>
    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {CONCEPT_LIFECYCLE_STATES.map((item, i) => (
          item.arrow ? (
            <div key={i} style={{ textAlign: 'center' }}><div style={{ fontSize: '1.2rem', color: item.color }}>→</div><code style={{ fontSize: '0.7rem', color: item.color }}>{item.arrow}</code></div>
          ) : (
            <div key={i} style={{ textAlign: 'center', padding: '16px 20px', background: `${item.color}20`, borderRadius: '12px', border: `2px solid ${item.color}40`, minWidth: '100px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ color: item.color, fontWeight: '600', fontSize: '0.85rem' }}>{item.state}</div>
              {item.cmd && <code style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.cmd}</code>}
            </div>
          )
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {CONCEPT_LIFECYCLE_TRANSITIONS.map((t, i) => (
          <div key={i} style={{ padding: '12px 16px', background: `${t.color}20`, borderRadius: '10px', textAlign: 'center' }}>
            <code style={{ color: t.color, fontSize: '0.8rem' }}>{t.cmd}</code>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {Object.entries(CONCEPT_STATE_DETAILS).map(([key, state]) => (
        <div key={key} style={{ padding: '20px', background: `${state.color}15`, borderRadius: '14px', border: `1px solid ${state.color}40` }}>
          <h4 style={{ color: state.color, marginBottom: '12px' }}>{state.title}</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: `${state.color}cc`, fontSize: '0.85rem', lineHeight: '1.8' }}>
            {state.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// Section 3: Registry
const Registry = () => (
  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#06b6d4' }}>🏪 Docker Registry & Hub</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>이미지를 저장하고 공유하는 저장소</p>
    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(59,130,246,0.2)', borderRadius: '16px', minWidth: '140px' }}><div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💻</div><div style={{ color: '#93c5fd', fontWeight: '600' }}>Local</div><div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>내 컴퓨터</div></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}><div><code style={{ color: '#86efac', fontSize: '0.85rem' }}>docker push</code> <span style={{ color: '#94a3b8' }}>→</span></div><div><span style={{ color: '#94a3b8' }}>←</span> <code style={{ color: '#93c5fd', fontSize: '0.85rem' }}>docker pull</code></div></div>
        <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(6,182,212,0.2)', borderRadius: '16px', minWidth: '140px' }}><div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🐳</div><div style={{ color: '#67e8f9', fontWeight: '600' }}>Docker Hub</div><div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>클라우드 저장소</div></div>
      </div>
    </div>
    <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(251,191,36,0.3)' }}>
      <h4 style={{ color: '#fbbf24', marginBottom: '16px', textAlign: 'center' }}>📛 이미지 이름 구조</h4>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
        <code style={{ padding: '10px 14px', background: '#8b5cf6', borderRadius: '8px 0 0 8px', color: '#fff', fontSize: '1rem' }}>registry.io</code>
        <code style={{ padding: '10px 8px', background: '#64748b', color: '#fff', fontSize: '1rem' }}>/</code>
        <code style={{ padding: '10px 14px', background: '#06b6d4', color: '#fff', fontSize: '1rem' }}>username</code>
        <code style={{ padding: '10px 8px', background: '#64748b', color: '#fff', fontSize: '1rem' }}>/</code>
        <code style={{ padding: '10px 14px', background: '#22c55e', color: '#fff', fontSize: '1rem' }}>image-name</code>
        <code style={{ padding: '10px 8px', background: '#64748b', color: '#fff', fontSize: '1rem' }}>:</code>
        <code style={{ padding: '10px 14px', background: '#f59e0b', borderRadius: '0 8px 8px 0', color: '#fff', fontSize: '1rem' }}>tag</code>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '0.8rem' }}>
        {CONCEPT_IMAGE_NAME_PARTS.map((p, i) => (
          <div key={i} style={{ textAlign: 'center' }}><span style={{ color: p.color }}>{p.part}</span><br/><span style={{ color: '#94a3b8' }}>{p.note}</span></div>
        ))}
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>📦 공식 이미지 예시</div>
        {CONCEPT_REGISTRY_EXAMPLES.official.map((img, i) => <code key={i} style={{ display: 'block', padding: '8px 12px', background: 'rgba(34,197,94,0.15)', borderRadius: '6px', color: '#86efac', fontSize: '0.85rem', marginBottom: '6px' }}>{img}</code>)}
      </div>
      <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>🏢 Private Registry 예시</div>
        {CONCEPT_REGISTRY_EXAMPLES.private.map((img, i) => <code key={i} style={{ display: 'block', padding: '8px 12px', background: 'rgba(139,92,246,0.15)', borderRadius: '6px', color: '#c4b5fd', fontSize: '0.75rem', marginBottom: '6px', wordBreak: 'break-all' }}>{img}</code>)}
      </div>
    </div>
  </div>
);

// Section 4: Volumes
const Volumes = () => (
  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#ec4899' }}>💾 볼륨 (Volumes)</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>컨테이너 데이터를 영구적으로 저장하는 방법</p>
    <div style={{ background: 'rgba(239,68,68,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(239,68,68,0.3)' }}>
      <h4 style={{ color: '#f87171', marginBottom: '12px' }}>😱 볼륨 없이 사용하면?</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', flex: 1, minWidth: '200px' }}>
          <div style={{ color: '#fca5a5', fontSize: '0.9rem' }}>1. MySQL 컨테이너 실행 → 데이터 저장<br/>2. 컨테이너 삭제<br/>3. <strong>💥 모든 데이터 삭제됨!</strong></div>
        </div>
        <div style={{ color: '#f87171', fontSize: '2rem' }}>→</div>
        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '2rem', marginBottom: '4px' }}>😭</div><div style={{ color: '#fca5a5', fontSize: '0.85rem' }}>복구 불가</div></div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
      <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(34,197,94,0.3)' }}>
        <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>📦 Named Volume (권장)</h4>
        <code style={{ display: 'block', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.8rem', marginBottom: '12px' }}>docker run -v <span style={{ color: '#fbbf24' }}>db-data</span>:/var/lib/mysql mysql</code>
        <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
          <li>Docker가 관리하는 볼륨</li><li>이름으로 쉽게 참조</li><li>백업/복원 용이</li><li><strong>운영 환경에 적합</strong></li>
        </ul>
      </div>
      <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(251,191,36,0.3)' }}>
        <h4 style={{ color: '#fbbf24', marginBottom: '16px' }}>📁 Bind Mount</h4>
        <code style={{ display: 'block', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#fef3c7', fontSize: '0.8rem', marginBottom: '12px' }}>docker run -v <span style={{ color: '#86efac' }}>/home/user/data</span>:/app/data myapp</code>
        <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
          <li>호스트 경로 직접 마운트</li><li>실시간 코드 반영 가능</li><li>호스트 환경에 의존적</li><li><strong>개발 환경에 적합</strong></li>
        </ul>
      </div>
    </div>
    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '20px' }}>
      <h4 style={{ color: '#e2e8f0', marginBottom: '16px', textAlign: 'center' }}>💡 볼륨 사용 시 데이터 흐름</h4>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34,197,94,0.2)', borderRadius: '12px' }}><div style={{ fontSize: '2rem', marginBottom: '4px' }}>🐳</div><div style={{ color: '#86efac', fontSize: '0.85rem' }}>컨테이너</div><div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>/var/lib/mysql</div></div>
        <div style={{ fontSize: '1.5rem', color: '#94a3b8' }}>↔️</div>
        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(139,92,246,0.2)', borderRadius: '12px' }}><div style={{ fontSize: '2rem', marginBottom: '4px' }}>💾</div><div style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>볼륨</div><div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>db-data</div></div>
        <div style={{ fontSize: '1.5rem', color: '#94a3b8' }}>→</div>
        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(236,72,153,0.2)', borderRadius: '12px' }}><div style={{ fontSize: '2rem', marginBottom: '4px' }}>✅</div><div style={{ color: '#f9a8d4', fontSize: '0.85rem' }}>컨테이너 삭제 후</div><div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>데이터 유지!</div></div>
      </div>
    </div>
  </div>
);
