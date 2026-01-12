import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ClientDashboard() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const fetchMyGigs = async () => {
    try {
      const res = await api.get("/gigs/my");
      setGigs(res.data);
      toast.success("Dashboard updated", {
        icon: '📊',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    } catch (err) {
      toast.error("Failed to sync dashboard");
      console.error("Error fetching jobs", err);
    } finally {
      setLoading(false);
    }
  };

  // Stats calculation
  const totalBudget = gigs.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
  const activeJobs = gigs.filter(g => g.status === 'open').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Client Dashboard</h1>
            <p className="text-gray-500 font-medium">Manage your posted projects and hiring status</p>
          </div>
          <Link 
            to="/create-gig" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95"
          >
            <span className="text-xl">+</span> Post a New Job
          </Link>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Jobs</p>
            <h3 className="text-3xl font-black text-gray-900">{gigs.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-1">Total Budget</p>
            <h3 className="text-3xl font-black text-gray-900">₹{totalBudget.toLocaleString('en-IN')}</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-indigo-500 text-xs font-black uppercase tracking-widest mb-1">Active Now</p>
            <h3 className="text-3xl font-black text-gray-900">{activeJobs}</h3>
          </div>
        </div>

        {/* JOBS LIST */}
        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          Your Postings 
          <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
        </h2>

        {gigs.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800">No jobs posted yet</h3>
            <p className="text-gray-500 mt-2">Create your first job posting to start receiving bids from top talent.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="font-black text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {gig.title}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        gig.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {gig.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium line-clamp-1">
                      {gig.description || "No description provided"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Budget</p>
                      <p className="text-xl font-black text-gray-900">₹{Number(gig.budget).toLocaleString('en-IN')}</p>
                    </div>
                    
                    <Link
                      to={`/gigs/${gig._id}`}
                      className="bg-gray-50 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-2"
                    >
                      Manage <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}