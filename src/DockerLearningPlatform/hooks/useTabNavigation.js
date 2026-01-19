/**
 * =============================================================================
 * Role: Tab Navigation State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put API calls here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing tab navigation behavior
 * - Adding tab persistence (localStorage, URL)
 * - Adding tab transition effects
 *
 * STATE:
 * - activeTab: Current active tab ID
 *
 * ACTIONS:
 * - setActiveTab: Change active tab
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { DEFAULT_TAB } from '../constants';

export const useTabNavigation = (initialTab = DEFAULT_TAB) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return {
    activeTab,
    setActiveTab: handleTabChange
  };
};
