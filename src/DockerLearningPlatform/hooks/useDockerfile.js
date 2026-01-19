/**
 * =============================================================================
 * Role: Dockerfile Section State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put UI components here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing layer selection behavior
 * - Adding layer detail animations
 *
 * STATE:
 * - dockerfileStep: Current layer index (0-based)
 *
 * ACTIONS:
 * - setDockerfileStep: Set layer directly
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { IMAGE_LAYERS_DETAIL } from '../constants';

export const useDockerfile = (initialStep = 0) => {
  const [dockerfileStep, setDockerfileStep] = useState(initialStep);
  const totalLayers = IMAGE_LAYERS_DETAIL.length;

  const handleStepChange = useCallback((index) => {
    if (index >= 0 && index < totalLayers) {
      setDockerfileStep(index);
    }
  }, [totalLayers]);

  const currentLayer = IMAGE_LAYERS_DETAIL[dockerfileStep];

  return {
    dockerfileStep,
    setDockerfileStep: handleStepChange,
    currentLayer,
    totalLayers,
    layers: IMAGE_LAYERS_DETAIL
  };
};
