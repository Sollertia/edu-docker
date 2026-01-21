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
# Gradle로 빌드 (나중에 버려짐)
FROM gradle:8.7-jdk17-alpine AS builder
WORKDIR /app

# 의존성 먼저 내려받기 (캐시용)
COPY build.gradle settings.gradle ./
# 멀티 모듈이면 필요시 전체 gradle 설정/루트 스크립트 복사
# COPY gradle gradle
RUN gradle dependencies --no-daemon || true

# 소스 복사 후 빌드
COPY . .
RUN gradle bootJar --no-daemon

# Stage 2: 실행용 (JRE + 결과 JAR만)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]`
    },
    node: {
      title: 'Node.js (React)',
      before: '~1GB',
      after: '~25MB',
      reduction: '97% 감소',
      dockerfile: `# Stage 1: 빌드
FROM node:18-alpine AS builder
WORKDIR /app

# package.json, package-lock.json만 먼저 복사 (의존성 캐시용)
COPY package*.json ./
RUN npm ci

# 나머지 소스 복사 후 빌드
COPY . .
RUN npm run build

# Stage 2: 실행 (정적 파일 Nginx로 서빙)
FROM nginx:alpine
# 빌드 결과물 복사 (빌드 결과가 /app/dist 라는 가정)
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]`
    },
    go: {
      title: 'Go',
      before: '~800MB',
      after: '~10MB',
      reduction: '99% 감소',
      dockerfile: `# Stage 1: 빌드
FROM golang:1.21-alpine AS builder
WORKDIR /app

# go.mod, go.sum 먼저 복사해서 의존성 캐시 최적화
COPY go.mod go.sum ./
RUN go mod download

# 나머지 소스 복사
COPY . .

# 정적 바이너리 빌드 (CGO 끄고, 릴리즈 빌드)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

# Stage 2: 실행
FROM scratch
COPY --from=builder /app/main /main

# (선택) 환경변수, 작업 디렉토리 등
# WORKDIR /        # scratch라 사실 크게 의미는 없음

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
      dockerfile: `# 환경변수 정의 (컨테이너에서 사용 가능)
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080
ENV DB_HOST=localhost

# 이미지 메타데이터에 포트 문서화
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

# ARG → ENV로 전달 (빌드/런타임 둘 다에서 사용)
ENV SERVER_PORT=\${DEFAULT_PORT}

# 이미지 메타데이터에 포트 문서화
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

// 보안 베스트 프랙티스 데이터
export const SECURITY_BEST_PRACTICES_DATA = {
  title: '보안 베스트 프랙티스',
  subtitle: '안전한 Docker 이미지와 컨테이너 운영을 위한 필수 가이드',
  categories: [
    {
      id: 'non-root',
      icon: '👤',
      title: '비root 유저 실행',
      color: '#ef4444',
      importance: '높음',
      problem: 'root로 실행 시 컨테이너 탈출 공격에 취약',
      solution: {
        description: '전용 사용자 생성 후 USER 명령어로 전환',
        dockerfile: `# 사용자 및 그룹 생성
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 애플리케이션 파일 소유권 변경
COPY --chown=appuser:appgroup . /app

# 비root 유저로 전환
USER appuser

# 이후 명령어는 appuser 권한으로 실행
CMD ["node", "app.js"]`
      },
      tips: [
        'alpine 이미지: addgroup -S, adduser -S 사용',
        'debian/ubuntu: groupadd, useradd 사용',
        '파일 복사 시 --chown 플래그 활용'
      ]
    },
    {
      id: 'minimal-base',
      icon: '📦',
      title: '최소 베이스 이미지 사용',
      color: '#f59e0b',
      importance: '높음',
      problem: '큰 이미지 = 더 많은 취약점 가능성',
      solution: {
        description: '필요한 것만 포함된 경량 이미지 선택',
        examples: [
          { bad: 'ubuntu:latest (77MB)', good: 'ubuntu:22.04 (특정 버전)' },
          { bad: 'node:18 (1GB)', good: 'node:18-alpine (170MB)' },
          { bad: 'python:3.11 (1GB)', good: 'python:3.11-slim (150MB)' },
          { bad: 'openjdk:17 (400MB)', good: 'eclipse-temurin:17-jre-alpine (150MB)' }
        ]
      },
      hierarchy: [
        { name: 'scratch', size: '0MB', desc: '완전히 빈 이미지 (Go, Rust)' },
        { name: 'alpine', size: '5MB', desc: '최소 리눅스 배포판' },
        { name: 'slim', size: '~100MB', desc: '필수 패키지만 포함' },
        { name: 'full', size: '~1GB', desc: '모든 도구 포함 (개발용)' }
      ]
    },
    {
      id: 'secrets',
      icon: '🔐',
      title: '시크릿 관리',
      color: '#8b5cf6',
      importance: '매우 높음',
      problem: '이미지에 비밀번호/API 키가 포함되면 유출 위험',
      badPractices: [
        { code: 'ENV DB_PASSWORD=secret123', reason: 'docker inspect로 확인 가능' },
        { code: 'COPY .env /app/', reason: '이미지에 시크릿 포함됨' },
        { code: 'RUN echo $API_KEY > /app/key', reason: '레이어에 기록됨' }
      ],
      goodPractices: [
        {
          title: '런타임에 환경변수 주입',
          code: 'docker run -e DB_PASSWORD=$SECRET myapp',
          desc: '실행 시점에 외부에서 주입'
        },
        {
          title: 'Docker Secrets (Swarm/Compose)',
          code: `secrets:
  db_password:
    file: ./secrets/db_password.txt
services:
  app:
    secrets:
      - db_password`,
          desc: '파일로 마운트되어 메모리에만 존재'
        },
        {
          title: '외부 시크릿 매니저',
          options: ['AWS Secrets Manager', 'HashiCorp Vault', 'Azure Key Vault'],
          desc: '프로덕션 환경 권장'
        }
      ]
    },
    {
      id: 'scan',
      icon: '🔍',
      title: '이미지 취약점 스캔',
      color: '#06b6d4',
      importance: '높음',
      problem: '베이스 이미지나 패키지에 알려진 취약점 존재 가능',
      tools: [
        { name: 'docker scout', desc: 'Docker 공식 스캔 도구', cmd: 'docker scout cves 이미지명' },
        { name: 'trivy', desc: '오픈소스 스캐너', cmd: 'trivy image 이미지명' },
        { name: 'snyk', desc: '상용 보안 플랫폼', cmd: 'snyk container test 이미지명' }
      ],
      workflow: [
        'CI/CD에서 빌드 후 자동 스캔',
        '심각도 높은 취약점 발견 시 빌드 실패',
        '정기적으로 베이스 이미지 업데이트'
      ]
    },
    {
      id: 'readonly',
      icon: '📝',
      title: '읽기 전용 파일시스템',
      color: '#22c55e',
      importance: '중간',
      problem: '악성 코드가 파일시스템을 변경할 수 있음',
      solution: {
        description: '컨테이너 파일시스템을 읽기 전용으로 실행',
        code: 'docker run --read-only myapp',
        compose: `services:
  app:
    read_only: true
    tmpfs:
      - /tmp
      - /var/run`
      },
      note: '쓰기가 필요한 경로는 tmpfs나 볼륨으로 마운트'
    }
  ],
  checklist: [
    { item: '비root 유저로 실행', priority: '필수' },
    { item: '최소 베이스 이미지 사용', priority: '필수' },
    { item: '시크릿을 이미지에 포함하지 않음', priority: '필수' },
    { item: '정기적인 취약점 스캔', priority: '권장' },
    { item: '특정 버전 태그 사용 (latest 지양)', priority: '권장' },
    { item: '불필요한 패키지 설치 안 함', priority: '권장' },
    { item: '읽기 전용 파일시스템 고려', priority: '선택' }
  ]
};

// 이미지 최적화 팁 데이터
export const IMAGE_OPTIMIZATION_DATA = {
  title: '이미지 최적화 팁',
  subtitle: '더 작고, 더 빠르고, 더 효율적인 Docker 이미지 만들기',
  strategies: [
    {
      id: 'layer-order',
      icon: '📚',
      title: '레이어 순서 최적화',
      color: '#3b82f6',
      principle: '자주 변경되는 것은 나중에, 덜 변경되는 것은 먼저',
      reason: 'Docker는 변경된 레이어부터 다시 빌드 → 캐시 효율 극대화',
      bad: {
        title: '나쁜 예',
        dockerfile: `COPY . /app              # 코드 변경 시 매번
RUN npm install           # 의존성 다시 설치 😢`,
        problem: '코드만 바꿔도 npm install 다시 실행'
      },
      good: {
        title: '좋은 예',
        dockerfile: `COPY package*.json /app/  # 의존성 정의만 먼저
RUN npm install           # 의존성 캐시됨 ✅
COPY . /app               # 코드는 마지막에`,
        benefit: 'package.json 안 바뀌면 npm install 스킵!'
      }
    },
    {
      id: 'combine-run',
      icon: '🔗',
      title: 'RUN 명령어 합치기',
      color: '#8b5cf6',
      principle: '여러 RUN을 하나로 합쳐서 레이어 수 줄이기',
      bad: {
        title: '나쁜 예 (3개 레이어)',
        dockerfile: `RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean`
      },
      good: {
        title: '좋은 예 (1개 레이어)',
        dockerfile: `RUN apt-get update && \\
    apt-get install -y curl && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*`
      },
      tips: [
        '&& 로 명령어 연결',
        '마지막에 캐시/임시 파일 삭제',
        '\\로 줄바꿈하여 가독성 유지'
      ]
    },
    {
      id: 'apt-clean',
      icon: '🧹',
      title: '패키지 매니저 캐시 정리',
      color: '#ef4444',
      principle: '설치 후 캐시를 같은 RUN에서 삭제',
      examples: {
        apt: {
          title: 'apt (Debian/Ubuntu)',
          code: `RUN apt-get update && \\
    apt-get install -y --no-install-recommends curl && \\
    rm -rf /var/lib/apt/lists/*`
        },
        apk: {
          title: 'apk (Alpine)',
          code: `RUN apk add --no-cache curl`
        },
        yum: {
          title: 'yum (CentOS/RHEL)',
          code: `RUN yum install -y curl && \\
    yum clean all`
        },
        pip: {
          title: 'pip (Python)',
          code: `RUN pip install --no-cache-dir -r requirements.txt`
        },
        npm: {
          title: 'npm (Node.js)',
          code: `RUN npm ci --only=production && \\
    npm cache clean --force`
        }
      }
    },
    {
      id: 'multi-stage',
      icon: '🏗️',
      title: '멀티스테이지 빌드',
      color: '#22c55e',
      principle: '빌드 도구는 빌드 스테이지에만, 실행 이미지는 경량으로',
      comparison: [
        { type: 'Single Stage', size: '~800MB', includes: 'JDK + Maven + 소스 + JAR' },
        { type: 'Multi Stage', size: '~150MB', includes: 'JRE + JAR만' }
      ],
      note: '자세한 내용은 "멀티스테이지" 탭 참고'
    },
    {
      id: 'specific-copy',
      icon: '📋',
      title: '필요한 파일만 COPY',
      color: '#f59e0b',
      principle: 'COPY . 대신 필요한 파일/폴더만 명시',
      bad: {
        dockerfile: 'COPY . /app',
        problem: '불필요한 파일까지 모두 복사'
      },
      good: {
        dockerfile: `COPY package*.json /app/
COPY src/ /app/src/
COPY public/ /app/public/`,
        benefit: '필요한 것만 복사, .dockerignore 보완'
      }
    },
    {
      id: 'build-args',
      icon: '⚙️',
      title: '빌드 인자로 최적화',
      color: '#06b6d4',
      examples: [
        {
          lang: 'Node.js',
          arg: 'NODE_ENV=production',
          effect: 'devDependencies 설치 안 함'
        },
        {
          lang: 'Python',
          arg: 'PYTHONDONTWRITEBYTECODE=1',
          effect: '.pyc 파일 생성 안 함'
        },
        {
          lang: 'Go',
          arg: 'CGO_ENABLED=0',
          effect: 'C 의존성 제거, scratch 사용 가능'
        }
      ]
    }
  ],
  sizeComparison: {
    title: '최적화 효과 비교',
    examples: [
      { app: 'Node.js 앱', before: '1.2GB', after: '150MB', reduction: '88%' },
      { app: 'Spring Boot', before: '750MB', after: '180MB', reduction: '76%' },
      { app: 'Go 서비스', before: '800MB', after: '15MB', reduction: '98%' },
      { app: 'Python API', before: '1.1GB', after: '200MB', reduction: '82%' }
    ]
  },
  commands: {
    title: '이미지 크기 확인 명령어',
    items: [
      { cmd: 'docker images', desc: '이미지 목록과 크기' },
      { cmd: 'docker history 이미지명', desc: '레이어별 크기 확인' },
      { cmd: 'docker system df', desc: '전체 디스크 사용량' },
      { cmd: 'dive 이미지명', desc: '레이어 상세 분석 (외부 도구)' }
    ]
  }
};

// CI/CD 연동 개념 데이터
export const CICD_INTEGRATION_DATA = {
  title: 'CI/CD 연동 개념',
  subtitle: 'Docker와 자동화 파이프라인의 통합',
  overview: {
    title: 'CI/CD란?',
    ci: {
      name: 'CI (Continuous Integration)',
      icon: '🔄',
      desc: '코드 변경 시 자동으로 빌드/테스트',
      steps: ['코드 푸시', '자동 빌드', '테스트 실행', '결과 리포트']
    },
    cd: {
      name: 'CD (Continuous Deployment)',
      icon: '🚀',
      desc: '테스트 통과 후 자동으로 배포',
      steps: ['이미지 빌드', '레지스트리 푸시', '서버 배포', '헬스체크']
    }
  },
  workflow: {
    title: 'Docker CI/CD 워크플로우',
    steps: [
      { step: 1, name: 'Code Push', icon: '📝', desc: 'GitHub/GitLab에 코드 푸시', color: '#3b82f6' },
      { step: 2, name: 'CI Trigger', icon: '⚡', desc: 'CI 파이프라인 자동 시작', color: '#8b5cf6' },
      { step: 3, name: 'Build Image', icon: '🔨', desc: 'docker build로 이미지 생성', color: '#f59e0b' },
      { step: 4, name: 'Run Tests', icon: '🧪', desc: '컨테이너에서 테스트 실행', color: '#06b6d4' },
      { step: 5, name: 'Scan Image', icon: '🔍', desc: '보안 취약점 스캔', color: '#ef4444' },
      { step: 6, name: 'Push Registry', icon: '📦', desc: 'Docker Hub/ECR 등에 푸시', color: '#22c55e' },
      { step: 7, name: 'Deploy', icon: '🚀', desc: '프로덕션 서버에 배포', color: '#ec4899' }
    ]
  },
  platforms: {
    title: '주요 CI/CD 플랫폼',
    items: [
      {
        name: 'GitHub Actions',
        icon: '🐙',
        desc: 'GitHub 통합, 무료 티어 제공',
        example: `name: Docker Build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Image
        run: docker build -t myapp .
      - name: Push to Registry
        run: |
          docker login -u \${{ secrets.DOCKER_USER }} -p \${{ secrets.DOCKER_PASS }}
          docker push myapp`
      },
      {
        name: 'GitLab CI',
        icon: '🦊',
        desc: 'GitLab 내장, Docker 지원 우수',
        example: `stages:
  - build
  - deploy

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t myapp .
    - docker push myapp`
      },
      {
        name: 'Jenkins',
        icon: '🎩',
        desc: '자체 호스팅, 높은 커스터마이징',
        example: `pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t myapp .'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker push myapp'
      }
    }
  }
}`
      }
    ]
  },
  tagging: {
    title: '이미지 태깅 전략',
    strategies: [
      {
        name: 'Git Commit SHA',
        example: 'myapp:abc1234',
        pros: '정확한 버전 추적',
        cons: '사람이 읽기 어려움'
      },
      {
        name: 'Semantic Version',
        example: 'myapp:1.2.3',
        pros: '의미 있는 버전 관리',
        cons: '수동 버전 관리 필요'
      },
      {
        name: 'Branch + SHA',
        example: 'myapp:main-abc1234',
        pros: '브랜치별 구분 가능',
        cons: '태그가 길어짐'
      },
      {
        name: 'Date + Build Number',
        example: 'myapp:20240115-42',
        pros: '시간순 정렬 가능',
        cons: '코드와 직접 연결 어려움'
      }
    ],
    bestPractice: 'latest는 개발용으로만, 프로덕션은 항상 특정 버전 태그 사용'
  },
  registries: {
    title: '컨테이너 레지스트리',
    items: [
      { name: 'Docker Hub', type: '퍼블릭', free: '1개 private repo', icon: '🐳' },
      { name: 'GitHub Container Registry', type: '퍼블릭/프라이빗', free: 'GitHub 연동', icon: '🐙' },
      { name: 'AWS ECR', type: '프라이빗', free: '500MB/월', icon: '☁️' },
      { name: 'Google GCR', type: '프라이빗', free: 'GCP 연동', icon: '🌐' },
      { name: 'Azure ACR', type: '프라이빗', free: 'Azure 연동', icon: '📘' }
    ]
  },
  bestPractices: [
    'main 브랜치 푸시 시에만 프로덕션 배포',
    'PR마다 테스트 이미지 빌드하여 검증',
    '시크릿은 CI/CD 플랫폼의 시크릿 기능 사용',
    '이미지 스캔을 파이프라인에 포함',
    '빌드 캐시 활용하여 빌드 시간 단축',
    'health check 포함하여 배포 검증'
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
