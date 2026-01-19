/**
 * =============================================================================
 * Role: Compose Section State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put UI components here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing section navigation logic
 * - Adding compose-specific interactions
 *
 * STATE:
 * - composeSection: Current section index (0-based)
 *
 * ACTIONS:
 * - setComposeSection: Set section directly
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { COMPOSE_SECTIONS } from '../constants';

export const useCompose = (initialSection = 0) => {
  const [composeSection, setComposeSection] = useState(initialSection);
  const totalSections = COMPOSE_SECTIONS.length;

  const handleSectionChange = useCallback((index) => {
    if (index >= 0 && index < totalSections) {
      setComposeSection(index);
    }
  }, [totalSections]);

  return {
    composeSection,
    setComposeSection: handleSectionChange,
    totalSections,
    sectionLabels: COMPOSE_SECTIONS
  };
};
