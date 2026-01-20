/**
 * =============================================================================
 * Role: Docker Commands Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding new command categories
 * - Adding new commands to existing categories
 * - Updating command descriptions or outputs
 *
 * STRUCTURE:
 * - COMMAND_CATEGORIES: Array of category objects
 * - Each category has: name (display), commands (array)
 * - Each command has: cmd (command), short (label), desc (description), output (terminal output)
 * =============================================================================
 */

export const COMMAND_CATEGORIES = [
  {
    name: '🔰 기본 확인',
    commands: [
      { cmd: 'docker version', short: 'Docker 버전 확인', desc: 'Docker 클라이언트와 서버의 버전 정보를 확인합니다', output: 'Client: Docker Engine 24.0.7\nServer: Docker Engine 24.0.7\nAPI version: 1.43' },
      { cmd: 'docker info', short: '시스템 정보', desc: '컨테이너 수, 이미지 수, 저장소 드라이버 등 시스템 전체 정보', output: 'Containers: 5 (Running: 2, Paused: 0, Stopped: 3)\nImages: 12\nStorage Driver: overlay2' },
      { cmd: 'docker --help', short: '도움말', desc: '사용 가능한 모든 Docker 명령어 목록 확인', output: 'Usage: docker [OPTIONS] COMMAND\n\nCommands:\n  run, build, pull, push, images, ps...' }
    ]
  },
  {
    name: '📦 이미지 관리',
    commands: [
      { cmd: 'docker images', short: '이미지 목록', desc: '로컬에 저장된 모든 이미지를 확인합니다', output: 'REPOSITORY   TAG       IMAGE ID       SIZE\nmyapp        1.0       abc123def456   312MB\nmysql        8.0       def456abc789   540MB' },
      { cmd: 'docker pull nginx:latest', short: '이미지 다운로드', desc: 'Docker Hub에서 이미지를 다운로드합니다', output: 'latest: Pulling from library/nginx\nDigest: sha256:abc123...\nStatus: Downloaded newer image' },
      { cmd: 'docker build -t myapp:1.0 .', short: '이미지 빌드', desc: '현재 디렉토리의 Dockerfile로 이미지를 빌드합니다', output: '[+] Building 45.2s\n => [1/5] FROM eclipse-temurin:17\n => [2/5] WORKDIR /app\nSuccessfully tagged myapp:1.0' },
      { cmd: 'docker tag myapp:1.0 myapp:latest', short: '이미지 태그', desc: '기존 이미지에 새로운 태그를 추가합니다', output: '(태그 추가 완료)' },
      { cmd: 'docker push myrepo/myapp:1.0', short: '이미지 업로드', desc: '이미지를 레지스트리에 업로드합니다', output: 'The push refers to repository [docker.io/myrepo/myapp]\n1.0: digest: sha256:abc123... size: 1234' },
      { cmd: 'docker rmi myapp:1.0', short: '이미지 삭제', desc: '로컬 이미지를 삭제합니다', output: 'Untagged: myapp:1.0\nDeleted: sha256:abc123def456...' },
      { cmd: 'docker image prune', short: '미사용 이미지 정리', desc: '태그 없는 dangling 이미지들을 삭제합니다', output: 'Deleted Images:\nsha256:abc123...\nTotal reclaimed space: 1.2GB' }
    ]
  },
  {
    name: '🏃 컨테이너 실행',
    commands: [
      { cmd: 'docker run -d --name myapp -p 8080:8080 myapp:1.0', short: '백그라운드 실행', desc: '-d: 백그라운드, --name: 컨테이너 이름, -p: 포트매핑', output: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' },
      { cmd: 'docker run -it --rm alpine /bin/sh', short: '대화형 일회용', desc: '-it: 대화형 터미널, --rm: 종료 시 자동 삭제', output: '/ # ' },
      { cmd: 'docker run -d -e DB_HOST=localhost myapp:1.0', short: '환경변수 전달', desc: '-e: 환경변수를 컨테이너에 전달', output: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7' },
      { cmd: 'docker run -d -v mydata:/app/data myapp:1.0', short: '볼륨 마운트', desc: '-v: 볼륨을 컨테이너에 마운트', output: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8' },
      { cmd: 'docker run -d --network mynet myapp:1.0', short: '네트워크 지정', desc: '--network: 특정 네트워크에 연결', output: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9' },
      { cmd: 'docker run -d --restart always myapp:1.0', short: '자동 재시작', desc: '--restart: 컨테이너 재시작 정책 설정', output: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0' }
    ]
  },
  {
    name: '⏹️ 시작/중지',
    commands: [
      { cmd: 'docker stop myapp', short: '정상 종료', desc: 'SIGTERM 신호로 graceful shutdown (10초 대기)', output: 'myapp' },
      { cmd: 'docker stop -t 30 myapp', short: '종료 대기시간 지정', desc: '-t: 강제 종료 전 대기 시간(초) 지정', output: 'myapp' },
      { cmd: 'docker kill myapp', short: '강제 종료', desc: 'SIGKILL 신호로 즉시 강제 종료', output: 'myapp' },
      { cmd: 'docker start myapp', short: '컨테이너 시작', desc: '중지된 컨테이너를 다시 시작합니다', output: 'myapp' },
      { cmd: 'docker restart myapp', short: '컨테이너 재시작', desc: 'stop 후 start를 연속 실행합니다', output: 'myapp' },
      { cmd: 'docker pause myapp', short: '일시 정지', desc: '컨테이너 프로세스를 일시 정지합니다', output: 'myapp' },
      { cmd: 'docker unpause myapp', short: '일시 정지 해제', desc: '일시 정지된 컨테이너를 재개합니다', output: 'myapp' }
    ]
  },
  {
    name: '📊 상태 확인',
    commands: [
      { cmd: 'docker ps', short: '실행 중 컨테이너', desc: '현재 실행 중인 컨테이너 목록', output: 'CONTAINER ID   IMAGE       STATUS         NAMES\na1b2c3d4e5f6   myapp:1.0   Up 2 hours     myapp' },
      { cmd: 'docker ps -a', short: '전체 컨테이너', desc: '중지된 컨테이너 포함 전체 목록', output: 'CONTAINER ID   IMAGE       STATUS           NAMES\na1b2c3d4e5f6   myapp:1.0   Exited (0) 1h    myapp' },
      { cmd: 'docker ps -q', short: 'ID만 출력', desc: '컨테이너 ID만 출력 (스크립트용)', output: 'a1b2c3d4e5f6\nb2c3d4e5f6g7' },
      { cmd: 'docker stats', short: '리소스 모니터링', desc: 'CPU, 메모리, 네트워크 I/O 실시간 확인', output: 'CONTAINER   CPU %   MEM USAGE / LIMIT     NET I/O\nmyapp       2.5%    256MiB / 512MiB       1.2kB / 500B' },
      { cmd: 'docker top myapp', short: '프로세스 확인', desc: '컨테이너 내부에서 실행 중인 프로세스 확인', output: 'PID    USER   COMMAND\n1      root   java -jar app.jar' },
      { cmd: 'docker port myapp', short: '포트 매핑 확인', desc: '컨테이너의 포트 매핑 정보 확인', output: '8080/tcp -> 0.0.0.0:8080' }
    ]
  },
  {
    name: '🔍 로그/디버깅',
    commands: [
      { cmd: 'docker logs myapp', short: '로그 보기', desc: '컨테이너의 stdout/stderr 출력 확인', output: '2024-01-15 10:30:00 Started MyApplication in 2.3s' },
      { cmd: 'docker logs -f myapp', short: '실시간 로그', desc: '-f: follow 모드로 실시간 로그 스트리밍', output: '[실시간 로그 스트리밍 중...]\n2024-01-15 10:31:00 Request received...' },
      { cmd: 'docker logs --tail 100 myapp', short: '최근 N줄', desc: '--tail: 마지막 N줄만 출력', output: '[최근 100줄 출력]' },
      { cmd: 'docker logs --since 1h myapp', short: '시간 기준 로그', desc: '--since: 특정 시간 이후의 로그만 출력', output: '[최근 1시간 로그 출력]' },
      { cmd: 'docker exec -it myapp /bin/sh', short: '컨테이너 접속', desc: '실행 중인 컨테이너 내부 쉘에 접속', output: '/app # ' },
      { cmd: 'docker exec myapp cat /app/config.yml', short: '명령어 실행', desc: '컨테이너 내부에서 단일 명령어 실행', output: 'server:\n  port: 8080' },
      { cmd: 'docker inspect myapp', short: '상세 정보', desc: 'IP, 볼륨, 환경변수 등 모든 설정을 JSON으로 출력', output: '[\n  {\n    "Id": "a1b2c3...",\n    "NetworkSettings": {\n      "IPAddress": "172.17.0.2"\n    }\n  }\n]' },
      { cmd: 'docker diff myapp', short: '파일 변경 확인', desc: '컨테이너에서 변경된 파일 목록 확인', output: 'C /app\nA /app/logs/app.log\nC /tmp' }
    ]
  },
  {
    name: '📋 복사/전송',
    commands: [
      { cmd: 'docker cp myapp:/app/logs ./logs', short: '컨테이너→호스트', desc: '컨테이너의 파일을 호스트로 복사', output: '(복사 완료)' },
      { cmd: 'docker cp ./config.yml myapp:/app/', short: '호스트→컨테이너', desc: '호스트의 파일을 컨테이너로 복사', output: '(복사 완료)' },
      { cmd: 'docker export myapp > backup.tar', short: '컨테이너 내보내기', desc: '컨테이너 파일시스템을 tar로 내보내기', output: '(backup.tar 생성 완료)' },
      { cmd: 'docker import backup.tar myapp:backup', short: '이미지로 가져오기', desc: 'tar 파일을 이미지로 가져오기', output: 'sha256:abc123def456...' }
    ]
  },
  {
    name: '🌐 네트워크',
    commands: [
      { cmd: 'docker network ls', short: '네트워크 목록', desc: '모든 Docker 네트워크 목록 확인', output: 'NETWORK ID     NAME      DRIVER    SCOPE\nabc123def456   bridge    bridge    local\ndef456abc789   mynet     bridge    local' },
      { cmd: 'docker network create mynet', short: '네트워크 생성', desc: '새로운 브릿지 네트워크 생성', output: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1' },
      { cmd: 'docker network connect mynet myapp', short: '네트워크 연결', desc: '실행 중인 컨테이너를 네트워크에 연결', output: '(연결 완료)' },
      { cmd: 'docker network disconnect mynet myapp', short: '네트워크 해제', desc: '컨테이너를 네트워크에서 분리', output: '(연결 해제 완료)' },
      { cmd: 'docker network inspect mynet', short: '네트워크 상세', desc: '네트워크의 상세 정보와 연결된 컨테이너 확인', output: '[\n  {\n    "Name": "mynet",\n    "Containers": {\n      "abc123": { "Name": "myapp" }\n    }\n  }\n]' },
      { cmd: 'docker network rm mynet', short: '네트워크 삭제', desc: '네트워크 삭제 (연결된 컨테이너 없어야 함)', output: 'mynet' }
    ]
  },
  {
    name: '💾 볼륨',
    commands: [
      { cmd: 'docker volume ls', short: '볼륨 목록', desc: '모든 Docker 볼륨 목록 확인', output: 'DRIVER    VOLUME NAME\nlocal     mydata\nlocal     db-data' },
      { cmd: 'docker volume create mydata', short: '볼륨 생성', desc: '새로운 볼륨 생성', output: 'mydata' },
      { cmd: 'docker volume inspect mydata', short: '볼륨 상세', desc: '볼륨의 마운트 경로 등 상세 정보', output: '[\n  {\n    "Name": "mydata",\n    "Mountpoint": "/var/lib/docker/volumes/mydata/_data"\n  }\n]' },
      { cmd: 'docker volume rm mydata', short: '볼륨 삭제', desc: '볼륨 삭제 (사용 중이 아닐 때만)', output: 'mydata' },
      { cmd: 'docker volume prune', short: '미사용 볼륨 정리', desc: '사용하지 않는 모든 볼륨 삭제', output: 'Deleted Volumes:\nmydata\nTotal reclaimed space: 500MB' }
    ]
  },
  {
    name: '🧹 정리/삭제',
    commands: [
      { cmd: 'docker rm myapp', short: '컨테이너 삭제', desc: '중지된 컨테이너 삭제', output: 'myapp' },
      { cmd: 'docker rm -f myapp', short: '강제 삭제', desc: '실행 중인 컨테이너도 강제 삭제', output: 'myapp' },
      { cmd: 'docker rm $(docker ps -aq)', short: '전체 컨테이너 삭제', desc: '모든 컨테이너를 한 번에 삭제', output: 'a1b2c3d4\nb2c3d4e5\nc3d4e5f6' },
      { cmd: 'docker container prune', short: '중지된 컨테이너 정리', desc: '모든 중지된 컨테이너 삭제', output: 'Deleted Containers:\na1b2c3d4e5f6\nTotal reclaimed space: 50MB' },
      { cmd: 'docker system prune', short: '시스템 정리', desc: '미사용 컨테이너, 네트워크, 이미지 정리', output: 'Total reclaimed space: 2.5GB' },
      { cmd: 'docker system prune -a --volumes', short: '전체 정리', desc: '모든 미사용 리소스 + 볼륨까지 삭제', output: 'Total reclaimed space: 10.2GB' },
      { cmd: 'docker system df', short: '디스크 사용량', desc: 'Docker가 사용 중인 디스크 용량 확인', output: 'TYPE         TOTAL    ACTIVE   SIZE      RECLAIMABLE\nImages       12       5        4.5GB     2.1GB (46%)\nContainers   8        2        500MB     400MB (80%)' }
    ]
  }
];
