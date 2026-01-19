/**
 * =============================================================================
 * Role: VM vs Docker Simulation State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put UI components here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing simulation timing
 * - Adding new simulation stages
 * - Modifying animation behavior
 *
 * STATE:
 * - vmSimulation: { running, elapsed, vms, containers }
 * - showCostDetail: Boolean for cost table visibility
 *
 * ACTIONS:
 * - runVmSimulation: Start the simulation
 * - toggleCostDetail: Toggle cost table
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { SIMULATION_STAGES, SIMULATION_CONFIG } from '../constants';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const INITIAL_STATE = {
  running: false,
  elapsed: 0,
  vms: [],
  containers: []
};

export const useVmSimulation = () => {
  const [vmSimulation, setVmSimulation] = useState(INITIAL_STATE);
  const [showCostDetail, setShowCostDetail] = useState(false);

  const runVmSimulation = useCallback(async () => {
    const { vmCount, containerCount, vmStageDelay, containerDelay, containerProgressDelay } = SIMULATION_CONFIG;

    setVmSimulation({ running: true, elapsed: 0, vms: [], containers: [] });

    const interval = setInterval(() => {
      setVmSimulation((prev) => ({ ...prev, elapsed: prev.elapsed + 100 }));
    }, 100);

    // VM boot simulation
    for (let i = 0; i < vmCount; i++) {
      setVmSimulation((prev) => ({
        ...prev,
        vms: [...prev.vms, { id: i, progress: 0, stage: SIMULATION_STAGES[0] }]
      }));

      for (let s = 0; s < SIMULATION_STAGES.length; s++) {
        await sleep(vmStageDelay);
        setVmSimulation((prev) => ({
          ...prev,
          vms: prev.vms.map((vm) =>
            vm.id === i
              ? { ...vm, progress: (s + 1) * (100 / SIMULATION_STAGES.length), stage: SIMULATION_STAGES[s] }
              : vm
          )
        }));
      }
    }

    // Container start simulation
    for (let i = 0; i < containerCount; i++) {
      setVmSimulation((prev) => ({
        ...prev,
        containers: [...prev.containers, { id: i, progress: 0 }]
      }));
      await sleep(containerDelay);
      setVmSimulation((prev) => ({
        ...prev,
        containers: prev.containers.map((c) => (c.id === i ? { ...c, progress: 50 } : c))
      }));
      await sleep(containerProgressDelay);
      setVmSimulation((prev) => ({
        ...prev,
        containers: prev.containers.map((c) => (c.id === i ? { ...c, progress: 100 } : c))
      }));
    }

    clearInterval(interval);
    setVmSimulation((prev) => ({ ...prev, running: false }));
  }, []);

  const toggleCostDetail = useCallback(() => {
    setShowCostDetail((prev) => !prev);
  }, []);

  return {
    vmSimulation,
    showCostDetail,
    runVmSimulation,
    toggleCostDetail
  };
};
