import { cardStyle, labelStyle, descStyle, hintStyle } from './cardStyles';

const SliderField = ({ field, value, onChange }) => {
  const { id, label, min, max, step, unit, icon, description } = field;
  const hasValue = value !== '';
  const numVal   = hasValue ? Number(value) : min;
  const percent  = ((numVal - min) / (max - min)) * 100;

  return (
    <div style={cardStyle(hasValue)}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 26 }}>{icon}</span>
          <div>
            <p style={labelStyle}>{label}</p>
            <p style={descStyle}>{description}</p>
          </div>
        </div>

        {/* Live value badge */}
        <div style={{
          padding: '6px 14px',
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 700,
          background: hasValue ? 'rgba(99,102,241,0.18)' : 'rgba(30,41,59,0.7)',
          color: hasValue ? '#a5b4fc' : '#64748b',
          border: `1px solid ${hasValue ? 'rgba(99,102,241,0.35)' : 'rgba(51,65,85,0.5)'}`,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          marginLeft: 12,
        }}>
          {hasValue ? `${numVal.toLocaleString()} ${unit}` : `— ${unit}`}
        </div>
      </div>

      {/* Range slider */}
      <div style={{ marginTop: 4 }}>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={numVal}
          onChange={(e) => onChange(id, e.target.value)}
          onMouseDown={() => { if (!hasValue) onChange(id, String(min)); }}
          style={{
            width: '100%',
            background: `linear-gradient(to right, #6366f1 ${percent}%, rgba(99,102,241,0.15) ${percent}%)`,
          }}
        />
        {/* Min / Max labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#64748b' }}>
          <span>{min.toLocaleString()} {unit}</span>
          <span>{max.toLocaleString()} {unit}</span>
        </div>
      </div>

      {!hasValue && <p style={hintStyle}>Drag slider to set value</p>}
    </div>
  );
};

export default SliderField;
