const Header = ({ filledCount, totalCount }) => (
  <header style={{ textAlign: 'center', paddingTop: 56, paddingBottom: 32, paddingLeft: 16, paddingRight: 16 }}>
    {/* Floating badge */}
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(99,102,241,0.1)',
      border: '1px solid rgba(99,102,241,0.25)',
      borderRadius: 9999, padding: '6px 18px',
      marginBottom: 24, fontSize: 12, fontWeight: 500, color: '#818cf8',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%', background: '#818cf8',
        animation: 'pulse 2s ease-in-out infinite',
        display: 'inline-block',
      }} />
      AI-Powered Real Estate Valuation
    </div>

    {/* Title */}
    <h1 style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: 'clamp(36px, 6vw, 60px)',
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      marginBottom: 16,
    }}>
      <span style={{
        background: 'linear-gradient(90deg, #6366f1, #a78bfa, #6366f1)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 3s linear infinite',
      }}>
        Housing Price
      </span>
      <br />
      <span style={{ color: '#f1f5f9' }}>Predictor</span>
    </h1>

    {/* Subtitle */}
    <p style={{
      color: '#94a3b8', fontSize: 16, maxWidth: 520,
      margin: '0 auto', lineHeight: 1.7,
    }}>
      Fill in your property details and let our machine learning model estimate the{' '}
      <span style={{ color: '#818cf8', fontWeight: 500 }}>market value</span> in seconds.
    </p>

    {/* Completion badge */}
    {filledCount > 0 && (
      <div style={{
        marginTop: 20,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 13, color: '#94a3b8',
        background: 'rgba(30,41,59,0.6)',
        padding: '8px 18px', borderRadius: 9999,
        border: '1px solid rgba(51,65,85,0.4)',
      }}>
        <span style={{ color: '#34d399' }}>✓</span>
        {filledCount} of {totalCount} fields complete
      </div>
    )}

    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes shimmer {
        0% { background-position: 0% center; }
        100% { background-position: 200% center; }
      }
    `}</style>
  </header>
);

export default Header;
