/**
 * =============================================================================
 * Role: VM vs Docker Section Container (State Connection)
 * =============================================================================
 *
 * DO NOT put rendering logic here (use View)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing simulation behavior
 * - Adding new interactions
 *
 * RESPONSIBILITIES:
 * - Connect hooks to View
 * - Handle simulation lifecycle
 * =============================================================================
 */

import React from 'react';
import { useVmSimulation } from '../../../hooks';
import { VmDockerView } from './VmDockerView';

export const VmDockerSection = () => {
  const {
    vmSimulation,
    showCostDetail,
    runVmSimulation,
    toggleCostDetail
  } = useVmSimulation();

  return (
    <VmDockerView
      vmSimulation={vmSimulation}
      showCostDetail={showCostDetail}
      onRunSimulation={runVmSimulation}
      onToggleCostDetail={toggleCostDetail}
    />
  );
};
