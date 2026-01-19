/**
 * =============================================================================
 * Role: Concepts Section Container (State Connection)
 * =============================================================================
 *
 * DO NOT put rendering logic here (use View)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing state management approach
 * - Adding new interactions
 *
 * RESPONSIBILITIES:
 * - Connect hooks to View
 * - Transform data for View
 * =============================================================================
 */

import React from 'react';
import { useConcepts } from '../../../hooks';
import { ConceptsView } from './ConceptsView';

export const ConceptsSection = () => {
  const { conceptSection, setConceptSection, sectionLabels } = useConcepts();

  return (
    <ConceptsView
      conceptSection={conceptSection}
      setConceptSection={setConceptSection}
      sectionLabels={sectionLabels}
    />
  );
};
