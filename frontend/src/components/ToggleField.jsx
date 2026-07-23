import { cardStyle, labelStyle, descStyle, hintStyle } from './cardStyles';

const ToggleField = ({ field, value, onChange }) => {
  const { id, label, icon, description } = field;
  const isYes    = value === 'yes';
  const isNo     = value === 'no';
  const hasValue = value !== '';

  return (
    <div style={cardStyle(hasValue)}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <div>
          <p style={labelStyle}>{label}</p>
          <p style={descStyle}>{description}</p>
        </div>
      </div>

      {/* Yes / No pill */}
      <div style={{
        display: 'flex',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(51,65,85,0.6)',
        background: 'rgba(15,23,42,0.6)',
      }}>
        <button
          type="button"
          onClick={() => onChange(id, 'no')}
          style={{
            flex: 1, padding: '12px 0', fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            border: 'none', cursor: 'pointer', transition: 'all 0.25s ease',
            background: isNo ? 'rgba(225,29,72,0.75)' : 'transparent',
            color: isNo ? '#fff' : '#94a3b8',
          }}
        >
          <span>{isNo ? '✗' : '○'}</span> No
        </button>

        <div style={{ width: 1, background: 'rgba(51,65,85,0.6)', flexShrink: 0 }} />

        <button
          type="button"
          onClick={() => onChange(id, 'yes')}
          style={{
            flex: 1, padding: '12px 0', fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            border: 'none', cursor: 'pointer', transition: 'all 0.25s ease',
            background: isYes ? 'rgba(5,150,105,0.75)' : 'transparent',
            color: isYes ? '#fff' : '#94a3b8',
          }}
        >
          <span>{isYes ? '✓' : '○'}</span> Yes
        </button>
      </div>

      {!hasValue && <p style={hintStyle}>Select Yes or No</p>}
    </div>
  );
};

export default ToggleField;
