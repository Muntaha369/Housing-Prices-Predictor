import { cardStyle, labelStyle, descStyle, hintStyle } from './cardStyles';

const StepperField = ({ field, value, onChange }) => {
  const { id, label, min, max, icon, description } = field;
  const hasValue = value !== '';
  const numVal   = hasValue ? Number(value) : null;

  const handle = (delta) => {
    const current = hasValue ? numVal : min - 1;
    const next    = Math.min(max, Math.max(min, current + delta));
    onChange(id, String(next));
  };

  return (
    <div style={cardStyle(hasValue)}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        <div>
          <p style={labelStyle}>{label}</p>
          <p style={descStyle}>{description}</p>
        </div>
      </div>

      {/* Stepper row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Minus button */}
        <button
          type="button"
          onClick={() => handle(-1)}
          disabled={hasValue && numVal <= min}
          style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, cursor: 'pointer',
            background: '#1e293b', border: '1px solid #334155', color: '#cbd5e1',
            transition: 'all 0.2s',
            opacity: (hasValue && numVal <= min) ? 0.3 : 1,
          }}
        >−</button>

        {/* Number dots */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {Array.from({ length: max - min + 1 }).map((_, i) => {
            const dotVal = min + i;
            const active = hasValue && dotVal <= numVal;
            return (
              <button
                key={dotVal}
                type="button"
                onClick={() => onChange(id, String(dotVal))}
                style={{
                  width: active ? 38 : 32,
                  height: active ? 38 : 32,
                  borderRadius: '50%',
                  border: `2px solid ${active ? '#818cf8' : '#475569'}`,
                  background: active ? '#6366f1' : '#1e293b',
                  color: active ? '#fff' : '#94a3b8',
                  fontSize: active ? 14 : 12,
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  boxShadow: active ? '0 0 12px rgba(99,102,241,0.45)' : 'none',
                  flexShrink: 0,
                }}
              >
                {dotVal}
              </button>
            );
          })}
        </div>

        {/* Plus button */}
        <button
          type="button"
          onClick={() => handle(1)}
          disabled={hasValue && numVal >= max}
          style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, cursor: 'pointer',
            background: '#1e293b', border: '1px solid #334155', color: '#cbd5e1',
            transition: 'all 0.2s',
            opacity: (hasValue && numVal >= max) ? 0.3 : 1,
          }}
        >+</button>
      </div>

      {!hasValue && <p style={hintStyle}>Tap a number to select</p>}
    </div>
  );
};

export default StepperField;
