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

      {/* ============ CONCEPT TAB ============ */}
      {activeTab === 'concept' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['이미지 vs 컨테이너', '레이어 구조', '생명주기', '레지스트리', '볼륨'].map((name, i) => (
              <button key={i} onClick={() => setConceptSection(i)} style={{ padding: '10px 18px', borderRadius: '10px', border: conceptSection === i ? '2px solid #00d4ff' : '2px solid transparent', background: conceptSection === i ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)', color: conceptSection === i ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>{name}</button>
            ))}
          </div>

          {conceptSection === 0 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#00d4ff' }}>📦 이미지 vs 🏃 컨테이너</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.15), rgba(59,130,246,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(59,130,246,0.4)' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}><div style={{ fontSize: '3rem' }}>📦</div><h4 style={{ color: '#60a5fa' }}>이미지 (Image)</h4><div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>읽기 전용 템플릿</div></div>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#bfdbfe', fontSize: '0.85rem', lineHeight: '1.8' }}>
                    <li><strong>불변(Immutable)</strong> - 한번 만들면 변경 불가</li>
                    <li><strong>레이어 구조</strong> - 여러 층으로 구성</li>
                    <li><strong>공유 가능</strong> - Docker Hub에 업로드/다운로드</li>
                  </ul>
                </div>
                <div style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.15), rgba(34,197,94,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(34,197,94,0.4)' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}><div style={{ fontSize: '3rem' }}>🏃</div><h4 style={{ color: '#4ade80' }}>컨테이너 (Container)</h4><div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>실행 중인 인스턴스</div></div>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbf7d0', fontSize: '0.85rem', lineHeight: '1.8' }}>
                    <li><strong>실행 상태</strong> - 이미지가 메모리에 올라간 것</li>
                    <li><strong>격리된 환경</strong> - 독립적인 프로세스 공간</li>
                    <li><strong>일시적</strong> - 삭제하면 변경사항도 삭제</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {conceptSection === 1 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#a78bfa' }}>📚 이미지 레이어 구조</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '20px' }}>
                  {[{ name: 'Container Layer (R/W)', color: '#22c55e' }, { name: 'ENTRYPOINT', color: '#ef4444' }, { name: 'COPY app.jar', color: '#06b6d4' }, { name: 'RUN apt-get', color: '#8b5cf6' }, { name: 'FROM openjdk:17', color: '#3b82f6' }].map((layer, i) => (
                    <div key={i} style={{ padding: '12px', background: `${layer.color}30`, borderLeft: `4px solid ${layer.color}`, borderRadius: '0 8px 8px 0', marginBottom: '4px' }}>
                      <span style={{ color: layer.color, fontWeight: '600', fontSize: '0.85rem' }}>{layer.name}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', marginBottom: '12px' }}><h4 style={{ color: '#4ade80', marginBottom: '8px' }}>✅ 레이어의 장점</h4><ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem' }}><li>캐싱 - 변경된 레이어만 재빌드</li><li>공유 - 같은 레이어는 여러 이미지가 공유</li></ul></div>
                  <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px' }}><h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>⚠️ 최적화 팁</h4><ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem' }}><li>자주 변경되는 레이어는 나중에</li><li>RUN 명령어는 하나로 합치기</li></ul></div>
                </div>
              </div>
            </div>
          )}

          {conceptSection === 2 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f59e0b' }}>🔄 컨테이너 생명주기</h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {[{ state: '이미지', icon: '📦', color: '#3b82f6' }, { state: 'Running', icon: '🟢', color: '#22c55e' }, { state: 'Stopped', icon: '🟡', color: '#f59e0b' }, { state: '삭제됨', icon: '❌', color: '#ef4444' }].map((item, i) => (
                  <React.Fragment key={i}>
                    <div style={{ textAlign: 'center', padding: '16px 20px', background: `${item.color}20`, borderRadius: '12px', border: `2px solid ${item.color}40` }}>
                      <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                      <div style={{ color: item.color, fontWeight: '600', fontSize: '0.85rem' }}>{item.state}</div>
                    </div>
                    {i < 3 && <div style={{ color: '#94a3b8' }}>→</div>}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {[{ cmd: 'docker run', desc: '이미지→Running' }, { cmd: 'docker stop', desc: 'Running→Stopped' }, { cmd: 'docker start', desc: 'Stopped→Running' }, { cmd: 'docker rm', desc: 'Stopped→삭제' }].map((item, i) => (
                  <div key={i} style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                    <code style={{ color: '#86efac', fontSize: '0.8rem' }}>{item.cmd}</code>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '4px' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {conceptSection === 3 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#06b6d4' }}>🏪 Docker Registry</h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(59,130,246,0.2)', borderRadius: '16px' }}><div style={{ fontSize: '2.5rem' }}>💻</div><div style={{ color: '#93c5fd' }}>Local</div></div>
                <div style={{ textAlign: 'center' }}><code style={{ color: '#86efac' }}>push →</code><br/><code style={{ color: '#93c5fd' }}>← pull</code></div>
                <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(6,182,212,0.2)', borderRadius: '16px' }}><div style={{ fontSize: '2.5rem' }}>🐳</div><div style={{ color: '#67e8f9' }}>Docker Hub</div></div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '12px', textAlign: 'center' }}>📛 이미지 이름 구조</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap' }}>
                  <code style={{ padding: '8px 12px', background: '#8b5cf6', borderRadius: '6px', color: '#fff' }}>registry</code>
                  <code style={{ padding: '8px 4px', color: '#94a3b8' }}>/</code>
                  <code style={{ padding: '8px 12px', background: '#06b6d4', borderRadius: '6px', color: '#fff' }}>user</code>
                  <code style={{ padding: '8px 4px', color: '#94a3b8' }}>/</code>
                  <code style={{ padding: '8px 12px', background: '#22c55e', borderRadius: '6px', color: '#fff' }}>image</code>
                  <code style={{ padding: '8px 4px', color: '#94a3b8' }}>:</code>
                  <code style={{ padding: '8px 12px', background: '#f59e0b', borderRadius: '6px', color: '#fff' }}>tag</code>
                </div>
              </div>
            </div>
          )}

          {conceptSection === 4 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#ec4899' }}>💾 볼륨 (Volumes)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', background: 'rgba(34,197,94,0.1)', borderRadius: '14px' }}>
                  <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>📦 Named Volume</h4>
                  <code style={{ display: 'block', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.8rem', marginBottom: '12px' }}>-v db-data:/var/lib/mysql</code>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.85rem' }}><li>Docker가 관리</li><li>운영 환경 권장</li></ul>
                </div>
                <div style={{ padding: '20px', background: 'rgba(251,191,36,0.1)', borderRadius: '14px' }}>
                  <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>📁 Bind Mount</h4>
                  <code style={{ display: 'block', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#fef3c7', fontSize: '0.8rem', marginBottom: '12px' }}>-v ./data:/app/data</code>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#fef3c7', fontSize: '0.85rem' }}><li>호스트 경로 직접 마운트</li><li>개발 환경 유용</li></ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============ VM VS DOCKER TAB ============ */}
      {activeTab === 'vmvsdocker' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,191,36,0.02))', borderRadius: '20px', padding: '28px', marginBottom: '20px', border: '1px solid rgba(251,191,36,0.3)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#fbbf24' }}>🏠 쉬운 비유: 단독주택 vs 아파트</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: 'linear-gradient(180deg, rgba(244,114,182,0.15), rgba(244,114,182,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(244,114,182,0.4)' }}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}><div style={{ fontSize: '3rem' }}>🏠</div><h4 style={{ color: '#f472b6' }}>VM = 단독주택</h4></div>
                <div style={{ color: '#fda4af', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  <div style={{ marginBottom: '8px' }}><strong>🏗️ 짓는 데 오래 걸림</strong> - OS 전체 설치</div>
                  <div style={{ marginBottom: '8px' }}><strong>💰 유지비 비쌈</strong> - 리소스 많이 사용</div>
                  <div><strong>📦 공간 낭비</strong> - GB 단위 용량</div>
                </div>
              </div>
              <div style={{ background: 'linear-gradient(180deg, rgba(34,211,238,0.15), rgba(34,211,238,0.02))', borderRadius: '16px', padding: '24px', border: '2px solid rgba(34,211,238,0.4)' }}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}><div style={{ fontSize: '3rem' }}>🏢</div><h4 style={{ color: '#22d3ee' }}>Docker = 아파트</h4></div>
                <div style={{ color: '#67e8f9', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  <div style={{ marginBottom: '8px' }}><strong>⚡ 입주 빠름</strong> - OS 커널 공유</div>
                  <div style={{ marginBottom: '8px' }}><strong>💰 관리비 저렴</strong> - 리소스 효율적</div>
                  <div><strong>📦 공간 효율</strong> - MB 단위 용량</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>⚡ 성능 비교 시뮬레이션</h3>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <button onClick={runVmSimulation} disabled={vmSimulation.running} style={{ padding: '16px 40px', borderRadius: '14px', border: 'none', background: vmSimulation.running ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #f472b6, #8b5cf6)', color: vmSimulation.running ? '#666' : '#fff', cursor: vmSimulation.running ? 'not-allowed' : 'pointer', fontSize: '1.1rem', fontWeight: '700' }}>
                {vmSimulation.running ? `⏳ ${(vmSimulation.elapsed / 1000).toFixed(1)}초` : '🚀 시작!'}
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: 'rgba(244,114,182,0.1)', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ color: '#f472b6', marginBottom: '16px' }}>🏠 VM × 3 <span style={{ float: 'right' }}>{vmSimulation.vms.filter(v => v.progress >= 100).length}/3</span></h4>
                {vmSimulation.vms.map(vm => (
                  <div key={vm.id} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: '#fda4af' }}>VM-{vm.id + 1}</span><span style={{ color: '#fda4af', fontSize: '0.8rem' }}>{vm.stage}</span></div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ height: '100%', width: `${vm.progress}%`, background: vm.progress >= 100 ? '#22c55e' : '#f472b6', borderRadius: '3px' }} /></div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(34,211,238,0.1)', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ color: '#22d3ee', marginBottom: '16px' }}>🐳 Docker × 6 <span style={{ float: 'right' }}>{vmSimulation.containers.filter(c => c.progress >= 100).length}/6</span></h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {vmSimulation.containers.map(c => (
                    <div key={c.id} style={{ background: c.progress >= 100 ? 'rgba(34,197,94,0.3)' : 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem' }}>{c.progress >= 100 ? '🟢' : '🔵'}</div>
                    </div>
                  ))}
                </div>
              </div>
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
              <div style={{ background: '#0d1117', borderRadius: '16px', padding: '20px', fontFamily: 'monospace' }}>
                {imageLayersDetail.map((layer, i) => (
                  <div key={i} onClick={() => setDockerfileStep(i)} style={{ padding: '10px', borderRadius: '6px', background: i === dockerfileStep ? 'rgba(167,139,250,0.2)' : 'transparent', borderLeft: i === dockerfileStep ? '3px solid #a78bfa' : '3px solid transparent', marginBottom: '4px', cursor: 'pointer' }}>
                    <span style={{ color: '#ff7b72' }}>{layer.instruction.split(' ')[0]}</span>
                    <span style={{ color: '#c9d1d9' }}> {layer.instruction.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(167,139,250,0.1)', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ color: '#c4b5fd', marginBottom: '12px' }}>{imageLayersDetail[dockerfileStep].name}</h4>
                <div style={{ padding: '12px', background: 'rgba(251,191,36,0.1)', borderRadius: '10px', marginBottom: '12px' }}><span style={{ color: '#fbbf24' }}>{imageLayersDetail[dockerfileStep].analogy}</span></div>
                <p style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '16px' }}>{imageLayersDetail[dockerfileStep].description}</p>
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
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f59e0b' }}>🔌 포트 매핑</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '24px', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(139,92,246,0.2)', borderRadius: '16px' }}><div style={{ fontSize: '2.5rem' }}>🌐</div><div style={{ color: '#c4b5fd' }}>외부</div></div>
              <div style={{ textAlign: 'center' }}><code style={{ padding: '8px 16px', background: 'rgba(34,197,94,0.3)', borderRadius: '8px', color: '#86efac' }}>-p 8080:8080</code><div style={{ fontSize: '1.5rem', marginTop: '8px' }}>→</div></div>
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(0,212,255,0.2)', borderRadius: '16px' }}><div style={{ fontSize: '2.5rem' }}>🐳</div><div style={{ color: '#67e8f9' }}>컨테이너</div></div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(251,191,36,0.1)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center' }}>
                <code style={{ padding: '10px 16px', background: '#f472b6', borderRadius: '8px 0 0 8px', color: '#fff' }}>호스트포트</code>
                <code style={{ padding: '10px 8px', background: '#64748b', color: '#fff' }}>:</code>
                <code style={{ padding: '10px 16px', background: '#22d3ee', borderRadius: '0 8px 8px 0', color: '#0f172a' }}>컨테이너포트</code>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#a78bfa' }}>🔗 컨테이너 간 통신</h3>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}><span style={{ padding: '8px 16px', background: 'rgba(139,92,246,0.3)', borderRadius: '20px', color: '#c4b5fd', fontSize: '0.85rem' }}>🌐 Docker Network</span></div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                {[{ icon: '🍃', name: 'app', port: '8080', color: '#22c55e', external: true }, { icon: '🐬', name: 'db', port: '3306', color: '#0284c7' }, { icon: '⚡', name: 'redis', port: '6379', color: '#dc2626' }].map((svc, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '16px', background: `linear-gradient(180deg, ${svc.color}, ${svc.color}99)`, borderRadius: '12px', minWidth: '100px' }}>
                    <div style={{ fontSize: '1.5rem' }}>{svc.icon}</div>
                    <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>{svc.name}</div>
                    <code style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }}>:{svc.port}</code>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'rgba(34,197,94,0.1)', borderRadius: '10px' }}><div style={{ color: '#4ade80', fontWeight: '600', fontSize: '0.85rem' }}>✅ 서비스명 = 호스트명</div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0 0' }}>db:3306으로 접속</p></div>
              <div style={{ padding: '14px', background: 'rgba(251,191,36,0.1)', borderRadius: '10px' }}><div style={{ color: '#fbbf24', fontWeight: '600', fontSize: '0.85rem' }}>🔒 필요한 것만 노출</div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0 0' }}>DB는 내부 전용</p></div>
              <div style={{ padding: '14px', background: 'rgba(139,92,246,0.1)', borderRadius: '10px' }}><div style={{ color: '#a78bfa', fontWeight: '600', fontSize: '0.85rem' }}>🌐 자동 DNS</div><p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0 0' }}>Docker가 IP 변환</p></div>
            </div>
          </div>
        </div>
      )}

      {/* ============ COMPOSE TAB ============ */}
      {activeTab === 'compose' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['Compose란?', 'services', 'environment', 'volumes', 'networks', 'depends_on', '명령어'].map((name, i) => (
              <button key={i} onClick={() => setComposeSection(i)} style={{ padding: '10px 16px', borderRadius: '10px', border: composeSection === i ? '2px solid #f472b6' : '2px solid transparent', background: composeSection === i ? 'rgba(244,114,182,0.2)' : 'rgba(255,255,255,0.05)', color: composeSection === i ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}>{name}</button>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {composeSection === 0 && (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>🎼 Docker Compose란?</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ padding: '20px', background: 'rgba(239,68,68,0.1)', borderRadius: '14px' }}>
                    <h4 style={{ color: '#f87171', marginBottom: '12px' }}>😱 Compose 없이</h4>
                    <code style={{ display: 'block', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.75rem' }}>$ docker run db...<br/>$ docker run redis...<br/>$ docker run app...</code>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(34,197,94,0.1)', borderRadius: '14px' }}>
                    <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>✅ Compose 사용</h4>
                    <code style={{ display: 'block', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.75rem' }}>$ docker compose up -d<br/># 끝!</code>
                  </div>
                </div>
                <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                  <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.75rem' }}>{`version: '3.8'
services:
  app:
    build: .
    ports: ["8080:8080"]
    depends_on: [db, redis]
  db:
    image: mysql:8.0
    volumes: [db-data:/var/lib/mysql]
  redis:
    image: redis:alpine
volumes:
  db-data:`}</pre>
                </div>
              </>
            )}

            {composeSection === 1 && (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>📦 services</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`services:
  app:
    build: .          # Dockerfile 빌드
    ports: ["8080:8080"]
  db:
    image: mysql:8.0  # 이미지 사용
    restart: always`}</pre>
                  </div>
                  <div>
                    <div style={{ padding: '14px', background: 'rgba(34,197,94,0.1)', borderRadius: '10px', marginBottom: '12px' }}><h4 style={{ color: '#4ade80', marginBottom: '8px', fontSize: '0.9rem' }}>build vs image</h4><ul style={{ margin: 0, paddingLeft: '18px', color: '#bbf7d0', fontSize: '0.8rem' }}><li>build: Dockerfile 빌드</li><li>image: 기존 이미지 사용</li></ul></div>
                    <div style={{ padding: '14px', background: 'rgba(139,92,246,0.1)', borderRadius: '10px' }}><h4 style={{ color: '#a78bfa', marginBottom: '8px', fontSize: '0.9rem' }}>💡 서비스명 = 호스트명</h4><p style={{ color: '#c4b5fd', fontSize: '0.8rem', margin: 0 }}>app에서 db:3306으로 접속!</p></div>
                  </div>
                </div>
              </>
            )}

            {composeSection === 2 && (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>⚙️ environment</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                    <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>방법 1: 직접 정의</div>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`environment:
  - DB_HOST=db
  - DB_PORT=3306`}</pre>
                  </div>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                    <div style={{ color: '#8b949e', fontSize: '0.75rem', marginBottom: '8px' }}>방법 2: .env 파일</div>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`env_file:
  - .env`}</pre>
                  </div>
                </div>
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '10px' }}><span style={{ color: '#f87171', fontSize: '0.85rem' }}>⚠️ .env 파일은 .gitignore에 추가하세요!</span></div>
              </>
            )}

            {composeSection === 3 && (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>💾 volumes</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ padding: '20px', background: 'rgba(34,197,94,0.1)', borderRadius: '14px' }}>
                    <h4 style={{ color: '#4ade80', marginBottom: '12px' }}>📦 Named Volume</h4>
                    <code style={{ display: 'block', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.8rem' }}>db-data:/var/lib/mysql</code>
                    <p style={{ color: '#bbf7d0', fontSize: '0.8rem', marginTop: '8px' }}>운영 환경 권장</p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(251,191,36,0.1)', borderRadius: '14px' }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '12px' }}>📁 Bind Mount</h4>
                    <code style={{ display: 'block', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', color: '#fef3c7', fontSize: '0.8rem' }}>./data:/app/data</code>
                    <p style={{ color: '#fef3c7', fontSize: '0.8rem', marginTop: '8px' }}>개발 환경 유용</p>
                  </div>
                </div>
              </>
            )}

            {composeSection === 4 && (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>🌐 networks</h3>
                <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: '12px', marginBottom: '20px' }}><p style={{ color: '#bbf7d0', fontSize: '0.9rem', margin: 0 }}>✅ 기본 네트워크가 자동 생성됩니다 ({'{프로젝트명}_default'})</p></div>
                <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                  <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`services:
  app:
    networks: [frontend, backend]
  db:
    networks: [backend]  # app만 접근 가능!

networks:
  frontend:
  backend:`}</pre>
                </div>
              </>
            )}

            {composeSection === 5 && (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>🔗 depends_on</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: '#0d1117', borderRadius: '12px', padding: '16px', fontFamily: 'monospace' }}>
                    <pre style={{ color: '#e6edf3', margin: 0, fontSize: '0.8rem' }}>{`services:
  app:
    depends_on:
      - db
      - redis`}</pre>
                  </div>
                  <div>
                    <div style={{ padding: '14px', background: 'rgba(239,68,68,0.1)', borderRadius: '10px', marginBottom: '12px' }}><h4 style={{ color: '#f87171', marginBottom: '8px', fontSize: '0.9rem' }}>⚠️ 주의</h4><p style={{ color: '#fca5a5', fontSize: '0.8rem', margin: 0 }}>시작 순서만 보장, 준비 완료 대기 X</p></div>
                    <div style={{ padding: '14px', background: 'rgba(34,197,94,0.1)', borderRadius: '10px' }}><h4 style={{ color: '#4ade80', marginBottom: '8px', fontSize: '0.9rem' }}>✅ 해결책</h4><p style={{ color: '#bbf7d0', fontSize: '0.8rem', margin: '4px 0 0 0' }}>앱에서 연결 재시도 로직 구현</p></div>
                  </div>
                </div>
              </>
            )}

            {composeSection === 6 && (
              <>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#f472b6' }}>⌨️ Compose 명령어</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {[
                    { cmd: 'docker compose up -d', desc: '모든 서비스 시작', icon: '▶️' },
                    { cmd: 'docker compose down', desc: '모든 서비스 중지', icon: '⏹️' },
                    { cmd: 'docker compose logs -f', desc: '실시간 로그', icon: '📜' },
                    { cmd: 'docker compose ps', desc: '상태 확인', icon: '📊' },
                    { cmd: 'docker compose build', desc: '이미지 빌드', icon: '🔨' },
                    { cmd: 'docker compose exec app sh', desc: '컨테이너 접속', icon: '💻' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '14px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                      <div><code style={{ color: '#86efac', fontSize: '0.8rem' }}>{item.cmd}</code><div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>{item.desc}</div></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        * { scrollbar-width: thin; scrollbar-color: #374151 transparent; }
      `}</style>
    </div>
  );
};

export default DockerLearningPlatform;
