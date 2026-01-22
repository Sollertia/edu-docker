/**
 * =============================================================================
 * Role: Docker Compose Section Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding new Compose sections
 * - Updating Compose examples or explanations
 * - Changing section navigation labels
 *
 * STRUCTURE:
 * - COMPOSE_SECTIONS: Section navigation labels
 * - COMPOSE_*: Data for each section's content
 * =============================================================================
 */

export const COMPOSE_SECTIONS = [
  'Compose란?',
  'services',
  'environment',
  'volumes',
  'networks',
  'depends_on',
  'healthcheck',
  '명령어'
];

export const COMPOSE_BENEFITS = [
  { icon: '📄', title: '선언적 정의', desc: 'YAML 파일로 인프라를 코드화' },
  { icon: '🔄', title: '재현 가능', desc: '같은 환경을 어디서든 재현' },
  { icon: '👥', title: '팀 공유', desc: 'Git으로 설정 공유 및 버전 관리' }
];

export const COMPOSE_FULL_EXAMPLE = `
services:
  app:                          # Spring Boot
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:                           # MySQL
    image: mysql:8.0
    volumes:
      - db-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp

  redis:                        # Redis
    image: redis:alpine

volumes:
  db-data:`;

export const COMPOSE_RESTART_POLICIES = [
  { policy: 'no', desc: '재시작 안 함 (기본값)' },
  { policy: 'always', desc: '항상 재시작' },
  { policy: 'on-failure', desc: '에러 시에만' },
  { policy: 'unless-stopped', desc: '수동 중지 전까지' }
];

export const COMPOSE_COMMANDS = [
  { cmd: 'docker compose up -d', desc: '모든 서비스 백그라운드 시작', icon: '▶️', color: '#22c55e' },
  { cmd: 'docker compose down', desc: '모든 서비스 중지 및 삭제', icon: '⏹️', color: '#ef4444' },
  { cmd: 'docker compose logs -f', desc: '모든 서비스 로그 실시간 확인', icon: '📜', color: '#3b82f6' },
  { cmd: 'docker compose logs -f app', desc: '특정 서비스 로그만 확인', icon: '🔍', color: '#8b5cf6' },
  { cmd: 'docker compose ps', desc: '서비스 상태 확인', icon: '📊', color: '#f59e0b' },
  { cmd: 'docker compose build', desc: '이미지 다시 빌드', icon: '🔨', color: '#ec4899' },
  { cmd: 'docker compose exec app sh', desc: '실행 중인 서비스에 접속', icon: '💻', color: '#06b6d4' },
  { cmd: 'docker compose down -v', desc: '볼륨까지 함께 삭제', icon: '🗑️', color: '#dc2626' }
];

export const COMPOSE_NETWORK_ISOLATION_EXAMPLE = {
  frontend: ['nginx', 'app'],
  backend: ['app', 'db']
};

export const COMPOSE_DEPENDS_ON_ORDER = [
  { service: 'db', color: '#3b82f6', bg: 'rgba(59,130,246,0.3)' },
  { service: 'redis', color: '#fca5a5', bg: 'rgba(239,68,68,0.3)' },
  { service: 'app', color: '#86efac', bg: 'rgba(34,197,94,0.3)' }
];

// Healthcheck 데이터
export const COMPOSE_HEALTHCHECK = {
  title: 'healthcheck',
  subtitle: '서비스가 진짜 준비됐는지 확인하는 건강검진',
  analogy: '의사의 건강검진 - OK 받아야 다음 진행!',
  problem: {
    title: 'depends_on의 한계',
    description: 'depends_on은 컨테이너 "시작"만 확인, 서비스 "준비"는 확인 안 함!',
    example: {
      situation: 'MySQL 컨테이너가 시작됨',
      problem: '하지만 DB 초기화 중이라 연결 불가!',
      result: 'Spring Boot 앱이 시작하자마자 DB 연결 실패'
    }
  },
  options: [
    { name: 'test', desc: '건강 확인 명령어', required: true },
    { name: 'interval', desc: '검사 주기', default: '30s', example: '10s' },
    { name: 'timeout', desc: '응답 대기 시간', default: '30s', example: '5s' },
    { name: 'retries', desc: '실패 허용 횟수', default: '3', example: '5' },
    { name: 'start_period', desc: '시작 대기 시간', default: '0s', example: '40s' }
  ],
  examples: {
    mysql: {
      title: 'MySQL',
      service: 'db',
      image: 'mysql:8.0',
      test: '["CMD", "mysqladmin", "ping", "-h", "localhost"]',
      description: 'mysqladmin ping으로 MySQL 서버 응답 확인'
    },
    postgres: {
      title: 'PostgreSQL',
      service: 'db',
      image: 'postgres:15',
      test: '["CMD-SHELL", "pg_isready -U postgres"]',
      description: 'pg_isready로 PostgreSQL 준비 상태 확인'
    },
    redis: {
      title: 'Redis',
      service: 'redis',
      image: 'redis:alpine',
      test: '["CMD", "redis-cli", "ping"]',
      description: 'redis-cli ping으로 Redis 응답 확인'
    },
    http: {
      title: 'HTTP 서비스',
      service: 'app',
      image: 'myapp:latest',
      test: '["CMD", "curl", "-f", "http://localhost:8080/health"]',
      description: 'HTTP 엔드포인트로 앱 상태 확인'
    }
  },
  fullExample: `services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  app:
    build: .
    depends_on:
      db:
        condition: service_healthy  # DB가 healthy 될 때까지 대기!
    environment:
      - DB_HOST=db`,
  conditions: [
    { condition: 'service_started', desc: '컨테이너 시작됨 (기본값)', icon: '🚀' },
    { condition: 'service_healthy', desc: 'healthcheck 통과', icon: '✅' },
    { condition: 'service_completed_successfully', desc: '컨테이너 정상 종료 (exit 0)', icon: '🏁' }
  ],
  bestPractices: [
    'start_period를 충분히 설정 (초기화 시간 고려)',
    'interval은 너무 짧지 않게 (리소스 낭비)',
    'timeout은 interval보다 짧게',
    'retries는 일시적 오류 허용할 정도로',
    'HTTP 서비스는 /health 또는 /actuator/health 엔드포인트 활용'
  ]
};
