import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchMe } from "./redux/authSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetail from "./pages/GigDetail";
import CreateGig from "./pages/CreateGig";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientDashboard from "./pages/ClientDashboard"; // Add this import
import FreelancerDashboard from "./pages/FreelancerDashboard"; // Add this import
import HowItWorks from './pages/HowItWorks';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gigs/:id" element={<GigDetail />} />
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route
  path="/create-gig"
  element={
    <ProtectedRoute>
      <CreateGig />
    </ProtectedRoute>
  }
/>
<Route path="/client-dashboard" element={
  <ProtectedRoute>
    <ClientDashboard />
  </ProtectedRoute>
} />

<Route path="/freelancer-dashboard" element={
  <ProtectedRoute>
    <FreelancerDashboard />
  </ProtectedRoute>
} />

      </Routes>
    </BrowserRouter>
    
  );
}



export default App;