import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BOOTH 13 CRITICAL ERROR:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          backgroundColor: '#0E1224',
          color: '#F2E8D5',
          fontFamily: 'monospace',
          padding: '30px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#FFB347', fontFamily: 'serif', marginBottom: '12px' }}>
            BOOTH 13 — MALFUNCTION
          </h1>
          <p style={{ color: '#6B1A1F', fontWeight: 'bold', marginBottom: '16px' }}>
            The developer mechanism jammed.
          </p>
          <pre style={{
            background: 'rgba(0,0,0,0.6)',
            padding: '16px',
            borderRadius: '4px',
            border: '1px solid #FFB347',
            maxWidth: '600px',
            textAlign: 'left',
            overflowX: 'auto',
            marginBottom: '20px'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              background: '#6B1A1F',
              color: '#F2E8D5',
              border: '1px solid #FFB347',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '4px'
            }}
          >
            Restart Booth 13
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
