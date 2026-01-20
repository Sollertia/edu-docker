/**
 * =============================================================================
 * Role: Tab Configuration Data
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put event handlers here
 *
 * MODIFY THIS FILE WHEN:
 * - Adding a new tab to the navigation
 * - Changing tab order
 * - Updating tab labels or icons
 *
 * STRUCTURE:
 * - Each tab has: id (unique key), emoji (icon), label (display text)
 * - Tab order in array = display order in UI
 * =============================================================================
 */

export const TABS = [
  { id: 'why', emoji: '❓', label: 'Why Docker?' },
  { id: 'vmvsdocker', emoji: '⚡', label: 'VM vs Docker' },
  { id: 'concept', emoji: '💡', label: '핵심 개념' },
  { id: 'dockerfile', emoji: '📝', label: 'Dockerfile' },
  { id: 'commands', emoji: '💻', label: '명령어 실습' },
  { id: 'network', emoji: '🔌', label: '네트워크' },
  { id: 'compose', emoji: '🎼', label: 'Compose' },
];

export const DEFAULT_TAB = 'why';

/**
 * Tab ID to Component mapping guide (for AI reference):
 * - 'why'        -> WhyDockerSection
 * - 'concept'    -> ConceptsSection
 * - 'vmvsdocker' -> VmDockerSection
 * - 'dockerfile' -> DockerfileSection
 * - 'commands'   -> CommandsSection
 * - 'network'    -> NetworkSection
 * - 'compose'    -> ComposeSection
 */
