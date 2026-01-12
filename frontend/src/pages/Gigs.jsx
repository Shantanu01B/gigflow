import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGigs();
  }, [search]);

  const fetchGigs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/gigs?search=${search}`);
      setGigs(res.data);
    } catch (err) {
      toast.error("Network sync failed. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- 1. PROJECT-FOCUSED HERO SECTION --- */}
      <section className="relative pt-16 pb-12 border-b border-gray-100 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white to-rose-50/30 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Platform Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 rounded-full shadow-lg shadow-indigo-200">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Trusted by 10K+ Companies</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95] animate-in fade-in slide-in-from-bottom-4 duration-700">
              Find Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Project Partner</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-600 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
              Connect with top freelancers for your projects. Post jobs, find talent, and get work done faster with our curated marketplace.
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-8 pt-2">
              {[
                { value: "500+", label: "Active Projects" },
                { value: "95%", label: "Success Rate" },
                { value: "24h", label: "Avg. Response" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-black text-indigo-600">{stat.value}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  className="w-full bg-white border-2 border-gray-200 rounded-[2rem] py-4 pl-16 pr-8 text-gray-900 font-medium placeholder:text-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-[8px] focus:ring-indigo-500/10 shadow-md hover:border-indigo-300"
                  placeholder="Search projects by skills, budget, or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all">
                    Search
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Try: "React Developer" • "Logo Design" • "Content Writing" • "SEO Expert"
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Link 
                to="/create-gig" 
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all"
              >
                Post a Project
              </Link>
              <Link 
                to="/how-it-works" 
                className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-indigo-300 hover:bg-gray-50 transition-all"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. CATEGORY QUICK-FILTERS --- */}
      <section className="py-6 border-b border-gray-50 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Browse by Category</h3>
            <p className="text-gray-600 text-sm">Find freelancers in your required field</p>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { name: 'Web Development', icon: '💻', color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { name: 'UI/UX Design', icon: '🎨', color: 'bg-purple-50 text-purple-600 border-purple-100' },
              { name: 'Digital Marketing', icon: '📈', color: 'bg-green-50 text-green-600 border-green-100' },
              { name: 'Content Writing', icon: '✍️', color: 'bg-amber-50 text-amber-600 border-amber-100' },
              { name: 'Video Editing', icon: '🎬', color: 'bg-red-50 text-red-600 border-red-100' },
              { name: 'Mobile Apps', icon: '📱', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' }
            ].map((cat) => (
              <button 
                key={cat.name} 
                className={`px-5 py-3 border rounded-2xl text-sm font-bold transition-all hover:scale-105 hover:shadow-md flex items-center gap-2 ${cat.color}`}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. DYNAMIC JOB GRID (MAIN CONTENT) --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Featured Projects</h2>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {gigs.length} Projects currently accepting bids
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Sort by: <span className="font-bold">Latest</span>
            </button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-gray-50 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : gigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div 
                key={gig._id} 
                className="group relative bg-white rounded-[2rem] border border-gray-100 p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-2"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Budget</p>
                      <p className="text-xl font-black text-gray-900">₹{Number(gig.budget).toLocaleString("en-IN")}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                    {gig.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-gray-100 flex items-center gap-1">
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      2h ago
                    </span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-indigo-100">
                      Remote
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                      {gig.category || 'Development'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                    {gig.description || 'Looking for a skilled professional to complete this project efficiently and effectively.'}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">Posted by</p>
                      <p className="text-xs text-gray-500">{gig.client?.name || 'Verified Client'}</p>
                    </div>
                  </div>
                  <Link
                    to={`/gigs/${gig._id}`}
                    className="group/btn relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-[1.25rem] font-bold text-sm uppercase tracking-[0.05em] transition-all hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl hover:shadow-indigo-200 overflow-hidden"
                  >
                    <span className="relative z-10 transition-transform group-hover/btn:-translate-x-2">View Details</span>
                    <svg className="absolute right-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:-translate-x-2 transition-all" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gradient-to-b from-gray-50 to-white rounded-[2.5rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-400">
                <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-400 mb-2">No projects match your search.</p>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Try adjusting your search terms or browse different categories. New projects are posted daily!
            </p>
          </div>
        )}
      </main>

      {/* --- 4. TRUST BADGES SECTION --- */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ 
              backgroundImage: 'linear-gradient(45deg, #4f46e5 25%, transparent 25%, transparent 50%, #4f46e5 50%, #4f46e5 75%, transparent 75%, transparent)',
              backgroundSize: '40px 40px'
            }}></div>
            
            <div className="relative z-10 max-w-md text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">Ready to Start Your Project?</h2>
              <p className="text-gray-300 mb-6">
                Join thousands of businesses that have found success with our platform. Post your project and get matched with verified freelancers.
              </p>
              <Link 
                to="/create-gig" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:from-indigo-400 hover:to-purple-400 hover:text-white transition-all group"
              >
                Post Your Project Now
                <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            
            <div className="relative z-10 grid grid-cols-2 gap-8 md:gap-12">
              {[
                { n: "10K+", t: "Verified Freelancers", desc: "Top talent vetted" },
                { n: "4.9/5", t: "Client Rating", desc: "Based on reviews" },
                { n: "99%", t: "Success Rate", desc: "Projects completed" },
                { n: "48h", t: "Avg. Hiring Time", desc: "Quick match" }
              ].map((s) => (
                <div key={s.t} className="text-center">
                  <p className="text-3xl font-black text-white mb-1">{s.n}</p>
                  <p className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-1">{s.t}</p>
                  <p className="text-xs text-gray-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}