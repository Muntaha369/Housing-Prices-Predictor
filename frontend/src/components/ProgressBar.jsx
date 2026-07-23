const ProgressBar = ({ filled, total }) => {
  const percentage = total === 0 ? 0 : Math.round((filled / total) * 100);

  const getGradient = () => {
    if (percentage < 34) return 'linear-gradient(90deg, #ef4444, #f97316)';
    if (percentage < 67) return 'linear-gradient(90deg, #f97316, #eab308)';
    if (percentage < 100) return 'linear-gradient(90deg, #eab308, #6366f1)';
    return 'linear-gradient(90deg, #6366f1, #a78bfa)';
  };

  const getLabel = () => {
    if (percentage === 0)   return 'Start filling the form below';
    if (percentage < 34)    return 'Just getting started…';
    if (percentage < 67)    return 'Making great progress!';
    if (percentage < 100)   return 'Almost there!';
    return '🎉 All fields complete!';
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{getLabel()}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>
          {filled}/{total} &nbsp;·&nbsp; {percentage}%
        </span>
      </div>

      {/* Track */}
      <div style={{
        position: 'relative', height: 10, width: '100%',
        borderRadius: 9999, background: 'rgba(30,41,59,0.8)',
        overflow: 'hidden',
      }}>
        {/* Fill bar */}
        <div style={{
          height: '100%', borderRadius: 9999,
          width: `${percentage}%`,
          background: getGradient(),
          transition: 'width 0.7s ease, background 0.5s ease',
        }} />
      </div>

      {/* Step dots */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 8, paddingLeft: 2, paddingRight: 2,
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: i < filled ? '#818cf8' : 'rgba(51,65,85,0.6)',
            transition: 'background 0.4s ease, transform 0.3s ease',
            transform: i < filled ? 'scale(1.2)' : 'scale(1)',
          }} />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
