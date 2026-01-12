import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../services/api";
import socket from "../socket";
import toast from "react-hot-toast";
import { 
  Calendar, 
  IndianRupee, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Edit3, 
  Briefcase 
} from "lucide-react";

export default function GigDetail() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingBidId, setEditingBidId] = useState(null);
  const [hiringBidId, setHiringBidId] = useState(null);

  useEffect(() => {
    fetchGig();
    fetchBids();
    socket.emit("joinGig", id);
    socket.on("newBid", () => fetchBids());
    socket.on("bidHired", () => {
      fetchGig();
      fetchBids();
    });

    return () => {
      socket.off("newBid");
      socket.off("bidHired");
    };
  }, [id]);

  const fetchGig = async () => {
    try {
      const res = await api.get(`/gigs/${id}`);
      setGig(res.data);
    } catch {
      setGig(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const res = await api.get(`/bids/gig/${id}`);
      setBids(res.data);
    } catch {
      setBids([]);
    }
  };

  const submitBid = async (e) => {
    e.preventDefault();
    if (!message || !bidAmount) return toast.error("Please fill all fields");
    setSubmitting(true);
    try {
      await api.post("/bids", { gigId: id, message, bidAmount });
      setMessage("");
      setBidAmount("");
      fetchBids();
      toast.success("Bid submitted successfully! 🚀");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit bid");
    } finally {
      setSubmitting(false);
    }
  };

  const updateBid = async () => {
    setSubmitting(true);
    try {
      await api.put(`/bids/${editingBidId}`, { message, bidAmount });
      setEditingBidId(null);
      setMessage("");
      setBidAmount("");
      fetchBids();
      toast.success("Bid updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update bid");
    } finally {
      setSubmitting(false);
    }
  };

  const hireFreelancer = async (bidId) => {
    setHiringBidId(bidId);
    const loadingToast = toast.loading("Processing hiring...");
    try {
      await api.patch(`/bids/${bidId}/hire`);
      fetchGig();
      fetchBids();
      toast.success("Freelancer hired! 🎉", { id: loadingToast });
    } catch (err) {
      toast.error(err.response?.data?.message || "Hiring failed", { id: loadingToast });
    } finally {
      setHiringBidId(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (!gig) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Job Not Found</h2>
    </div>
  );

  const isOwner = user && gig.ownerId?._id === user._id;
  const userBid = bids.find((b) => b.freelancerId?._id === user?._id);
  const hasBid = Boolean(userBid);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER SECTION - JOB DETAILS */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-50 text-indigo-700 mb-3">
                  {gig.status === "open" ? "🟢 Recruiting" : "🔵 In Progress"}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{gig.title}</h1>
              </div>
              <div className="text-right">
                <div className="flex items-center text-2xl font-bold text-emerald-600">
                  <IndianRupee className="w-6 h-6" />
                  <span>{Number(gig.budget).toLocaleString("en-IN")}</span>
                </div>
                <p className="text-sm text-gray-400 font-medium">Fixed Price</p>
              </div>
            </div>

            <div className="prose prose-indigo max-w-none text-gray-600 mb-8 whitespace-pre-line leading-relaxed">
              {gig.description}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-50">
              <div className="flex items-center text-gray-500 text-sm">
                <User className="w-4 h-4 mr-2 text-indigo-500" />
                <span>Posted by <span className="font-semibold text-gray-800">{gig.ownerId?.name}</span></span>
              </div>
              <div className="flex items-center text-gray-500 text-sm md:justify-end">
                <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                <span>{formatDate(gig.createdAt)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* USER BID STATUS BADGE */}
        {userBid && (
          <div className={`flex items-center gap-4 rounded-2xl p-6 border shadow-sm animate-in slide-in-from-left duration-500 ${
            userBid.status === "pending" ? "bg-amber-50 border-amber-200" :
            userBid.status === "hired" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
          }`}>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              {userBid.status === "hired" ? <CheckCircle2 className="text-emerald-500" /> : <Clock className="text-amber-500" />}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">
                {userBid.status === "pending" && "Your bid is currently under review"}
                {userBid.status === "hired" && "Congratulations! You've been hired for this gig"}
                {userBid.status === "rejected" && "Your bid was not selected this time"}
              </h3>
              <p className="text-sm text-gray-600">You quoted <span className="font-bold">₹{userBid.bidAmount}</span></p>
            </div>
            {userBid.status === "pending" && !editingBidId && (
              <button 
                onClick={() => {
                  setEditingBidId(userBid._id);
                  setMessage(userBid.message);
                  setBidAmount(userBid.bidAmount);
                }}
                className="px-4 py-2 bg-white border border-amber-200 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium text-sm shadow-sm"
              >
                Edit Proposal
              </button>
            )}
          </div>
        )}

        {/* BID FORM / EDIT FORM */}
        {((user && !isOwner && gig.status === "open" && !hasBid) || editingBidId) && (
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-50 p-8 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Send size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{editingBidId ? "Refine Your Proposal" : "Submit Your Proposal"}</h3>
            </div>

            <form onSubmit={editingBidId ? (e) => { e.preventDefault(); updateBid(); } : submitBid} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Proposal Details</label>
                <textarea
                  className="w-full border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50 min-h-[150px]"
                  placeholder="Explain why you are the best fit for this project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Bid Amount (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    className="w-full border-gray-200 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50"
                    placeholder="0.00"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  disabled={submitting}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? "Processing..." : editingBidId ? "Update Proposal" : "Send Proposal"}
                </button>
                {editingBidId && (
                  <button
                    type="button"
                    onClick={() => { setEditingBidId(null); setMessage(""); setBidAmount(""); }}
                    className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* OWNER VIEW - BID LIST */}
        {isOwner && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase className="text-indigo-600" />
                Received Bids
                <span className="ml-2 text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{bids.length}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {bids.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-gray-300">
                  <p className="text-gray-500 font-medium">No bids received yet. Your gig is still being promoted!</p>
                </div>
              ) : (
                bids.map((bid) => (
                  <div
                    key={bid._id}
                    className={`group bg-white p-6 rounded-2xl border transition-all duration-300 ${
                      bid.status === "hired" ? "border-emerald-500 ring-1 ring-emerald-500" : "border-gray-100 hover:border-indigo-300 hover:shadow-xl hover:shadow-gray-100"
                    }`}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                          {bid.freelancerId?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{bid.freelancerId?.name}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={12} /> {formatDate(bid.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{bid.bidAmount}</p>
                        {bid.status === "hired" && (
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center justify-end gap-1">
                            <CheckCircle2 size={12} /> Hired
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl mb-6 italic leading-relaxed">
                      "{bid.message}"
                    </p>

                    {gig.status === "open" && bid.status === "pending" && (
                      <button
                        onClick={() => hireFreelancer(bid._id)}
                        disabled={hiringBidId === bid._id}
                        className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                      >
                        {hiringBidId === bid._id ? "Hiring..." : "Hire this Freelancer"}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
