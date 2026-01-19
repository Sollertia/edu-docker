/**
 * =============================================================================
 * Role: Compose Section View (Presentation Only)
 * =============================================================================
 *
 * DO NOT put state management here (use hooks)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing Compose section layout
 * - Updating subsection content
 * - Modifying code examples display
 *
 * PROPS FROM CONTAINER:
 * - composeSection: number
 * - setComposeSection: (section: number) => void
 * - sectionLabels: string[]
 * =============================================================================
 */

import React from 'react';
import { SectionNav } from '../../common';
import {
  COMPOSE_SECTIONS,
  COMPOSE_BENEFITS,
  COMPOSE_FULL_EXAMPLE,
  COMPOSE_RESTART_POLICIES,
  COMPOSE_COMMANDS,
  COMPOSE_DEPENDS_ON_ORDER
} from '../../../constants';

// ============================================================================
// Section 0: What is Compose
// ============================================================================

const WhatIsCompose = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>
      Docker Compose란?
    </h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      여러 컨테이너를 하나의 YAML 파일로 정의하고 관리하는 도구
    </p>

    {/* Problem & Solution */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
      <div style={{
        background: 'rgba(239,68,68,0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(239,68,68,0.3)'
      }}>
        <h4 style={{ color: '#f87171', marginBottom: '16px' }}>Compose 없이</h4>
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '10px',
          padding: '12px',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: '#fca5a5'
        }}>
          $ docker network create mynet<br />
          $ docker run -d --name db --network mynet mysql<br />
          $ docker run -d --name redis --network mynet redis<br />
          $ docker run -d --name app --network mynet -p 8080:8080 myapp<br />
          <span style={{ color: '#94a3b8' }}># 매번 순서대로 입력해야 함...</span>
        </div>
      </div>
      <div style={{
        background: 'rgba(34,197,94,0.1)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(34,197,94,0.3)'
      }}>
        <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>✅ Compose 사용</h4>
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '10px',
          padding: '12px',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: '#86efac'
        }}>
          $ docker compose up -d<br /><br />
          <span style={{ color: '#94a3b8' }}># 끝! 모든 서비스가 한 번에 실행</span>
        </div>
      </div>
    </div>

    {/* Benefits */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
      {COMPOSE_BENEFITS.map((item, i) => (
        <div key={i} style={{
          padding: '20px',
          background: 'rgba(244,114,182,0.1)',
          borderRadius: '14px',
          border: '1px solid rgba(244,114,182,0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.icon}</div>
          <div style={{ color: '#f9a8d4', fontWeight: '600', marginBottom: '4px' }}>{item.title}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
        </div>
      ))}
    </div>

    {/* Full Example */}
    <div style={{
      background: '#0d1117',
      borderRadius: '16px',
      padding: '20px',
      fontFamily: '"JetBrains Mono", monospace'
    }}>
      <div style={{ color: '#8b949e', fontSize: '0.8rem', marginBottom: '12px' }}>
        docker-compose.yml (전체 예시)
      </div>
      <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.75rem', lineHeight: '1.6' }}>
        {COMPOSE_FULL_EXAMPLE}
      </pre>
    </div>
  </div>
);

// ============================================================================
// Section 1: Services
// ============================================================================

const ServicesSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>services</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      실행할 컨테이너들을 정의하는 핵심 섹션
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <div style={{
          background: '#0d1117',
          borderRadius: '16px',
          padding: '20px',
          fontFamily: '"JetBrains Mono", monospace',
          marginBottom: '20px'
        }}>
          <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem', lineHeight: '1.7' }}>
{`services:
  `}<span style={{ color: '#7ee787' }}>app</span>{`:                    # 서비스 이름
    `}<span style={{ color: '#ff7b72' }}>build</span>{`: .               # Dockerfile 경로
    `}<span style={{ color: '#ff7b72' }}>ports</span>{`:
      - "8080:8080"

  `}<span style={{ color: '#79c0ff' }}>db</span>{`:
    `}<span style={{ color: '#ff7b72' }}>image</span>{`: mysql:8.0      # Docker Hub 이미지
    `}<span style={{ color: '#ff7b72' }}>restart</span>{`: always       # 재시작 정책`}
          </pre>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          padding: '16px',
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(34,197,94,0.3)'
        }}>
          <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>build vs image</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
            <li><code>build: .</code> → Dockerfile로 이미지 빌드</li>
            <li><code>image: mysql</code> → 기존 이미지 사용</li>
          </ul>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(251,191,36,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(251,191,36,0.3)'
        }}>
          <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>restart 정책</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
            {COMPOSE_RESTART_POLICIES.map((item, i) => (
              <li key={i}><code>{item.policy}</code> - {item.desc}</li>
            ))}
          </ul>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(139,92,246,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(139,92,246,0.3)'
        }}>
          <h4 style={{ color: '#a78bfa', marginBottom: '8px' }}>서비스 이름 = 호스트명</h4>
          <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
            <code>app</code>에서 <code>db:3306</code>으로 접속 가능!
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// Section 2: Environment
// ============================================================================

const EnvironmentSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>⚙️ environment</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      컨테이너에 환경변수 전달하기
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>방법 1: 직접 정의 (리스트)</h4>
        <div style={{
          background: '#0d1117',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'monospace',
          marginBottom: '20px'
        }}>
          <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>
{`services:
  app:
    environment:
      - DB_HOST=db
      - DB_PORT=3306
      - DB_USER=root`}
          </pre>
        </div>

        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>방법 2: 직접 정의 (맵)</h4>
        <div style={{
          background: '#0d1117',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'monospace'
        }}>
          <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>
{`services:
  app:
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: root`}
          </pre>
        </div>
      </div>

      <div>
        <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>방법 3: .env 파일 사용 (권장)</h4>
        <div style={{
          background: '#0d1117',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'monospace',
          marginBottom: '16px'
        }}>
          <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>.env</div>
          <pre style={{ color: '#86efac', margin: 0, fontSize: '0.8rem' }}>
{`DB_PASSWORD=secretpassword
REDIS_URL=redis://redis:6379`}
          </pre>
        </div>
        <div style={{
          background: '#0d1117',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'monospace'
        }}>
          <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>docker-compose.yml</div>
          <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>
{`services:
  app:
    env_file:
      - .env`}
          </pre>
        </div>

        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: 'rgba(239,68,68,0.1)',
          borderRadius: '10px',
          border: '1px solid rgba(239,68,68,0.3)'
        }}>
          <div style={{ color: '#f87171', fontSize: '0.85rem' }}>
            ⚠️ <strong>.env 파일은 .gitignore에 추가!</strong><br />
            비밀번호 등 민감 정보 유출 방지
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// Section 3: Volumes
// ============================================================================

const VolumesSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>volumes</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      데이터를 영구 저장하고 컨테이너 간 공유
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <div style={{
          background: '#0d1117',
          borderRadius: '16px',
          padding: '20px',
          fontFamily: '"JetBrains Mono", monospace'
        }}>
          <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.75rem', lineHeight: '1.7' }}>
{`services:
  db:
    image: mysql:8.0
    volumes:
      `}<span style={{ color: '#86efac' }}># Named Volume (권장)</span>{`
      - db-data:/var/lib/mysql

      `}<span style={{ color: '#fbbf24' }}># Bind Mount (개발용)</span>{`
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

`}<span style={{ color: '#79c0ff' }}>volumes:</span>{`                    # 최상위에 정의
  `}<span style={{ color: '#7ee787' }}>db-data</span>{`:                 # 볼륨 이름
    driver: local`}
          </pre>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          padding: '16px',
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(34,197,94,0.3)'
        }}>
          <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>Named Volume</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
            <li>Docker가 관리하는 볼륨</li>
            <li>컨테이너 삭제해도 데이터 유지</li>
            <li><strong>운영 환경에 권장</strong></li>
          </ul>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(251,191,36,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(251,191,36,0.3)'
        }}>
          <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>Bind Mount</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
            <li>호스트 경로를 직접 마운트</li>
            <li>코드 변경 실시간 반영</li>
            <li><strong>개발 환경에 유용</strong></li>
          </ul>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(139,92,246,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(139,92,246,0.3)'
        }}>
          <h4 style={{ color: '#a78bfa', marginBottom: '8px' }}>볼륨 형식</h4>
          <code style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>소스:대상[:옵션]</code>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>
            예: db-data:/var/lib/mysql:ro (읽기전용)
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// Section 4: Networks
// ============================================================================

const NetworksSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>🌐 networks</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      서비스 간 통신을 위한 가상 네트워크
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <div style={{
          padding: '16px',
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(34,197,94,0.3)',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>✅ 기본 네트워크 (자동)</h4>
          <p style={{ color: '#bbf7d0', fontSize: '0.85rem', margin: 0 }}>
            networks를 정의하지 않아도<br />
            <strong>{`{프로젝트명}_default`}</strong> 네트워크가 자동 생성됨!
          </p>
        </div>

        <div style={{
          background: '#0d1117',
          borderRadius: '16px',
          padding: '20px',
          fontFamily: '"JetBrains Mono", monospace'
        }}>
          <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>커스텀 네트워크 정의</div>
          <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem', lineHeight: '1.7' }}>
{`services:
  app:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend    # app만 접근 가능!

networks:
  frontend:
  backend:`}
          </pre>
        </div>
      </div>

      <div>
        <div style={{
          padding: '20px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '14px',
          marginBottom: '16px'
        }}>
          <h4 style={{ color: '#e2e8f0', marginBottom: '16px', textAlign: 'center' }}>네트워크 격리 예시</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '16px',
              background: 'rgba(34,197,94,0.2)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#86efac', fontWeight: '600', marginBottom: '8px' }}>frontend</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '4px 8px', background: 'rgba(34,197,94,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>nginx</span>
                <span style={{ padding: '4px 8px', background: 'rgba(34,197,94,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>app</span>
              </div>
            </div>
            <div style={{
              padding: '16px',
              background: 'rgba(139,92,246,0.2)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#c4b5fd', fontWeight: '600', marginBottom: '8px' }}>backend</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '4px 8px', background: 'rgba(139,92,246,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>app</span>
                <span style={{ padding: '4px 8px', background: 'rgba(139,92,246,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>db</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px', color: '#94a3b8', fontSize: '0.8rem' }}>
            nginx는 db에 직접 접근 불가! (보안 강화)
          </div>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(251,191,36,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(251,191,36,0.3)'
        }}>
          <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>왜 네트워크를 분리할까?</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
            <li>보안: 불필요한 접근 차단</li>
            <li>격리: 서비스 그룹별 분리</li>
            <li>관리: 네트워크 트래픽 제어</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// Section 5: Depends On
// ============================================================================

const DependsOnSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>🔗 depends_on</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      서비스 시작 순서를 제어
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <div style={{
          background: '#0d1117',
          borderRadius: '16px',
          padding: '20px',
          fontFamily: '"JetBrains Mono", monospace',
          marginBottom: '20px'
        }}>
          <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem', lineHeight: '1.7' }}>
{`services:
  app:
    build: .
    `}<span style={{ color: '#ff7b72' }}>depends_on</span>{`:
      - db          # db가 먼저 시작
      - redis       # redis도 먼저 시작

  db:
    image: mysql:8.0

  redis:
    image: redis:alpine`}
          </pre>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>시작 순서:</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {COMPOSE_DEPENDS_ON_ORDER.map((item, i) => (
              <React.Fragment key={i}>
                <span style={{
                  padding: '8px 12px',
                  background: item.bg,
                  borderRadius: '8px',
                  color: item.color
                }}>
                  {item.service}
                </span>
                {i < COMPOSE_DEPENDS_ON_ORDER.length - 1 && (
                  <span style={{ color: '#94a3b8' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          padding: '16px',
          background: 'rgba(239,68,68,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(239,68,68,0.3)'
        }}>
          <h4 style={{ color: '#f87171', marginBottom: '8px' }}>⚠️ 중요한 제한사항</h4>
          <p style={{ color: '#fca5a5', fontSize: '0.85rem', margin: 0 }}>
            depends_on은 <strong>시작 순서만</strong> 보장!<br />
            서비스가 <strong>"준비 완료"</strong>될 때까지 기다리지 않음
          </p>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(34,197,94,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(34,197,94,0.3)'
        }}>
          <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>✅ 해결 방법</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
            <li>앱에서 연결 재시도 로직 구현</li>
            <li>healthcheck 옵션 사용</li>
            <li>wait-for-it.sh 스크립트 사용</li>
          </ul>
        </div>

        <div style={{
          padding: '16px',
          background: 'rgba(251,191,36,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(251,191,36,0.3)'
        }}>
          <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>healthcheck 예시</h4>
          <code style={{
            color: '#fef3c7',
            fontSize: '0.8rem',
            display: 'block',
            background: 'rgba(0,0,0,0.2)',
            padding: '8px',
            borderRadius: '6px'
          }}>
            depends_on:<br />
            &nbsp;&nbsp;db:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;condition: service_healthy
          </code>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// Section 6: Commands
// ============================================================================

const CommandsSection = () => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>⌨️ Compose 명령어</h3>
    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>
      자주 사용하는 docker compose 명령어
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      {COMPOSE_COMMANDS.map((item, i) => (
        <div key={i} style={{
          padding: '16px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <code style={{
              display: 'block',
              color: item.color,
              fontSize: '0.85rem',
              marginBottom: '4px'
            }}>
              {item.cmd}
            </code>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.desc}</span>
          </div>
        </div>
      ))}
    </div>

    <div style={{
      marginTop: '24px',
      padding: '16px',
      background: 'rgba(251,191,36,0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(251,191,36,0.3)'
    }}>
      <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>자주 쓰는 워크플로우</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <code style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', color: '#86efac' }}>up -d</code>
        <span style={{ color: '#94a3b8' }}>→</span>
        <code style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', color: '#93c5fd' }}>logs -f</code>
        <span style={{ color: '#94a3b8' }}>→</span>
        <code style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', color: '#c4b5fd' }}>exec app sh</code>
        <span style={{ color: '#94a3b8' }}>→</span>
        <code style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', color: '#fca5a5' }}>down</code>
      </div>
    </div>
  </div>
);

// ============================================================================
// Section Mapping
// ============================================================================

const SECTION_COMPONENTS = {
  0: WhatIsCompose,
  1: ServicesSection,
  2: EnvironmentSection,
  3: VolumesSection,
  4: NetworksSection,
  5: DependsOnSection,
  6: CommandsSection
};

// ============================================================================
// Main View Component
// ============================================================================

export const ComposeView = ({
  composeSection,
  setComposeSection,
  sectionLabels
}) => {
  const SectionComponent = SECTION_COMPONENTS[composeSection] || WhatIsCompose;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <SectionNav
        sections={sectionLabels}
        activeIndex={composeSection}
        onSelect={setComposeSection}
        activeColor="#f472b6"
      />
      <SectionComponent />
    </div>
  );
};
