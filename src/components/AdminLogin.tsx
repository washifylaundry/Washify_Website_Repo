import React, { useState } from 'react';
import { WashifyLogo } from './WashifyLogo';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      // Valid credentials: admin / admin123 OR admin / washify123
      const validUser = username.trim().toLowerCase() === 'admin';
      const validPass = password === 'admin123' || password === 'washify123';

      if (validUser && validPass) {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid admin credentials. Please use username "admin" and password "admin123".');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-orange-50/20">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <WashifyLogo variant="full" size="lg" onClick={onNavigateHome} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0B2E63] text-xs font-extrabold uppercase tracking-wider border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Restricted Operations Console
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin Staff Sign In
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Authorized management access for real-time prices, banner campaigns, fleet orders, and platform settings.
          </p>
        </div>

        {/* Quick Helper Box */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-800">
            <KeyRound className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Default Access Credentials</span>
          </div>
          <p className="text-[11px] text-amber-800/90 pl-5">
            Username: <strong className="font-mono bg-white/70 px-1 py-0.5 rounded">admin</strong> | Password: <strong className="font-mono bg-white/70 px-1 py-0.5 rounded">admin123</strong>
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">Admin Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. admin)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B2E63] to-[#08224a] hover:from-[#08224a] hover:to-[#051633] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-orange-400" />
                <span>Sign In to Operations Portal</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Washify Customer Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
