import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Show loading toast
      const toastId = toast.loading("Logging out...", {
        style: {
          background: '#1F2937',
          color: '#F9FAFB',
          border: '1px solid #374151',
          borderRadius: '12px',
        }
      });
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Clear the Redux state and storage
      await dispatch(logoutUser());
      
      // Update toast to success
      toast.dismiss(toastId);
      toast.success("Successfully logged out!", {
        icon: '👋',
        style: {
          background: '#10B981',
          color: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '600',
        },
        duration: 2000,
      });
      
      // Force navigation to login with delay
      setTimeout(() => {
        navigate("/login");
      }, 500);
      
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        style: {
          background: '#EF4444',
          color: '#FFFFFF',
          borderRadius: '12px',
          fontWeight: '600',
        }
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/30 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        {/* LOGO WITH ANIMATION */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group relative overflow-hidden py-1"
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          {/* Logo Icon with glow */}
          <div className="relative z-10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <span className="drop-shadow-md">G</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </div>
          
          {/* Logo Text */}
          <div className="relative z-10">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Gig<span className="text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text">Flow</span>
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-3">
          
          {!user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="relative px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 rounded-xl group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              </Link>
              <Link 
                to="/register" 
                className="relative px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-[1.02] transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Join Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </Link>
            </div>
          ) : (
            <>
              {/* Main Navigation Links */}
              <div className="hidden md:flex items-center gap-1 mr-4">
                <Link 
                  to="/" 
                  className="px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 relative group"
                >
                  <span>Browse Jobs</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>
                
                <Link 
                  to="/how-it-works" 
                  className="px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 relative group"
                >
                  <span>How It Works</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>
              </div>

              {/* Post Job Button */}
              <Link 
                to="/create-gig" 
                className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 group overflow-hidden mr-3"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Post Job
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </Link>

              {/* User Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-all duration-300 outline-none group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-sm font-black text-indigo-400 shadow-lg shadow-indigo-500/10">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:rotate-180 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-3 w-56 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="px-5 py-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-white/5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Welcome back</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-black text-white">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email || "Verified User"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-2">
                    <Link 
                      to="/client-dashboard" 
                      className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span className="text-blue-400">📋</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">My Projects</p>
                        <p className="text-xs text-gray-500">Manage your postings</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-600 group-hover/item:text-white group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <Link 
                      to="/freelancer-dashboard" 
                      className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group/item border-b border-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span className="text-emerald-400">💼</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">My Applications</p>
                        <p className="text-xs text-gray-500">Track your bids</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-600 group-hover/item:text-white group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200 group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span className="text-red-400">🚪</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold">Logout</p>
                        <p className="text-xs text-red-500/70">End your session</p>
                      </div>
                      <svg className="w-4 h-4 text-red-500/50 group-hover/item:text-red-400 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}