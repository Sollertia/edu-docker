/**
 * =============================================================================
 * Role: Docker Workflow Steps Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding new workflow steps
 * - Updating step commands or descriptions
 * - Changing workflow order
 *
 * STRUCTURE:
 * - WORKFLOW_STEPS: Array of step objects in execution order
 * - Each step has: step (number), title, description, cmd, output, tip, next
 * =============================================================================
 */

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: '📦 이미지 빌드',
    description: 'Dockerfile을 사용해 애플리케이션 이미지를 생성합니다',
    cmd: 'docker build -t myapp:1.0 .',
    output: `[+] Building 45.2s (5/5) FINISHED
 => [1/5] FROM eclipse-temurin:17-jdk-alpine
 => [2/5] WORKDIR /app
 => [3/5] COPY target/*.jar app.jar
 => [4/5] EXPOSE 8080
 => [5/5] ENTRYPOINT ["java","-jar","app.jar"]
Successfully built abc123def456
Successfully tagged myapp:1.0`,
    tip: '💡 -t 옵션으로 이미지 이름:태그를 지정합니다',
    next: '이미지가 생성되었습니다. 생성된 이미지를 확인해봅시다.'
  },
  {
    step: 2,
    title: '🔍 이미지 확인',
    description: '빌드된 이미지가 제대로 생성되었는지 확인합니다',
    cmd: 'docker images myapp',
    output: `REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
myapp        1.0       abc123def456   10 seconds ago   312MB`,
    tip: '💡 이미지 이름을 지정하면 해당 이미지만 필터링됩니다',
    next: '이미지가 잘 보이네요! 이제 실행해봅시다.'
  },
  {
    step: 3,
    title: '🚀 컨테이너 실행',
    description: '이미지로부터 컨테이너를 생성하고 실행합니다',
    cmd: 'docker run -d --name myapp -p 8080:8080 myapp:1.0',
    output: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',
    tip: '💡 -d: 백그라운드, --name: 이름 지정, -p: 포트 매핑',
    next: '컨테이너가 시작되었습니다! 상태를 확인해볼까요?'
  },
  {
    step: 4,
    title: '📊 상태 확인',
    description: '컨테이너가 정상적으로 실행 중인지 확인합니다',
    cmd: 'docker ps',
    output: `CONTAINER ID   IMAGE        COMMAND                  STATUS          PORTS                    NAMES
a1b2c3d4e5f6   myapp:1.0    "java -jar app.jar"      Up 5 seconds    0.0.0.0:8080->8080/tcp   myapp`,
    tip: '💡 STATUS가 "Up"이면 정상 실행 중입니다',
    next: '잘 실행되고 있네요! 로그를 확인해봅시다.'
  },
  {
    step: 5,
    title: '📜 로그 확인',
    description: '애플리케이션 로그를 확인하여 정상 동작을 검증합니다',
    cmd: 'docker logs myapp',
    output: `  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

2024-01-15 10:30:00.123  INFO --- Starting MyApplication
2024-01-15 10:30:02.456  INFO --- Started MyApplication in 2.3 seconds`,
    tip: '💡 -f 옵션을 추가하면 실시간으로 로그를 볼 수 있습니다',
    next: 'Spring Boot가 정상 시작됐네요! 이제 컨테이너에 접속해볼까요?'
  },
  {
    step: 6,
    title: '🔧 컨테이너 접속',
    description: '실행 중인 컨테이너 내부에 접속하여 상태를 확인합니다',
    cmd: 'docker exec -it myapp /bin/sh',
    output: `/app # ls -la
total 45678
drwxr-xr-x    1 root root     4096 Jan 15 10:30 .
drwxr-xr-x    1 root root     4096 Jan 15 10:30 ..
-rw-r--r--    1 root root 45678901 Jan 15 10:25 app.jar

/app # exit`,
    tip: '💡 -it: 대화형 터미널, exit로 빠져나올 수 있습니다',
    next: '내부 확인 완료! 이제 컨테이너를 중지해봅시다.'
  },
  {
    step: 7,
    title: '⏹️ 컨테이너 중지',
    description: '실행 중인 컨테이너를 안전하게 중지합니다',
    cmd: 'docker stop myapp',
    output: 'myapp',
    tip: '💡 stop은 SIGTERM을 보내 graceful shutdown을 수행합니다',
    next: '컨테이너가 중지되었습니다. 삭제해볼까요?'
  },
  {
    step: 8,
    title: '🗑️ 컨테이너 삭제',
    description: '중지된 컨테이너를 삭제합니다',
    cmd: 'docker rm myapp',
    output: 'myapp',
    tip: '💡 실행 중인 컨테이너는 -f 옵션으로 강제 삭제 가능',
    next: '컨테이너가 삭제되었습니다. 이미지도 삭제해볼까요?'
  },
  {
    step: 9,
    title: '🧹 이미지 삭제',
    description: '더 이상 필요 없는 이미지를 삭제합니다',
    cmd: 'docker rmi myapp:1.0',
    output: `Untagged: myapp:1.0
Deleted: sha256:abc123def456...`,
    tip: '💡 이미지를 사용하는 컨테이너가 있으면 삭제할 수 없습니다',
    next: '🎉 완료! 전체 라이프사이클을 성공적으로 실습했습니다!'
  }
];

/**
 * Workflow step names for progress display
 */
export const WORKFLOW_STEP_NAMES = [
  '빌드', '확인', '실행', '상태', '로그', '접속', '중지', '삭제', '정리'
];
