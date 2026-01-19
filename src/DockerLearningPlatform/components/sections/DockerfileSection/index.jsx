/**
 * =============================================================================
 * Role: Dockerfile Section Container (State Connection)
 * =============================================================================
 *
 * DO NOT put rendering logic here (use View)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing layer selection behavior
 * - Adding new interactions
 *
 * RESPONSIBILITIES:
 * - Connect hooks to View
 * - Transform data for View
 * =============================================================================
 */

import React from 'react';
import { useDockerfile } from '../../../hooks';
import { DockerfileView } from './DockerfileView';

export const DockerfileSection = () => {
  const {
    dockerfileStep,
    setDockerfileStep,
    currentLayer,
    layers
  } = useDockerfile();

  return (
    <DockerfileView
      dockerfileStep={dockerfileStep}
      setDockerfileStep={setDockerfileStep}
      currentLayer={currentLayer}
      layers={layers}
    />
  );
};
