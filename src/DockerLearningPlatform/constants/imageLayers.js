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
      'ENTRYPOINT: 컨테이너에서 항상 실행될 프로그램 (java, python, node 등)',
      'CMD: ENTRYPOINT에 전달되는 기본 인자 (옵션/설정값)',
      'ENTRYPOINT, CMD 모두 exec form(배열 형태) 사용 권장: ["명령어", "인자"]',
      '문자열(shell form)은 /bin/sh -c 로 실행됨 → 시그널 처리 문제 주의'
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

// 멀티스테이지 빌드 데이터
export const MULTISTAGE_BUILD_DATA = {
  title: '멀티스테이지 빌드',
  subtitle: '이미지 크기를 획기적으로 줄이는 방법',
  analogy: {
    icon: '👨‍🍳',
    title: '요리사 비유',
    description: '주방에서 요리 (빌드) → 완성된 음식만 손님에게 제공 (실행)',
    detail: '요리 도구(Maven, npm)는 주방에 두고, 완성된 요리(JAR, 빌드 결과물)만 서빙!'
  },
  problem: {
    title: '일반 빌드의 문제점',
    items: [
      { label: 'JDK 이미지', size: '~400MB', desc: '빌드 도구 포함' },
      { label: 'Maven/Gradle', size: '~100MB', desc: '빌드 시스템' },
      { label: '의존성 캐시', size: '~200MB', desc: '.m2, node_modules' },
      { label: '소스 코드', size: '~50MB', desc: '실행에 불필요' }
    ],
    total: '750MB+ 이미지',
    actualNeed: '실제 필요한 건 JAR 파일 50MB뿐!'
  },
  solution: {
    title: '멀티스테이지 빌드',
    stages: [
      {
        name: 'Stage 1: Builder',
        icon: '🔨',
        color: '#f59e0b',
        purpose: '빌드 전용 (무거움)',
        includes: ['JDK (전체)', 'Maven/Gradle', '소스 코드', '의존성'],
        result: 'JAR 파일 생성'
      },
      {
        name: 'Stage 2: Runtime',
        icon: '🚀',
        color: '#22c55e',
        purpose: '실행 전용 (가벼움)',
        includes: ['JRE만 (경량)', 'JAR 파일만'],
        result: '최종 이미지'
      }
    ]
  },
  examples: {
    java: {
      title: 'Spring Boot (Java)',
      before: '~750MB',
      after: '~150MB',
      reduction: '80% 감소',
      dockerfile: `# Stage 1: 빌드
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: 실행
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`
    },
    node: {
      title: 'Node.js (React)',
      before: '~1GB',
      after: '~25MB',
      reduction: '97% 감소',
      dockerfile: `# Stage 1: 빌드
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: 실행
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
    },
    go: {
      title: 'Go',
      before: '~800MB',
      after: '~10MB',
      reduction: '99% 감소',
      dockerfile: `# Stage 1: 빌드
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o main .

# Stage 2: 실행
FROM scratch
COPY --from=builder /app/main /main
ENTRYPOINT ["/main"]`
    }
  },
  keyPoints: [
    { keyword: 'AS builder', desc: '스테이지에 이름 부여' },
    { keyword: 'COPY --from=builder', desc: '이전 스테이지에서 파일 복사' },
    { keyword: 'alpine', desc: '경량 베이스 이미지 사용' },
    { keyword: 'scratch', desc: '완전히 빈 이미지 (Go, Rust)' }
  ],
  benefits: [
    { icon: '📦', title: '이미지 크기 감소', desc: '최대 99%까지 줄일 수 있음' },
    { icon: '🔒', title: '보안 강화', desc: '빌드 도구, 소스코드 미포함' },
    { icon: '⚡', title: '배포 속도 향상', desc: '작은 이미지 = 빠른 pull/push' },
    { icon: '💰', title: '비용 절감', desc: '스토리지, 네트워크 비용 감소' }
  ]
};

// ENV vs ARG 비교 데이터
export const ENV_VS_ARG_DATA = {
  title: 'ENV vs ARG',
  subtitle: '빌드타임 변수 vs 런타임 변수',
  analogy: {
    env: {
      icon: '🏠',
      title: 'ENV = 집 주소',
      desc: '집을 지을 때도, 살 때도 계속 사용'
    },
    arg: {
      icon: '🔨',
      title: 'ARG = 공사 현장 암호',
      desc: '공사할 때만 필요, 입주 후엔 필요 없음'
    }
  },
  comparison: [
    {
      feature: '사용 시점',
      env: '빌드 + 런타임',
      arg: '빌드 시점만'
    },
    {
      feature: '컨테이너에서',
      env: '환경변수로 존재',
      arg: '존재하지 않음'
    },
    {
      feature: '값 변경',
      env: 'docker run -e로 덮어쓰기 가능',
      arg: 'docker build --build-arg로만 설정'
    },
    {
      feature: '보안',
      env: '컨테이너에서 확인 가능 (주의!)',
      arg: '최종 이미지에 미포함 (더 안전)'
    },
    {
      feature: '주요 용도',
      env: 'DB 연결, 앱 설정',
      arg: '버전 번호, 빌드 옵션'
    }
  ],
  examples: {
    arg: {
      title: 'ARG 사용 예시',
      subtitle: '빌드할 때만 필요한 값',
      dockerfile: `# 빌드 인자 정의
ARG JAVA_VERSION=17
ARG APP_VERSION=1.0.0

# 빌드 시 사용
FROM eclipse-temurin:\${JAVA_VERSION}-jdk
LABEL version=\${APP_VERSION}

# 빌드 명령어
# docker build --build-arg APP_VERSION=2.0.0 .`,
      useCases: ['Java/Node 버전 선택', '앱 버전 라벨링', '빌드 환경 분기']
    },
    env: {
      title: 'ENV 사용 예시',
      subtitle: '실행할 때 필요한 값',
      dockerfile: `# 환경변수 정의
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080
ENV DB_HOST=localhost

# Dockerfile에서 사용
EXPOSE \${SERVER_PORT}

# 실행 시 덮어쓰기 가능
# docker run -e DB_HOST=mysql myapp`,
      useCases: ['프로파일 설정', '포트 설정', 'DB/API 연결 정보']
    },
    combined: {
      title: 'ARG + ENV 조합 (권장 패턴)',
      subtitle: '빌드 시 설정 → 런타임에 사용',
      dockerfile: `# 빌드 인자 정의
ARG DEFAULT_PORT=8080

# ARG → ENV로 전달 (런타임에도 사용 가능하게)
ENV SERVER_PORT=\${DEFAULT_PORT}

# 이제 컨테이너에서도 SERVER_PORT 사용 가능!
EXPOSE \${SERVER_PORT}`,
      explanation: 'ARG는 빌드 후 사라지지만, ENV로 복사하면 런타임에도 사용 가능!'
    }
  },
  bestPractices: [
    '민감 정보(비밀번호)는 ARG/ENV 대신 시크릿 사용',
    'ARG로 받은 값을 ENV로 전달하는 패턴 권장',
    'ENV는 docker-compose의 environment와 연동됨',
    'ARG 기본값 설정으로 빌드 안정성 확보'
  ],
  warning: {
    title: '보안 주의사항',
    points: [
      'ARG도 docker history로 확인 가능 (완전 안전 X)',
      '비밀번호는 --secret 플래그 또는 외부 볼트 사용',
      'ENV 값은 docker inspect로 누구나 확인 가능'
    ]
  }
};

// 트러블슈팅 가이드 데이터
export const TROUBLESHOOTING_DATA = {
  title: '트러블슈팅 가이드',
  subtitle: '자주 발생하는 Docker 에러와 해결 방법',
  errors: [
    {
      id: 'port-allocated',
      error: 'port is already allocated',
      icon: '🔌',
      category: '네트워크',
      cause: '해당 포트를 다른 프로세스가 사용 중',
      solutions: [
        '다른 포트 번호 사용: docker run -p 8081:8080',
        '포트 사용 프로세스 확인: lsof -i :8080',
        '기존 컨테이너 중지: docker stop $(docker ps -q)'
      ]
    },
    {
      id: 'no-space',
      error: 'no space left on device',
      icon: '💾',
      category: '스토리지',
      cause: 'Docker 이미지/컨테이너가 디스크 공간 가득 채움',
      solutions: [
        '전체 정리: docker system prune -a',
        '볼륨 정리: docker volume prune',
        '미사용 이미지 삭제: docker image prune -a'
      ]
    },
    {
      id: 'connection-refused',
      error: 'connection refused / Cannot connect',
      icon: '🌐',
      category: '네트워크',
      cause: '컨테이너 간 네트워크 설정 오류',
      solutions: [
        'localhost → 서비스명 변경 (Compose)',
        '같은 네트워크에 연결: --network mynet',
        '포트 매핑 확인: docker port 컨테이너명'
      ]
    },
    {
      id: 'permission-denied',
      error: 'permission denied',
      icon: '🔐',
      category: '권한',
      cause: '파일/소켓 접근 권한 없음',
      solutions: [
        '볼륨 권한 확인: ls -la /path/to/volume',
        'Dockerfile에서 USER 설정 확인',
        '권한 부여: chmod 또는 chown 사용'
      ]
    },
    {
      id: 'image-not-found',
      error: 'image not found / pull access denied',
      icon: '🖼️',
      category: '이미지',
      cause: '이미지가 존재하지 않거나 권한 없음',
      solutions: [
        '이미지명/태그 오타 확인',
        'docker login으로 인증',
        'docker pull로 미리 다운로드'
      ]
    },
    {
      id: 'exited-1',
      error: 'container exited with code 1',
      icon: '💥',
      category: '실행',
      cause: '애플리케이션 에러로 컨테이너 종료',
      solutions: [
        '로그 확인: docker logs 컨테이너명',
        '인터랙티브 실행: docker run -it 이미지 sh',
        'ENTRYPOINT/CMD 명령어 확인'
      ]
    },
    {
      id: 'oom-killed',
      error: 'OOMKilled / out of memory',
      icon: '🧠',
      category: '리소스',
      cause: '컨테이너가 할당된 메모리 초과 사용',
      solutions: [
        '메모리 제한 늘리기: -m 2g',
        '앱 메모리 사용량 최적화',
        'Java: -Xmx 옵션으로 힙 제한'
      ]
    },
    {
      id: 'daemon-not-running',
      error: 'Cannot connect to Docker daemon',
      icon: '🐳',
      category: '데몬',
      cause: 'Docker 서비스가 실행 중이지 않음',
      solutions: [
        'Docker Desktop 실행 (Mac/Windows)',
        'Linux: sudo systemctl start docker',
        'Docker 재시작 후 재시도'
      ]
    },
    {
      id: 'copy-failed',
      error: 'COPY failed: file not found',
      icon: '📁',
      category: '빌드',
      cause: '빌드 컨텍스트에 파일이 없음',
      solutions: [
        '.dockerignore 확인 (파일 제외됐는지)',
        '경로가 빌드 컨텍스트 기준인지 확인',
        '빌드 명령어 위치 확인: docker build .'
      ]
    },
    {
      id: 'bind-failed',
      error: 'bind: address already in use',
      icon: '🚫',
      category: '네트워크',
      cause: '포트가 이미 사용 중',
      solutions: [
        '포트 확인: netstat -tlnp | grep 포트번호',
        '프로세스 종료: kill -9 PID',
        '다른 포트 사용'
      ]
    }
  ],
  debugFlow: {
    title: '디버깅 플로우차트',
    steps: [
      { question: '컨테이너가 안 돌아요!', action: 'docker ps -a로 상태 확인' },
      { status: 'Exited (0)', meaning: '정상 종료', action: 'CMD 확인 (foreground 프로세스 필요)' },
      { status: 'Exited (1)', meaning: '에러 발생', action: 'docker logs 확인' },
      { status: 'Exited (137)', meaning: 'OOM Kill', action: '메모리 제한 늘리기' },
      { status: 'Created', meaning: '시작 안 됨', action: 'docker logs 확인' }
    ]
  },
  usefulCommands: [
    { cmd: 'docker logs -f 컨테이너명', desc: '실시간 로그 확인' },
    { cmd: 'docker exec -it 컨테이너명 sh', desc: '컨테이너 내부 접속' },
    { cmd: 'docker inspect 컨테이너명', desc: '상세 정보 확인' },
    { cmd: 'docker stats', desc: '리소스 사용량 모니터링' },
    { cmd: 'docker system df', desc: '디스크 사용량 확인' },
    { cmd: 'docker events', desc: 'Docker 이벤트 실시간 확인' }
  ]
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
