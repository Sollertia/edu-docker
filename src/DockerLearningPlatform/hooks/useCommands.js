/**
 * =============================================================================
 * Role: Commands Section State Management
 * =============================================================================
 *
 * DO NOT put rendering logic here
 * DO NOT put UI components here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing command learning mode behavior
 * - Adding command validation logic
 * - Modifying terminal history management
 *
 * STATE:
 * - cmdMode: 'learn' | 'workflow'
 * - cmdCategory: Current category index
 * - cmdIndex: Current command index within category
 * - terminalInput: Current terminal input value
 * - terminalHistory: Array of terminal entries
 *
 * ACTIONS:
 * - setCmdMode: Switch between learn/workflow mode
 * - setCmdCategory: Change category
 * - setCmdIndex: Change command
 * - handleTerminalSubmit: Process terminal input
 * - clearTerminalHistory: Clear terminal
 * =============================================================================
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { COMMAND_CATEGORIES } from '../constants';

export const useCommands = () => {
  const [cmdMode, setCmdMode] = useState('learn');
  const [cmdCategory, setCmdCategory] = useState(0);
  const [cmdIndex, setCmdIndex] = useState(0);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const terminalRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCategoryChange = useCallback((index) => {
    setCmdCategory(index);
    setCmdIndex(0);
    setTerminalHistory([]);
  }, []);

  const handleTerminalSubmit = useCallback((e) => {
    if (e.key !== 'Enter' || !terminalInput.trim()) return;

    const expected = COMMAND_CATEGORIES[cmdCategory].commands[cmdIndex];
    const isCorrect = terminalInput.trim() === expected.cmd;

    setTerminalHistory((prev) => [
      ...prev,
      {
        input: terminalInput,
        isCorrect,
        output: isCorrect
          ? expected.output
          : `❌ 틀렸습니다.\n힌트: ${expected.cmd.substring(0, 40)}...`
      }
    ]);
    setTerminalInput('');
  }, [terminalInput, cmdCategory, cmdIndex]);

  const clearTerminalHistory = useCallback(() => {
    setTerminalHistory([]);
  }, []);

  const currentCategory = COMMAND_CATEGORIES[cmdCategory];
  const currentCommand = currentCategory?.commands[cmdIndex];

  return {
    // State
    cmdMode,
    cmdCategory,
    cmdIndex,
    terminalInput,
    terminalHistory,
    terminalRef,
    currentCategory,
    currentCommand,
    categories: COMMAND_CATEGORIES,

    // Actions
    setCmdMode,
    setCmdCategory: handleCategoryChange,
    setCmdIndex,
    setTerminalInput,
    handleTerminalSubmit,
    clearTerminalHistory
  };
};
