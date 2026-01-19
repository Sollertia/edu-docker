/**
 * =============================================================================
 * Role: Core Concepts Section State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put UI components here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing section navigation logic
 * - Adding concept-specific interactions
 *
 * STATE:
 * - conceptSection: Current section index (0-based)
 *
 * ACTIONS:
 * - setConceptSection: Set section directly
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { CONCEPT_SECTIONS } from '../constants';

export const useConcepts = (initialSection = 0) => {
  const [conceptSection, setConceptSection] = useState(initialSection);
  const totalSections = CONCEPT_SECTIONS.length;

  const handleSectionChange = useCallback((index) => {
    if (index >= 0 && index < totalSections) {
      setConceptSection(index);
    }
  }, [totalSections]);

  return {
    conceptSection,
    setConceptSection: handleSectionChange,
    totalSections,
    sectionLabels: CONCEPT_SECTIONS
  };
};
