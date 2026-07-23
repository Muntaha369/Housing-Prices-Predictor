/* Shared card style used across all field components */
export const cardStyle = (hasValue) => ({
  background: 'rgba(26, 26, 46, 0.75)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: 16,
  padding: '24px 20px',
  border: `1px solid ${hasValue ? 'rgba(99,102,241,0.4)' : 'rgba(51,65,85,0.5)'}`,
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  boxSizing: 'border-box',
  width: '100%',
});

export const labelStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: '#f1f5f9',
  margin: 0,
};

export const descStyle = {
  fontSize: 12,
  color: '#94a3b8',
  marginTop: 3,
  margin: 0,
};

export const hintStyle = {
  textAlign: 'center',
  fontSize: 12,
  color: 'rgba(129,140,248,0.6)',
  marginTop: 12,
  margin: 0,
};
