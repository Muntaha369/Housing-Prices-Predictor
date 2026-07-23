import { cardStyle, labelStyle, descStyle, hintStyle } from './cardStyles';

const LABELS = {
  unfurnished:      { emoji: '🪑', desc: 'No furniture included' },
  'semi-furnished': { emoji: '🛋️', desc: 'Basic furniture provided' },
  furnished:        { emoji: '✨', desc: 'Fully furnished' },
};

const SelectField = ({ field, value, onChange }) => {
  const { id, label, icon, description, options } = field;
  const hasValue = value !== '';

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

      {/* Option cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {options.map((opt) => {
          const isSelected = value === opt;
          const meta = LABELS[opt] || { emoji: '📦', desc: opt };
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(id, opt)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 8, padding: '16px 8px', borderRadius: 12,
                border: `2px solid ${isSelected ? '#6366f1' : 'rgba(51,65,85,0.5)'}`,
                background: isSelected ? 'rgba(99,102,241,0.18)' : 'rgba(30,41,59,0.5)',
                color: isSelected ? '#a5b4fc' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? '0 0 16px rgba(99,102,241,0.25)' : 'none',
              }}
            >
              <span style={{ fontSize: 24 }}>{meta.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'capitalize', textAlign: 'center' }}>
                {opt}
              </span>
              <span style={{ fontSize: 10, color: '#64748b', textAlign: 'center', lineHeight: 1.3 }}>
                {meta.desc}
              </span>
            </button>
          );
        })}
      </div>

      {!hasValue && <p style={hintStyle}>Choose furnishing status</p>}
    </div>
  );
};

export default SelectField;
