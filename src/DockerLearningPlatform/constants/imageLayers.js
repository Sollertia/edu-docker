/**
 * =============================================================================
 * Role: Dockerfile/Image Layers Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding new Dockerfile instructions to explain
 * - Updating layer descriptions or analogies
 * - Changing the example Dockerfile structure
 *
 * STRUCTURE:
 * - IMAGE_LAYERS_DETAIL: Complete layer data for Dockerfile section
 * =============================================================================
 */

export const IMAGE_LAYERS_DETAIL = [
  {
    id: 'base',
    instruction: 'FROM eclipse-temurin:17-jdk-alpine',
    name: 'Base Image Layer',
    size: '190MB',
    color: '#3b82f6',
    contents: ['Alpine Linux 3.18', 'OpenJDK 17.0.2', 'Basic Unix tools'],
    cached: true,
    description: '모든 이미지의 시작점. 이미 만들어진 JDK 이미지를 가져옵니다.',
    analogy: '🏠 이미 기초공사가 끝난 땅을 구매하는 것'
  },
  {
    id: 'workdir',
    instruction: 'WORKDIR /app',
    name: 'Working Directory Layer',
    size: '0B',
    color: '#8b5cf6',
    contents: ['/app 디렉토리 생성', '이후 명령의 기준 경로 설정'],
    cached: true,
    description: '컨테이너 안에서 작업할 기본 폴더를 지정합니다.',
    analogy: '🛠️ 작업실을 어디에 만들지 정하는 것'
  },
  {
    id: 'copy',
    instruction: 'COPY target/*.jar app.jar',
    name: 'Application Layer',
    size: '45MB',
    color: '#06b6d4',
    contents: ['app.jar (Spring Boot)', 'application.yml', 'static resources'],
    cached: false,
    description: '빌드된 JAR 파일을 컨테이너 안으로 복사합니다.',
    analogy: '📦 이사할 때 짐을 새 집으로 옮기는 것'
  },
  {
    id: 'expose',
    instruction: 'EXPOSE 8080',
    name: 'Port Declaration Layer',
    size: '0B',
    color: '#22c55e',
    contents: ['포트 8080 문서화', '실제 포트 오픈은 -p 옵션으로'],
    cached: true,
    description: '이 컨테이너가 어떤 포트를 사용하는지 명시합니다.',
    analogy: '🚪 "현관문은 여기입니다" 표지판 붙이기'
  },
  {
    id: 'entrypoint',
    instruction: 'ENTRYPOINT ["java","-jar","app.jar"]',
    name: 'Startup Command Layer',
    size: '0B',
    color: '#ef4444',
    contents: ['java -jar app.jar 실행', '컨테이너 시작 시 자동 실행'],
    cached: true,
    description: '컨테이너가 시작되면 자동으로 실행할 명령입니다.',
    analogy: '🎬 "영화 시작" 버튼을 설정하는 것'
  }
];

/**
 * Get instruction keyword from full instruction string
 * Used for tab button display
 */
export const getInstructionKeyword = (instruction) => {
  return instruction.split(' ')[0];
};

/**
 * Get instruction arguments from full instruction string
 * Used for code display
 */
export const getInstructionArgs = (instruction) => {
  return instruction.split(' ').slice(1).join(' ');
};
