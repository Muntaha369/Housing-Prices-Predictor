const SummaryCard = ({ values, fields }) => {
  const filled = fields.filter((f) => values[f.id] !== '');

  return (
    <div style={{
      background: 'rgba(26,26,46,0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: 16,
      padding: '20px',
      border: '1px solid rgba(99,102,241,0.2)',
      boxSizing: 'border-box',
      width: '100%',
    }}>
      <h3 style={{
        fontSize: 12, fontWeight: 700, color: '#94a3b8',
        marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        📋 Summary Preview
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {filled.map((f) => (
          <div key={f.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(30,41,59,0.6)', borderRadius: 8,
            padding: '8px 10px', overflow: 'hidden',
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 10, color: '#64748b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {f.label}
              </p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc', margin: 0, textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {values[f.id]}{f.unit ? ` ${f.unit}` : ''}
              </p>
            </div>
          </div>
        ))}
        {filled.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: 12, color: '#475569', padding: '8px 0' }}>
            No fields filled yet
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
