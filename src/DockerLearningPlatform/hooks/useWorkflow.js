/**
 * =============================================================================
 * Role: Workflow Section State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put UI components here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing workflow step progression
 * - Adding workflow validation logic
 * - Modifying step completion behavior
 *
 * STATE:
 * - workflowStep: Current step index
 * - workflowTerminalHistory: Terminal entries
 * - workflowInput: Current input value
 *
 * ACTIONS:
 * - handleWorkflowSubmit: Process workflow input
 * - resetWorkflow: Reset to beginning
 * =============================================================================
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { WORKFLOW_STEPS } from '../constants';

export const useWorkflow = () => {
  const [workflowStep, setWorkflowStep] = useState(0);
  const [workflowTerminalHistory, setWorkflowTerminalHistory] = useState([]);
  const [workflowInput, setWorkflowInput] = useState('');
  const workflowTerminalRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (workflowTerminalRef.current) {
      workflowTerminalRef.current.scrollTop = workflowTerminalRef.current.scrollHeight;
    }
  }, [workflowTerminalHistory]);

  const handleWorkflowSubmit = useCallback((e) => {
    if (e.key !== 'Enter' || !workflowInput.trim()) return;

    const expected = WORKFLOW_STEPS[workflowStep];
    
    // 정규화 함수: 연속 공백 제거, 앞뒤 공백 제거
    const normalize = (str) => str.trim().replace(/\s+/g, ' ');
    
    const inputNorm = normalize(workflowInput);
    const expectedNorm = normalize(expected.cmd);
    
    let isCorrect = inputNorm === expectedNorm;

    // docker run, docker build 명령어에 한해 옵션 순서 유연성 허용
    if (!isCorrect && (expectedNorm.startsWith('docker run') || expectedNorm.startsWith('docker build'))) {
        const inputParts = inputNorm.split(' ').sort();
        const expectedParts = expectedNorm.split(' ').sort();
        
        if (inputParts.length === expectedParts.length && 
            inputParts.every((val, index) => val === expectedParts[index])) {
            isCorrect = true;
        }
    }

    setWorkflowTerminalHistory((prev) => [
      ...prev,
      {
        input: workflowInput,
        isCorrect,
        output: isCorrect ? expected.output : `❌ 틀렸습니다.\n정답: ${expected.cmd}`,
        stepIndex: workflowStep  // 해당 스텝 번호 저장
      }
    ]);
    setWorkflowInput('');

    if (isCorrect && workflowStep < WORKFLOW_STEPS.length - 1) {
      setTimeout(() => setWorkflowStep((prev) => prev + 1), 1000);
    }
  }, [workflowInput, workflowStep]);

  const resetWorkflow = useCallback(() => {
    setWorkflowStep(0);
    setWorkflowTerminalHistory([]);
    setWorkflowInput('');
  }, []);

  const currentStep = WORKFLOW_STEPS[workflowStep];
  const isComplete = workflowStep === WORKFLOW_STEPS.length - 1 &&
    workflowTerminalHistory.length > 0 &&
    workflowTerminalHistory[workflowTerminalHistory.length - 1]?.isCorrect;

  return {
    // State
    workflowStep,
    workflowTerminalHistory,
    workflowInput,
    workflowTerminalRef,
    currentStep,
    totalSteps: WORKFLOW_STEPS.length,
    steps: WORKFLOW_STEPS,
    isComplete,

    // Actions
    setWorkflowInput,
    handleWorkflowSubmit,
    resetWorkflow
  };
};
