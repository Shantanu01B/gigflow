import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      toast.success("Already logged in!", {
        icon: '👋',
        style: {
          background: '#10B981',
          color: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '600',
        }
      });
      navigate("/");
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        style: {
          background: '#EF4444',
          color: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '600',
        }
      });
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Authenticating...", {
      style: {
        background: '#1F2937',
        color: '#F9FAFB',
        border: '1px solid #374151',
        borderRadius: '12px',
      }
    });

    try {
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        toast.dismiss(toastId);
        toast.success("Welcome back! 🎉", {
          style: {
            background: '#10B981',
            color: '#FFFFFF',
            borderRadius: '12px',
            fontWeight: '600',
          },
          duration: 2000,
        });
        navigate("/");
      } else {
        toast.dismiss(toastId);
        toast.error(result.payload || "Invalid credentials", {
          style: {
            background: '#EF4444',
            color: '#FFFFFF',
            borderRadius: '12px',
            fontWeight: '600',
          }
        });
        setError(result.payload || "Invalid credentials");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: '#EF4444',
          color: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '600',
        }
      });
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (type) => {
    if (type === 'client') {
      setEmail("admin@gmail.com");
      setPassword("admin123");
      toast.success("Client credentials filled!", {
        icon: '👔',
        style: {
          background: '#3B82F6',
          color: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '600',
        }
      });
    } else {
      setEmail("user@gmail.com");
      setPassword("user123");
      toast.success("Freelancer credentials filled!", {
        icon: '💼',
        style: {
          background: '#8B5CF6',
          color: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '600',
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Floating Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-200/30 border border-white/20 overflow-hidden">
          {/* Decorative Header */}
          <div className="relative h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-black text-white">G</span>
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  GigFlow
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-black text-gray-900 text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Sign in to your account to continue
            </p>

            {/* Demo Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => fillDemoCredentials('client')}
                className="group relative p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white">👔</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Client Demo</p>
                    <p className="text-xs text-gray-500">admin@gmail.com</p>
                  </div>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-3/4 transition-all duration-300"></div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoCredentials('freelancer')}
                className="group relative p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white">💼</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Freelancer Demo</p>
                    <p className="text-xs text-gray-500">user@gmail.com</p>
                  </div>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300"></div>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or sign in manually</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-5">
              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 font-medium placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-[8px] focus:ring-indigo-500/10"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-4 pl-12 pr-12 text-gray-900 font-medium placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-[8px] focus:ring-indigo-500/10"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 overflow-hidden ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Trusted by 10,000+ professionals worldwide</p>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}