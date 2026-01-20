/**
 * =============================================================================
 * Role: Constants Barrel Export
 * =============================================================================
 *
 * This file re-exports all constants for convenient importing.
 *
 * IMPORT PATTERN:
 * import { TABS, WHY_DOCKER_STEPS, COLORS } from './constants';
 *
 * DO NOT put any logic here - only export statements
 * =============================================================================
 */

// Tab Configuration
export { TABS, DEFAULT_TAB } from './tabs';

// Why Docker Section
export {
  WHY_DOCKER_STEPS,
  STEP_CONTENT_PROBLEM,
  STEP_CONTENT_CAUSE,
  STEP_CONTENT_SOLUTION,
  STEP_CONTENT_BENEFIT,
  STEP_CONTENT_WORKFLOW
} from './whyDocker';

// Core Concepts Section
export {
  CONCEPT_SECTIONS,
  CONCEPT_IMAGE_FEATURES,
  CONCEPT_CONTAINER_FEATURES,
  CONCEPT_ANALOGIES,
  CONCEPT_LAYER_STRUCTURE,
  CONCEPT_LAYER_BENEFITS,
  CONCEPT_LAYER_TIPS,
  CONCEPT_LIFECYCLE_STATES,
  CONCEPT_LIFECYCLE_TRANSITIONS,
  CONCEPT_STATE_DETAILS,
  CONCEPT_REGISTRY_EXAMPLES,
  CONCEPT_IMAGE_NAME_PARTS
} from './concepts';

// Image Layers / Dockerfile
export {
  IMAGE_LAYERS_DETAIL,
  getInstructionKeyword,
  getInstructionArgs,
  CMD_VS_ENTRYPOINT,
  DOCKERIGNORE_DATA,
  MULTISTAGE_BUILD_DATA,
  ENV_VS_ARG_DATA,
  TROUBLESHOOTING_DATA
} from './imageLayers';

// Commands
export { COMMAND_CATEGORIES } from './commands';

// Workflow
export { WORKFLOW_STEPS, WORKFLOW_STEP_NAMES } from './workflow';

// Compose
export {
  COMPOSE_SECTIONS,
  COMPOSE_BENEFITS,
  COMPOSE_FULL_EXAMPLE,
  COMPOSE_RESTART_POLICIES,
  COMPOSE_COMMANDS,
  COMPOSE_NETWORK_ISOLATION_EXAMPLE,
  COMPOSE_DEPENDS_ON_ORDER,
  COMPOSE_HEALTHCHECK
} from './compose';

// VM vs Docker
export {
  VM_ANALOGY,
  KEY_DIFFERENCE,
  KITCHEN_ANALOGY,
  COST_COMPARISON,
  SIMULATION_STAGES,
  SIMULATION_CONFIG
} from './vmDocker';

// Network
export {
  NETWORK_SERVICES,
  NETWORK_FEATURES,
  PORT_MAPPING_EXAMPLE
} from './network';

// Styles
export {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  COMMON_STYLES,
  GLOBAL_CSS
} from './styles';
