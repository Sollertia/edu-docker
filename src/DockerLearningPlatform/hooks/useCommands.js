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
    
    // 정규화 함수: 연속 공백 제거, 앞뒤 공백 제거
    const normalize = (str) => str.trim().replace(/\s+/g, ' ');
    
    const inputNorm = normalize(terminalInput);
    const expectedNorm = normalize(expected.cmd);
    
    let isCorrect = inputNorm === expectedNorm;

    // docker run, docker build 명령어에 한해 옵션 순서 유연성 허용
    // (단, 인자의 순서가 중요한 경우도 있으나 학습용 명령어 범위 내에서는 옵션 순서 변경 허용이 사용자 경험에 유리함)
    if (!isCorrect && (expectedNorm.startsWith('docker run') || expectedNorm.startsWith('docker build'))) {
        // 옵션과 인자를 분리하여 비교
        // 예: docker run -d -e DB_HOST=localhost myapp:1.0
        // 기본 명령어: docker run
        // 옵션들: -d, -e DB_HOST=localhost
        // 이미지: myapp:1.0
        
        // 간단한 공백 기준 분할 및 정렬 비교로는 -e DB_HOST=localhost 같은 값을 처리하기 어려움
        // 따라서 전체 토큰을 정렬하여 비교하는 방식을 사용하되,
        // docker run 부분은 제외하고 나머지 부분만 정렬하여 비교
        
        const inputTokens = inputNorm.split(' ');
        const expectedTokens = expectedNorm.split(' ');
        
        // 기본 명령어가 같은지 확인 (docker run)
        if (inputTokens[0] === expectedTokens[0] && inputTokens[1] === expectedTokens[1]) {
            const inputArgs = inputTokens.slice(2).sort();
            const expectedArgs = expectedTokens.slice(2).sort();
            
            if (inputArgs.length === expectedArgs.length && 
                inputArgs.every((val, index) => val === expectedArgs[index])) {
                isCorrect = true;
            }
        }
    }

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
