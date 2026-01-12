import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description || !budget) return toast.error("Please fill all fields");

    setIsSubmitting(true);
    const loadingToast = toast.loading("Publishing...");

    try {
      await api.post("/gigs", { title, description, budget });
      toast.success("Job posted successfully! 🚀", { id: loadingToast });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-500">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row min-h-[500px]">
        
        {/* LEFT PANEL: BRANDING */}
        <div className="hidden md:flex md:w-1/3 bg-gray-900 p-10 flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4 leading-tight">Post a <span className="text-indigo-400">Gig.</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect with expert freelancers and get your project started in minutes.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
              ⚡ Instant Reach
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: COMPACT FORM */}
        <div className="flex-1 p-6 sm:p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">Job Details</h2>
            <button 
              onClick={() => navigate(-1)} 
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="group">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1 tracking-widest group-focus-within:text-indigo-600 transition-colors">
                Position Title
              </label>
              <input
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-medium"
                placeholder="e.g. Senior Frontend Developer"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1 tracking-widest group-focus-within:text-indigo-600 transition-colors">
                Project Scope
              </label>
              <textarea
                rows="4"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-medium resize-none"
                placeholder="Briefly describe the tasks and requirements..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1 tracking-widest group-focus-within:text-indigo-600 transition-colors">
                Budget Allocation
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm font-bold text-gray-900"
                  placeholder="0.00"
                  onChange={(e) => setBudget(e.target.value)}
                  value={budget}
                />
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-[0.98] ${
                isSubmitting 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                : "bg-gray-900 text-white hover:bg-indigo-600 shadow-indigo-100"
              }`}
            >
              {isSubmitting ? "Syncing..." : "Publish Posting"}
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}