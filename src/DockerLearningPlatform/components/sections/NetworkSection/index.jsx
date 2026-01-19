/**
 * =============================================================================
 * Role: Network Section Container (State Connection)
 * =============================================================================
 *
 * DO NOT put rendering logic here (use View)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Adding interactive network diagrams
 * - Adding network simulation
 *
 * RESPONSIBILITIES:
 * - Connect to View (currently stateless)
 * =============================================================================
 */

import React from 'react';
import { NetworkView } from './NetworkView';

export const NetworkSection = () => {
  // Currently stateless - add hooks here if interactivity is needed
  return <NetworkView />;
};
