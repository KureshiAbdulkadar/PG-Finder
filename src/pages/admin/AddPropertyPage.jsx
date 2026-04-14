import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 1, title: 'Basics', desc: 'Category & Location' },
  { id: 2, title: 'Visuals', desc: 'Photos & Gallery' },
  { id: 3, title: 'Details', desc: 'Pricing & Amenities' },
  { id: 4, title: 'Rules', desc: 'House Policies' },
];

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        navigate('/admin/properties');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Wizard Progress Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-black text-text-primary tracking-tighter mb-8 text-center">List Your PG on the Hub</h1>
        <div className="flex items-center justify-between relative px-4">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0 mx-10"></div>
            {STEPS.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 border-4 border-white shadow-xl ${
                        currentStep >= step.id ? 'bg-brand-red text-white scale-110' : 'bg-background text-text-muted opacity-60'
                    }`}>
                        {step.id}
                    </div>
                    <div className="absolute top-16 text-center whitespace-nowrap">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${currentStep === step.id ? 'text-brand-red' : 'text-text-muted'}`}>{step.title}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-premium border border-border/40 mt-16 animate-slide-up">
        {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
                <div>
                   <h2 className="text-[22px] font-black text-text-primary tracking-tight mb-2">Step 1: The Basics</h2>
                   <p className="text-text-secondary font-medium">Tell us about the core details of your property.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-text-muted ml-1">PG Name</label>
                        <input type="text" placeholder="e.g. Royal Living PG" className="w-full bg-background border-2 border-transparent focus:border-brand-red p-4 rounded-2xl outline-none font-bold text-text-primary transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-text-muted ml-1">Category</label>
                        <select className="w-full bg-background border-2 border-transparent focus:border-brand-red p-4 rounded-2xl outline-none font-bold text-text-primary transition-all">
                            <option>Girls Only</option>
                            <option>Boys Only</option>
                            <option>Couple Friendly</option>
                            <option>Luxe</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2 text-left">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted ml-1">Full Address</label>
                    <textarea rows="3" placeholder="Exact location details..." className="w-full bg-background border-2 border-transparent focus:border-brand-red p-4 rounded-2xl outline-none font-bold text-text-primary transition-all resize-none"></textarea>
                </div>
            </div>
        )}

        {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
                <div>
                   <h2 className="text-[22px] font-black text-text-primary tracking-tight mb-2">Step 2: Visual Experience</h2>
                   <p className="text-text-secondary font-medium">Upload high-quality images to build immediate trust with tenants.</p>
                </div>
                <div className="border-4 border-dashed border-border rounded-[32px] py-16 flex flex-col items-center justify-center text-text-muted hover:border-brand-red/40 hover:bg-brand-red/5 transition-all group cursor-pointer">
                    <span className="material-symbols-outlined text-[64px] mb-4 group-hover:scale-110 transition-transform">cloud_upload</span>
                    <p className="font-black text-sm uppercase tracking-widest">Drop Images or Click to Upload</p>
                    <p className="text-xs font-medium mt-2">Maximum 10 MB per file. Support JPEG, PNG, WEBP.</p>
                </div>
            </div>
        )}

        {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in text-left">
                <div>
                   <h2 className="text-[22px] font-black text-text-primary tracking-tight mb-2">Step 3: Details & Utility</h2>
                   <p className="text-text-secondary font-medium">Define your pricing model and highlighted amenities.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-text-muted ml-1">Monthly Pricing (₹)</label>
                        <input type="number" placeholder="e.g. 12000" className="w-full bg-background border-2 border-transparent focus:border-brand-red p-4 rounded-2xl outline-none font-black text-[20px] text-brand-red transition-all" />
                    </div>
                </div>
                <div>
                   <label className="text-[11px] font-black uppercase tracking-widest text-text-muted ml-1 block mb-4">Select Key Amenities</label>
                   <div className="flex flex-wrap gap-3">
                       {['WiFi', 'AC', 'Power Backup', 'Laundry', 'Food', 'Gym'].map(a => (
                           <label key={a} className="flex-1 min-w-[120px] bg-background border-2 border-transparent has-[:checked]:border-brand-red p-4 rounded-2xl cursor-pointer hover:bg-white hover:shadow-lg transition-all text-center">
                               <input type="checkbox" className="hidden" />
                               <span className="text-[13px] font-black uppercase tracking-widest">{a}</span>
                           </label>
                       ))}
                   </div>
                </div>
            </div>
        )}

        {currentStep === 4 && (
            <div className="space-y-8 animate-fade-in">
                <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <span className="material-symbols-outlined text-4xl fill font-variation-fill">verified_user</span>
                    </div>
                    <h2 className="text-[26px] font-black text-text-primary tracking-tighter mb-3">One Last Verification</h2>
                    <p className="text-text-secondary font-medium max-w-sm mx-auto">By submitting this listing, you confirm that all details are accurate and comply with our safety guidelines.</p>
                </div>
            </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border/60">
            <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${currentStep === 1 ? 'opacity-0' : 'hover:bg-background text-text-primary'}`}
            >
                <span className="material-symbols-outlined font-black">arrow_back</span>
                Back
            </button>
            
            {currentStep < STEPS.length ? (
                <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-text-primary text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-wider hover:brightness-125 active:scale-95 transition-all shadow-xl"
                >
                    Save & Continue
                    <span className="material-symbols-outlined font-black">arrow_forward</span>
                </button>
            ) : (
                <button 
                    onClick={handleFinish}
                    disabled={isSubmitting}
                    className="flex items-center gap-3 bg-brand-red text-white px-12 py-5 rounded-2xl font-black text-lg uppercase tracking-tighter hover:brightness-110 active:scale-95 transition-all shadow-xl disabled:bg-text-muted"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <span className="material-symbols-outlined font-black">rocket_launch</span>
                            Publish PG
                        </>
                    )}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
