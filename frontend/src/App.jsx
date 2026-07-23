import { useState, useMemo } from 'react';
import { FIELDS, INITIAL_VALUES } from './config/fields';
import Header        from './components/Header';
import ProgressBar   from './components/ProgressBar';
import FormField     from './components/FormField';
import SummaryCard   from './components/SummaryCard';
import PredictButton from './components/PredictButton';

export default function App() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const filledCount = useMemo(
    () => FIELDS.filter((f) => values[f.id] !== '').length,
    [values]
  );

  const isComplete = filledCount === FIELDS.length;

  const numericFields = FIELDS.filter((f) => f.type === 'slider' || f.type === 'stepper');
  const toggleFields  = FIELDS.filter((f) => f.type === 'toggle');
  const selectFields  = FIELDS.filter((f) => f.type === 'select');

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow orbs */}
      <div style={{
        position: 'fixed', top: '-20%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, #6366f1, transparent 70%)',
        filter: 'blur(80px)', opacity: 0.1, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-20%', right: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, #a78bfa, transparent 70%)',
        filter: 'blur(80px)', opacity: 0.1, pointerEvents: 'none',
      }} />

      {/* ── Centered wrapper ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 1024,
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        boxSizing: 'border-box',
      }}>

        {/* Header */}
        <Header filledCount={filledCount} totalCount={FIELDS.length} />

        {/* Sticky progress bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 20,
          padding: '16px 0',
          background: 'rgba(15,15,26,0.9)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(51,65,85,0.5)',
          marginBottom: '8px',
        }}>
          <ProgressBar filled={filledCount} total={FIELDS.length} />
        </div>

        {/* ── Main form ── */}
        <main style={{ paddingTop: 32, paddingBottom: 32 }}>

          {/* Two-column grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
            alignItems: 'start',
          }}>

            {/* Left — numeric fields */}
            <div style={{ gridColumn: 'span 2' }}>
              <SectionHeading>Property Details</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {numericFields.map((field) => (
                  <FormField key={field.id} field={field} value={values[field.id]} onChange={handleChange} />
                ))}
              </div>
            </div>

            {/* Right — toggles + summary */}
            <div>
              <SectionHeading>Amenities</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {toggleFields.map((field) => (
                  <FormField key={field.id} field={field} value={values[field.id]} onChange={handleChange} />
                ))}
                <div style={{ marginTop: 8 }}>
                  <SummaryCard values={values} fields={FIELDS} />
                </div>
              </div>
            </div>
          </div>

          {/* Furnishing — full width */}
          <div style={{ marginTop: 40 }}>
            <SectionHeading>Furnishing Status</SectionHeading>
            {selectFields.map((field) => (
              <FormField key={field.id} field={field} value={values[field.id]} onChange={handleChange} />
            ))}
          </div>

          {/* Predict button */}
          <div style={{ marginTop: 48, marginBottom: 48 }}>
            <PredictButton values={values} fields={FIELDS} isComplete={isComplete} />
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#475569',
          paddingBottom: 24,
          paddingTop: 16,
          borderTop: '1px solid rgba(51,65,85,0.4)',
        }}>
          Housing Price Predictor · Built with React + Vite + Tailwind CSS
        </footer>
      </div>
    </div>
  );
}

/* ── Helper ── */
function SectionHeading({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      marginBottom: 20,
    }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(51,65,85,0.6)' }} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#64748b', whiteSpace: 'nowrap',
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(51,65,85,0.6)' }} />
    </div>
  );
}
