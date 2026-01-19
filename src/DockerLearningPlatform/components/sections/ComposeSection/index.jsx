/**
 * =============================================================================
 * Role: Compose Section Container (State Connection)
 * =============================================================================
 *
 * DO NOT put rendering logic here (use View)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Adding compose file editing
 * - Adding live preview
 *
 * RESPONSIBILITIES:
 * - Connect hooks to View
 * - Transform data for View
 * =============================================================================
 */

import React from 'react';
import { useCompose } from '../../../hooks';
import { ComposeView } from './ComposeView';

export const ComposeSection = () => {
  const { composeSection, setComposeSection, sectionLabels } = useCompose();

  return (
    <ComposeView
      composeSection={composeSection}
      setComposeSection={setComposeSection}
      sectionLabels={sectionLabels}
    />
  );
};
