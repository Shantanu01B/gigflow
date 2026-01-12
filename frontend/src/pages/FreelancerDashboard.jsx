import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function FreelancerDashboard() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBids();
  }, []);

  const fetchMyBids = async () => {
    try {
      const res = await api.get("/bids/my/bids");
      setBids(res.data);
      toast.success("Bids updated", { icon: '📉' });
    } catch (error) {
      toast.error("Failed to load your activity");
    } finally {
      setLoading(false);
    }
  };

  // Quick stats calculation
  const hiredCount = bids.filter(b => b.status === "hired").length;
  const pendingCount = bids.filter(b => b.status === "pending").length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* COMPACT HEADER & STATS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Bids & Proposals</h1>
            <p className="text-sm text-gray-500 font-medium font-sans">Track and manage your project applications</p>
          </div>
          
          <div className="flex gap-2">
            <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hired</p>
              <p className="text-lg font-black text-emerald-600">{hiredCount}</p>
            </div>
            <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p>
              <p className="text-lg font-black text-amber-500">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* BIDS LIST */}
        {bids.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-400 font-medium mb-4">You haven't placed any bids yet.</p>
            <Link to="/" className="text-indigo-600 font-bold hover:underline">Browse Gigs →</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="group bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:shadow-md flex flex-col md:flex-row gap-5"
              >
                {/* STATUS INDICATOR SIDEBAR */}
                <div className={`w-1.5 rounded-full ${
                  bid.status === 'hired' ? 'bg-emerald-500' : 
                  bid.status === 'rejected' ? 'bg-red-400' : 'bg-amber-400'
                }`} />

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h2 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {bid.gigId?.title || "Project no longer available"}
                    </h2>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-tighter ${
                        bid.status === 'hired' ? 'bg-emerald-50 text-emerald-700' : 
                        bid.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {bid.status === 'hired' ? '✓ Hired' : bid.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-gray-50 p-2.5 rounded-lg">
                      <p className="text-gray-400 font-bold uppercase mb-0.5">Job Budget</p>
                      <p className="text-gray-900 font-bold">₹{bid.gigId?.budget || "N/A"}</p>
                    </div>
                    <div className="bg-indigo-50/50 p-2.5 rounded-lg">
                      <p className="text-indigo-400 font-bold uppercase mb-0.5">Your Bid</p>
                      <p className="text-indigo-700 font-bold">₹{bid.bidAmount}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-end">
                       {bid.gigId?._id ? (
  <Link
    to={`/gigs/${bid.gigId._id}`}
    className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors text-xs flex items-center gap-1"
  >
    View Gig Details →
  </Link>
) : (
  <span className="text-gray-400 text-xs italic">
    Gig no longer available
  </span>
)}

                    </div>
                  </div>

                  <div className="relative bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                    <p className="text-gray-600 text-xs italic line-clamp-2 leading-relaxed">
                      "{bid.message}"
                    </p>
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