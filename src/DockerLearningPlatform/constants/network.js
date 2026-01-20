/**
 * =============================================================================
 * Role: Network Section Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding new network examples
 * - Updating service definitions
 * - Changing network diagram data
 *
 * STRUCTURE:
 * - NETWORK_SERVICES: Services shown in network diagram
 * - NETWORK_FEATURES: Feature cards data
 * =============================================================================
 */

// 섹션 네비게이션
export const NETWORK_SECTIONS = [
  '개요',
  '포트 매핑',
  '컨테이너 통신',
  '네트워크 드라이버',
  'localhost 함정',
  '명령어'
];

export const NETWORK_SERVICES = [
  { icon: '🍃', name: 'app', port: '8080', color: '#22c55e', external: true },
  { icon: '🐬', name: 'db', port: '3306', color: '#0284c7', external: false },
  { icon: '⚡', name: 'redis', port: '6379', color: '#dc2626', external: false }
];

export const NETWORK_FEATURES = [
  {
    title: '✅ 서비스명 = 호스트명',
    desc: 'IP 대신 서비스명으로 접속',
    color: '#22c55e',
    bgColor: 'rgba(34,197,94,0.1)',
    borderColor: 'rgba(34,197,94,0.3)'
  },
  {
    title: '🔒 필요한 것만 노출',
    desc: 'DB는 ports 없이 내부만',
    color: '#fbbf24',
    bgColor: 'rgba(251,191,36,0.1)',
    borderColor: 'rgba(251,191,36,0.3)'
  },
  {
    title: '🌐 자동 DNS',
    desc: 'Docker가 자동 IP 변환',
    color: '#a78bfa',
    bgColor: 'rgba(139,92,246,0.1)',
    borderColor: 'rgba(139,92,246,0.3)'
  }
];

export const PORT_MAPPING_EXAMPLE = {
  hostPort: { label: '호스트포트', color: '#f472b6', desc: '외부에서 접속하는 포트' },
  containerPort: { label: '컨테이너포트', color: '#22d3ee', desc: '앱이 실제 사용하는 포트' }
};

// 네트워크 개요 데이터
export const NETWORK_OVERVIEW = {
  title: 'Docker 네트워크 개요',
  subtitle: '컨테이너들이 서로 통신하는 방법',
  analogy: {
    icon: '🏢',
    title: '아파트 비유',
    description: 'Docker 네트워크는 아파트 단지와 같습니다',
    details: [
      { item: '아파트 단지', equals: 'Docker Network', desc: '컨테이너들이 모여 사는 공간' },
      { item: '각 세대', equals: 'Container', desc: '독립적인 공간, 고유한 호수(IP)' },
      { item: '내선 전화', equals: '내부 통신', desc: '같은 단지 내 무료 통화 (서비스명)' },
      { item: '외부 전화', equals: '포트 매핑', desc: '외부와 통신하려면 회선 연결 필요' }
    ]
  },
  keyPoints: [
    {
      icon: '🔒',
      title: '격리',
      desc: '컨테이너는 기본적으로 외부와 격리됨'
    },
    {
      icon: '🌐',
      title: '네트워크 연결',
      desc: '같은 네트워크의 컨테이너끼리 통신 가능'
    },
    {
      icon: '🚪',
      title: '포트 매핑',
      desc: '외부 접근은 포트를 열어야 함'
    },
    {
      icon: '📛',
      title: 'DNS',
      desc: '서비스 이름으로 통신 (IP 불필요)'
    }
  ],
  defaultNetwork: {
    title: '기본 네트워크',
    description: 'docker run 시 자동으로 bridge 네트워크에 연결됨',
    note: 'Docker Compose는 프로젝트별 네트워크 자동 생성'
  }
};

// 포트 매핑 상세 데이터
export const PORT_MAPPING_DATA = {
  title: '포트 매핑 완전 정복',
  subtitle: '컨테이너 격리와 외부 접근의 핵심',
  concept: {
    problem: '컨테이너는 기본적으로 격리되어 있어서 외부에서 접근 불가',
    solution: '-p 옵션으로 호스트 포트와 컨테이너 포트를 연결'
  },
  formats: [
    {
      format: '-p 8080:80',
      hostPort: '8080',
      containerPort: '80',
      desc: '호스트 8080 → 컨테이너 80',
      example: 'localhost:8080 으로 접속'
    },
    {
      format: '-p 80:80',
      hostPort: '80',
      containerPort: '80',
      desc: '같은 포트 사용',
      example: 'localhost 로 바로 접속'
    },
    {
      format: '-p 127.0.0.1:8080:80',
      hostPort: '8080 (localhost만)',
      containerPort: '80',
      desc: '로컬에서만 접근 가능',
      example: '외부 네트워크에서 접근 불가'
    },
    {
      format: '-p 8080-8090:80-90',
      hostPort: '8080-8090',
      containerPort: '80-90',
      desc: '포트 범위 매핑',
      example: '여러 포트 한번에'
    }
  ],
  commonPorts: [
    { service: 'HTTP', port: '80', example: '-p 80:80' },
    { service: 'HTTPS', port: '443', example: '-p 443:443' },
    { service: 'MySQL', port: '3306', example: '-p 3306:3306' },
    { service: 'PostgreSQL', port: '5432', example: '-p 5432:5432' },
    { service: 'Redis', port: '6379', example: '-p 6379:6379' },
    { service: 'MongoDB', port: '27017', example: '-p 27017:27017' }
  ],
  tips: [
    '개발 시에는 같은 포트 사용이 편리 (8080:8080)',
    '운영 환경에서는 필요한 포트만 최소한으로 열기',
    '보안: 127.0.0.1 바인딩으로 로컬만 접근 허용',
    '포트 충돌 시 다른 호스트 포트 사용 (8081:8080)'
  ]
};

// 컨테이너 통신 데이터
export const CONTAINER_COMMUNICATION_DATA = {
  title: '컨테이너 간 통신',
  subtitle: '서비스 이름으로 쉽게 통신하기',
  scenarios: [
    {
      id: 'same-network',
      title: '같은 네트워크',
      icon: '✅',
      color: '#22c55e',
      description: '같은 Docker 네트워크에 있으면 서비스명으로 통신 가능',
      example: {
        from: 'app',
        to: 'db',
        code: 'jdbc:mysql://db:3306/myapp',
        note: 'db는 컨테이너/서비스 이름'
      }
    },
    {
      id: 'different-network',
      title: '다른 네트워크',
      icon: '❌',
      color: '#ef4444',
      description: '다른 네트워크에 있으면 직접 통신 불가',
      example: {
        from: 'app (network-a)',
        to: 'db (network-b)',
        code: 'Connection refused!',
        note: '같은 네트워크에 연결 필요'
      }
    }
  ],
  dnsFlow: {
    title: 'Docker DNS 동작 원리',
    steps: [
      { step: 1, action: 'app에서 db:3306 으로 연결 시도', icon: '📤' },
      { step: 2, action: 'Docker 내장 DNS가 db 이름 조회', icon: '🔍' },
      { step: 3, action: 'db 컨테이너의 IP 주소 반환 (172.18.0.3)', icon: '📋' },
      { step: 4, action: 'app이 해당 IP로 연결', icon: '🔗' }
    ]
  },
  composeExample: {
    title: 'Docker Compose 예시',
    code: `services:
  app:
    build: .
    environment:
      - DB_HOST=db        # 서비스명 사용!
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis
    networks:
      - backend

  db:
    image: mysql:8.0
    networks:
      - backend

  redis:
    image: redis:alpine
    networks:
      - backend

networks:
  backend:             # 같은 네트워크에 연결`
  },
  tips: [
    'localhost 대신 서비스명 사용 (db, redis 등)',
    'Compose는 자동으로 같은 네트워크에 연결해줌',
    '환경변수로 호스트명 관리하면 유연함',
    'IP는 변할 수 있으니 서비스명 사용 권장'
  ]
};

// 네트워크 드라이버 데이터
export const NETWORK_DRIVERS_DATA = {
  title: '네트워크 드라이버',
  subtitle: '용도에 맞는 네트워크 선택하기',
  drivers: [
    {
      name: 'bridge',
      icon: '🌉',
      color: '#3b82f6',
      isDefault: true,
      description: '단일 호스트에서 컨테이너 간 통신',
      useCase: '개발 환경, 단일 서버 운영',
      features: [
        '기본 네트워크 드라이버',
        '같은 브릿지의 컨테이너끼리 통신 가능',
        '외부 접근은 포트 매핑 필요',
        '컨테이너별 고유 IP 할당'
      ],
      command: 'docker network create my-bridge',
      diagram: {
        host: '호스트',
        bridge: 'docker0 (bridge)',
        containers: ['container1', 'container2', 'container3']
      }
    },
    {
      name: 'host',
      icon: '🏠',
      color: '#f59e0b',
      isDefault: false,
      description: '호스트의 네트워크를 직접 사용',
      useCase: '최대 성능이 필요한 경우 (네트워크 오버헤드 제거)',
      features: [
        '컨테이너가 호스트 IP를 그대로 사용',
        '포트 매핑 불필요 (직접 노출)',
        '네트워크 격리 없음',
        'Linux에서만 완전 지원'
      ],
      command: 'docker run --network host nginx',
      warning: '보안상 주의 필요 - 격리가 없음'
    },
    {
      name: 'none',
      icon: '🚫',
      color: '#6b7280',
      isDefault: false,
      description: '네트워크 연결 완전히 비활성화',
      useCase: '네트워크가 필요 없는 배치 작업',
      features: [
        '외부 네트워크 연결 없음',
        'loopback(127.0.0.1)만 사용 가능',
        '보안이 중요한 격리 작업'
      ],
      command: 'docker run --network none alpine'
    },
    {
      name: 'overlay',
      icon: '☁️',
      color: '#8b5cf6',
      isDefault: false,
      description: '여러 호스트의 컨테이너 연결 (Swarm)',
      useCase: 'Docker Swarm 클러스터, 멀티호스트 환경',
      features: [
        '여러 Docker 호스트 간 통신',
        'Swarm 모드 필요',
        '자동 로드밸런싱',
        '서비스 디스커버리'
      ],
      command: 'docker network create -d overlay my-overlay'
    }
  ],
  comparison: {
    headers: ['드라이버', '격리', '성능', '멀티호스트', '주요 용도'],
    rows: [
      ['bridge', '✅ 높음', '보통', '❌', '개발/단일서버'],
      ['host', '❌ 없음', '최고', '❌', '고성능 필요'],
      ['none', '✅ 완전', '-', '❌', '격리 작업'],
      ['overlay', '✅ 높음', '보통', '✅', 'Swarm 클러스터']
    ]
  }
};

// localhost 함정 데이터
export const LOCALHOST_TRAP_DATA = {
  title: 'localhost 함정',
  subtitle: '초보자가 가장 많이 하는 실수!',
  problem: {
    title: '문제 상황',
    scenario: 'Spring Boot 앱에서 MySQL 연결 설정',
    badConfig: {
      code: 'spring.datasource.url=jdbc:mysql://localhost:3306/myapp',
      error: 'Connection refused: connect'
    },
    reason: '컨테이너 안에서 localhost는 "자기 자신"을 의미!'
  },
  explanation: {
    title: '왜 안 될까?',
    diagram: [
      {
        location: '호스트 머신',
        localhost: '호스트 자신 (192.168.1.100)',
        icon: '💻'
      },
      {
        location: 'app 컨테이너',
        localhost: 'app 컨테이너 자신 (172.18.0.2)',
        icon: '🍃'
      },
      {
        location: 'db 컨테이너',
        localhost: 'db 컨테이너 자신 (172.18.0.3)',
        icon: '🐬'
      }
    ],
    point: '각 컨테이너의 localhost는 서로 다른 곳을 가리킴!'
  },
  solution: {
    title: '해결 방법',
    options: [
      {
        method: '서비스명 사용 (권장)',
        code: 'spring.datasource.url=jdbc:mysql://db:3306/myapp',
        note: 'Docker Compose의 서비스명 사용',
        recommended: true
      },
      {
        method: '컨테이너명 사용',
        code: 'spring.datasource.url=jdbc:mysql://mysql-container:3306/myapp',
        note: 'docker run --name으로 지정한 이름'
      },
      {
        method: 'host.docker.internal',
        code: 'spring.datasource.url=jdbc:mysql://host.docker.internal:3306/myapp',
        note: '호스트 머신의 서비스에 접근할 때 (Mac/Windows)'
      }
    ]
  },
  commonMistakes: [
    {
      wrong: 'localhost:3306',
      right: 'db:3306',
      desc: 'DB 연결'
    },
    {
      wrong: 'localhost:6379',
      right: 'redis:6379',
      desc: 'Redis 연결'
    },
    {
      wrong: '127.0.0.1:8080',
      right: 'api-server:8080',
      desc: 'API 서버 호출'
    }
  ],
  specialCases: {
    title: '특수한 경우',
    cases: [
      {
        case: '호스트의 DB에 접근하고 싶을 때',
        solution: 'host.docker.internal:3306 (Mac/Windows)',
        linuxNote: 'Linux: --add-host=host.docker.internal:host-gateway'
      },
      {
        case: '다른 Compose 프로젝트의 서비스에 접근',
        solution: '외부 네트워크 연결 또는 포트 매핑 사용'
      }
    ]
  }
};

// 네트워크 명령어 데이터
export const NETWORK_COMMANDS_DATA = {
  title: '네트워크 명령어',
  subtitle: '자주 사용하는 Docker 네트워크 명령어',
  categories: [
    {
      category: '네트워크 관리',
      commands: [
        {
          cmd: 'docker network ls',
          desc: '네트워크 목록 보기',
          icon: '📋',
          output: `NETWORK ID     NAME      DRIVER    SCOPE
a1b2c3d4e5f6   bridge    bridge    local
b2c3d4e5f6a1   host      host      local
c3d4e5f6a1b2   none      null      local`
        },
        {
          cmd: 'docker network create mynet',
          desc: '새 네트워크 생성',
          icon: '➕',
          note: '기본 bridge 드라이버로 생성'
        },
        {
          cmd: 'docker network create -d bridge --subnet 172.20.0.0/16 mynet',
          desc: '서브넷 지정하여 생성',
          icon: '🔧'
        },
        {
          cmd: 'docker network rm mynet',
          desc: '네트워크 삭제',
          icon: '🗑️',
          warning: '연결된 컨테이너가 없어야 삭제 가능'
        }
      ]
    },
    {
      category: '네트워크 연결',
      commands: [
        {
          cmd: 'docker run --network mynet nginx',
          desc: '컨테이너 시작 시 네트워크 지정',
          icon: '🚀'
        },
        {
          cmd: 'docker network connect mynet container1',
          desc: '실행 중인 컨테이너를 네트워크에 연결',
          icon: '🔗'
        },
        {
          cmd: 'docker network disconnect mynet container1',
          desc: '컨테이너를 네트워크에서 분리',
          icon: '✂️'
        }
      ]
    },
    {
      category: '네트워크 정보 확인',
      commands: [
        {
          cmd: 'docker network inspect mynet',
          desc: '네트워크 상세 정보',
          icon: '🔍',
          shows: ['서브넷', '게이트웨이', '연결된 컨테이너', 'IP 주소']
        },
        {
          cmd: 'docker inspect --format=\'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\' container1',
          desc: '컨테이너 IP 주소 확인',
          icon: '📍'
        },
        {
          cmd: 'docker network prune',
          desc: '사용하지 않는 네트워크 정리',
          icon: '🧹'
        }
      ]
    },
    {
      category: '디버깅',
      commands: [
        {
          cmd: 'docker exec container1 ping db',
          desc: '컨테이너 간 연결 테스트',
          icon: '🏓'
        },
        {
          cmd: 'docker exec container1 nslookup db',
          desc: 'DNS 조회 테스트',
          icon: '🔎'
        },
        {
          cmd: 'docker exec container1 curl http://api:8080/health',
          desc: 'HTTP 연결 테스트',
          icon: '🌐'
        }
      ]
    }
  ],
  troubleshooting: {
    title: '네트워크 문제 해결',
    issues: [
      {
        error: 'Connection refused',
        causes: ['서비스가 아직 시작 안 됨', '잘못된 포트', '다른 네트워크'],
        solutions: ['healthcheck 사용', '포트 확인', '같은 네트워크인지 확인']
      },
      {
        error: 'Name resolution failed',
        causes: ['잘못된 서비스명', '다른 네트워크'],
        solutions: ['docker network inspect로 확인', '서비스명 철자 확인']
      },
      {
        error: 'Port already in use',
        causes: ['호스트 포트 충돌'],
        solutions: ['lsof -i :포트번호', '다른 포트 사용']
      }
    ]
  }
};
