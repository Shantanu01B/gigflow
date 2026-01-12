import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: 1,
      title: "Sign Up & Create Profile",
      description: "Create your free account in 60 seconds. Build a compelling profile showcasing your skills, experience, and portfolio.",
      icon: "👤",
      color: "from-blue-500 to-cyan-500",
      features: ["Free registration", "Profile verification", "Skill assessment", "Portfolio showcase"]
    },
    {
      number: 2,
      title: "Browse or Post Projects",
      description: "Explore thousands of available projects or post your own requirements with detailed specifications and budget.",
      icon: "🔍",
      color: "from-purple-500 to-pink-500",
      features: ["Advanced filters", "Real-time notifications", "Budget range", "Category sorting"]
    },
    {
      number: 3,
      title: "Connect & Communicate",
      description: "Chat directly with clients or freelancers, share files, and discuss project details in real-time.",
      icon: "💬",
      color: "from-emerald-500 to-teal-500",
      features: ["Secure messaging", "Video calls", "File sharing", "Progress tracking"]
    },
    {
      number: 4,
      title: "Complete & Get Paid",
      description: "Submit your work, get feedback, and receive secure payments through our escrow system.",
      icon: "💰",
      color: "from-amber-500 to-orange-500",
      features: ["Escrow protection", "Milestone payments", "Dispute resolution", "Secure transfers"]
    }
  ];

  const stats = [
    { value: "95%", label: "Client Satisfaction", desc: "Based on 10K+ reviews" },
    { value: "<24h", label: "Avg. Hiring Time", desc: "Quick project start" },
    { value: "10K+", label: "Monthly Projects", desc: "Active opportunities" },
    { value: "4.8/5", label: "Platform Rating", desc: "Trusted by professionals" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #4f46e5 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-full shadow-lg shadow-indigo-200 mb-6">
              <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Simple & Secure</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">GigFlow</span> Works
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              From finding the perfect project to getting paid securely. Our platform makes freelancing simple, safe, and successful.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-indigo-200/30 transition-all duration-300"
                >
                  <p className="text-4xl font-black text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-sm font-bold text-gray-700 mb-1">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Start Working in 4 Simple Steps</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Whether you're hiring talent or finding work, our process is designed for success
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-emerald-200 -translate-x-1/2"></div>
            
            {/* Steps Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`relative ${index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2 lg:text-left'}`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Card */}
                  <div className={`relative bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-200/30 ${
                    activeStep === index ? 'scale-[1.02] border-indigo-200' : ''
                  }`}>
                    {/* Step Number Indicator */}
                    <div className={`absolute -top-4 ${index % 2 === 0 ? 'lg:right-8 right-8' : 'lg:left-8 left-8'} w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                      {step.number}
                    </div>
                    
                    {/* Step Icon */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-6 mx-auto lg:mx-0 ${
                      index % 2 === 0 ? 'lg:ml-auto' : ''
                    }`}>
                      {step.icon}
                    </div>
                    
                    {/* Step Content */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                      
                      {/* Features List */}
                      <div className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></div>
                            <span className="text-sm font-medium text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className={`hidden lg:block absolute top-8 ${
                    index % 2 === 0 ? 'lg:right-[-56px]' : 'lg:left-[-56px]'
                  } w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-black shadow-lg transition-transform duration-300 ${
                    activeStep === index ? 'scale-125' : ''
                  }`}>
                    {step.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center gap-4 mt-16">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTAs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Clients */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">For Clients & Businesses</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Find vetted talent, manage projects efficiently, and scale your team with our enterprise-ready platform.
                </p>
                <ul className="space-y-4 mb-10">
                  {["Post projects for free", "Access 10K+ freelancers", "Secure payment system", "Dedicated support"].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/create-gig" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-gray-900 rounded-2xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                >
                  Post a Project
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* For Freelancers */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 relative overflow-hidden border border-indigo-100">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-20 -translate-x-20"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4">For Freelancers & Agencies</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Showcase your skills, find quality projects, and grow your business with our powerful tools.
                </p>
                <ul className="space-y-4 mb-10">
                  {["Build your portfolio", "Bid on projects", "Secure payments", "Build reputation"].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/register" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300 group"
                >
                  Join as Freelancer
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Get answers to common questions about using GigFlow</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How much does it cost to post a project?",
                a: "Posting projects is completely free for clients. We only charge a small service fee when you hire a freelancer and the project begins."
              },
              {
                q: "How do payments work?",
                a: "We use an escrow system where clients fund milestones in advance. Payments are released to freelancers upon milestone completion and client approval."
              },
              {
                q: "Can I hire freelancers for long-term projects?",
                a: "Yes! Many of our clients hire freelancers for ongoing work. You can set up recurring payments and manage long-term contracts through our platform."
              },
              {
                q: "What if I'm not satisfied with the work?",
                a: "We offer a dispute resolution process and money-back guarantee for funded milestones that don't meet the agreed requirements."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/30 border border-gray-100 hover:border-indigo-200 transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-8">Still have questions? Our support team is here to help!</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
              Contact Support
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}