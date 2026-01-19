/**
 * =============================================================================
 * Role: Shared Style Constants
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put component-specific styles here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing global color scheme
 * - Updating common padding/margin values
 * - Adding new shared style patterns
 *
 * STRUCTURE:
 * - COLORS: Color palette
 * - SPACING: Padding/margin values
 * - COMMON_STYLES: Reusable style objects
 * =============================================================================
 */

export const COLORS = {
  // Primary
  primary: '#00d4ff',
  primaryDark: '#0066ff',
  accent: '#9933ff',

  // Status
  success: '#22c55e',
  successLight: '#86efac',
  warning: '#fbbf24',
  warningLight: '#fef3c7',
  error: '#ef4444',
  errorLight: '#fca5a5',

  // Grays
  text: '#fff',
  textMuted: '#94a3b8',
  textDark: '#8892a0',
  border: 'rgba(255,255,255,0.1)',
  borderLight: 'rgba(255,255,255,0.05)',

  // Backgrounds
  bgPrimary: '#0a0a1a',
  bgSecondary: '#1a1a3e',
  bgCard: 'rgba(255,255,255,0.03)',
  bgTerminal: '#0d1117',

  // Section Colors
  whyDocker: '#00d4ff',
  concepts: '#00d4ff',
  vmDocker: '#f472b6',
  dockerfile: '#a78bfa',
  commands: '#22d3ee',
  network: '#f59e0b',
  compose: '#f472b6'
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
};

export const BORDER_RADIUS = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  full: '50%'
};

export const COMMON_STYLES = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',
    color: '#fff',
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, sans-serif',
    padding: '16px'
  },

  backgroundOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 30%, rgba(0, 150, 255, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(120, 60, 200, 0.08) 0%, transparent 40%)`,
    pointerEvents: 'none'
  },

  sectionCard: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  },

  terminalWindow: {
    background: '#0d1117',
    borderRadius: '16px',
    padding: '16px',
    fontFamily: '"JetBrains Mono", monospace'
  },

  terminalDots: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  },

  terminalDot: (color) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: color
  }),

  codeBlock: {
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '12px',
    fontFamily: 'monospace'
  },

  infoCard: (color) => ({
    padding: '16px',
    background: `${color}15`,
    borderRadius: '12px',
    border: `1px solid ${color}40`
  }),

  button: {
    padding: '10px 16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },

  buttonActive: {
    border: '2px solid #00d4ff',
    background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(100,50,200,0.2))',
    color: '#fff'
  },

  buttonInactive: {
    border: '2px solid transparent',
    background: 'rgba(255,255,255,0.05)',
    color: '#8892a0'
  }
};

export const GLOBAL_CSS = `
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  * { scrollbar-width: thin; scrollbar-color: #374151 transparent; }
`;
