import React, { useState, useEffect, useRef } from 'react';

const DockerLearningPlatform = () => {
  const [activeTab, setActiveTab] = useState('why');
  
  // Why Docker states
  const [whyStep, setWhyStep] = useState(0);
  
  // Concepts states
  const [conceptSection, setConceptSection] = useState(0);
  
  // VM vs Docker states
  const [vmSimulation, setVmSimulation] = useState({ running: false, elapsed: 0, vms: [], containers: [] });
  const [showCostDetail, setShowCostDetail] = useState(false);
  
  // Dockerfile states
  const [dockerfileStep, setDockerfileStep] = useState(0);
  
  // Commands states
  const [cmdMode, setCmdMode] = useState('learn'); // 'learn' or 'workflow'
  const [cmdCategory, setCmdCategory] = useState(0);
  const [cmdIndex, setCmdIndex] = useState(0);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const terminalRef = useRef(null);
  
  // Workflow states
  const [workflowStep, setWorkflowStep] = useState(0);
  const [workflowTerminalHistory, setWorkflowTerminalHistory] = useState([]);
  const [workflowInput, setWorkflowInput] = useState('');
  const workflowTerminalRef = useRef(null);
  
  // Compose states
  const [composeSection, setComposeSection] = useState(0);

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (workflowTerminalRef.current) {
      workflowTerminalRef.current.scrollTop = workflowTerminalRef.current.scrollHeight;
    }
  }, [workflowTerminalHistory]);

  // ============ WHY DOCKER CONTENT ============
  const whyDockerSteps = [
    { id: 'problem', title: '😱 개발자의 악몽', subtitle: '"내 컴퓨터에서는 됐는데요..."' },
    { id: 'cause', title: '🤔 왜 이런 일이 생길까?', subtitle: '환경의 차이 = 동작의 차이' },
    { id: 'solution', title: '📦 Docker의 해결책', subtitle: '앱 + 환경을 함께 포장!' },
    { id: 'benefit', title: '🚀 Docker의 장점', subtitle: '왜 모든 회사가 Docker를 쓸까?' },
    { id: 'workflow', title: '🔧 Docker 워크플로우', subtitle: 'Build → Ship → Run' }
  ];

  // ============ LAYER DATA ============
  const imageLayersDetail = [
    { id: 'base', instruction: 'FROM eclipse-temurin:17-jdk-alpine', name: 'Base Image Layer', size: '190MB', color: '#3b82f6', contents: ['Alpine Linux 3.18', 'OpenJDK 17.0.2', 'Basic Unix tools'], cached: true, description: '모든 이미지의 시작점. 이미 만들어진 JDK 이미지를 가져옵니다.', analogy: '🏠 이미 기초공사가 끝난 땅을 구매하는 것' },
    { id: 'workdir', instruction: 'WORKDIR /app', name: 'Working Directory Layer', size: '0B', color: '#8b5cf6', contents: ['/app 디렉토리 생성', '이후 명령의 기준 경로 설정'], cached: true, description: '컨테이너 안에서 작업할 기본 폴더를 지정합니다.', analogy: '🛠️ 작업실을 어디에 만들지 정하는 것' },
    { id: 'copy', instruction: 'COPY target/*.jar app.jar', name: 'Application Layer', size: '45MB', color: '#06b6d4', contents: ['app.jar (Spring Boot)', 'application.yml', 'static resources'], cached: false, description: '빌드된 JAR 파일을 컨테이너 안으로 복사합니다.', analogy: '📦 이사할 때 짐을 새 집으로 옮기는 것' },
    { id: 'expose', instruction: 'EXPOSE 8080', name: 'Port Declaration Layer', size: '0B', color: '#22c55e', contents: ['포트 8080 문서화', '실제 포트 오픈은 -p 옵션으로'], cached: true, description: '이 컨테이너가 어떤 포트를 사용하는지 명시합니다.', analogy: '🚪 "현관문은 여기입니다" 표지판 붙이기' },
    { id: 'entrypoint', instruction: 'ENTRYPOINT ["java","-jar","app.jar"]', name: 'Startup Command Layer', size: '0B', color: '#ef4444', contents: ['java -jar app.jar 실행', '컨테이너 시작 시 자동 실행'], cached: true, description: '컨테이너가 시작되면 자동으로 실행할 명령입니다.', analogy: '🎬 "영화 시작" 버튼을 설정하는 것' }
  ];

  // ============ COMMANDS DATA (ENHANCED) ============
  const commandCategories = [
    { name: '🔰 기본 확인', commands: [
      { cmd: 'docker version', short: 'Docker 버전 확인', desc: 'Docker 클라이언트와 서버의 버전 정보를 확인합니다', output: 'Client: Docker Engine 24.0.7\nServer: Docker Engine 24.0.7\nAPI version: 1.43' },
      { cmd: 'docker info', short: '시스템 정보', desc: '컨테이너 수, 이미지 수, 저장소 드라이버 등 시스템 전체 정보', output: 'Containers: 5 (Running: 2, Paused: 0, Stopped: 3)\nImages: 12\nStorage Driver: overlay2' },
      { cmd: 'docker --help', short: '도움말', desc: '사용 가능한 모든 Docker 명령어 목록 확인', output: 'Usage: docker [OPTIONS] COMMAND\n\nCommands:\n  run, build, pull, push, images, ps...' }
    ]},
    { name: '📦 이미지 관리', commands: [
      { cmd: 'docker images', short: '이미지 목록', desc: '로컬에 저장된 모든 이미지를 확인합니다', output: 'REPOSITORY   TAG       IMAGE ID       SIZE\nmyapp        1.0       abc123def456   312MB\nmysql        8.0       def456abc789   540MB' },
      { cmd: 'docker pull nginx:latest', short: '이미지 다운로드', desc: 'Docker Hub에서 이미지를 다운로드합니다', output: 'latest: Pulling from library/nginx\nDigest: sha256:abc123...\nStatus: Downloaded newer image' },
      { cmd: 'docker build -t myapp:1.0 .', short: '이미지 빌드', desc: '현재 디렉토리의 Dockerfile로 이미지를 빌드합니다', output: '[+] Building 45.2s\n => [1/5] FROM eclipse-temurin:17\n => [2/5] WORKDIR /app\nSuccessfully tagged myapp:1.0' },
      { cmd: 'docker tag myapp:1.0 myapp:latest', short: '이미지 태그', desc: '기존 이미지에 새로운 태그를 추가합니다', output: '(태그 추가 완료)' },
      { cmd: 'docker push myrepo/myapp:1.0', short: '이미지 업로드', desc: '이미지를 레지스트리에 업로드합니다', output: 'The push refers to repository [docker.io/myrepo/myapp]\n1.0: digest: sha256:abc123... size: 1234' },
      { cmd: 'docker rmi myapp:1.0', short: '이미지 삭제', desc: '로컬 이미지를 삭제합니다', output: 'Untagged: myapp:1.0\nDeleted: sha256:abc123def456...' },
      { cmd: 'docker image prune', short: '미사용 이미지 정리', desc: '태그 없는 dangling 이미지들을 삭제합니다', output: 'Deleted Images:\nsha256:abc123...\nTotal reclaimed space: 1.2GB' }
    ]},
    { name: '🏃 컨테이너 실행', commands: [
      { cmd: 'docker run -d --name myapp -p 8080:8080 myapp:1.0', short: '백그라운드 실행', desc: '-d: 백그라운드, --name: 컨테이너 이름, -p: 포트매핑', output: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' },
      { cmd: 'docker run -it --rm alpine /bin/sh', short: '대화형 일회용', desc: '-it: 대화형 터미널, --rm: 종료 시 자동 삭제', output: '/ # _' },
      { cmd: 'docker run -d -e DB_HOST=localhost myapp:1.0', short: '환경변수 전달', desc: '-e: 환경변수를 컨테이너에 전달', output: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7' },
      { cmd: 'docker run -d -v mydata:/app/data myapp:1.0', short: '볼륨 마운트', desc: '-v: 볼륨을 컨테이너에 마운트', output: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8' },
      { cmd: 'docker run -d --network mynet myapp:1.0', short: '네트워크 지정', desc: '--network: 특정 네트워크에 연결', output: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9' },
      { cmd: 'docker run -d --restart always myapp:1.0', short: '자동 재시작', desc: '--restart: 컨테이너 재시작 정책 설정', output: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0' }
    ]},
    { name: '⏹️ 시작/중지', commands: [
      { cmd: 'docker stop myapp', short: '정상 종료', desc: 'SIGTERM 신호로 graceful shutdown (10초 대기)', output: 'myapp' },
      { cmd: 'docker stop -t 30 myapp', short: '종료 대기시간 지정', desc: '-t: 강제 종료 전 대기 시간(초) 지정', output: 'myapp' },
      { cmd: 'docker kill myapp', short: '강제 종료', desc: 'SIGKILL 신호로 즉시 강제 종료', output: 'myapp' },
      { cmd: 'docker start myapp', short: '컨테이너 시작', desc: '중지된 컨테이너를 다시 시작합니다', output: 'myapp' },
      { cmd: 'docker restart myapp', short: '컨테이너 재시작', desc: 'stop 후 start를 연속 실행합니다', output: 'myapp' },
      { cmd: 'docker pause myapp', short: '일시 정지', desc: '컨테이너 프로세스를 일시 정지합니다', output: 'myapp' },
      { cmd: 'docker unpause myapp', short: '일시 정지 해제', desc: '일시 정지된 컨테이너를 재개합니다', output: 'myapp' }
    ]},
    { name: '📊 상태 확인', commands: [
      { cmd: 'docker ps', short: '실행 중 컨테이너', desc: '현재 실행 중인 컨테이너 목록', output: 'CONTAINER ID   IMAGE       STATUS         NAMES\na1b2c3d4e5f6   myapp:1.0   Up 2 hours     myapp' },
      { cmd: 'docker ps -a', short: '전체 컨테이너', desc: '중지된 컨테이너 포함 전체 목록', output: 'CONTAINER ID   IMAGE       STATUS           NAMES\na1b2c3d4e5f6   myapp:1.0   Exited (0) 1h    myapp' },
      { cmd: 'docker ps -q', short: 'ID만 출력', desc: '컨테이너 ID만 출력 (스크립트용)', output: 'a1b2c3d4e5f6\nb2c3d4e5f6g7' },
      { cmd: 'docker stats', short: '리소스 모니터링', desc: 'CPU, 메모리, 네트워크 I/O 실시간 확인', output: 'CONTAINER   CPU %   MEM USAGE / LIMIT     NET I/O\nmyapp       2.5%    256MiB / 512MiB       1.2kB / 500B' },
      { cmd: 'docker top myapp', short: '프로세스 확인', desc: '컨테이너 내부에서 실행 중인 프로세스 확인', output: 'PID    USER   COMMAND\n1      root   java -jar app.jar' },
      { cmd: 'docker port myapp', short: '포트 매핑 확인', desc: '컨테이너의 포트 매핑 정보 확인', output: '8080/tcp -> 0.0.0.0:8080' }
    ]},
    { name: '🔍 로그/디버깅', commands: [
      { cmd: 'docker logs myapp', short: '로그 보기', desc: '컨테이너의 stdout/stderr 출력 확인', output: '2024-01-15 10:30:00 Started MyApplication in 2.3s' },
      { cmd: 'docker logs -f myapp', short: '실시간 로그', desc: '-f: follow 모드로 실시간 로그 스트리밍', output: '[실시간 로그 스트리밍 중...]\n2024-01-15 10:31:00 Request received...' },
      { cmd: 'docker logs --tail 100 myapp', short: '최근 N줄', desc: '--tail: 마지막 N줄만 출력', output: '[최근 100줄 출력]' },
      { cmd: 'docker logs --since 1h myapp', short: '시간 기준 로그', desc: '--since: 특정 시간 이후의 로그만 출력', output: '[최근 1시간 로그 출력]' },
      { cmd: 'docker exec -it myapp /bin/sh', short: '컨테이너 접속', desc: '실행 중인 컨테이너 내부 쉘에 접속', output: '/app # _' },
      { cmd: 'docker exec myapp cat /app/config.yml', short: '명령어 실행', desc: '컨테이너 내부에서 단일 명령어 실행', output: 'server:\n  port: 8080' },
      { cmd: 'docker inspect myapp', short: '상세 정보', desc: 'IP, 볼륨, 환경변수 등 모든 설정을 JSON으로 출력', output: '[\n  {\n    "Id": "a1b2c3...",\n    "NetworkSettings": {\n      "IPAddress": "172.17.0.2"\n    }\n  }\n]' },
      { cmd: 'docker diff myapp', short: '파일 변경 확인', desc: '컨테이너에서 변경된 파일 목록 확인', output: 'C /app\nA /app/logs/app.log\nC /tmp' }
    ]},
    { name: '📋 복사/전송', commands: [
      { cmd: 'docker cp myapp:/app/logs ./logs', short: '컨테이너→호스트', desc: '컨테이너의 파일을 호스트로 복사', output: '(복사 완료)' },
      { cmd: 'docker cp ./config.yml myapp:/app/', short: '호스트→컨테이너', desc: '호스트의 파일을 컨테이너로 복사', output: '(복사 완료)' },
      { cmd: 'docker export myapp > backup.tar', short: '컨테이너 내보내기', desc: '컨테이너 파일시스템을 tar로 내보내기', output: '(backup.tar 생성 완료)' },
      { cmd: 'docker import backup.tar myapp:backup', short: '이미지로 가져오기', desc: 'tar 파일을 이미지로 가져오기', output: 'sha256:abc123def456...' }
    ]},
    { name: '🌐 네트워크', commands: [
      { cmd: 'docker network ls', short: '네트워크 목록', desc: '모든 Docker 네트워크 목록 확인', output: 'NETWORK ID     NAME      DRIVER    SCOPE\nabc123def456   bridge    bridge    local\ndef456abc789   mynet     bridge    local' },
      { cmd: 'docker network create mynet', short: '네트워크 생성', desc: '새로운 브릿지 네트워크 생성', output: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1' },
      { cmd: 'docker network connect mynet myapp', short: '네트워크 연결', desc: '실행 중인 컨테이너를 네트워크에 연결', output: '(연결 완료)' },
      { cmd: 'docker network disconnect mynet myapp', short: '네트워크 해제', desc: '컨테이너를 네트워크에서 분리', output: '(연결 해제 완료)' },
      { cmd: 'docker network inspect mynet', short: '네트워크 상세', desc: '네트워크의 상세 정보와 연결된 컨테이너 확인', output: '[\n  {\n    "Name": "mynet",\n    "Containers": {\n      "abc123": { "Name": "myapp" }\n    }\n  }\n]' },
      { cmd: 'docker network rm mynet', short: '네트워크 삭제', desc: '네트워크 삭제 (연결된 컨테이너 없어야 함)', output: 'mynet' }
    ]},
    { name: '💾 볼륨', commands: [
      { cmd: 'docker volume ls', short: '볼륨 목록', desc: '모든 Docker 볼륨 목록 확인', output: 'DRIVER    VOLUME NAME\nlocal     mydata\nlocal     db-data' },
      { cmd: 'docker volume create mydata', short: '볼륨 생성', desc: '새로운 볼륨 생성', output: 'mydata' },
      { cmd: 'docker volume inspect mydata', short: '볼륨 상세', desc: '볼륨의 마운트 경로 등 상세 정보', output: '[\n  {\n    "Name": "mydata",\n    "Mountpoint": "/var/lib/docker/volumes/mydata/_data"\n  }\n]' },
      { cmd: 'docker volume rm mydata', short: '볼륨 삭제', desc: '볼륨 삭제 (사용 중이 아닐 때만)', output: 'mydata' },
      { cmd: 'docker volume prune', short: '미사용 볼륨 정리', desc: '사용하지 않는 모든 볼륨 삭제', output: 'Deleted Volumes:\nmydata\nTotal reclaimed space: 500MB' }
    ]},
    { name: '🧹 정리/삭제', commands: [
      { cmd: 'docker rm myapp', short: '컨테이너 삭제', desc: '중지된 컨테이너 삭제', output: 'myapp' },
      { cmd: 'docker rm -f myapp', short: '강제 삭제', desc: '실행 중인 컨테이너도 강제 삭제', output: 'myapp' },
      { cmd: 'docker rm $(docker ps -aq)', short: '전체 컨테이너 삭제', desc: '모든 컨테이너를 한 번에 삭제', output: 'a1b2c3d4\nb2c3d4e5\nc3d4e5f6' },
      { cmd: 'docker container prune', short: '중지된 컨테이너 정리', desc: '모든 중지된 컨테이너 삭제', output: 'Deleted Containers:\na1b2c3d4e5f6\nTotal reclaimed space: 50MB' },
      { cmd: 'docker system prune', short: '시스템 정리', desc: '미사용 컨테이너, 네트워크, 이미지 정리', output: 'Total reclaimed space: 2.5GB' },
      { cmd: 'docker system prune -a --volumes', short: '전체 정리', desc: '모든 미사용 리소스 + 볼륨까지 삭제', output: 'Total reclaimed space: 10.2GB' },
      { cmd: 'docker system df', short: '디스크 사용량', desc: 'Docker가 사용 중인 디스크 용량 확인', output: 'TYPE         TOTAL    ACTIVE   SIZE      RECLAIMABLE\nImages       12       5        4.5GB     2.1GB (46%)\nContainers   8        2        500MB     400MB (80%)' }
    ]}
  ];

  // ============ WORKFLOW DATA ============
  const workflowSteps = [
    {
      step: 1,
      title: '📦 이미지 빌드',
      description: 'Dockerfile을 사용해 애플리케이션 이미지를 생성합니다',
      cmd: 'docker build -t myapp:1.0 .',
      output: `[+] Building 45.2s (8/8) FINISHED
 => [1/5] FROM eclipse-temurin:17-jdk-alpine
 => [2/5] WORKDIR /app
 => [3/5] COPY target/*.jar app.jar
 => [4/5] EXPOSE 8080
 => [5/5] ENTRYPOINT ["java","-jar","app.jar"]
Successfully built abc123def456
Successfully tagged myapp:1.0`,
      tip: '💡 -t 옵션으로 이미지 이름:태그를 지정합니다',
      next: '이미지가 생성되었습니다. 이제 컨테이너를 실행해볼까요?'
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
      output: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4`,
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
      output: `myapp`,
      tip: '💡 stop은 SIGTERM을 보내 graceful shutdown을 수행합니다',
      next: '컨테이너가 중지되었습니다. 삭제해볼까요?'
    },
    {
      step: 8,
      title: '🗑️ 컨테이너 삭제',
      description: '중지된 컨테이너를 삭제합니다',
      cmd: 'docker rm myapp',
      output: `myapp`,
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

  // ============ HANDLERS ============
  const handleTerminalSubmit = (e) => {
    if (e.key !== 'Enter' || !terminalInput.trim()) return;
    const expected = commandCategories[cmdCategory].commands[cmdIndex];
    const isCorrect = terminalInput.trim() === expected.cmd;
    setTerminalHistory(prev => [...prev, { input: terminalInput, isCorrect, output: isCorrect ? expected.output : `❌ 틀렸습니다.\n힌트: ${expected.cmd.substring(0, 40)}...` }]);
    setTerminalInput('');
  };

  const handleWorkflowSubmit = (e) => {
    if (e.key !== 'Enter' || !workflowInput.trim()) return;
    const expected = workflowSteps[workflowStep];
    const isCorrect = workflowInput.trim() === expected.cmd;
    setWorkflowTerminalHistory(prev => [...prev, { 
      input: workflowInput, 
      isCorrect, 
      output: isCorrect ? expected.output : `❌ 틀렸습니다.\n정답: ${expected.cmd}` 
    }]);
    setWorkflowInput('');
    if (isCorrect && workflowStep < workflowSteps.length - 1) {
      setTimeout(() => setWorkflowStep(prev => prev + 1), 1000);
    }
  };

  const resetWorkflow = () => {
    setWorkflowStep(0);
    setWorkflowTerminalHistory([]);
    setWorkflowInput('');
  };

  const runVmSimulation = async () => {
    setVmSimulation({ running: true, elapsed: 0, vms: [], containers: [] });
    const interval = setInterval(() => setVmSimulation(prev => ({ ...prev, elapsed: prev.elapsed + 100 })), 100);
    
    for (let i = 0; i < 3; i++) {
      setVmSimulation(prev => ({ ...prev, vms: [...prev.vms, { id: i, progress: 0, stage: 'BIOS' }] }));
      const stages = ['BIOS', '부트로더', 'OS커널', '서비스', '앱시작', '완료'];
      for (let s = 0; s < stages.length; s++) {
        await sleep(400);
        setVmSimulation(prev => ({ ...prev, vms: prev.vms.map(vm => vm.id === i ? { ...vm, progress: (s + 1) * 16.6, stage: stages[s] } : vm) }));
      }
    }
    
    for (let i = 0; i < 6; i++) {
      setVmSimulation(prev => ({ ...prev, containers: [...prev.containers, { id: i, progress: 0 }] }));
      await sleep(80);
      setVmSimulation(prev => ({ ...prev, containers: prev.containers.map(c => c.id === i ? { ...c, progress: 50 } : c) }));
      await sleep(120);
      setVmSimulation(prev => ({ ...prev, containers: prev.containers.map(c => c.id === i ? { ...c, progress: 100 } : c) }));
    }
    
    clearInterval(interval);
    setVmSimulation(prev => ({ ...prev, running: false }));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)', color: '#fff', fontFamily: '"Pretendard Variable", Pretendard, -apple-system, sans-serif', padding: '16px' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(circle at 20% 30%, rgba(0, 150, 255, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(120, 60, 200, 0.08) 0%, transparent 40%)`, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2rem' }}>🐳</span>
          <span style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff, #9933ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Docker 완전 정복</span>
        </h1>
        <p style={{ color: '#8892a0', fontSize: '0.9rem' }}>인터랙티브하게 배우는 Docker의 모든 것</p>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'why', emoji: '❓', label: 'Why Docker?' },
          { id: 'concept', emoji: '💡', label: '핵심 개념' },
          { id: 'vmvsdocker', emoji: '⚡', label: 'VM vs Docker' },
          { id: 'dockerfile', emoji: '📝', label: 'Dockerfile' },
          { id: 'commands', emoji: '💻', label: '명령어 실습' },
          { id: 'network', emoji: '🔌', label: '네트워크' },
          { id: 'compose', emoji: '🎼', label: 'Compose' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '10px 14px', borderRadius: '12px',
            border: activeTab === tab.id ? '2px solid #00d4ff' : '2px solid transparent',
            background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(100,50,200,0.2))' : 'rgba(255,255,255,0.05)',
            color: activeTab === tab.id ? '#fff' : '#8892a0', cursor: 'pointer', transition: 'all 0.2s'
          }}>
            <div style={{ fontSize: '1.2rem' }}>{tab.emoji}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '600', marginTop: '2px' }}>{tab.label}</div>
          </button>
        ))}
      </div>

      {/* ============ WHY DOCKER TAB ============ */}
      {activeTab === 'why' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            {whyDockerSteps.map((_, i) => (
              <button key={i} onClick={() => setWhyStep(i)} style={{ width: whyStep === i ? '100px' : '40px', height: '8px', borderRadius: '4px', border: 'none', background: i <= whyStep ? 'linear-gradient(90deg, #00d4ff, #7c3aed)' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)', minHeight: '450px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0,212,255,0.2)', borderRadius: '20px', fontSize: '0.8rem', color: '#00d4ff', marginBottom: '12px' }}>{whyStep + 1} / {whyDockerSteps.length}</div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{whyDockerSteps[whyStep].title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem' }}>{whyDockerSteps[whyStep].subtitle}</p>
            </div>

            {whyStep === 0 && (
              <div>
                <p style={{ textAlign: 'center', color: '#e2e8f0', marginBottom: '24px' }}>3개월간 열심히 개발한 Spring Boot 프로젝트를 서버에 배포했는데...</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))', borderRadius: '16px', padding: '20px', border: '2px solid rgba(34,197,94,0.4)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}><span style={{ fontSize: '2.5rem' }}>💻</span><h4 style={{ color: '#4ade80', marginTop: '8px' }}>개발 PC</h4></div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px' }}>
                      {['Java 17.0.2', 'macOS', 'MySQL 8.0', '환경변수 설정됨'].map((item, i) => (<div key={i} style={{ color: '#86efac', fontSize: '0.85rem', marginBottom: '6px' }}>✓ {item}</div>))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', background: 'rgba(34,197,94,0.3)', borderRadius: '10px' }}><span style={{ fontSize: '1.5rem' }}>✅</span><div style={{ color: '#86efac', fontWeight: '600' }}>잘 동작함!</div></div>
                  </div>
                  <div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', marginBottom: '8px' }}>📦</div><div style={{ fontSize: '1.5rem' }}>➡️</div><div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '8px' }}>배포</div></div>
                  <div style={{ background: 'linear-gradient(180deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))', borderRadius: '16px', padding: '20px', border: '2px solid rgba(239,68,68,0.4)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}><span style={{ fontSize: '2.5rem' }}>🖥️</span><h4 style={{ color: '#f87171', marginTop: '8px' }}>운영 서버</h4></div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px' }}>
                      {['Java 11', 'Ubuntu', 'MySQL 5.7', '환경변수 누락'].map((item, i) => (<div key={i} style={{ color: '#fca5a5', fontSize: '0.85rem', marginBottom: '6px' }}>✗ {item}</div>))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', background: 'rgba(239,68,68,0.3)', borderRadius: '10px' }}><span style={{ fontSize: '1.5rem' }}>💥</span><div style={{ color: '#fca5a5', fontWeight: '600' }}>에러 발생!</div></div>
                  </div>
                </div>
              </div>
            )}

            {whyStep === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[{ icon: '☕', title: 'Java 버전 차이', desc: 'Java 17 문법이 Java 11에서 에러' }, { icon: '🗄️', title: 'DB 버전 차이', desc: 'MySQL 8.0 쿼리가 5.7에서 실패' }, { icon: '📦', title: '라이브러리 차이', desc: '설치된 패키지 버전이 다름' }, { icon: '⚙️', title: '설정 차이', desc: '환경변수, 경로, 권한 등이 다름' }].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                    <div><div style={{ color: '#fff', fontWeight: '600', marginBottom: '4px' }}>{item.title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div></div>
                  </div>
                ))}
              </div>
            )}

            {whyStep === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center' }}>
                <div style={{ background: 'rgba(239,68,68,0.1)', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📝</div><h4 style={{ color: '#f87171', marginBottom: '8px' }}>기존 방식</h4><p style={{ color: '#fca5a5', fontSize: '0.9rem' }}>설치 매뉴얼 100페이지</p>
                  <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(239,68,68,0.2)', borderRadius: '8px', fontSize: '0.85rem', color: '#fca5a5' }}>사람마다 결과 다름</div>
                </div>
                <div style={{ fontSize: '2.5rem', color: '#22c55e' }}>→</div>
                <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📦</div><h4 style={{ color: '#4ade80', marginBottom: '8px' }}>Docker 방식</h4><p style={{ color: '#86efac', fontSize: '0.9rem' }}>실행 환경 통째로 포장</p>
                  <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(34,197,94,0.2)', borderRadius: '8px', fontSize: '0.85rem', color: '#86efac' }}>어디서나 동일!</div>
                </div>
              </div>
            )}

            {whyStep === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[{ icon: '🔄', title: '일관성', desc: '개발/테스트/운영 환경 동일', stat: '배포 실패 90% 감소' }, { icon: '⚡', title: '속도', desc: '서버 세팅 시간 단축', stat: '몇 시간 → 몇 초' }, { icon: '📈', title: '확장성', desc: '트래픽 증가 시 스케일 아웃', stat: '자동 확장 가능' }, { icon: '💰', title: '비용', desc: '자원 효율적 사용', stat: 'VM 대비 6배 효율' }].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}><span style={{ fontSize: '2rem' }}>{item.icon}</span><div><div style={{ color: '#fff', fontWeight: '600' }}>{item.title}</div><div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div></div></div>
                    <div style={{ padding: '10px', background: 'rgba(34,197,94,0.15)', borderRadius: '8px', textAlign: 'center' }}><span style={{ color: '#86efac', fontWeight: '600' }}>{item.stat}</span></div>
                  </div>
                ))}
              </div>
            )}

            {whyStep === 4 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[{ phase: 'Build', icon: '🔨', cmd: 'docker build', desc: 'Dockerfile로 이미지 생성' }, { phase: 'Ship', icon: '🚢', cmd: 'docker push', desc: 'Docker Hub에 업로드' }, { phase: 'Run', icon: '▶️', cmd: 'docker run', desc: '어디서든 실행' }].map((step, i) => (
                  <React.Fragment key={i}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', textAlign: 'center', minWidth: '160px', border: '2px solid rgba(0,212,255,0.3)' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{step.icon}</div>
                      <div style={{ color: '#00d4ff', fontWeight: '700', fontSize: '1.2rem', marginBottom: '8px' }}>{step.phase}</div>
                      <code style={{ display: 'block', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px', color: '#86efac', fontSize: '0.85rem', marginBottom: '8px' }}>{step.cmd}</code>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{step.desc}</div>
                    </div>
                    {i < 2 && <div style={{ fontSize: '1.5rem', color: '#00d4ff' }}>→</div>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
            <button onClick={() => setWhyStep(Math.max(0, whyStep - 1))} disabled={whyStep === 0} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: whyStep === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)', color: whyStep === 0 ? '#666' : '#fff', cursor: whyStep === 0 ? 'not-allowed' : 'pointer' }}>← 이전</button>
            <button onClick={() => setWhyStep(Math.min(whyDockerSteps.length - 1, whyStep + 1))} disabled={whyStep === whyDockerSteps.length - 1} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: whyStep === whyDockerSteps.length - 1 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00d4ff, #0099ff)', color: whyStep === whyDockerSteps.length - 1 ? '#666' : '#fff', cursor: whyStep === whyDockerSteps.length - 1 ? 'not-allowed' : 'pointer' }}>다음 →</button>
          </div>
        </div>
      )}

      {/* ============ CORE CONCEPTS TAB (ENHANCED) ============ */}
      {activeTab === 'concept' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['이미지 vs 컨테이너', '레이어 구조', '생명주기', '레지스트리', '볼륨'].map((name, i) => (
              <button key={i} onClick={() => setConceptSection(i)} style={{ padding: '10px 18px', borderRadius: '10px', border: conceptSection === i ? '2px solid #00d4ff' : '2px solid transparent', background: conceptSection === i ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)', color: conceptSection === i ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>{name}</button>
            ))}
          </div>

          {/* Section 0: Image vs Container */}
          {conceptSection === 0 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#00d4ff' }}>📦 이미지 vs 🏃 컨테이너</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>Docker의 가장 기본이 되는 두 가지 개념</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Image */}
                <div style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.15), rgba(59,130,246,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(59,130,246,0.4)' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>📦</div>
                    <h4 style={{ color: '#60a5fa', fontSize: '1.3rem' }}>이미지 (Image)</h4>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>읽기 전용 템플릿</div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ color: '#93c5fd', fontSize: '0.9rem', marginBottom: '12px', fontWeight: '600' }}>🎯 핵심 특징</div>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#bfdbfe', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li><strong>불변(Immutable)</strong> - 한번 만들면 변경 불가</li>
                      <li><strong>레이어 구조</strong> - 여러 층으로 구성</li>
                      <li><strong>공유 가능</strong> - Docker Hub에 업로드/다운로드</li>
                      <li><strong>버전 관리</strong> - 태그로 버전 구분</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '8px' }}>🍳 비유</div>
                    <div style={{ color: '#fef3c7', fontSize: '0.85rem' }}>
                      <strong>레시피</strong> - 요리 방법이 적힌 문서<br/>
                      <strong>붕어빵 틀</strong> - 같은 모양을 찍어내는 틀<br/>
                      <strong>설계도</strong> - 건물을 짓기 위한 도면
                    </div>
                  </div>
                </div>

                {/* Container */}
                <div style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.15), rgba(34,197,94,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(34,197,94,0.4)' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🏃</div>
                    <h4 style={{ color: '#4ade80', fontSize: '1.3rem' }}>컨테이너 (Container)</h4>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>실행 중인 인스턴스</div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ color: '#86efac', fontSize: '0.9rem', marginBottom: '12px', fontWeight: '600' }}>🎯 핵심 특징</div>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li><strong>실행 상태</strong> - 이미지가 메모리에 올라간 것</li>
                      <li><strong>격리된 환경</strong> - 독립적인 프로세스 공간</li>
                      <li><strong>쓰기 가능</strong> - 파일 생성/수정 가능 (레이어)</li>
                      <li><strong>일시적</strong> - 삭제하면 변경사항도 삭제</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '8px' }}>🍳 비유</div>
                    <div style={{ color: '#fef3c7', fontSize: '0.85rem' }}>
                      <strong>완성된 요리</strong> - 레시피로 만든 음식<br/>
                      <strong>구워진 붕어빵</strong> - 틀에서 나온 실제 빵<br/>
                      <strong>지어진 건물</strong> - 설계도로 완성된 집
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Relationship */}
              <div style={{ background: 'rgba(139,92,246,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(139,92,246,0.3)' }}>
                <h4 style={{ color: '#c4b5fd', marginBottom: '16px', textAlign: 'center' }}>💡 핵심 관계</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <code style={{ display: 'block', padding: '8px 16px', background: 'rgba(59,130,246,0.3)', borderRadius: '8px', color: '#93c5fd', marginBottom: '4px' }}>myapp:1.0</code>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>1개의 이미지</span>
                  </div>
                  <div style={{ fontSize: '1.5rem' }}>→</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3].map(n => (
                        <code key={n} style={{ padding: '8px 12px', background: 'rgba(34,197,94,0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.8rem' }}>컨테이너{n}</code>
                      ))}
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>N개의 컨테이너 생성 가능!</span>
                  </div>
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center' }}>
                  <code style={{ color: '#86efac' }}>docker run myapp:1.0</code>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}> → 이미지로부터 새 컨테이너 생성</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Layer Structure */}
          {conceptSection === 1 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#a78bfa' }}>📚 이미지 레이어 구조</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>Docker 이미지는 여러 개의 읽기 전용 레이어로 구성됩니다</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Layer Visualization */}
                <div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>🐳 이미지 레이어 (아래→위 순서로 쌓임)</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[
                        { name: 'Container Layer (R/W)', color: '#22c55e', desc: '컨테이너 실행 시 추가', rw: true },
                        { name: 'ENTRYPOINT java -jar', color: '#ef4444', desc: '실행 명령' },
                        { name: 'COPY app.jar', color: '#06b6d4', desc: '애플리케이션 코드' },
                        { name: 'RUN apt-get install', color: '#8b5cf6', desc: '의존성 설치' },
                        { name: 'FROM openjdk:17', color: '#3b82f6', desc: '베이스 이미지' },
                      ].map((layer, i) => (
                        <div key={i} style={{ padding: '12px 16px', background: `${layer.color}30`, borderLeft: `4px solid ${layer.color}`, borderRadius: '0 8px 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ color: layer.color, fontWeight: '600', fontSize: '0.85rem' }}>{layer.name}</span>
                            {layer.rw && <span style={{ marginLeft: '8px', padding: '2px 6px', background: 'rgba(34,197,94,0.3)', borderRadius: '4px', fontSize: '0.7rem', color: '#86efac' }}>쓰기 가능</span>}
                          </div>
                          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{layer.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Layer Explanation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>✅ 레이어의 장점</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li><strong>캐싱</strong> - 변경된 레이어만 다시 빌드</li>
                      <li><strong>공유</strong> - 같은 레이어는 여러 이미지가 공유</li>
                      <li><strong>효율성</strong> - 디스크 공간 절약</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>⚠️ 레이어 최적화 팁</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li>자주 변경되는 레이어는 <strong>나중에</strong> 배치</li>
                      <li>RUN 명령어는 <strong>하나로 합치기</strong></li>
                      <li>불필요한 파일은 <strong>.dockerignore</strong>로 제외</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(239,68,68,0.1)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <h4 style={{ color: '#f87171', marginBottom: '12px' }}>❌ 흔한 실수</h4>
                    <div style={{ color: '#fca5a5', fontSize: '0.85rem' }}>
                      <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>COPY . .</code>를 먼저 하면<br/>
                      코드 한 줄만 바꿔도 전체 레이어 재빌드!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Lifecycle */}
          {conceptSection === 2 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f59e0b' }}>🔄 컨테이너 생명주기</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>컨테이너의 상태 변화와 관련 명령어</p>

              {/* Lifecycle Diagram */}
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {[
                    { state: '이미지', icon: '📦', color: '#3b82f6', cmd: null },
                    { arrow: 'docker run', color: '#22c55e' },
                    { state: 'Running', icon: '🟢', color: '#22c55e', cmd: 'docker ps' },
                    { arrow: 'docker stop', color: '#f59e0b' },
                    { state: 'Stopped', icon: '🟡', color: '#f59e0b', cmd: 'docker ps -a' },
                    { arrow: 'docker rm', color: '#ef4444' },
                    { state: '삭제됨', icon: '❌', color: '#ef4444', cmd: null },
                  ].map((item, i) => (
                    item.arrow ? (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', color: item.color }}>→</div>
                        <code style={{ fontSize: '0.7rem', color: item.color }}>{item.arrow}</code>
                      </div>
                    ) : (
                      <div key={i} style={{ textAlign: 'center', padding: '16px 20px', background: `${item.color}20`, borderRadius: '12px', border: `2px solid ${item.color}40`, minWidth: '100px' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{item.icon}</div>
                        <div style={{ color: item.color, fontWeight: '600', fontSize: '0.85rem' }}>{item.state}</div>
                        {item.cmd && <code style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.cmd}</code>}
                      </div>
                    )
                  ))}
                </div>

                {/* Additional transitions */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.15)', borderRadius: '10px', textAlign: 'center' }}>
                    <code style={{ color: '#86efac', fontSize: '0.8rem' }}>docker start</code>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>Stopped → Running</div>
                  </div>
                  <div style={{ padding: '12px 16px', background: 'rgba(139,92,246,0.15)', borderRadius: '10px', textAlign: 'center' }}>
                    <code style={{ color: '#c4b5fd', fontSize: '0.8rem' }}>docker restart</code>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>Running → Running</div>
                  </div>
                  <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.15)', borderRadius: '10px', textAlign: 'center' }}>
                    <code style={{ color: '#fca5a5', fontSize: '0.8rem' }}>docker kill</code>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>강제 종료 (SIGKILL)</div>
                  </div>
                </div>
              </div>

              {/* State Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ padding: '20px', background: 'rgba(34,197,94,0.1)', borderRadius: '14px', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>🟢 Running 상태</h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                    <li>애플리케이션 실행 중</li>
                    <li>CPU/메모리 사용</li>
                    <li>로그 출력 중</li>
                    <li>네트워크 접근 가능</li>
                  </ul>
                </div>
                <div style={{ padding: '20px', background: 'rgba(245,158,11,0.1)', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.3)' }}>
                  <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>🟡 Stopped 상태</h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
                    <li>프로세스 종료됨</li>
                    <li>파일시스템 유지</li>
                    <li>재시작 가능</li>
                    <li>디스크 공간 차지</li>
                  </ul>
                </div>
                <div style={{ padding: '20px', background: 'rgba(239,68,68,0.1)', borderRadius: '14px', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <h4 style={{ color: '#f87171', marginBottom: '12px' }}>❌ 삭제 후</h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#fca5a5', fontSize: '0.85rem', lineHeight: '1.8' }}>
                    <li>모든 데이터 삭제</li>
                    <li>복구 불가능</li>
                    <li>이미지는 남아있음</li>
                    <li>볼륨 데이터는 유지</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Registry */}
          {conceptSection === 3 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#06b6d4' }}>🏪 Docker Registry & Hub</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>이미지를 저장하고 공유하는 저장소</p>

              {/* Registry Concept */}
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(59,130,246,0.2)', borderRadius: '16px', minWidth: '140px' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💻</div>
                    <div style={{ color: '#93c5fd', fontWeight: '600' }}>Local</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>내 컴퓨터</div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
                    <div><code style={{ color: '#86efac', fontSize: '0.85rem' }}>docker push</code> <span style={{ color: '#94a3b8' }}>→</span></div>
                    <div><span style={{ color: '#94a3b8' }}>←</span> <code style={{ color: '#93c5fd', fontSize: '0.85rem' }}>docker pull</code></div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(6,182,212,0.2)', borderRadius: '16px', minWidth: '140px' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🐳</div>
                    <div style={{ color: '#67e8f9', fontWeight: '600' }}>Docker Hub</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>클라우드 저장소</div>
                  </div>
                </div>
              </div>

              {/* Image Naming */}
              <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(251,191,36,0.3)' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '16px', textAlign: 'center' }}>📛 이미지 이름 구조</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <code style={{ padding: '10px 14px', background: '#8b5cf6', borderRadius: '8px 0 0 8px', color: '#fff', fontSize: '1rem' }}>registry.io</code>
                  <code style={{ padding: '10px 8px', background: '#64748b', color: '#fff', fontSize: '1rem' }}>/</code>
                  <code style={{ padding: '10px 14px', background: '#06b6d4', color: '#fff', fontSize: '1rem' }}>username</code>
                  <code style={{ padding: '10px 8px', background: '#64748b', color: '#fff', fontSize: '1rem' }}>/</code>
                  <code style={{ padding: '10px 14px', background: '#22c55e', color: '#fff', fontSize: '1rem' }}>image-name</code>
                  <code style={{ padding: '10px 8px', background: '#64748b', color: '#fff', fontSize: '1rem' }}>:</code>
                  <code style={{ padding: '10px 14px', background: '#f59e0b', borderRadius: '0 8px 8px 0', color: '#fff', fontSize: '1rem' }}>tag</code>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '0.8rem' }}>
                  <div style={{ textAlign: 'center' }}><span style={{ color: '#a78bfa' }}>레지스트리</span><br/><span style={{ color: '#94a3b8' }}>생략 시 Docker Hub</span></div>
                  <div style={{ textAlign: 'center' }}><span style={{ color: '#67e8f9' }}>사용자/조직</span><br/><span style={{ color: '#94a3b8' }}>공식 이미지는 생략</span></div>
                  <div style={{ textAlign: 'center' }}><span style={{ color: '#86efac' }}>이미지명</span><br/><span style={{ color: '#94a3b8' }}>필수</span></div>
                  <div style={{ textAlign: 'center' }}><span style={{ color: '#fbbf24' }}>태그</span><br/><span style={{ color: '#94a3b8' }}>생략 시 latest</span></div>
                </div>
              </div>

              {/* Examples */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>📦 공식 이미지 예시</div>
                  {['mysql:8.0', 'redis:alpine', 'nginx:latest', 'openjdk:17-slim'].map((img, i) => (
                    <code key={i} style={{ display: 'block', padding: '8px 12px', background: 'rgba(34,197,94,0.15)', borderRadius: '6px', color: '#86efac', fontSize: '0.85rem', marginBottom: '6px' }}>{img}</code>
                  ))}
                </div>
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>🏢 Private Registry 예시</div>
                  {['gcr.io/my-project/api:v1.2', 'my-registry.com/app:latest', '123456.dkr.ecr.ap-northeast-2.amazonaws.com/myapp:prod'].map((img, i) => (
                    <code key={i} style={{ display: 'block', padding: '8px 12px', background: 'rgba(139,92,246,0.15)', borderRadius: '6px', color: '#c4b5fd', fontSize: '0.75rem', marginBottom: '6px', wordBreak: 'break-all' }}>{img}</code>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Volumes */}
          {conceptSection === 4 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#ec4899' }}>💾 볼륨 (Volumes)</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>컨테이너 데이터를 영구적으로 저장하는 방법</p>

              {/* Problem */}
              <div style={{ background: 'rgba(239,68,68,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(239,68,68,0.3)' }}>
                <h4 style={{ color: '#f87171', marginBottom: '12px' }}>😱 볼륨 없이 사용하면?</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', flex: 1, minWidth: '200px' }}>
                    <div style={{ color: '#fca5a5', fontSize: '0.9rem' }}>
                      1. MySQL 컨테이너 실행 → 데이터 저장<br/>
                      2. 컨테이너 삭제<br/>
                      3. <strong>💥 모든 데이터 삭제됨!</strong>
                    </div>
                  </div>
                  <div style={{ color: '#f87171', fontSize: '2rem' }}>→</div>
                  <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '4px' }}>😭</div>
                    <div style={{ color: '#fca5a5', fontSize: '0.85rem' }}>복구 불가</div>
                  </div>
                </div>
              </div>

              {/* Volume Types */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                {/* Named Volume */}
                <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>📦 Named Volume (권장)</h4>
                  <code style={{ display: 'block', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.8rem', marginBottom: '12px' }}>docker run -v <span style={{ color: '#fbbf24' }}>db-data</span>:/var/lib/mysql mysql</code>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                    <li>Docker가 관리하는 볼륨</li>
                    <li>이름으로 쉽게 참조</li>
                    <li>백업/복원 용이</li>
                    <li><strong>운영 환경에 적합</strong></li>
                  </ul>
                </div>

                {/* Bind Mount */}
                <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(251,191,36,0.3)' }}>
                  <h4 style={{ color: '#fbbf24', marginBottom: '16px' }}>📁 Bind Mount</h4>
                  <code style={{ display: 'block', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#fef3c7', fontSize: '0.8rem', marginBottom: '12px' }}>docker run -v <span style={{ color: '#86efac' }}>/home/user/data</span>:/app/data myapp</code>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
                    <li>호스트 경로 직접 마운트</li>
                    <li>실시간 코드 반영 가능</li>
                    <li>호스트 환경에 의존적</li>
                    <li><strong>개발 환경에 적합</strong></li>
                  </ul>
                </div>
              </div>

              {/* Visual Comparison */}
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ color: '#e2e8f0', marginBottom: '16px', textAlign: 'center' }}>💡 볼륨 사용 시 데이터 흐름</h4>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34,197,94,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🐳</div>
                    <div style={{ color: '#86efac', fontSize: '0.85rem' }}>컨테이너</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>/var/lib/mysql</div>
                  </div>
                  <div style={{ fontSize: '1.5rem', color: '#94a3b8' }}>↔️</div>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(139,92,246,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '4px' }}>💾</div>
                    <div style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>볼륨</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>db-data</div>
                  </div>
                  <div style={{ fontSize: '1.5rem', color: '#94a3b8' }}>→</div>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(236,72,153,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '4px' }}>✅</div>
                    <div style={{ color: '#f9a8d4', fontSize: '0.85rem' }}>컨테이너 삭제 후</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>데이터 유지!</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============ VM VS DOCKER TAB ============ */}
      {activeTab === 'vmvsdocker' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Analogy Section */}
          <div style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,191,36,0.02))', borderRadius: '20px', padding: '28px', marginBottom: '20px', border: '1px solid rgba(251,191,36,0.3)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#fbbf24' }}>🏠 쉬운 비유: 단독주택 vs 아파트</h3>
            <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>VM과 Docker의 차이를 집으로 비유해볼게요!</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* VM */}
              <div style={{ background: 'linear-gradient(180deg, rgba(244,114,182,0.15), rgba(244,114,182,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(244,114,182,0.4)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '8px' }}>🏠</div>
                  <h4 style={{ color: '#f472b6', fontSize: '1.2rem' }}>VM = 단독주택</h4>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[{ label: '🏃 내 애플리케이션', bg: '#be185d' }, { label: '📚 내 전용 라이브러리', bg: '#9d174d' }, { label: '💿 내 전용 OS (Ubuntu/Windows)', bg: '#831843', bold: true }, { label: '🔌 내 전용 전기/수도/가스', bg: '#500724' }, { label: '🏗️ 내 땅, 내 기초공사', bg: '#3f0520' }].map((item, i) => (
                      <div key={i} style={{ padding: item.bold ? '12px' : '10px', background: item.bg, borderRadius: '8px', textAlign: 'center', fontSize: item.bold ? '0.85rem' : '0.8rem', fontWeight: item.bold ? '600' : '400' }}>{item.label}</div>
                    ))}
                  </div>
                </div>
                <div style={{ color: '#fda4af', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  <div style={{ marginBottom: '8px' }}><strong>🏗️ 짓는 데 오래 걸림</strong><br/>땅부터 시작 → 기초공사 → 건물 → 입주</div>
                  <div style={{ marginBottom: '8px' }}><strong>💰 유지비가 비쌈</strong><br/>전기/수도/가스 다 개별 납부</div>
                  <div><strong>📦 공간 낭비</strong><br/>혼자 살아도 큰 집 전체 관리 필요</div>
                </div>
              </div>

              {/* Docker */}
              <div style={{ background: 'linear-gradient(180deg, rgba(34,211,238,0.15), rgba(34,211,238,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(34,211,238,0.4)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '8px' }}>🏢</div>
                  <h4 style={{ color: '#22d3ee', fontSize: '1.2rem' }}>Docker = 아파트</h4>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['App1', 'App2', 'App3'].map((app, i) => (
                        <div key={i} style={{ flex: 1, padding: '10px', background: ['#0891b2', '#0e7490', '#155e75'][i], borderRadius: '8px', textAlign: 'center', fontSize: '0.75rem' }}>🏃 {app}</div>
                      ))}
                    </div>
                    <div style={{ padding: '12px', background: '#0284c7', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem' }}>🐳 Docker Engine (건물 관리인)</div>
                    <div style={{ padding: '12px', background: '#0369a1', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600', border: '2px dashed #7dd3fc' }}>💿 공용 OS 커널 (건물 기초)</div>
                    <div style={{ padding: '10px', background: '#075985', borderRadius: '8px', textAlign: 'center', fontSize: '0.8rem' }}>🔌 공용 전기/수도/가스</div>
                  </div>
                </div>
                <div style={{ color: '#67e8f9', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  <div style={{ marginBottom: '8px' }}><strong>⚡ 입주가 빠름</strong><br/>건물은 이미 있음 → 방만 배정받으면 끝!</div>
                  <div style={{ marginBottom: '8px' }}><strong>💰 관리비 저렴</strong><br/>공용시설 함께 사용 → 비용 분담</div>
                  <div><strong>📦 공간 효율적</strong><br/>필요한 만큼만 사용</div>
                </div>
              </div>
            </div>

            {/* Key Difference */}
            <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '12px' }}>💡 핵심 차이점</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
                <div style={{ padding: '14px', background: 'rgba(244,114,182,0.2)', borderRadius: '10px' }}>
                  <div style={{ color: '#f472b6', fontWeight: '600' }}>VM (단독주택)</div>
                  <div style={{ color: '#fda4af', fontSize: '0.85rem', marginTop: '4px' }}>집마다 <strong>OS 전체</strong>를 따로 설치</div>
                </div>
                <div style={{ fontSize: '1.5rem' }}>⚔️</div>
                <div style={{ padding: '14px', background: 'rgba(34,211,238,0.2)', borderRadius: '10px' }}>
                  <div style={{ color: '#22d3ee', fontWeight: '600' }}>Docker (아파트)</div>
                  <div style={{ color: '#67e8f9', fontSize: '0.85rem', marginTop: '4px' }}><strong>OS 커널을 공유</strong>하고 방만 분리</div>
                </div>
              </div>
            </div>

            {/* Kitchen Analogy */}
            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.3)' }}>
              <div style={{ color: '#c4b5fd', fontSize: '0.9rem', marginBottom: '8px' }}>🍳 다른 비유: 요리하기</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ color: '#fda4af', fontSize: '0.85rem' }}><strong style={{ color: '#f472b6' }}>VM</strong> = 요리할 때마다 <strong>주방 전체를 새로 짓는 것</strong><br/><span style={{ color: '#94a3b8' }}>싱크대, 가스레인지, 냉장고 전부 새로!</span></div>
                <div style={{ color: '#67e8f9', fontSize: '0.85rem' }}><strong style={{ color: '#22d3ee' }}>Docker</strong> = <strong>공유 주방에서 내 재료만 가져와 요리</strong><br/><span style={{ color: '#94a3b8' }}>주방 시설은 공유, 레시피(이미지)만 내 것!</span></div>
              </div>
            </div>
          </div>

          {/* Performance Simulation */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>⚡ VM vs Docker 성능 비교</h3>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <button onClick={runVmSimulation} disabled={vmSimulation.running} style={{ padding: '16px 40px', borderRadius: '14px', border: 'none', background: vmSimulation.running ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #f472b6, #8b5cf6)', color: vmSimulation.running ? '#666' : '#fff', cursor: vmSimulation.running ? 'not-allowed' : 'pointer', fontSize: '1.1rem', fontWeight: '700' }}>
                {vmSimulation.running ? `⏳ 실행 중... ${(vmSimulation.elapsed / 1000).toFixed(1)}초` : '🚀 시뮬레이션 시작!'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: 'linear-gradient(180deg, rgba(244,114,182,0.1), transparent)', borderRadius: '16px', padding: '20px', border: '2px solid rgba(244,114,182,0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ color: '#f472b6' }}>🏠 VM × 3</h4>
                  <span style={{ background: '#f472b6', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>{vmSimulation.vms.filter(v => v.progress >= 100).length} / 3</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '180px' }}>
                  {vmSimulation.vms.map(vm => (
                    <div key={vm.id} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#fda4af' }}>VM-{vm.id + 1}</span>
                        <span style={{ color: vm.progress >= 100 ? '#86efac' : '#fda4af', fontSize: '0.8rem' }}>{vm.stage}</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${vm.progress}%`, background: vm.progress >= 100 ? '#22c55e' : '#f472b6', transition: 'width 0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'linear-gradient(180deg, rgba(34,211,238,0.1), transparent)', borderRadius: '16px', padding: '20px', border: '2px solid rgba(34,211,238,0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ color: '#22d3ee' }}>🐳 Docker × 6</h4>
                  <span style={{ background: '#22d3ee', color: '#0f172a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>{vmSimulation.containers.filter(c => c.progress >= 100).length} / 6</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', minHeight: '180px' }}>
                  {vmSimulation.containers.map(c => (
                    <div key={c.id} style={{ background: c.progress >= 100 ? 'rgba(34,197,94,0.3)' : 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem' }}>{c.progress >= 100 ? '🟢' : '🔵'}</div>
                      <div style={{ color: '#67e8f9', fontSize: '0.75rem' }}>C-{c.id + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Table */}
            <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(251,191,36,0.1)', borderRadius: '16px', border: '1px solid rgba(251,191,36,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ color: '#fbbf24' }}>💰 비용 분석</h4>
                <button onClick={() => setShowCostDetail(!showCostDetail)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'rgba(251,191,36,0.3)', color: '#fef3c7', cursor: 'pointer' }}>{showCostDetail ? '접기' : '상세 보기'}</button>
              </div>
              {showCostDetail && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>항목</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#f472b6' }}>VM</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#22d3ee' }}>Docker</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#22c55e' }}>절감</th>
                  </tr></thead>
                  <tbody>
                    {[{ item: '시작 시간', vm: '30-60초', docker: '1-3초', save: '~95%' }, { item: '메모리', vm: '2-4GB', docker: '200-500MB', save: '~85%' }, { item: '디스크', vm: '20-50GB', docker: '100-500MB', save: '~95%' }, { item: 'OS 라이선스', vm: '필요', docker: '불필요', save: '100%' }].map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e2e8f0' }}>{row.item}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#fda4af' }}>{row.vm}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#67e8f9' }}>{row.docker}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#86efac', fontWeight: '600' }}>{row.save}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============ DOCKERFILE TAB ============ */}
      {activeTab === 'dockerfile' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#a78bfa' }}>📝 Dockerfile 이해하기</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {imageLayersDetail.map((layer, i) => (
                <button key={i} onClick={() => setDockerfileStep(i)} style={{ padding: '10px 16px', borderRadius: '10px', border: dockerfileStep === i ? '2px solid #a78bfa' : '2px solid transparent', background: dockerfileStep === i ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.05)', color: dockerfileStep === i ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}>{layer.instruction.split(' ')[0]}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: '#0d1117', borderRadius: '16px', padding: '20px', fontFamily: '"JetBrains Mono", monospace' }}>
                <div style={{ color: '#8b949e', fontSize: '0.8rem', marginBottom: '16px' }}>📄 Dockerfile</div>
                {imageLayersDetail.map((layer, i) => (
                  <div key={i} onClick={() => setDockerfileStep(i)} style={{ padding: '10px 12px', borderRadius: '6px', background: i === dockerfileStep ? 'rgba(167,139,250,0.2)' : 'transparent', borderLeft: i === dockerfileStep ? '3px solid #a78bfa' : '3px solid transparent', marginBottom: '4px', cursor: 'pointer' }}>
                    <span style={{ color: '#ff7b72' }}>{layer.instruction.split(' ')[0]}</span>
                    <span style={{ color: '#c9d1d9' }}> {layer.instruction.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(167,139,250,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(167,139,250,0.3)' }}>
                <h4 style={{ color: '#c4b5fd', marginBottom: '16px' }}>{imageLayersDetail[dockerfileStep].name}</h4>
                <div style={{ padding: '12px', background: 'rgba(251,191,36,0.1)', borderRadius: '10px', marginBottom: '16px', border: '1px solid rgba(251,191,36,0.3)' }}><span style={{ color: '#fbbf24' }}>{imageLayersDetail[dockerfileStep].analogy}</span></div>
                <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>{imageLayersDetail[dockerfileStep].description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center' }}><div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>크기</div><div style={{ color: '#fff', fontWeight: '600' }}>{imageLayersDetail[dockerfileStep].size}</div></div>
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center' }}><div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>캐시</div><div style={{ color: imageLayersDetail[dockerfileStep].cached ? '#86efac' : '#fbbf24', fontWeight: '600' }}>{imageLayersDetail[dockerfileStep].cached ? '캐시됨' : '매번 실행'}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ COMMANDS TAB (ENHANCED WITH WORKFLOW) ============ */}
      {activeTab === 'commands' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Mode Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <button onClick={() => setCmdMode('learn')} style={{ padding: '14px 28px', borderRadius: '12px', border: cmdMode === 'learn' ? '2px solid #22d3ee' : '2px solid transparent', background: cmdMode === 'learn' ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)', color: cmdMode === 'learn' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>📚 명령어 학습</button>
            <button onClick={() => setCmdMode('workflow')} style={{ padding: '14px 28px', borderRadius: '12px', border: cmdMode === 'workflow' ? '2px solid #f472b6' : '2px solid transparent', background: cmdMode === 'workflow' ? 'rgba(244,114,182,0.2)' : 'rgba(255,255,255,0.05)', color: cmdMode === 'workflow' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>🔄 워크플로우 실습</button>
          </div>

          {/* Learn Mode */}
          {cmdMode === 'learn' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#22d3ee' }}>💻 Docker 명령어 학습</h3>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {commandCategories.map((cat, i) => (
                  <button key={i} onClick={() => { setCmdCategory(i); setCmdIndex(0); setTerminalHistory([]); }} style={{ padding: '8px 12px', borderRadius: '8px', border: cmdCategory === i ? '2px solid #22d3ee' : '2px solid transparent', background: cmdCategory === i ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)', color: cmdCategory === i ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>{cat.name}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '24px' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>명령어 ({cmdIndex + 1}/{commandCategories[cmdCategory].commands.length})</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflowY: 'auto', marginBottom: '16px' }}>
                    {commandCategories[cmdCategory].commands.map((cmd, i) => (
                      <div key={i} onClick={() => setCmdIndex(i)} style={{ padding: '10px 12px', borderRadius: '8px', background: cmdIndex === i ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.03)', border: cmdIndex === i ? '2px solid #22d3ee' : '2px solid transparent', cursor: 'pointer' }}>
                        <div style={{ color: cmdIndex === i ? '#67e8f9' : '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>{cmd.short}</div>
                        <code style={{ color: '#8b949e', fontSize: '0.7rem' }}>{cmd.cmd.length > 40 ? cmd.cmd.substring(0, 40) + '...' : cmd.cmd}</code>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '14px', background: 'rgba(251,191,36,0.1)', borderRadius: '10px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <h5 style={{ color: '#fbbf24', marginBottom: '6px', fontSize: '0.85rem' }}>💡 설명</h5>
                    <p style={{ color: '#fef3c7', fontSize: '0.8rem', margin: 0 }}>{commandCategories[cmdCategory].commands[cmdIndex].desc}</p>
                  </div>
                </div>

                <div style={{ background: '#0d1117', borderRadius: '16px', padding: '16px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', height: '420px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexShrink: 0 }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                    <span style={{ marginLeft: '8px', color: '#8b949e', fontSize: '0.8rem' }}>Terminal</span>
                  </div>
                  <div ref={terminalRef} style={{ flex: 1, overflowY: 'auto', fontSize: '0.75rem', marginBottom: '12px' }}>
                    {terminalHistory.map((entry, i) => (
                      <div key={i} style={{ marginBottom: '12px' }}>
                        <div><span style={{ color: '#7ee787' }}>$</span> <span style={{ color: entry.isCorrect ? '#e6edf3' : '#f85149' }}>{entry.input}</span></div>
                        <pre style={{ color: entry.isCorrect ? '#8b949e' : '#f85149', whiteSpace: 'pre-wrap', margin: '4px 0 0 0' }}>{entry.output}</pre>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', flexShrink: 0 }}>
                    <span style={{ color: '#7ee787' }}>$</span>
                    <input type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} onKeyDown={handleTerminalSubmit} placeholder="명령어를 입력하세요..." style={{ flex: 1, marginLeft: '8px', background: 'transparent', border: 'none', color: '#e6edf3', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Mode */}
          {cmdMode === 'workflow' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ color: '#f472b6', margin: 0 }}>🔄 Docker 워크플로우 실습</h3>
                <button onClick={resetWorkflow} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'rgba(239,68,68,0.3)', color: '#fca5a5', cursor: 'pointer', fontSize: '0.85rem' }}>🔄 처음부터</button>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>진행률</span>
                  <span style={{ color: '#f472b6', fontSize: '0.85rem' }}>{workflowStep + 1} / {workflowSteps.length}</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${((workflowStep + 1) / workflowSteps.length) * 100}%`, background: 'linear-gradient(90deg, #f472b6, #8b5cf6)', transition: 'width 0.5s' }} />
                </div>
              </div>

              {/* Workflow Steps Indicator */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {workflowSteps.map((step, i) => (
                  <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', background: i < workflowStep ? 'linear-gradient(135deg, #22c55e, #16a34a)' : i === workflowStep ? 'linear-gradient(135deg, #f472b6, #8b5cf6)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '600', color: i <= workflowStep ? '#fff' : '#64748b' }}>
                    {i < workflowStep ? '✓' : i + 1}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
                {/* Current Step Info */}
                <div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(139,92,246,0.15))', borderRadius: '16px', padding: '20px', border: '1px solid rgba(244,114,182,0.3)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f472b6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700' }}>{workflowSteps[workflowStep].step}</div>
                      <div>
                        <h4 style={{ color: '#f9a8d4', margin: 0 }}>{workflowSteps[workflowStep].title}</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0 0' }}>{workflowSteps[workflowStep].description}</p>
                      </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', marginBottom: '12px' }}>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '6px' }}>입력할 명령어:</div>
                      <code style={{ color: '#86efac', fontSize: '0.9rem', wordBreak: 'break-all' }}>{workflowSteps[workflowStep].cmd}</code>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(251,191,36,0.1)', borderRadius: '8px', border: '1px solid rgba(251,191,36,0.3)' }}>
                      <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>{workflowSteps[workflowStep].tip}</span>
                    </div>
                  </div>

                  {/* Flow Diagram */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '12px' }}>📊 전체 흐름</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {['빌드', '확인', '실행', '상태', '로그', '접속', '중지', '삭제', '정리'].map((name, i) => (
                        <div key={i} style={{ padding: '8px 12px', borderRadius: '6px', background: i < workflowStep ? 'rgba(34,197,94,0.2)' : i === workflowStep ? 'rgba(244,114,182,0.3)' : 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${i < workflowStep ? '#22c55e' : i === workflowStep ? '#f472b6' : '#374151'}`, fontSize: '0.8rem', color: i <= workflowStep ? '#fff' : '#64748b' }}>
                          {i + 1}. {name} {i < workflowStep && '✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terminal */}
                <div style={{ background: '#0d1117', borderRadius: '16px', padding: '16px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', height: '520px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexShrink: 0 }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                    <span style={{ marginLeft: '8px', color: '#8b949e', fontSize: '0.8rem' }}>Workflow Terminal</span>
                  </div>
                  <div ref={workflowTerminalRef} style={{ flex: 1, overflowY: 'auto', fontSize: '0.72rem', marginBottom: '12px' }}>
                    {workflowTerminalHistory.map((entry, i) => (
                      <div key={i} style={{ marginBottom: '16px' }}>
                        <div><span style={{ color: '#7ee787' }}>user@docker</span><span style={{ color: '#8b949e' }}>:</span><span style={{ color: '#79c0ff' }}>~/myapp</span><span style={{ color: '#8b949e' }}>$ </span><span style={{ color: entry.isCorrect ? '#e6edf3' : '#f85149' }}>{entry.input}</span></div>
                        <pre style={{ color: entry.isCorrect ? '#8b949e' : '#f85149', whiteSpace: 'pre-wrap', margin: '4px 0 0 0', lineHeight: '1.4' }}>{entry.output}</pre>
                        {entry.isCorrect && i === workflowTerminalHistory.length - 1 && workflowStep < workflowSteps.length && (
                          <div style={{ marginTop: '8px', padding: '8px', background: 'rgba(34,197,94,0.2)', borderRadius: '6px', color: '#86efac', fontSize: '0.75rem' }}>✅ {workflowSteps[Math.min(workflowStep, workflowSteps.length - 1)].next}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', flexShrink: 0 }}>
                    <span style={{ color: '#7ee787' }}>$</span>
                    <input type="text" value={workflowInput} onChange={(e) => setWorkflowInput(e.target.value)} onKeyDown={handleWorkflowSubmit} placeholder="명령어를 입력하세요..." style={{ flex: 1, marginLeft: '8px', background: 'transparent', border: 'none', color: '#e6edf3', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============ NETWORK TAB ============ */}
      {activeTab === 'network' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Port Mapping */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f59e0b' }}>🔌 포트 매핑</h3>
            <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>컨테이너는 기본적으로 격리됨 → 외부 접근을 위해 <strong style={{ color: '#22c55e' }}>-p</strong> 옵션 필요!</p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
              <div style={{ textAlign: 'center', padding: '20px 24px', background: 'rgba(139,92,246,0.2)', borderRadius: '16px', border: '2px solid rgba(139,92,246,0.4)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🌐</div>
                <div style={{ color: '#c4b5fd', fontWeight: '600' }}>외부</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <code style={{ padding: '8px 16px', background: 'rgba(34,197,94,0.3)', borderRadius: '8px', color: '#86efac' }}>-p 8080:8080</code>
                <div style={{ fontSize: '1.5rem', marginTop: '8px' }}>🚪→</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px 24px', background: 'rgba(0,212,255,0.2)', borderRadius: '16px', border: '2px solid rgba(0,212,255,0.4)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🐳</div>
                <div style={{ color: '#67e8f9', fontWeight: '600' }}>컨테이너</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div style={{ padding: '20px', background: 'rgba(239,68,68,0.1)', borderRadius: '14px', border: '1px solid rgba(239,68,68,0.3)' }}>
                <h4 style={{ color: '#f87171', marginBottom: '12px' }}>🔒 -p 없이 실행하면?</h4>
                <code style={{ display: 'block', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '12px' }}>docker run -d myapp</code>
                <p style={{ color: '#fca5a5', fontSize: '0.9rem', margin: 0 }}>외부에서 <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>localhost:8080</code> 접근 불가!</p>
              </div>
              <div style={{ padding: '20px', background: 'rgba(34,197,94,0.1)', borderRadius: '14px', border: '1px solid rgba(34,197,94,0.3)' }}>
                <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>✅ -p로 포트 열기</h4>
                <code style={{ display: 'block', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', color: '#86efac', fontSize: '0.85rem', marginBottom: '12px' }}>docker run -d -p 8080:8080 myapp</code>
                <p style={{ color: '#86efac', fontSize: '0.9rem', margin: 0 }}>이제 <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>localhost:8080</code> 접근 가능!</p>
              </div>
            </div>

            <div style={{ padding: '20px', background: 'rgba(251,191,36,0.1)', borderRadius: '14px', border: '1px solid rgba(251,191,36,0.3)' }}>
              <h4 style={{ color: '#fbbf24', marginBottom: '16px', textAlign: 'center' }}>📖 포트 형식</h4>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center', marginBottom: '12px' }}>
                <code style={{ padding: '12px 20px', background: '#f472b6', borderRadius: '8px 0 0 8px', color: '#fff', fontSize: '1.1rem', fontWeight: '600' }}>호스트포트</code>
                <code style={{ padding: '12px 8px', background: '#64748b', color: '#fff', fontSize: '1.1rem' }}>:</code>
                <code style={{ padding: '12px 20px', background: '#22d3ee', borderRadius: '0 8px 8px 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: '600' }}>컨테이너포트</code>
              </div>
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                <span style={{ color: '#f472b6' }}>외부에서 접속하는 포트</span> : <span style={{ color: '#22d3ee' }}>앱이 실제 사용하는 포트</span>
              </div>
            </div>
          </div>

          {/* Container Communication */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#a78bfa' }}>🔗 컨테이너 간 통신</h3>
            <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>같은 네트워크 안의 컨테이너는 <strong style={{ color: '#a78bfa' }}>서비스 이름</strong>으로 통신</p>

            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span style={{ padding: '8px 16px', background: 'rgba(139,92,246,0.3)', borderRadius: '20px', color: '#c4b5fd', fontSize: '0.85rem' }}>🌐 Docker Network</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                {[
                  { icon: '🍃', name: 'app', port: '8080', color: '#22c55e', external: true },
                  { icon: '🐬', name: 'db', port: '3306', color: '#0284c7', external: false },
                  { icon: '⚡', name: 'redis', port: '6379', color: '#dc2626', external: false },
                ].map((svc, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '20px', background: `linear-gradient(180deg, ${svc.color}, ${svc.color}99)`, borderRadius: '16px', minWidth: '120px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{svc.icon}</div>
                    <div style={{ color: '#fff', fontWeight: '600' }}>{svc.name}</div>
                    <code style={{ display: 'block', marginTop: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '6px', color: '#fff', fontSize: '0.75rem' }}>:{svc.port}</code>
                    <div style={{ marginTop: '8px', padding: '4px 8px', background: svc.external ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)', borderRadius: '4px', fontSize: '0.7rem', color: svc.external ? '#fff' : '#fca5a5' }}>{svc.external ? '외부 노출 ✓' : '내부 전용'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', border: '1px solid rgba(34,197,94,0.3)' }}>
                <div style={{ color: '#4ade80', fontWeight: '600', marginBottom: '8px' }}>✅ 서비스명 = 호스트명</div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>IP 대신 <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px' }}>db</code>로 접속</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                <div style={{ color: '#fbbf24', fontWeight: '600', marginBottom: '8px' }}>🔒 필요한 것만 노출</div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>DB는 ports 없이 내부만</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.3)' }}>
                <div style={{ color: '#a78bfa', fontWeight: '600', marginBottom: '8px' }}>🌐 자동 DNS</div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Docker가 자동 IP 변환</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ COMPOSE TAB (ENHANCED) ============ */}
      {activeTab === 'compose' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['Compose란?', 'services', 'environment', 'volumes', 'networks', 'depends_on', '명령어'].map((name, i) => (
              <button key={i} onClick={() => setComposeSection(i)} style={{ padding: '10px 16px', borderRadius: '10px', border: composeSection === i ? '2px solid #f472b6' : '2px solid transparent', background: composeSection === i ? 'rgba(244,114,182,0.2)' : 'rgba(255,255,255,0.05)', color: composeSection === i ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}>{name}</button>
            ))}
          </div>

          {/* Section 0: What is Compose */}
          {composeSection === 0 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>🎼 Docker Compose란?</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>여러 컨테이너를 하나의 YAML 파일로 정의하고 관리하는 도구</p>

              {/* Problem & Solution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(239,68,68,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <h4 style={{ color: '#f87171', marginBottom: '16px' }}>😱 Compose 없이</h4>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#fca5a5' }}>
                    $ docker network create mynet<br/>
                    $ docker run -d --name db --network mynet mysql<br/>
                    $ docker run -d --name redis --network mynet redis<br/>
                    $ docker run -d --name app --network mynet -p 8080:8080 myapp<br/>
                    <span style={{ color: '#94a3b8' }}># 매번 순서대로 입력해야 함...</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <h4 style={{ color: '#4ade80', marginBottom: '16px' }}>✅ Compose 사용</h4>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#86efac' }}>
                    $ docker compose up -d<br/><br/>
                    <span style={{ color: '#94a3b8' }}># 끝! 모든 서비스가 한 번에 실행</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { icon: '📄', title: '선언적 정의', desc: 'YAML 파일로 인프라를 코드화' },
                  { icon: '🔄', title: '재현 가능', desc: '같은 환경을 어디서든 재현' },
                  { icon: '👥', title: '팀 공유', desc: 'Git으로 설정 공유 및 버전 관리' }
                ].map((item, i) => (
                  <div key={i} style={{ padding: '20px', background: 'rgba(244,114,182,0.1)', borderRadius: '14px', border: '1px solid rgba(244,114,182,0.3)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.icon}</div>
                    <div style={{ color: '#f9a8d4', fontWeight: '600', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Full Example */}
              <div style={{ background: '#0d1117', borderRadius: '16px', padding: '20px', fontFamily: '"JetBrains Mono", monospace' }}>
                <div style={{ color: '#8b949e', fontSize: '0.8rem', marginBottom: '12px' }}>📄 docker-compose.yml (전체 예시)</div>
                <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.75rem', lineHeight: '1.6' }}>{`version: '3.8'

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
  db-data:`}</pre>
              </div>
            </div>
          )}

          {/* Section 1: services */}
          {composeSection === 1 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>📦 services</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>실행할 컨테이너들을 정의하는 핵심 섹션</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ background: '#0d1117', borderRadius: '16px', padding: '20px', fontFamily: '"JetBrains Mono", monospace', marginBottom: '20px' }}>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem', lineHeight: '1.7' }}>{`services:
  `}<span style={{ color: '#7ee787' }}>app</span>{`:                    # 서비스 이름
    `}<span style={{ color: '#ff7b72' }}>build</span>{`: .               # Dockerfile 경로
    `}<span style={{ color: '#ff7b72' }}>ports</span>{`:
      - "8080:8080"

  `}<span style={{ color: '#79c0ff' }}>db</span>{`:
    `}<span style={{ color: '#ff7b72' }}>image</span>{`: mysql:8.0      # Docker Hub 이미지
    `}<span style={{ color: '#ff7b72' }}>restart</span>{`: always       # 재시작 정책`}</pre>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>build vs image</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li><code>build: .</code> → Dockerfile로 이미지 빌드</li>
                      <li><code>image: mysql</code> → 기존 이미지 사용</li>
                    </ul>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>restart 정책</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li><code>no</code> - 재시작 안 함 (기본값)</li>
                      <li><code>always</code> - 항상 재시작</li>
                      <li><code>on-failure</code> - 에러 시에만</li>
                      <li><code>unless-stopped</code> - 수동 중지 전까지</li>
                    </ul>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <h4 style={{ color: '#a78bfa', marginBottom: '8px' }}>💡 서비스 이름 = 호스트명</h4>
                    <p style={{ color: '#c4b5fd', fontSize: '0.85rem', margin: 0 }}>
                      <code>app</code>에서 <code>db:3306</code>으로 접속 가능!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: environment */}
          {composeSection === 2 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>⚙️ environment</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>컨테이너에 환경변수 전달하기</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>방법 1: 직접 정의 (리스트)</h4>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace', marginBottom: '20px' }}>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`services:
  app:
    environment:
      - DB_HOST=db
      - DB_PORT=3306
      - DB_USER=root`}</pre>
                  </div>

                  <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>방법 2: 직접 정의 (맵)</h4>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`services:
  app:
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: root`}</pre>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#e2e8f0', marginBottom: '16px' }}>방법 3: .env 파일 사용 (권장)</h4>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace', marginBottom: '16px' }}>
                    <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>📄 .env</div>
                    <pre style={{ color: '#86efac', margin: 0, fontSize: '0.8rem' }}>{`DB_PASSWORD=secretpassword
REDIS_URL=redis://redis:6379`}</pre>
                  </div>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                    <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>📄 docker-compose.yml</div>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`services:
  app:
    env_file:
      - .env`}</pre>
                  </div>

                  <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <div style={{ color: '#f87171', fontSize: '0.85rem' }}>⚠️ <strong>.env 파일은 .gitignore에 추가!</strong><br/>비밀번호 등 민감 정보 유출 방지</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: volumes */}
          {composeSection === 3 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>💾 volumes</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>데이터를 영구 저장하고 컨테이너 간 공유</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ background: '#0d1117', borderRadius: '16px', padding: '20px', fontFamily: '"JetBrains Mono", monospace' }}>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.75rem', lineHeight: '1.7' }}>{`services:
  db:
    image: mysql:8.0
    volumes:
      `}<span style={{ color: '#86efac' }}># Named Volume (권장)</span>{`
      - db-data:/var/lib/mysql

      `}<span style={{ color: '#fbbf24' }}># Bind Mount (개발용)</span>{`
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

`}<span style={{ color: '#79c0ff' }}>volumes:</span>{`                    # 최상위에 정의
  `}<span style={{ color: '#7ee787' }}>db-data</span>{`:                 # 볼륨 이름
    driver: local`}</pre>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>📦 Named Volume</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li>Docker가 관리하는 볼륨</li>
                      <li>컨테이너 삭제해도 데이터 유지</li>
                      <li><strong>운영 환경에 권장</strong></li>
                    </ul>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>📁 Bind Mount</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li>호스트 경로를 직접 마운트</li>
                      <li>코드 변경 실시간 반영</li>
                      <li><strong>개발 환경에 유용</strong></li>
                    </ul>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <h4 style={{ color: '#a78bfa', marginBottom: '8px' }}>💡 볼륨 형식</h4>
                    <code style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>소스:대상[:옵션]</code>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>예: db-data:/var/lib/mysql:ro (읽기전용)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: networks */}
          {composeSection === 4 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>🌐 networks</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>서비스 간 통신을 위한 가상 네트워크</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', border: '1px solid rgba(34,197,94,0.3)', marginBottom: '20px' }}>
                    <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>✅ 기본 네트워크 (자동)</h4>
                    <p style={{ color: '#bbf7d0', fontSize: '0.85rem', margin: 0 }}>
                      networks를 정의하지 않아도<br/>
                      <strong>{`{프로젝트명}_default`}</strong> 네트워크가 자동 생성됨!
                    </p>
                  </div>

                  <div style={{ background: '#0d1117', borderRadius: '16px', padding: '20px', fontFamily: '"JetBrains Mono", monospace' }}>
                    <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>커스텀 네트워크 정의</div>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem', lineHeight: '1.7' }}>{`services:
  app:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend    # app만 접근 가능!

networks:
  frontend:
  backend:`}</pre>
                  </div>
                </div>

                <div>
                  <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', marginBottom: '16px' }}>
                    <h4 style={{ color: '#e2e8f0', marginBottom: '16px', textAlign: 'center' }}>네트워크 격리 예시</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <div style={{ padding: '16px', background: 'rgba(34,197,94,0.2)', borderRadius: '10px', textAlign: 'center' }}>
                        <div style={{ color: '#86efac', fontWeight: '600', marginBottom: '8px' }}>frontend</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ padding: '4px 8px', background: 'rgba(34,197,94,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>nginx</span>
                          <span style={{ padding: '4px 8px', background: 'rgba(34,197,94,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>app</span>
                        </div>
                      </div>
                      <div style={{ padding: '16px', background: 'rgba(139,92,246,0.2)', borderRadius: '10px', textAlign: 'center' }}>
                        <div style={{ color: '#c4b5fd', fontWeight: '600', marginBottom: '8px' }}>backend</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ padding: '4px 8px', background: 'rgba(139,92,246,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>app</span>
                          <span style={{ padding: '4px 8px', background: 'rgba(139,92,246,0.3)', borderRadius: '4px', fontSize: '0.75rem' }}>db</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '12px', color: '#94a3b8', fontSize: '0.8rem' }}>
                      nginx는 db에 직접 접근 불가! (보안 강화)
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>💡 왜 네트워크를 분리할까?</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li>보안: 불필요한 접근 차단</li>
                      <li>격리: 서비스 그룹별 분리</li>
                      <li>관리: 네트워크 트래픽 제어</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: depends_on */}
          {composeSection === 5 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>🔗 depends_on</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>서비스 시작 순서를 제어</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ background: '#0d1117', borderRadius: '16px', padding: '20px', fontFamily: '"JetBrains Mono", monospace', marginBottom: '20px' }}>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem', lineHeight: '1.7' }}>{`services:
  app:
    build: .
    `}<span style={{ color: '#ff7b72' }}>depends_on</span>{`:
      - db          # db가 먼저 시작
      - redis       # redis도 먼저 시작

  db:
    image: mysql:8.0

  redis:
    image: redis:alpine`}</pre>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>시작 순서:</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ padding: '8px 12px', background: 'rgba(59,130,246,0.3)', borderRadius: '8px', color: '#93c5fd' }}>db</span>
                      <span style={{ color: '#94a3b8' }}>→</span>
                      <span style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.3)', borderRadius: '8px', color: '#fca5a5' }}>redis</span>
                      <span style={{ color: '#94a3b8' }}>→</span>
                      <span style={{ padding: '8px 12px', background: 'rgba(34,197,94,0.3)', borderRadius: '8px', color: '#86efac' }}>app</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <h4 style={{ color: '#f87171', marginBottom: '8px' }}>⚠️ 중요한 제한사항</h4>
                    <p style={{ color: '#fca5a5', fontSize: '0.85rem', margin: 0 }}>
                      depends_on은 <strong>시작 순서만</strong> 보장!<br/>
                      서비스가 <strong>"준비 완료"</strong>될 때까지 기다리지 않음
                    </p>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>✅ 해결 방법</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                      <li>앱에서 연결 재시도 로직 구현</li>
                      <li>healthcheck 옵션 사용</li>
                      <li>wait-for-it.sh 스크립트 사용</li>
                    </ul>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>💡 healthcheck 예시</h4>
                    <code style={{ color: '#fef3c7', fontSize: '0.8rem', display: 'block', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px' }}>
                      depends_on:<br/>
                      &nbsp;&nbsp;db:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;condition: service_healthy
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Commands */}
          {composeSection === 6 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#f472b6' }}>⌨️ Compose 명령어</h3>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>자주 사용하는 docker compose 명령어</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { cmd: 'docker compose up -d', desc: '모든 서비스 백그라운드 시작', icon: '▶️', color: '#22c55e' },
                  { cmd: 'docker compose down', desc: '모든 서비스 중지 및 삭제', icon: '⏹️', color: '#ef4444' },
                  { cmd: 'docker compose logs -f', desc: '모든 서비스 로그 실시간 확인', icon: '📜', color: '#3b82f6' },
                  { cmd: 'docker compose logs -f app', desc: '특정 서비스 로그만 확인', icon: '🔍', color: '#8b5cf6' },
                  { cmd: 'docker compose ps', desc: '서비스 상태 확인', icon: '📊', color: '#f59e0b' },
                  { cmd: 'docker compose build', desc: '이미지 다시 빌드', icon: '🔨', color: '#ec4899' },
                  { cmd: 'docker compose exec app sh', desc: '실행 중인 서비스에 접속', icon: '💻', color: '#06b6d4' },
                  { cmd: 'docker compose down -v', desc: '볼륨까지 함께 삭제', icon: '🗑️', color: '#dc2626' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <code style={{ display: 'block', color: item.color, fontSize: '0.85rem', marginBottom: '4px' }}>{item.cmd}</code>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>💡 자주 쓰는 워크플로우</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <code style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', color: '#86efac' }}>up -d</code>
                  <span style={{ color: '#94a3b8' }}>→</span>
                  <code style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', color: '#93c5fd' }}>logs -f</code>
                  <span style={{ color: '#94a3b8' }}>→</span>
                  <span style={{ color: '#fef3c7' }}>개발/테스트</span>
                  <span style={{ color: '#94a3b8' }}>→</span>
                  <code style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', color: '#fca5a5' }}>down</code>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        * { scrollbar-width: thin; scrollbar-color: #374151 transparent; }
      `}</style>
    </div>
  );
};

export default DockerLearningPlatform;
