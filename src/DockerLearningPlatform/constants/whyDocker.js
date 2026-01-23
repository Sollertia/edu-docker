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
  { id: 'devsetup', title: '💻 개발 세팅이 이렇게 쉬워진다', subtitle: '새로운 기술? Docker로 바로 시작!' },
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
  { icon: '🔄', title: '일관성', desc: '개발/테스트/운영 환경 동일', stat: '배포 실패 감소' },
  { icon: '⚡', title: '속도', desc: '서버 세팅 시간 단축', stat: '몇 시간 → 몇 초' },
  { icon: '📈', title: '확장성', desc: '트래픽 증가 시 스케일 아웃', stat: '자동 확장 가능' },
  { icon: '💰', title: '비용', desc: '자원 효율적 사용', stat: '일반적으로 더 높은 밀도와 효율을 기대할 수 있다.' }
];

export const STEP_CONTENT_DEVSETUP = {
  traditional: {
    title: '😩 예전 방식: 직접 설치',
    steps: [
      { icon: '🔍', text: '공식 사이트에서 OS에 맞는 버전 찾기' },
      { icon: '📥', text: '다운로드 & 설치 (의존성 문제 발생...)' },
      { icon: '⚙️', text: '환경변수, 포트, 비밀번호 직접 설정' },
      { icon: '🔄', text: '버전 충돌 시 삭제 후 재설치' },
      { icon: '😵', text: '다 쓰면 깔끔하게 삭제도 어려움' }
    ]
  },
  docker: {
    title: '🐳 Docker 방식: 한 줄이면 끝',
    steps: [
      { icon: '📦', text: 'docker run 한 줄로 바로 실행' },
      { icon: '🧹', text: '다 쓰면 docker rm으로 깔끔 삭제' },
      { icon: '🔀', text: '여러 버전 동시에 실행 가능' },
      { icon: '💻', text: 'OS 상관없이 동일하게 동작' }
    ]
  },
  examples: [
    {
      name: 'MySQL',
      icon: '🗄️',
      traditional: 'brew install mysql\nmysql_secure_installation\n# 설정 파일 수정, 포트 확인...\n# 약 10~20분 소요',
      dockerCmd: 'docker run -d \\\n  --name my-mysql \\\n  -e MYSQL_ROOT_PASSWORD=1234 \\\n  -p 3306:3306 \\\n  mysql:8.0',
      time: '약 10초'
    },
    {
      name: 'Redis',
      icon: '⚡',
      traditional: 'brew install redis\nredis-server /usr/local/etc/redis.conf\n# 설정 변경, 데몬 실행...\n# 약 5~10분 소요',
      dockerCmd: 'docker run -d \\\n  --name my-redis \\\n  -p 6379:6379 \\\n  redis:alpine',
      time: '약 5초'
    },
    {
      name: 'MongoDB',
      icon: '🍃',
      traditional: 'brew tap mongodb/brew\nbrew install mongodb-community\nbrew services start mongodb-community\n# 인증 설정, 포트 확인...\n# 약 10~15분 소요',
      dockerCmd: 'docker run -d \\\n  --name my-mongo \\\n  -e MONGO_INITDB_ROOT_USERNAME=admin \\\n  -e MONGO_INITDB_ROOT_PASSWORD=1234 \\\n  -p 27017:27017 \\\n  mongo:7.0',
      time: '약 10초'
    },
    {
      name: 'PostgreSQL',
      icon: '🐘',
      traditional: 'brew install postgresql@15\nbrew services start postgresql@15\ncreateuser, createdb...\n# 권한, 인증 설정...\n# 약 10~15분 소요',
      dockerCmd: 'docker run -d \\\n  --name my-postgres \\\n  -e POSTGRES_PASSWORD=1234 \\\n  -p 5432:5432 \\\n  postgres:15',
      time: '약 8초'
    }
  ]
};

export const STEP_CONTENT_WORKFLOW = [
  { phase: 'Build', icon: '🔨', cmd: 'docker build', desc: 'Dockerfile로 이미지 생성' },
  { phase: 'Ship', icon: '🚢', cmd: 'docker push', desc: 'Docker Hub에 업로드' },
  { phase: 'Run', icon: '▶️', cmd: 'docker run', desc: '어디서든 실행' }
];
