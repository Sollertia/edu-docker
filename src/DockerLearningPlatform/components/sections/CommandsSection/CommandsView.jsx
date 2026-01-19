/**
 * =============================================================================
 * Role: Commands Section View (Presentation Only)
 * =============================================================================
 *
 * DO NOT put state management here (use hooks)
 * DO NOT put data definitions here (use constants)
 *
 * MODIFY THIS FILE WHEN:
 * - Changing commands section layout
 * - Updating learn/workflow mode UI
 * - Modifying terminal display
 *
 * PROPS FROM CONTAINER:
 * - Command Learn Mode props
 * - Workflow Mode props
 * =============================================================================
 */

import React from 'react';
import { Terminal } from '../../common';
import { WORKFLOW_STEP_NAMES } from '../../../constants';

// ============================================================================
// Mode Toggle
// ============================================================================

const ModeToggle = ({ cmdMode, setCmdMode }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
    <button
      onClick={() => setCmdMode('learn')}
      style={{
        padding: '14px 28px',
        borderRadius: '12px',
        border: cmdMode === 'learn' ? '2px solid #22d3ee' : '2px solid transparent',
        background: cmdMode === 'learn' ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)',
        color: cmdMode === 'learn' ? '#fff' : '#94a3b8',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '600'
      }}
    >
      명령어 학습
    </button>
    <button
      onClick={() => setCmdMode('workflow')}
      style={{
        padding: '14px 28px',
        borderRadius: '12px',
        border: cmdMode === 'workflow' ? '2px solid #f472b6' : '2px solid transparent',
        background: cmdMode === 'workflow' ? 'rgba(244,114,182,0.2)' : 'rgba(255,255,255,0.05)',
        color: cmdMode === 'workflow' ? '#fff' : '#94a3b8',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '600'
      }}
    >
      워크플로우 실습
    </button>
  </div>
);

// ============================================================================
// Learn Mode Components
// ============================================================================

const CategoryTabs = ({ categories, currentCategory, onCategoryChange }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
    {categories.map((cat, i) => (
      <button
        key={i}
        onClick={() => onCategoryChange(i)}
        style={{
          padding: '8px 12px',
          borderRadius: '8px',
          border: currentCategory === i ? '2px solid #22d3ee' : '2px solid transparent',
          background: currentCategory === i ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)',
          color: currentCategory === i ? '#fff' : '#94a3b8',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        {cat.name}
      </button>
    ))}
  </div>
);

const CommandList = ({ commands, currentIndex, onIndexChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflowY: 'auto', marginBottom: '16px' }}>
    {commands.map((cmd, i) => (
      <div
        key={i}
        onClick={() => onIndexChange(i)}
        style={{
          padding: '10px 12px',
          borderRadius: '8px',
          background: currentIndex === i ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.03)',
          border: currentIndex === i ? '2px solid #22d3ee' : '2px solid transparent',
          cursor: 'pointer'
        }}
      >
        <div style={{
          color: currentIndex === i ? '#67e8f9' : '#94a3b8',
          fontSize: '0.85rem',
          fontWeight: '600'
        }}>
          {cmd.short}
        </div>
        <code style={{ color: '#8b949e', fontSize: '0.7rem' }}>
          {cmd.cmd.length > 40 ? cmd.cmd.substring(0, 40) + '...' : cmd.cmd}
        </code>
      </div>
    ))}
  </div>
);

const CommandDescription = ({ description }) => (
  <div style={{
    padding: '14px',
    background: 'rgba(251,191,36,0.1)',
    borderRadius: '10px',
    border: '1px solid rgba(251,191,36,0.3)'
  }}>
    <h5 style={{ color: '#fbbf24', marginBottom: '6px', fontSize: '0.85rem' }}>설명</h5>
    <p style={{ color: '#fef3c7', fontSize: '0.8rem', margin: 0 }}>{description}</p>
  </div>
);

const LearnMode = ({
  cmdCategory,
  setCmdCategory,
  cmdIndex,
  setCmdIndex,
  terminalInput,
  setTerminalInput,
  terminalHistory,
  terminalRef,
  handleTerminalSubmit,
  currentCommand,
  categories
}) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <h3 style={{ textAlign: 'center', marginBottom: '24px', color: '#22d3ee' }}>
      Docker 명령어 학습
    </h3>

    <CategoryTabs
      categories={categories}
      currentCategory={cmdCategory}
      onCategoryChange={(i) => {
        setCmdCategory(i);
        setCmdIndex(0);
      }}
    />

    <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '24px' }}>
      <div>
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>
          명령어 ({cmdIndex + 1}/{categories[cmdCategory].commands.length})
        </div>
        <CommandList
          commands={categories[cmdCategory].commands}
          currentIndex={cmdIndex}
          onIndexChange={setCmdIndex}
        />
        <CommandDescription description={currentCommand.desc} />
      </div>

      <Terminal
        history={terminalHistory}
        inputValue={terminalInput}
        onInputChange={setTerminalInput}
        onKeyDown={handleTerminalSubmit}
        terminalRef={terminalRef}
        title="Terminal"
        height="420px"
      />
    </div>
  </div>
);

// ============================================================================
// Workflow Mode Components
// ============================================================================

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>진행률</span>
      <span style={{ color: '#f472b6', fontSize: '0.85rem' }}>{currentStep + 1} / {totalSteps}</span>
    </div>
    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${((currentStep + 1) / totalSteps) * 100}%`,
        background: 'linear-gradient(90deg, #f472b6, #8b5cf6)',
        transition: 'width 0.5s'
      }} />
    </div>
  </div>
);

const StepIndicator = ({ totalSteps, currentStep }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
    {Array.from({ length: totalSteps }, (_, i) => (
      <div
        key={i}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: i < currentStep
            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
            : i === currentStep
              ? 'linear-gradient(135deg, #f472b6, #8b5cf6)'
              : 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: '600',
          color: i <= currentStep ? '#fff' : '#64748b'
        }}
      >
        {i < currentStep ? '✓' : i + 1}
      </div>
    ))}
  </div>
);

const CurrentStepInfo = ({ step }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(139,92,246,0.15))',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(244,114,182,0.3)',
    marginBottom: '16px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #f472b6, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: '700'
      }}>
        {step.step}
      </div>
      <div>
        <h4 style={{ color: '#f9a8d4', margin: 0 }}>{step.title}</h4>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0 0 0' }}>{step.description}</p>
      </div>
    </div>
    <div style={{
      padding: '12px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '10px',
      marginBottom: '12px'
    }}>
      <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '6px' }}>입력할 명령어:</div>
      <code style={{ color: '#86efac', fontSize: '0.9rem', wordBreak: 'break-all' }}>{step.cmd}</code>
    </div>
    <div style={{
      padding: '10px',
      background: 'rgba(251,191,36,0.1)',
      borderRadius: '8px',
      border: '1px solid rgba(251,191,36,0.3)'
    }}>
      <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>{step.tip}</span>
    </div>
  </div>
);

const FlowDiagram = ({ currentStep }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px' }}>
    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '12px' }}>전체 흐름</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {WORKFLOW_STEP_NAMES.map((name, i) => (
        <div
          key={i}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            background: i < currentStep
              ? 'rgba(34,197,94,0.2)'
              : i === currentStep
                ? 'rgba(244,114,182,0.3)'
                : 'rgba(255,255,255,0.05)',
            borderLeft: `3px solid ${i < currentStep ? '#22c55e' : i === currentStep ? '#f472b6' : '#374151'}`,
            fontSize: '0.8rem',
            color: i <= currentStep ? '#fff' : '#64748b'
          }}
        >
          {i + 1}. {name} {i < currentStep && '✓'}
        </div>
      ))}
    </div>
  </div>
);

const WorkflowTerminal = ({
  history,
  input,
  setInput,
  onSubmit,
  terminalRef,
  currentStep,
  totalSteps,
  workflowSteps
}) => (
  <div style={{
    background: '#0d1117',
    borderRadius: '16px',
    padding: '16px',
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    height: '520px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexShrink: 0 }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
      <span style={{ marginLeft: '8px', color: '#8b949e', fontSize: '0.8rem' }}>Workflow Terminal</span>
    </div>
    <div ref={terminalRef} style={{ flex: 1, overflowY: 'auto', fontSize: '0.72rem', marginBottom: '12px' }}>
      {history.map((entry, i) => (
        <div key={i} style={{ marginBottom: '16px' }}>
          <div>
            <span style={{ color: '#7ee787' }}>user@docker</span>
            <span style={{ color: '#8b949e' }}>:</span>
            <span style={{ color: '#79c0ff' }}>~/myapp</span>
            <span style={{ color: '#8b949e' }}>$ </span>
            <span style={{ color: entry.isCorrect ? '#e6edf3' : '#f85149' }}>{entry.input}</span>
          </div>
          <pre style={{
            color: entry.isCorrect ? '#8b949e' : '#f85149',
            whiteSpace: 'pre-wrap',
            margin: '4px 0 0 0',
            lineHeight: '1.4'
          }}>
            {entry.output}
          </pre>
          {entry.isCorrect && entry.stepIndex !== undefined && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              background: 'rgba(34,197,94,0.2)',
              borderRadius: '6px',
              color: '#86efac',
              fontSize: '0.75rem'
            }}>
              ✅ {workflowSteps[entry.stepIndex].next}
            </div>
          )}
        </div>
      ))}
    </div>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '8px',
      flexShrink: 0
    }}>
      <span style={{ color: '#7ee787' }}>$</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onSubmit}
        placeholder="명령어를 입력하세요..."
        style={{
          flex: 1,
          marginLeft: '8px',
          background: 'transparent',
          border: 'none',
          color: '#e6edf3',
          fontSize: '0.85rem',
          outline: 'none',
          fontFamily: 'inherit'
        }}
      />
    </div>
  </div>
);

const WorkflowMode = ({
  workflowStep,
  workflowTerminalHistory,
  workflowInput,
  setWorkflowInput,
  workflowTerminalRef,
  handleWorkflowSubmit,
  resetWorkflow,
  currentStep,
  totalWorkflowSteps,
  workflowSteps
}) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <h3 style={{ color: '#f472b6', margin: 0 }}>Docker 워크플로우 실습</h3>
      <button
        onClick={resetWorkflow}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          background: 'rgba(239,68,68,0.3)',
          color: '#fca5a5',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}
      >
        처음부터
      </button>
    </div>

    <ProgressBar currentStep={workflowStep} totalSteps={totalWorkflowSteps} />
    <StepIndicator totalSteps={totalWorkflowSteps} currentStep={workflowStep} />

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
      <div>
        <CurrentStepInfo step={currentStep} />
        <FlowDiagram currentStep={workflowStep} />
      </div>
      <WorkflowTerminal
        history={workflowTerminalHistory}
        input={workflowInput}
        setInput={setWorkflowInput}
        onSubmit={handleWorkflowSubmit}
        terminalRef={workflowTerminalRef}
        currentStep={workflowStep}
        totalSteps={totalWorkflowSteps}
        workflowSteps={workflowSteps}
      />
    </div>
  </div>
);

// ============================================================================
// Main View Component
// ============================================================================

export const CommandsView = ({
  // Command Learn Mode
  cmdMode,
  setCmdMode,
  cmdCategory,
  setCmdCategory,
  cmdIndex,
  setCmdIndex,
  terminalInput,
  setTerminalInput,
  terminalHistory,
  terminalRef,
  handleTerminalSubmit,
  currentCommand,
  categories,
  // Workflow Mode
  workflowStep,
  workflowTerminalHistory,
  workflowInput,
  setWorkflowInput,
  workflowTerminalRef,
  handleWorkflowSubmit,
  resetWorkflow,
  currentStep,
  totalWorkflowSteps,
  workflowSteps
}) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <ModeToggle cmdMode={cmdMode} setCmdMode={setCmdMode} />

      {cmdMode === 'learn' && (
        <LearnMode
          cmdCategory={cmdCategory}
          setCmdCategory={setCmdCategory}
          cmdIndex={cmdIndex}
          setCmdIndex={setCmdIndex}
          terminalInput={terminalInput}
          setTerminalInput={setTerminalInput}
          terminalHistory={terminalHistory}
          terminalRef={terminalRef}
          handleTerminalSubmit={handleTerminalSubmit}
          currentCommand={currentCommand}
          categories={categories}
        />
      )}

      {cmdMode === 'workflow' && (
        <WorkflowMode
          workflowStep={workflowStep}
          workflowTerminalHistory={workflowTerminalHistory}
          workflowInput={workflowInput}
          setWorkflowInput={setWorkflowInput}
          workflowTerminalRef={workflowTerminalRef}
          handleWorkflowSubmit={handleWorkflowSubmit}
          resetWorkflow={resetWorkflow}
          currentStep={currentStep}
          totalWorkflowSteps={totalWorkflowSteps}
          workflowSteps={workflowSteps}
        />
      )}
    </div>
  );
};
