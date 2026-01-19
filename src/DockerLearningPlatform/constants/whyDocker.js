/**
 * =============================================================================
 * Role: Why Docker Section Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding/removing steps in Why Docker section
 * - Updating step content (titles, subtitles)
 * - Changing the flow of the Why Docker explanation
 *
 * STRUCTURE:
 * - WHY_DOCKER_STEPS: Array of step objects for main navigation
 * - STEP_CONTENT_*: Data for each step's detailed content
 * =============================================================================
 */

export const WHY_DOCKER_STEPS = [
  { id: 'problem', title: '😱 개발자의 악몽', subtitle: '"내 컴퓨터에서는 됐는데요..."' },
  { id: 'cause', title: '🤔 왜 이런 일이 생길까?', subtitle: '환경의 차이 = 동작의 차이' },
  { id: 'solution', title: '📦 Docker의 해결책', subtitle: '앱 + 환경을 함께 포장!' },
  { id: 'benefit', title: '🚀 Docker의 장점', subtitle: '왜 모든 회사가 Docker를 쓸까?' },
  { id: 'workflow', title: '🔧 Docker 워크플로우', subtitle: 'Build → Ship → Run' }
];

export const STEP_CONTENT_PROBLEM = {
  description: '3개월간 열심히 개발한 Spring Boot 프로젝트를 서버에 배포했는데...',
  devPC: {
    title: '개발 PC',
    emoji: '💻',
    items: ['Java 17.0.2', 'macOS', 'MySQL 8.0', '환경변수 설정됨'],
    status: { emoji: '✅', text: '잘 동작함!' }
  },
  prodServer: {
    title: '운영 서버',
    emoji: '🖥️',
    items: ['Java 11', 'Ubuntu', 'MySQL 5.7', '환경변수 누락'],
    status: { emoji: '💥', text: '에러 발생!' }
  }
};

export const STEP_CONTENT_CAUSE = [
  { icon: '☕', title: 'Java 버전 차이', desc: 'Java 17 문법이 Java 11에서 에러' },
  { icon: '🗄️', title: 'DB 버전 차이', desc: 'MySQL 8.0 쿼리가 5.7에서 실패' },
  { icon: '📦', title: '라이브러리 차이', desc: '설치된 패키지 버전이 다름' },
  { icon: '⚙️', title: '설정 차이', desc: '환경변수, 경로, 권한 등이 다름' }
];

export const STEP_CONTENT_SOLUTION = {
  before: {
    emoji: '📝',
    title: '기존 방식',
    desc: '설치 매뉴얼 100페이지',
    note: '사람마다 결과 다름'
  },
  after: {
    emoji: '📦',
    title: 'Docker 방식',
    desc: '실행 환경 통째로 포장',
    note: '어디서나 동일!'
  }
};

export const STEP_CONTENT_BENEFIT = [
  { icon: '🔄', title: '일관성', desc: '개발/테스트/운영 환경 동일', stat: '배포 실패 90% 감소' },
  { icon: '⚡', title: '속도', desc: '서버 세팅 시간 단축', stat: '몇 시간 → 몇 초' },
  { icon: '📈', title: '확장성', desc: '트래픽 증가 시 스케일 아웃', stat: '자동 확장 가능' },
  { icon: '💰', title: '비용', desc: '자원 효율적 사용', stat: 'VM 대비 6배 효율' }
];

export const STEP_CONTENT_WORKFLOW = [
  { phase: 'Build', icon: '🔨', cmd: 'docker build', desc: 'Dockerfile로 이미지 생성' },
  { phase: 'Ship', icon: '🚢', cmd: 'docker push', desc: 'Docker Hub에 업로드' },
  { phase: 'Run', icon: '▶️', cmd: 'docker run', desc: '어디서든 실행' }
];
