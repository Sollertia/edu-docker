/**
 * =============================================================================
 * Role: Why Docker Section Pure UI
 * =============================================================================
 *
 * DO NOT put business logic here
 * DO NOT put state management here
 * DO NOT put data fetching here
 *
 * MODIFY THIS FILE WHEN:
 * - Changing Why Docker section appearance
 * - Adding new visual elements
 * - Updating layout/styling
 *
 * PROPS:
 * - whyStep: Current step index
 * - setWhyStep: Step change handler
 * - onNext: Next button handler
 * - onPrev: Previous button handler
 * - isFirstStep: Boolean
 * - isLastStep: Boolean
 * - totalSteps: Total steps count
 * - steps: Steps data array
 * =============================================================================
 */

import React from 'react';
import {
  STEP_CONTENT_PROBLEM,
  STEP_CONTENT_CAUSE,
  STEP_CONTENT_SOLUTION,
  STEP_CONTENT_BENEFIT,
  STEP_CONTENT_DEVSETUP,
  STEP_CONTENT_WORKFLOW
} from '../../../constants';

export const WhyDockerView = ({
  whyStep,
  setWhyStep,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  totalSteps,
  steps
}) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Progress Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setWhyStep(i)}
            style={{
              width: whyStep === i ? '100px' : '40px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: i <= whyStep ? 'linear-gradient(90deg, #00d4ff, #7c3aed)' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

      {/* Content Card */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid rgba(255,255,255,0.1)',
        minHeight: '450px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(0,212,255,0.2)',
            borderRadius: '20px',
            fontSize: '0.8rem',
            color: '#00d4ff',
            marginBottom: '12px'
          }}>
            {whyStep + 1} / {totalSteps}
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{steps[whyStep].title}</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>{steps[whyStep].subtitle}</p>
        </div>

        {/* Step Content */}
        {whyStep === 0 && <StepProblem />}
        {whyStep === 1 && <StepCause />}
        {whyStep === 2 && <StepSolution />}
        {whyStep === 3 && <StepBenefit />}
        {whyStep === 4 && <StepDevSetup />}
        {whyStep === 5 && <StepWorkflow />}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
        <button
          onClick={onPrev}
          disabled={isFirstStep}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: isFirstStep ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)',
            color: isFirstStep ? '#666' : '#fff',
            cursor: isFirstStep ? 'not-allowed' : 'pointer'
          }}
        >
          ← 이전
        </button>
        <button
          onClick={onNext}
          disabled={isLastStep}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: isLastStep ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00d4ff, #0099ff)',
            color: isLastStep ? '#666' : '#fff',
            cursor: isLastStep ? 'not-allowed' : 'pointer'
          }}
        >
          다음 →
        </button>
      </div>
    </div>
  );
};

// Step 0: Problem
const StepProblem = () => {
  const { description, devPC, prodServer } = STEP_CONTENT_PROBLEM;

  return (
    <div>
      <p style={{ textAlign: 'center', color: '#e2e8f0', marginBottom: '24px' }}>{description}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
        <EnvironmentCard type="success" {...devPC} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📦</div>
          <div style={{ fontSize: '1.5rem' }}>➡️</div>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '8px' }}>배포</div>
        </div>
        <EnvironmentCard type="error" {...prodServer} />
      </div>
    </div>
  );
};

const EnvironmentCard = ({ type, title, emoji, items, status }) => {
  const isSuccess = type === 'success';
  const colors = isSuccess
    ? { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', text: '#4ade80', itemText: '#86efac', statusBg: 'rgba(34,197,94,0.3)' }
    : { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#f87171', itemText: '#fca5a5', statusBg: 'rgba(239,68,68,0.3)' };

  return (
    <div style={{ background: `linear-gradient(180deg, ${colors.bg}, ${colors.bg.replace('0.15', '0.05')})`, borderRadius: '16px', padding: '20px', border: `2px solid ${colors.border}` }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '2.5rem' }}>{emoji}</span>
        <h4 style={{ color: colors.text, marginTop: '8px' }}>{title}</h4>
      </div>
      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ color: colors.itemText, fontSize: '0.85rem', marginBottom: '6px' }}>
            {isSuccess ? '✓' : '✗'} {item}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', background: colors.statusBg, borderRadius: '10px' }}>
        <span style={{ fontSize: '1.5rem' }}>{status.emoji}</span>
        <div style={{ color: colors.itemText, fontWeight: '600' }}>{status.text}</div>
      </div>
    </div>
  );
};

// Step 1: Cause
const StepCause = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
    {STEP_CONTENT_CAUSE.map((item, i) => (
      <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ fontSize: '2rem' }}>{item.icon}</div>
        <div>
          <div style={{ color: '#fff', fontWeight: '600', marginBottom: '4px' }}>{item.title}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

// Step 2: Solution
const StepSolution = () => {
  const { before, after } = STEP_CONTENT_SOLUTION;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center' }}>
      <SolutionCard type="error" {...before} />
      <div style={{ fontSize: '2.5rem', color: '#22c55e' }}>→</div>
      <SolutionCard type="success" {...after} />
    </div>
  );
};

const SolutionCard = ({ type, emoji, title, desc, note }) => {
  const isSuccess = type === 'success';
  const colors = isSuccess
    ? { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', text: '#4ade80', noteText: '#86efac', noteBg: 'rgba(34,197,94,0.2)' }
    : { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#f87171', noteText: '#fca5a5', noteBg: 'rgba(239,68,68,0.2)' };

  return (
    <div style={{ background: colors.bg, borderRadius: '16px', padding: '24px', textAlign: 'center', border: `1px solid ${colors.border}` }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{emoji}</div>
      <h4 style={{ color: colors.text, marginBottom: '8px' }}>{title}</h4>
      <p style={{ color: colors.noteText, fontSize: '0.9rem' }}>{desc}</p>
      <div style={{ marginTop: '12px', padding: '10px', background: colors.noteBg, borderRadius: '8px', fontSize: '0.85rem', color: colors.noteText }}>{note}</div>
    </div>
  );
};

// Step 3: Benefit
const StepBenefit = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
    {STEP_CONTENT_BENEFIT.map((item, i) => (
      <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '2rem' }}>{item.icon}</span>
          <div>
            <div style={{ color: '#fff', fontWeight: '600' }}>{item.title}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
          </div>
        </div>
        <div style={{ padding: '10px', background: 'rgba(34,197,94,0.15)', borderRadius: '8px', textAlign: 'center' }}>
          <span style={{ color: '#86efac', fontWeight: '600' }}>{item.stat}</span>
        </div>
      </div>
    ))}
  </div>
);

// Step 4: Dev Setup
const StepDevSetup = () => {
  const [selectedExample, setSelectedExample] = React.useState(0);
  const { traditional, docker, examples } = STEP_CONTENT_DEVSETUP;
  const currentExample = examples[selectedExample];

  return (
    <div>
      {/* Before vs After 비교 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* 예전 방식 */}
        <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(239,68,68,0.25)' }}>
          <h4 style={{ color: '#f87171', fontSize: '0.95rem', marginBottom: '12px' }}>{traditional.title}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {traditional.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#fca5a5' }}>
                <span>{step.icon}</span>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Docker 방식 */}
        <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(34,197,94,0.25)' }}>
          <h4 style={{ color: '#4ade80', fontSize: '0.95rem', marginBottom: '12px' }}>{docker.title}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {docker.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#86efac' }}>
                <span>{step.icon}</span>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 소프트웨어 선택 탭 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setSelectedExample(i)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: selectedExample === i ? '2px solid #00d4ff' : '1px solid rgba(255,255,255,0.15)',
              background: selectedExample === i ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
              color: selectedExample === i ? '#00d4ff' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: selectedExample === i ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            {ex.icon} {ex.name}
          </button>
        ))}
      </div>

      {/* 선택된 예시 비교 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px', alignItems: 'stretch' }}>
        {/* 예전 방식 터미널 */}
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(239,68,68,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginLeft: '8px' }}>직접 설치</span>
          </div>
          <pre style={{ color: '#fca5a5', fontSize: '0.75rem', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', fontFamily: 'monospace' }}>
            {currentExample.traditional}
          </pre>
        </div>

        {/* 화살표 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          <div style={{ color: '#22c55e', fontSize: '1.5rem', fontWeight: '700' }}>VS</div>
        </div>

        {/* Docker 방식 터미널 */}
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(34,197,94,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginLeft: '8px' }}>Docker 🐳</span>
          </div>
          <pre style={{ color: '#86efac', fontSize: '0.75rem', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', fontFamily: 'monospace' }}>
            {currentExample.dockerCmd}
          </pre>
          <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(34,197,94,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: '600' }}>⚡ {currentExample.time}</span>
          </div>
        </div>
      </div>

      {/* 하단 팁 */}
      <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(0,212,255,0.08)', borderRadius: '10px', border: '1px solid rgba(0,212,255,0.2)', textAlign: 'center' }}>
        <span style={{ color: '#7dd3fc', fontSize: '0.8rem' }}>
          💡 다 쓴 후: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#86efac' }}>docker stop my-{currentExample.name.toLowerCase()}</code> → <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#86efac' }}>docker rm my-{currentExample.name.toLowerCase()}</code> 깔끔 삭제!
        </span>
      </div>
    </div>
  );
};

// Step 5: Workflow
const StepWorkflow = () => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
    {STEP_CONTENT_WORKFLOW.map((step, i) => (
      <React.Fragment key={i}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', textAlign: 'center', minWidth: '160px', border: '2px solid rgba(0,212,255,0.3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{step.icon}</div>
          <div style={{ color: '#00d4ff', fontWeight: '700', fontSize: '1.2rem', marginBottom: '8px' }}>{step.phase}</div>
          <code style={{ display: 'block', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px', color: '#86efac', fontSize: '0.85rem', marginBottom: '8px' }}>{step.cmd}</code>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{step.desc}</div>
        </div>
        {i < STEP_CONTENT_WORKFLOW.length - 1 && <div style={{ fontSize: '1.5rem', color: '#00d4ff' }}>→</div>}
      </React.Fragment>
    ))}
  </div>
);
