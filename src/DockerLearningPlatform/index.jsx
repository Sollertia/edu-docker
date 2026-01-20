/**
 * =============================================================================
 * Role: Main Page Component (Orchestration)
 * =============================================================================
 *
 * This is the entry point for the Docker Learning Platform.
 * It orchestrates tab navigation and renders the appropriate section.
 *
 * DO NOT put section-specific rendering here (use Section components)
 * DO NOT put section-specific state here (use hooks)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Adding a new tab/section (update TAB_COMPONENT_MAP)
 * - Changing overall page layout
 * - Updating header/navigation structure
 *
 * RESPONSIBILITIES:
 * - Tab navigation coordination
 * - Section component switching
 * - Global layout and styling
 * =============================================================================
 */

import React from 'react';
import { useTabNavigation } from './hooks';
import { TABS, COMMON_STYLES, GLOBAL_CSS } from './constants';
import {
  WhyDockerSection,
  ConceptsSection,
  VmDockerSection,
  DockerfileSection,
  CommandsSection,
  NetworkSection,
  ComposeSection
} from './components/sections';

// ============================================================================
// Tab to Component Mapping
// ============================================================================
// To add a new section:
// 1. Add tab config in constants/tabs.js
// 2. Create section component in components/sections/
// 3. Add mapping here

const TAB_COMPONENT_MAP = {
  why: WhyDockerSection,
  concept: ConceptsSection,
  vmvsdocker: VmDockerSection,
  dockerfile: DockerfileSection,
  commands: CommandsSection,
  network: NetworkSection,
  compose: ComposeSection
};

// ============================================================================
// Sub-components
// ============================================================================

const GlobalStyle = () => (
  <style>{GLOBAL_CSS}</style>
);

const BackgroundOverlay = () => (
  <div style={COMMON_STYLES.backgroundOverlay} />
);

const Header = ({ activeTab, onTabChange }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '24px'
  }}>
    {TABS.map(tab => (
      <TabButton
        key={tab.id}
        tab={tab}
        isActive={activeTab === tab.id}
        onClick={() => onTabChange(tab.id)}
      />
    ))}
  </div>
);

const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 20px',
      borderRadius: '14px',
      border: isActive ? '2px solid #00d4ff' : '2px solid transparent',
      background: isActive
        ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(100,50,200,0.2))'
        : 'rgba(255,255,255,0.05)',
      color: isActive ? '#fff' : '#8892a0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
  >
    <span style={{ fontSize: '1.1rem' }}>{tab.emoji}</span>
    <span>{tab.label}</span>
  </button>
);

const PageTitle = () => (
  <h1 style={{
    textAlign: 'center',
    marginBottom: '24px',
    background: 'linear-gradient(135deg, #00d4ff, #9933ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '2.5rem',
    fontWeight: '800'
  }}>
    Docker 완전 정복
  </h1>
);

const ContentArea = ({ activeTab }) => {
  const SectionComponent = TAB_COMPONENT_MAP[activeTab];

  if (!SectionComponent) {
    return (
      <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
        섹션을 찾을 수 없습니다.
      </div>
    );
  }

  return <SectionComponent />;
};

const Footer = () => (
  <footer style={{
    marginTop: '60px',
    padding: '32px 20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center'
  }}>
    <p style={{
      color: '#64748b',
      fontSize: '0.9rem',
      margin: '0 0 4px 0'
    }}>
      © 2026 내일배움캠프 Spring 커머스. All rights reserved.
    </p>
    <p style={{
      color: '#64748b',
      fontSize: '0.9rem',
      margin: 0
    }}>
        Created for educational purposes by Robbie (최원빈)
    </p>
  </footer>
);

// ============================================================================
// Main Component
// ============================================================================

const DockerLearningPlatform = () => {
  const { activeTab, setActiveTab } = useTabNavigation();

  return (
    <div style={COMMON_STYLES.pageContainer}>
      <GlobalStyle />
      <BackgroundOverlay />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        <PageTitle />
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <ContentArea activeTab={activeTab} />
        <Footer />
      </div>
    </div>
  );
};

export default DockerLearningPlatform;
