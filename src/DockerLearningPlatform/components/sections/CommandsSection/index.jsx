/**
 * =============================================================================
 * Role: Commands Section Container (State Connection)
 * =============================================================================
 *
 * DO NOT put rendering logic here (use View)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing command learning mode behavior
 * - Adding workflow integration
 *
 * RESPONSIBILITIES:
 * - Connect command and workflow hooks
 * - Manage mode switching
 * =============================================================================
 */

import React from 'react';
import { useCommands, useWorkflow } from '../../../hooks';
import { CommandsView } from './CommandsView';

export const CommandsSection = () => {
  const commandsHook = useCommands();
  const workflowHook = useWorkflow();

  return (
    <CommandsView
      // Command Learn Mode
      cmdMode={commandsHook.cmdMode}
      setCmdMode={commandsHook.setCmdMode}
      cmdCategory={commandsHook.cmdCategory}
      setCmdCategory={commandsHook.setCmdCategory}
      cmdIndex={commandsHook.cmdIndex}
      setCmdIndex={commandsHook.setCmdIndex}
      terminalInput={commandsHook.terminalInput}
      setTerminalInput={commandsHook.setTerminalInput}
      terminalHistory={commandsHook.terminalHistory}
      terminalRef={commandsHook.terminalRef}
      handleTerminalSubmit={commandsHook.handleTerminalSubmit}
      currentCommand={commandsHook.currentCommand}
      categories={commandsHook.categories}
      // Workflow Mode
      workflowStep={workflowHook.workflowStep}
      workflowTerminalHistory={workflowHook.workflowTerminalHistory}
      workflowInput={workflowHook.workflowInput}
      setWorkflowInput={workflowHook.setWorkflowInput}
      workflowTerminalRef={workflowHook.workflowTerminalRef}
      handleWorkflowSubmit={workflowHook.handleWorkflowSubmit}
      resetWorkflow={workflowHook.resetWorkflow}
      currentStep={workflowHook.currentStep}
      totalWorkflowSteps={workflowHook.totalSteps}
      workflowSteps={workflowHook.steps}
    />
  );
};
