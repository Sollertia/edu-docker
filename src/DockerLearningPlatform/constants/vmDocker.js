/**
 * =============================================================================
 * Role: VM vs Docker Comparison Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Updating VM/Docker comparison data
 * - Adding new comparison metrics
 * - Changing cost analysis values
 *
 * STRUCTURE:
 * - VM_ANALOGY_*: Data for house/apartment analogy
 * - COST_COMPARISON: Performance comparison table data
 * - SIMULATION_STAGES: VM boot stages for simulation
 * =============================================================================
 */

export const VM_ANALOGY = {
  vm: {
    emoji: '🏠',
    title: 'VM = 단독주택',
    layers: [
      { label: '🏃 내 애플리케이션', bg: '#be185d', bold: false },
      { label: '📚 내 전용 라이브러리', bg: '#9d174d', bold: false },
      { label: '💿 내 전용 OS (Ubuntu/Windows)', bg: '#831843', bold: true },
      { label: '🔌 내 전용 전기/수도/가스', bg: '#500724', bold: false },
      { label: '🏗️ 내 땅, 내 기초공사', bg: '#3f0520', bold: false }
    ],
    points: [
      { title: '🏗️ 짓는 데 오래 걸림', desc: '땅부터 시작 → 기초공사 → 건물 → 입주' },
      { title: '💰 유지비가 비쌈', desc: '전기/수도/가스 다 개별 납부' },
      { title: '📦 공간 낭비', desc: '혼자 살아도 큰 집 전체 관리 필요' }
    ]
  },
  docker: {
    emoji: '🏢',
    title: 'Docker = 아파트',
    apps: ['App1', 'App2', 'App3'],
    appColors: ['#0891b2', '#0e7490', '#155e75'],
    points: [
      { title: '⚡ 입주가 빠름', desc: '건물은 이미 있음 → 방만 배정받으면 끝!' },
      { title: '💰 관리비 저렴', desc: '공용시설 함께 사용 → 비용 분담' },
      { title: '📦 공간 효율적', desc: '필요한 만큼만 사용' }
    ]
  }
};

export const KEY_DIFFERENCE = {
  vm: { title: 'VM (단독주택)', desc: '집마다 OS 전체를 따로 설치' },
  docker: { title: 'Docker (아파트)', desc: 'OS 커널을 공유하고 방만 분리' }
};

export const KITCHEN_ANALOGY = {
  vm: {
    title: 'VM',
    desc: '요리할 때마다 주방 전체를 새로 짓는 것',
    note: '싱크대, 가스레인지, 냉장고 전부 새로!'
  },
  docker: {
    title: 'Docker',
    desc: '공유 주방에서 내 재료만 가져와 요리',
    note: '주방 시설은 공유, 레시피(이미지)만 내 것!'
  }
};

export const COST_COMPARISON = [
  { item: '시작 시간', vm: '30-60초', docker: '1-3초', save: '~95%' },
  { item: '메모리', vm: '2-4GB', docker: '200-500MB', save: '~85%' },
  { item: '디스크', vm: '20-50GB', docker: '100-500MB', save: '~95%' },
  { item: 'OS 라이선스', vm: '필요', docker: '불필요', save: '100%' }
];

export const SIMULATION_STAGES = ['BIOS', '부트로더', 'OS커널', '서비스', '앱시작', '완료'];

export const SIMULATION_CONFIG = {
  vmCount: 3,
  containerCount: 6,
  vmStageDelay: 400,
  containerDelay: 80,
  containerProgressDelay: 120
};

// ============================================================================
// 가상화 역사 (비유와 함께)
// ============================================================================

export const VIRTUALIZATION_HISTORY = {
  title: '서버 기술의 진화',
  subtitle: '물리 서버 → VM → 컨테이너, 왜 이렇게 발전했을까?',
  analogy: {
    icon: '🚗',
    title: '자동차 공유의 진화로 이해하기',
    description: '서버 기술의 발전은 자동차 이용 방식의 변화와 비슷합니다'
  },
  eras: [
    {
      id: 'physical',
      era: '2000년대 이전',
      title: '물리 서버 시대',
      icon: '🖥️',
      color: '#64748b',
      analogy: {
        emoji: '🚗',
        title: '자가용 구매',
        desc: '앱 하나당 차 한 대 구매'
      },
      problem: '서버 1대 = 앱 1개',
      issues: [
        '서버 비용이 수천만원',
        '평균 사용률 10~15% (낭비)',
        '새 앱 = 새 서버 구매 (몇 주 소요)',
        '서버실 공간, 전기, 냉각 비용'
      ],
      realWorld: '넷플릭스 초기: 서버 1000대로 시작 → 확장 한계'
    },
    {
      id: 'vm',
      era: '2000년대',
      title: 'VM(가상화) 시대',
      icon: '🏠',
      color: '#8b5cf6',
      analogy: {
        emoji: '🚐',
        title: '렌터카',
        desc: '필요할 때 차를 빌림'
      },
      solution: '서버 1대에 여러 VM',
      benefits: [
        '하드웨어 효율 향상 (60~70%)',
        '서버 구매 없이 VM 생성',
        'AWS, Azure 등 클라우드 탄생'
      ],
      remaining: [
        'Guest OS마다 수 GB 메모리',
        'VM 부팅에 1~2분 소요',
        '같은 OS를 여러 번 설치 (낭비)'
      ],
      realWorld: 'AWS EC2 (2006): VM을 분 단위로 빌리는 시대'
    },
    {
      id: 'container',
      era: '2013년~',
      title: '컨테이너 시대',
      icon: '🐳',
      color: '#0ea5e9',
      analogy: {
        emoji: '🛴',
        title: '공유 킥보드',
        desc: '앱 써서 바로 타고, 바로 반납'
      },
      solution: 'OS 커널 공유, 프로세스만 격리',
      benefits: [
        '시작 시간 1~3초',
        '메모리 수백 MB',
        '같은 서버에 수십 개 실행 가능',
        '개발 환경 = 운영 환경'
      ],
      realWorld: 'Google: 매주 수십억 개 컨테이너 실행'
    }
  ],
  keyInsight: {
    title: '핵심 통찰',
    icon: '💡',
    points: [
      {
        question: '왜 Docker를 배우나요?',
        answer: '현대 서버 환경의 표준이 되었기 때문'
      },
      {
        question: 'VM은 이제 안 쓰나요?',
        answer: 'VM 위에서 컨테이너를 돌림 (클라우드 = VM + 컨테이너)'
      },
      {
        question: '취업에 왜 필요한가요?',
        answer: '많은 수의 회사가 컨테이너 기반 배포'
      }
    ]
  }
};

// ============================================================================
// 컨테이너가 가벼운 이유 (기술적 설명)
// ============================================================================

export const WHY_CONTAINER_LIGHT = {
  title: '컨테이너가 가벼운 진짜 이유',
  subtitle: 'VM과의 결정적 차이',
  comparison: {
    vm: {
      title: 'VM 구조',
      icon: '🏠',
      color: '#8b5cf6',
      layers: [
        { name: '내 앱 (Spring Boot)', color: '#22c55e', size: '~100MB', desc: '내가 만든 코드' },
        { name: '라이브러리 (Java, npm 등)', color: '#3b82f6', size: '~500MB', desc: '앱 실행에 필요한 도구들' },
        { name: 'Guest OS (Ubuntu 전체)', color: '#ef4444', size: '2~4GB', highlight: true, desc: '⚠️ VM마다 OS 전체 설치!' },
        { name: 'Hypervisor (VMware 등)', color: '#f59e0b', size: '', desc: 'VM을 만들어주는 프로그램' },
        { name: 'Host OS (내 컴퓨터 OS)', color: '#64748b', size: '', desc: '실제 컴퓨터의 OS' },
        { name: 'Hardware (CPU, RAM)', color: '#374151', size: '', desc: '실제 하드웨어' }
      ],
      problem: 'VM 3개 = Ubuntu 3번 설치 = 6~12GB 낭비!'
    },
    container: {
      title: 'Container 구조',
      icon: '🐳',
      color: '#0ea5e9',
      layers: [
        { name: '내 앱 (Spring Boot)', color: '#22c55e', size: '~100MB', desc: '내가 만든 코드' },
        { name: '라이브러리 (Java, npm 등)', color: '#3b82f6', size: '~500MB', desc: '앱 실행에 필요한 도구들' },
        { name: 'Docker Engine', color: '#0ea5e9', size: '', desc: '컨테이너를 관리하는 프로그램' },
        { name: 'Host OS 커널 (공유!)', color: '#64748b', size: '', highlight: true, desc: '✅ 모든 컨테이너가 함께 사용' },
        { name: 'Hardware (CPU, RAM)', color: '#374151', size: '', desc: '실제 하드웨어' }
      ],
      solution: '컨테이너 3개 = Guest OS 0개 = 용량 절약!'
    }
  },
  layerExplanation: {
    title: '각 층이 뭔가요?',
    items: [
      {
        term: '내 앱',
        emoji: '🍃',
        example: 'Spring Boot JAR 파일, Node.js 앱',
        desc: '내가 직접 작성한 코드'
      },
      {
        term: '라이브러리',
        emoji: '📚',
        example: 'Java JDK, Python, npm 패키지',
        desc: '앱을 실행하려면 필요한 도구들'
      },
      {
        term: 'Guest OS',
        emoji: '💿',
        example: 'Ubuntu, Windows (전체 설치)',
        desc: 'VM 안에서 돌아가는 "가상 컴퓨터의 OS"',
        warning: 'VM의 가장 큰 문제! 앱마다 OS 전체가 필요함'
      },
      {
        term: 'Host OS 커널',
        emoji: '🧠',
        example: 'Linux 커널 (OS의 핵심 부분만)',
        desc: '실제 컴퓨터의 OS 핵심만 공유해서 사용'
      }
    ]
  },
  kernelSharing: {
    title: '커널 공유란?',
    icon: '🧠',
    analogy: {
      title: '비유: 아파트 관리실',
      vm: '각 집마다 관리인이 따로 있음 (비효율)',
      container: '한 명의 관리인이 모든 집 관리 (효율적)'
    },
    explanation: [
      {
        term: '커널(Kernel)',
        desc: 'OS의 핵심 - CPU, 메모리, 디스크를 관리하는 "관리자"'
      },
      {
        term: 'VM 방식',
        desc: '앱마다 관리자(OS)를 따로 고용 → 인건비(메모리) 낭비'
      },
      {
        term: 'Container 방식',
        desc: '한 명의 관리자가 여러 앱 담당 → 효율적'
      }
    ]
  },
  isolation: {
    title: '그럼 어떻게 격리하나요?',
    icon: '🔒',
    subtitle: 'Linux의 두 가지 기술',
    technologies: [
      {
        name: 'Namespace',
        icon: '📦',
        color: '#8b5cf6',
        desc: '각 컨테이너에게 "자기만의 세상"을 보여줌',
        analogy: '아파트 호수 - 101호는 102호 내부를 볼 수 없음',
        types: ['프로세스 ID', '네트워크', '파일시스템', '사용자']
      },
      {
        name: 'cgroups',
        icon: '⚖️',
        color: '#f59e0b',
        desc: 'CPU, 메모리 사용량을 제한',
        analogy: '전기/수도 계량기 - 각 집의 사용량 관리',
        types: ['CPU 제한', '메모리 제한', '디스크 I/O', '네트워크 대역폭']
      }
    ],
    summary: {
      text: 'Docker = Namespace(격리) + cgroups(제한) + 이미지(패키징)',
      note: '이 기술들은 Linux 커널에 내장 → Docker는 이걸 쉽게 쓰게 해주는 도구'
    }
  }
};

// ============================================================================
// VM vs Docker 섹션 네비게이션
// ============================================================================

export const VM_DOCKER_SECTIONS = [
  '가상화 역사',
  'VM vs Docker',
  '왜 가벼운가?',
  '성능 비교'
];
