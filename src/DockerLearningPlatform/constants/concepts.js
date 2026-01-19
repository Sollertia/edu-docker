/**
 * =============================================================================
 * Role: Core Concepts Section Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding new concept sections
 * - Updating concept explanations
 * - Changing section navigation labels
 *
 * STRUCTURE:
 * - CONCEPT_SECTIONS: Section navigation labels
 * - CONCEPT_*: Data for each section's content
 * =============================================================================
 */

export const CONCEPT_SECTIONS = [
  '이미지 vs 컨테이너',
  '레이어 구조',
  '생명주기',
  '레지스트리',
  '볼륨'
];

export const CONCEPT_IMAGE_FEATURES = [
  { text: '불변(Immutable)', desc: '한번 만들면 변경 불가', bold: true },
  { text: '레이어 구조', desc: '여러 층으로 구성', bold: true },
  { text: '공유 가능', desc: 'Docker Hub에 업로드/다운로드', bold: true },
  { text: '버전 관리', desc: '태그로 버전 구분', bold: true }
];

export const CONCEPT_CONTAINER_FEATURES = [
  { text: '실행 상태', desc: '이미지가 메모리에 올라간 것', bold: true },
  { text: '격리된 환경', desc: '독립적인 프로세스 공간', bold: true },
  { text: '쓰기 가능', desc: '파일 생성/수정 가능 (레이어)', bold: true },
  { text: '일시적', desc: '삭제하면 변경사항도 삭제', bold: true }
];

export const CONCEPT_ANALOGIES = {
  image: [
    { type: '레시피', desc: '요리 방법이 적힌 문서' },
    { type: '붕어빵 틀', desc: '같은 모양을 찍어내는 틀' },
    { type: '설계도', desc: '건물을 짓기 위한 도면' }
  ],
  container: [
    { type: '완성된 요리', desc: '레시피로 만든 음식' },
    { type: '구워진 붕어빵', desc: '틀에서 나온 실제 빵' },
    { type: '지어진 건물', desc: '설계도로 완성된 집' }
  ]
};

export const CONCEPT_LAYER_STRUCTURE = [
  { name: 'Container Layer (R/W)', color: '#22c55e', desc: '컨테이너 실행 시 추가', rw: true },
  { name: 'ENTRYPOINT java -jar', color: '#ef4444', desc: '실행 명령' },
  { name: 'COPY app.jar', color: '#06b6d4', desc: '애플리케이션 코드' },
  { name: 'RUN apt-get install', color: '#8b5cf6', desc: '의존성 설치' },
  { name: 'FROM openjdk:17', color: '#3b82f6', desc: '베이스 이미지' }
];

export const CONCEPT_LAYER_BENEFITS = [
  { title: '캐싱', desc: '변경된 레이어만 다시 빌드' },
  { title: '공유', desc: '같은 레이어는 여러 이미지가 공유' },
  { title: '효율성', desc: '디스크 공간 절약' }
];

export const CONCEPT_LAYER_TIPS = [
  '자주 변경되는 레이어는 나중에 배치',
  'RUN 명령어는 하나로 합치기',
  '불필요한 파일은 .dockerignore로 제외'
];

export const CONCEPT_LIFECYCLE_STATES = [
  { state: '이미지', icon: '📦', color: '#3b82f6', cmd: null },
  { arrow: 'docker run', color: '#22c55e' },
  { state: 'Running', icon: '🟢', color: '#22c55e', cmd: 'docker ps' },
  { arrow: 'docker stop', color: '#f59e0b' },
  { state: 'Stopped', icon: '🟡', color: '#f59e0b', cmd: 'docker ps -a' },
  { arrow: 'docker rm', color: '#ef4444' },
  { state: '삭제됨', icon: '❌', color: '#ef4444', cmd: null }
];

export const CONCEPT_LIFECYCLE_TRANSITIONS = [
  { cmd: 'docker start', desc: 'Stopped → Running', color: '#22c55e' },
  { cmd: 'docker restart', desc: 'Running → Running', color: '#8b5cf6' },
  { cmd: 'docker kill', desc: '강제 종료 (SIGKILL)', color: '#ef4444' }
];

export const CONCEPT_STATE_DETAILS = {
  running: {
    title: '🟢 Running 상태',
    color: '#22c55e',
    items: ['애플리케이션 실행 중', 'CPU/메모리 사용', '로그 출력 중', '네트워크 접근 가능']
  },
  stopped: {
    title: '🟡 Stopped 상태',
    color: '#f59e0b',
    items: ['프로세스 종료됨', '파일시스템 유지', '재시작 가능', '디스크 공간 차지']
  },
  deleted: {
    title: '❌ 삭제 후',
    color: '#ef4444',
    items: ['모든 데이터 삭제', '복구 불가능', '이미지는 남아있음', '볼륨 데이터는 유지']
  }
};

export const CONCEPT_REGISTRY_EXAMPLES = {
  official: ['mysql:8.0', 'redis:alpine', 'nginx:latest', 'openjdk:17-slim'],
  private: [
    'gcr.io/my-project/api:v1.2',
    'my-registry.com/app:latest',
    '123456.dkr.ecr.ap-northeast-2.amazonaws.com/myapp:prod'
  ]
};

export const CONCEPT_IMAGE_NAME_PARTS = [
  { part: '레지스트리', color: '#a78bfa', note: '생략 시 Docker Hub' },
  { part: '사용자/조직', color: '#67e8f9', note: '공식 이미지는 생략' },
  { part: '이미지명', color: '#86efac', note: '필수' },
  { part: '태그', color: '#fbbf24', note: '생략 시 latest' }
];
