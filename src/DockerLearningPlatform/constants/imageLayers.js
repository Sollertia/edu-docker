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
    id: 'run',
    instruction: 'RUN apt-get update && apt-get install -y curl',
    name: 'Run Command Layer',
    size: '25MB',
    color: '#f59e0b',
    contents: ['패키지 설치', '파일 다운로드', '권한 설정', '디렉토리 생성'],
    cached: true,
    description: '이미지 빌드 시점에 실행되는 명령어입니다. 패키지 설치, 파일 다운로드 등 빌드에 필요한 모든 작업을 수행합니다.',
    analogy: '🔧 새 집에 에어컨 설치, 벽지 도배 등 공사하는 것',
    tips: [
      '여러 RUN을 && 로 합치면 레이어 수 감소',
      'apt-get update와 install은 항상 같이!',
      '캐시 삭제로 이미지 크기 최적화'
    ]
  },
  {
    id: 'env',
    instruction: 'ENV SPRING_PROFILES_ACTIVE=prod',
    name: 'Environment Variable Layer',
    size: '0B',
    color: '#10b981',
    contents: ['환경변수 설정', '런타임에도 사용 가능', '후속 명령어에서 $변수명으로 참조'],
    cached: true,
    description: '컨테이너 실행 시 사용할 환경변수를 설정합니다. 빌드 시점과 런타임 모두에서 사용됩니다.',
    analogy: '📝 집에 "여기는 ○○의 집입니다" 문패를 다는 것'
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
    id: 'cmd',
    instruction: 'CMD ["--spring.profiles.active=dev"]',
    name: 'Default Arguments Layer',
    size: '0B',
    color: '#ec4899',
    contents: ['기본 실행 인자', 'docker run 시 덮어쓰기 가능', 'ENTRYPOINT와 함께 사용'],
    cached: true,
    description: '컨테이너 실행 시 기본으로 전달할 인자입니다. docker run 명령어로 쉽게 변경할 수 있습니다.',
    analogy: '🎮 게임의 "기본 난이도" 설정 - 시작할 때 바꿀 수 있음'
  },
  {
    id: 'entrypoint',
    instruction: 'ENTRYPOINT ["java","-jar","app.jar"]',
    name: 'Startup Command Layer',
    size: '0B',
    color: '#ef4444',
    contents: ['java -jar app.jar 실행', '컨테이너 시작 시 자동 실행', '변경하기 어려움 (--entrypoint 필요)'],
    cached: true,
    description: '컨테이너가 시작되면 자동으로 실행할 명령입니다. CMD와 달리 쉽게 변경되지 않습니다.',
    analogy: '🎬 "영화 시작" 버튼을 설정하는 것'
  }
];

// CMD vs ENTRYPOINT 비교 데이터
export const CMD_VS_ENTRYPOINT = {
  title: 'CMD vs ENTRYPOINT',
  subtitle: '실무에서 가장 헷갈리는 개념!',
  comparison: [
    {
      feature: '역할',
      cmd: '기본 인자/명령 제공',
      entrypoint: '실행할 프로그램 지정'
    },
    {
      feature: 'docker run 시',
      cmd: '쉽게 덮어쓰기 가능',
      entrypoint: '변경 어려움 (--entrypoint 필요)'
    },
    {
      feature: '비유',
      cmd: '기본 토핑 (변경 가능)',
      entrypoint: '피자 도우 (기본 베이스)'
    },
    {
      feature: '언제 사용?',
      cmd: '유연하게 명령 변경 필요 시',
      entrypoint: '항상 같은 프로그램 실행 시'
    }
  ],
  examples: {
    cmdOnly: {
      title: 'CMD만 사용',
      dockerfile: 'CMD ["python", "app.py"]',
      run1: 'docker run myapp',
      result1: '→ python app.py 실행',
      run2: 'docker run myapp python test.py',
      result2: '→ python test.py 실행 (CMD 대체됨)'
    },
    entrypointOnly: {
      title: 'ENTRYPOINT만 사용',
      dockerfile: 'ENTRYPOINT ["python"]',
      run1: 'docker run myapp',
      result1: '→ python 실행 (인자 없음)',
      run2: 'docker run myapp app.py',
      result2: '→ python app.py 실행 (인자 추가됨)'
    },
    both: {
      title: 'ENTRYPOINT + CMD (권장)',
      dockerfile: 'ENTRYPOINT ["java", "-jar"]\nCMD ["app.jar"]',
      run1: 'docker run myapp',
      result1: '→ java -jar app.jar 실행',
      run2: 'docker run myapp other.jar',
      result2: '→ java -jar other.jar 실행'
    }
  },
  bestPractice: {
    title: '실무 베스트 프랙티스',
    points: [
      'ENTRYPOINT: 실행할 프로그램 (java, python, node 등)',
      'CMD: 기본 인자나 설정 파일',
      '둘 다 JSON 배열 형식 권장: ["명령어", "인자"]',
      '문자열 형식은 /bin/sh -c 로 실행됨 (주의!)'
    ]
  }
};

// .dockerignore 데이터
export const DOCKERIGNORE_DATA = {
  title: '.dockerignore',
  subtitle: '빌드 시 제외할 파일 목록',
  analogy: '🚚 이사할 때 안 가져갈 물건 목록',
  benefits: [
    { icon: '⚡', title: '빌드 속도 향상', desc: '불필요한 파일 전송 안 함' },
    { icon: '📦', title: '이미지 크기 감소', desc: 'node_modules 등 제외' },
    { icon: '🔒', title: '보안 강화', desc: '.env, 시크릿 파일 제외' },
    { icon: '💾', title: '캐시 효율', desc: '변경 없는 레이어 재사용' }
  ],
  examples: {
    common: {
      title: '공통 제외 파일',
      items: [
        { pattern: 'node_modules/', desc: '의존성은 컨테이너에서 설치' },
        { pattern: '.git/', desc: 'Git 히스토리 불필요' },
        { pattern: '*.log', desc: '로그 파일' },
        { pattern: '.env', desc: '환경변수 파일 (보안!)' },
        { pattern: '.env.*', desc: '모든 환경별 env 파일' }
      ]
    },
    java: {
      title: 'Java/Spring 프로젝트',
      items: [
        { pattern: 'target/', desc: 'Maven 빌드 결과물' },
        { pattern: 'build/', desc: 'Gradle 빌드 결과물' },
        { pattern: '*.jar', desc: 'JAR 파일 (빌드 결과)' },
        { pattern: '.idea/', desc: 'IntelliJ 설정' }
      ]
    },
    node: {
      title: 'Node.js 프로젝트',
      items: [
        { pattern: 'node_modules/', desc: '의존성 폴더' },
        { pattern: 'npm-debug.log', desc: 'NPM 디버그 로그' },
        { pattern: 'dist/', desc: '빌드 결과물' },
        { pattern: 'coverage/', desc: '테스트 커버리지' }
      ]
    }
  },
  fullExample: `# 의존성 및 빌드 결과물
node_modules/
target/
build/
dist/

# Git
.git/
.gitignore

# 환경 설정 (보안!)
.env
.env.*
*.pem
*.key

# IDE
.idea/
.vscode/
*.swp

# 로그 및 임시 파일
*.log
*.tmp
.DS_Store

# 테스트
coverage/
*.test.js

# 문서 (선택)
README.md
docs/`,
  warning: {
    title: '주의사항',
    points: [
      '.dockerignore가 없으면 모든 파일이 빌드 컨텍스트에 포함됨',
      '경로는 빌드 컨텍스트 기준 (보통 Dockerfile 위치)',
      'node_modules 제외 안 하면 빌드가 엄청 느려짐!',
      '.gitignore와 문법은 비슷하지만 별도 파일임'
    ]
  }
};

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
