import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, ArrowLeft, CheckCircle } from 'lucide-react';

// ── Demo credentials ──────────────────────────────────────────
export const DEMO_EMAIL    = 'demo@trevoros.com';
export const DEMO_PASSWORD = 'demo1234';
export const DEMO_NAME     = 'Marshall D.';

// ── Decorative grid panel ─────────────────────────────────────
const GridPanel: React.FC<{ variant: 'login' | 'signup' }> = ({ variant }) => {
  const isLogin  = variant === 'login';
  const bgColor  = '#080c14';
  const gridColor= isLogin ? 'rgba(59, 130, 246, 0.12)' : 'rgba(139, 92, 246, 0.12)';
  const shapeColor = isLogin ? '#3b82f6' : '#8b5cf6';
  const textColor  = '#cbd5e1';

  return (
    <div className="auth-deco-panel" style={{ background: bgColor }}>
      {/* Grid overlay via SVG */}
      <svg className="auth-deco-grid" viewBox="0 0 480 560" preserveAspectRatio="xMidYMid slice">
        {/* Grid lines */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="560"
            stroke={gridColor} strokeWidth="0.8" />
        ))}
        {Array.from({ length: 29 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="480" y2={i * 20}
            stroke={gridColor} strokeWidth="0.8" />
        ))}

        {/* Large "Z" shape — two diagonal curves forming a Z */}
        {/* Top horizontal bar */}
        <path
          d="M 40 80 Q 200 80 380 80 L 380 160 Q 200 160 40 160 Z"
          fill={shapeColor} opacity="0.08"
        />
        {/* Diagonal slash */}
        <path
          d="M 380 160 Q 260 240 200 300 Q 140 360 40 380 L 40 300 Q 140 280 200 220 Q 260 160 380 80 Z"
          fill={shapeColor} opacity="0.06"
        />
        {/* Bottom horizontal bar */}
        <path
          d="M 40 380 Q 200 380 380 380 L 380 460 Q 200 460 40 460 Z"
          fill={shapeColor} opacity="0.08"
        />

        {/* Soft glow blob */}
        <ellipse cx="200" cy="280" rx="160" ry="120"
          fill={shapeColor} opacity="0.04" />
      </svg>

      {/* Text overlay */}
      <div className="auth-deco-text" style={{ color: textColor }}>
        <span className="auth-deco-line1">Where discipline</span>
        <span className="auth-deco-line2">meets opportunity</span>
      </div>
    </div>
  );
};

// ── Google button ─────────────────────────────────────────────
const GoogleBtn: React.FC<{ label: string }> = ({ label }) => (
  <button className="auth-google-btn" type="button"
    onClick={() => alert('Google OAuth is not configured in this demo.')}>
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
    <span>{label}</span>
  </button>
);

// ── Divider ───────────────────────────────────────────────────
const Divider: React.FC<{ text: string }> = ({ text }) => (
  <div className="auth-divider">
    <span className="auth-divider-line" />
    <span className="auth-divider-text">{text}</span>
    <span className="auth-divider-line" />
  </div>
);

// ── Password input with show/hide ─────────────────────────────
const PasswordInput: React.FC<{
  id: string; value: string; placeholder: string;
  onChange: (v: string) => void;
}> = ({ id, value, placeholder, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-pw-wrap">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        className="auth-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="current-password"
      />
      <button type="button" className="auth-pw-toggle"
        onClick={() => setShow(!show)} aria-label="Toggle password visibility">
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

// ── LOGIN FORM ────────────────────────────────────────────────
interface LoginFormProps {
  onLogin: (name: string, email: string) => void;
  onGoSignup: () => void;
  onGoForgot: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onGoSignup, onGoForgot }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        onLogin(DEMO_NAME, email);
      } else {
        setError('Invalid credentials. Use demo@trevoros.com / demo1234');
      }
    }, 800);
  };

  return (
    <div className="auth-form-panel">
      <div className="auth-form-inner">
        {/* Logo */}
        <div className="auth-logo-row">
          <span className="auth-logo-icon">
            <img src="/logo.png" alt="Trevoros Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </span>
          <span className="auth-logo-name">Trevoros</span>
        </div>

        <h1 className="auth-title">Login</h1>

        <GoogleBtn label="Log in with Google" />
        <Divider text="Or Log in with Email" />

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <input
              type="email"
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <PasswordInput
              id="login-pw"
              value={password}
              placeholder="Password"
              onChange={setPassword}
            />
          </div>

          <div className="auth-forgot-row">
            <button type="button" className="auth-link-btn"
              onClick={onGoForgot}>
              Forgot password?
            </button>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        {/* Demo hint */}
        <div className="auth-demo-hint">
          <span className="auth-demo-label">Demo credentials</span>
          <code className="auth-demo-code">{DEMO_EMAIL} / demo1234</code>
        </div>

        <p className="auth-switch-text">
          Not registered?{' '}
          <button type="button" className="auth-link-btn underline" onClick={onGoSignup}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

// ── SIGNUP FORM ───────────────────────────────────────────────
interface SignupFormProps {
  onSignup: (name: string, email: string) => void;
  onGoLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onGoLogin }) => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim())              { setError('Please enter your full name.'); return; }
    if (!email.includes('@'))      { setError('Please enter a valid email.'); return; }
    if (password.length < 8)       { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignup(name.trim(), email.trim());
    }, 800);
  };

  return (
    <div className="auth-form-panel">
      <div className="auth-form-inner">
        {/* Logo */}
        <div className="auth-logo-row">
          <span className="auth-logo-icon">
            <img src="/logo.png" alt="Trevoros Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </span>
          <span className="auth-logo-name">Trevoros</span>
        </div>

        <h1 className="auth-title">Create Account</h1>

        <GoogleBtn label="Sign up with Google" />
        <Divider text="Or sign up with Email" />

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field-label" htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              className="auth-input"
              placeholder="enter text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-field-label" htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              className="auth-input"
              placeholder="mail@website.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-field-label" htmlFor="signup-pw">Password</label>
            <PasswordInput
              id="signup-pw"
              value={password}
              placeholder="min 8 characters"
              onChange={setPassword}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{' '}
          <button type="button" className="auth-link-btn underline" onClick={onGoLogin}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

// ── FORGOT PASSWORD REQUEST FORM ──────────────────────────────
interface ForgotRequestFormProps {
  onGoLogin: () => void;
  onSubmit: (method: 'email' | 'phone', value: string) => void;
}

const ForgotRequestForm: React.FC<ForgotRequestFormProps> = ({ onGoLogin, onSubmit }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!value.trim()) {
      setError(`Please enter your ${method === 'email' ? 'email address' : 'phone number'}.`);
      return;
    }

    if (method === 'email' && !value.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (method === 'phone' && value.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(method, value.trim());
    }, 800);
  };

  return (
    <div className="auth-form-panel">
      <div className="auth-form-inner">
        <div className="auth-logo-row">
          <span className="auth-logo-icon">
            <img src="/logo.png" alt="Trevoros Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </span>
          <span className="auth-logo-name">Trevoros</span>
        </div>

        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-desc">Choose a contact method and enter your details to receive an OTP.</p>

        <div className="auth-tab-row">
          <button
            type="button"
            className={`auth-tab-btn ${method === 'email' ? 'active' : ''}`}
            onClick={() => { setMethod('email'); setValue(''); setError(''); }}
          >
            <Mail size={16} />
            <span>Email</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${method === 'phone' ? 'active' : ''}`}
            onClick={() => { setMethod('phone'); setValue(''); setError(''); }}
          >
            <Phone size={16} />
            <span>Phone</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <input
              type={method === 'email' ? 'email' : 'tel'}
              className="auth-input"
              placeholder={method === 'email' ? 'mail@website.com' : '+91 99999 99999'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Sending OTP…' : 'Send OTP'}
          </button>
        </form>

        <p className="auth-switch-text">
          <button type="button" className="auth-link-btn inline-flex items-center gap-1" onClick={onGoLogin}>
            <ArrowLeft size={14} /> Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

// ── OTP VERIFICATION FORM ─────────────────────────────────────
interface ForgotOtpFormProps {
  method: 'email' | 'phone';
  contactValue: string;
  onGoBack: () => void;
  onVerify: () => void;
}

const ForgotOtpForm: React.FC<ForgotOtpFormProps> = ({ method, contactValue, onGoBack, onVerify }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Allow the demo OTP code 123456
      if (code === '123456') {
        onVerify();
      } else {
        setError('Incorrect code. Hint: Use 123456');
      }
    }, 800);
  };

  return (
    <div className="auth-form-panel">
      <div className="auth-form-inner">
        <div className="auth-logo-row">
          <span className="auth-logo-icon">
            <img src="/logo.png" alt="Trevoros Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </span>
          <span className="auth-logo-name">Trevoros</span>
        </div>

        <h1 className="auth-title">Verify OTP</h1>
        <p className="auth-desc">
          We've sent a 6-digit verification code to your {method === 'email' ? 'email' : 'phone number'}:<br />
          <strong>{contactValue}</strong>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <input
              type="text"
              maxLength={6}
              className="auth-input text-center tracking-widest font-mono text-lg"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Verifying…' : 'Verify Code'}
          </button>
        </form>

        <div className="auth-demo-hint">
          <span className="auth-demo-label">Demo OTP Code</span>
          <code className="auth-demo-code">123456</code>
        </div>

        <p className="auth-switch-text">
          <button type="button" className="auth-link-btn inline-flex items-center gap-1" onClick={onGoBack}>
            <ArrowLeft size={14} /> Back
          </button>
        </p>
      </div>
    </div>
  );
};

// ── PASSWORD RESET FORM ───────────────────────────────────────
interface ForgotResetFormProps {
  onGoBack: () => void;
  onResetSuccess: () => void;
}

const ForgotResetForm: React.FC<ForgotResetFormProps> = ({ onGoBack, onResetSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onResetSuccess();
    }, 800);
  };

  return (
    <div className="auth-form-panel">
      <div className="auth-form-inner">
        <div className="auth-logo-row">
          <span className="auth-logo-icon">
            <img src="/logo.png" alt="Trevoros Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </span>
          <span className="auth-logo-name">Trevoros</span>
        </div>

        <h1 className="auth-title">New Password</h1>
        <p className="auth-desc">Set a strong, new password for your Trevoros account.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field-label" htmlFor="new-password">New Password</label>
            <PasswordInput
              id="new-password"
              value={password}
              placeholder="min 8 characters"
              onChange={setPassword}
            />
          </div>

          <div className="auth-field">
            <label className="auth-field-label" htmlFor="confirm-password">Confirm Password</label>
            <PasswordInput
              id="confirm-password"
              value={confirmPassword}
              placeholder="repeat new password"
              onChange={setConfirmPassword}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
        </form>

        <p className="auth-switch-text">
          <button type="button" className="auth-link-btn inline-flex items-center gap-1" onClick={onGoBack}>
            <ArrowLeft size={14} /> Back
          </button>
        </p>
      </div>
    </div>
  );
};

// ── SUCCESS CONFIRMATION FORM ─────────────────────────────────
interface ForgotSuccessFormProps {
  onGoLogin: () => void;
}

const ForgotSuccessForm: React.FC<ForgotSuccessFormProps> = ({ onGoLogin }) => {
  return (
    <div className="auth-form-panel">
      <div className="auth-form-inner">
        <div className="auth-logo-row">
          <span className="auth-logo-icon">
            <img src="/logo.png" alt="Trevoros Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </span>
          <span className="auth-logo-name">Trevoros</span>
        </div>

        <div className="auth-success-box">
          <div className="auth-success-icon">
            <CheckCircle size={56} />
          </div>
          <h1 className="auth-title" style={{ marginTop: 0, marginBottom: 8 }}>Password Reset!</h1>
          <p className="auth-desc">
            Your password has been successfully updated. You can now log in using your new credentials.
          </p>

          <button type="button" className="auth-submit-btn" onClick={onGoLogin}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

// ── AUTH PAGE (root) ──────────────────────────────────────────
interface AuthPageProps {
  onAuthenticated: (name: string, email: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot_request' | 'forgot_otp' | 'forgot_reset' | 'forgot_success'>('login');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');

  const handleRequestSubmit = (method: 'email' | 'phone', value: string) => {
    setContactMethod(method);
    setContactValue(value);
    setMode('forgot_otp');
  };

  return (
    <div className={`auth-shell ${mode.startsWith('forgot') ? 'login' : mode}`}>
      {mode === 'login' && (
        <>
          <LoginForm
            onLogin={onAuthenticated}
            onGoSignup={() => setMode('signup')}
            onGoForgot={() => setMode('forgot_request')}
          />
          <GridPanel variant="login" />
        </>
      )}

      {mode === 'signup' && (
        <>
          <GridPanel variant="signup" />
          <SignupForm
            onSignup={onAuthenticated}
            onGoLogin={() => setMode('login')}
          />
        </>
      )}

      {mode === 'forgot_request' && (
        <>
          <ForgotRequestForm
            onGoLogin={() => setMode('login')}
            onSubmit={handleRequestSubmit}
          />
          <GridPanel variant="login" />
        </>
      )}

      {mode === 'forgot_otp' && (
        <>
          <ForgotOtpForm
            method={contactMethod}
            contactValue={contactValue}
            onGoBack={() => setMode('forgot_request')}
            onVerify={() => setMode('forgot_reset')}
          />
          <GridPanel variant="login" />
        </>
      )}

      {mode === 'forgot_reset' && (
        <>
          <ForgotResetForm
            onGoBack={() => setMode('forgot_otp')}
            onResetSuccess={() => setMode('forgot_success')}
          />
          <GridPanel variant="login" />
        </>
      )}

      {mode === 'forgot_success' && (
        <>
          <ForgotSuccessForm
            onGoLogin={() => setMode('login')}
          />
          <GridPanel variant="login" />
        </>
      )}
    </div>
  );
};
