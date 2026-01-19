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
