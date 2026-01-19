/**
 * =============================================================================
 * Role: Why Docker Section Container (State Connection)
 * =============================================================================
 *
 * DO NOT put rendering logic here (use View)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing state management approach
 * - Adding new interactions
 * - Connecting to external data sources
 *
 * RESPONSIBILITIES:
 * - Connect hooks to View
 * - Transform data for View
 * - Handle side effects
 * =============================================================================
 */

import React from 'react';
import { useWhyDocker } from '../../../hooks';
import { WHY_DOCKER_STEPS } from '../../../constants';
import { WhyDockerView } from './WhyDockerView';

export const WhyDockerSection = () => {
  const {
    whyStep,
    setWhyStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    totalSteps
  } = useWhyDocker();

  return (
    <WhyDockerView
      whyStep={whyStep}
      setWhyStep={setWhyStep}
      onNext={nextStep}
      onPrev={prevStep}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      totalSteps={totalSteps}
      steps={WHY_DOCKER_STEPS}
    />
  );
};
