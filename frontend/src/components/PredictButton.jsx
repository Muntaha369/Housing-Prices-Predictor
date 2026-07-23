import { useState } from 'react';

const PredictButton = ({ values, fields, isComplete }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    const payload = {};
    fields.forEach((f) => {
      const v = values[f.id];
      if (f.type === 'slider' || f.type === 'stepper') {
        payload[f.id] = Number(v);
      } else {
        payload[f.id] = v;
      }
    });

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResult(data.predicted_price ?? data.price ?? data.result ?? JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setResult(null); setError(null); };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      padding: '48px 0',
    }}>
      <button
        type="button"
        onClick={handlePredict}
        disabled={!isComplete || loading}
        style={{
          padding: '18px 56px',
          borderRadius: 16,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: '0.03em',
          border: 'none',
          cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          minWidth: 240,
          ...(isComplete && !loading
            ? {
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
              }
            : {
                background: '#1e293b',
                color: '#64748b',
                border: '1px solid #334155',
              }),
        }}
        onMouseEnter={(e) => {
          if (isComplete && !loading) {
            e.currentTarget.style.transform = 'scale(1.04)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.65)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isComplete
            ? '0 8px 32px rgba(99,102,241,0.45)'
            : 'none';
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          {loading ? (
            <>
              <svg style={{ animation: 'spin 1s linear infinite', width: 20, height: 20 }}
                viewBox="0 0 24 24" fill="none">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Predicting…
            </>
          ) : isComplete ? (
            <>🔮 Predict Price</>
          ) : (
            <>Fill all fields to predict</>
          )}
        </span>
      </button>

      {/* Hint text under button */}
      {!isComplete && (
        <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
          {`Complete all 12 fields to unlock prediction`}
        </p>
      )}

      {/* Result card */}
      {result !== null && (
        <div style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 20,
          padding: '32px 24px',
          textAlign: 'center',
          animation: 'fadeInUp 0.4s ease',
        }}>
          <p style={{ fontSize: 11, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Estimated Price
          </p>
          <p style={{ fontSize: 40, fontWeight: 900, color: '#34d399', margin: '0 0 4px' }}>
            ₹ {Number(result).toLocaleString('en-IN')}
          </p>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
            Based on the property details you provided
          </p>
          <button onClick={handleReset} style={{
            background: 'none', border: 'none', color: '#6366f1',
            fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
          }}>
            Clear result
          </button>
        </div>
      )}

      {/* Error card */}
      {error && (
        <div style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 20,
          padding: '24px',
          textAlign: 'center',
          animation: 'fadeInUp 0.4s ease',
        }}>
          <p style={{ color: '#f87171', fontSize: 14, marginBottom: 4 }}>⚠ {error}</p>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
            Make sure the Flask backend is running on port 5000.
          </p>
          <button onClick={handleReset} style={{
            background: 'none', border: 'none', color: '#6366f1',
            fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
          }}>
            Dismiss
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PredictButton;
