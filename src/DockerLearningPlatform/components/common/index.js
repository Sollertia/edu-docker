/**
 * =============================================================================
 * Role: Common Components Barrel Export
 * =============================================================================
 *
 * This file re-exports all common components for convenient importing.
 *
 * IMPORT PATTERN:
 * import { Terminal, SectionCard, InfoCard } from '../common';
 *
 * DO NOT put any logic here - only export statements
 * =============================================================================
 */

export { SectionNav } from './SectionNav';
export { Terminal } from './Terminal';
export { CodeBlock, InlineCode } from './CodeBlock';
export { SectionCard, GridLayout, FlexCenter } from './SectionCard';
export { StepProgress, ProgressBar } from './StepProgress';
export {
  InfoCard,
  SuccessCard,
  WarningCard,
  ErrorCard,
  PrimaryCard,
  AccentCard
} from './InfoCard';
