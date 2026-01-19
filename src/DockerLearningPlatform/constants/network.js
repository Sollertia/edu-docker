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

export const NETWORK_SERVICES = [
  { icon: '🍃', name: 'app', port: '8080', color: '#22c55e', external: true },
  { icon: '🐬', name: 'db', port: '3306', color: '#0284c7', external: false },
  { icon: '⚡', name: 'redis', port: '6379', color: '#dc2626', external: false }
];

export const NETWORK_FEATURES = [
  {
    title: '✅ 서비스명 = 호스트명',
    desc: 'IP 대신 db로 접속',
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
