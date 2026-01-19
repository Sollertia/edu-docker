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
  '명령어'
];

export const COMPOSE_BENEFITS = [
  { icon: '📄', title: '선언적 정의', desc: 'YAML 파일로 인프라를 코드화' },
  { icon: '🔄', title: '재현 가능', desc: '같은 환경을 어디서든 재현' },
  { icon: '👥', title: '팀 공유', desc: 'Git으로 설정 공유 및 버전 관리' }
];

export const COMPOSE_FULL_EXAMPLE = `version: '3.8'

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
