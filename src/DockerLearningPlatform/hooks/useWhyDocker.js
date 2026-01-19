/**
 * =============================================================================
 * Role: Why Docker Section State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put UI components here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing step navigation logic
 * - Adding animation states
 * - Adding auto-play functionality
 *
 * STATE:
 * - whyStep: Current step index (0-based)
 *
 * ACTIONS:
 * - setWhyStep: Set step directly
 * - nextStep: Go to next step
 * - prevStep: Go to previous step
 * - isFirstStep: Check if at first step
 * - isLastStep: Check if at last step
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { WHY_DOCKER_STEPS } from '../constants';

export const useWhyDocker = (initialStep = 0) => {
  const [whyStep, setWhyStep] = useState(initialStep);
  const totalSteps = WHY_DOCKER_STEPS.length;

  const nextStep = useCallback(() => {
    setWhyStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setWhyStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const isFirstStep = whyStep === 0;
  const isLastStep = whyStep === totalSteps - 1;

  return {
    whyStep,
    setWhyStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    totalSteps
  };
};
