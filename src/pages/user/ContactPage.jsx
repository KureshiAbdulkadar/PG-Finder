import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import properties from '../../data/properties.json';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  const [step, setStep] = useState(1); // 1: Details/Message, 2: Success
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!property) return <div className="py-20 text-center font-bold">Property not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1000);
  };

  return (
    <div className="py-10 md:py-16 min-h-screen bg-background">
      <PageWrapper className="max-w-xl">
        {step === 1 && (
            <div className="animate-fade-in">
                <div className="flex items-center gap-4 mb-8">
                    <Link to={`/property/${id}`} className="hover:bg-white p-2 border border-transparent hover:border-border rounded-full transition-all">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-2xl font-black tracking-tight">{t('contactOwner', 'Contact Property Owner')}</h1>
                </div>

                <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
                    {/* Compact Property Info Card */}
                    <div className="p-6 bg-brand-red/5 border-b border-border flex items-center gap-4">
                        <img 
                            src={property.images?.[0]} 
                            alt={property.title} 
                            className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-sm" 
                        />
                        <div>
                            <h3 className="font-bold text-text-primary">{property.title}</h3>
                            <p className="text-sm text-text-secondary font-medium">{property.location.area}, {property.location.city}</p>
                            <p className="text-brand-red font-bold mt-1">₹{property.price.toLocaleString()} / month</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[12px] font-bold uppercase tracking-wider text-text-secondary mb-2">First Name</label>
                                <input type="text" required placeholder="John" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-red font-medium transition-all" />
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold uppercase tracking-wider text-text-secondary mb-2">Last Name</label>
                                <input type="text" required placeholder="Doe" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-red font-medium transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[12px] font-bold uppercase tracking-wider text-text-secondary mb-2">Phone Number</label>
                            <input type="tel" required placeholder="+91 98765 43210" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-red font-medium transition-all" />
                        </div>

                        <div>
                            <label className="block text-[12px] font-bold uppercase tracking-wider text-text-secondary mb-2">Your Message</label>
                            <textarea 
                                required
                                rows="4"
                                placeholder="Hi, I'm interested in this PG. Please share more details or a contact number."
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-red font-medium transition-all resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-brand-red text-white py-4 rounded-xl font-black text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined fill font-variation-fill">send</span>
                                    Send Inquiry
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <p className="text-center text-xs text-text-muted mt-6 px-10">
                    By clicking "Send Inquiry", you agree to our terms and to be contacted by the property owner regarding this request.
                </p>
            </div>
        )}

        {step === 2 && (
            <div className="animate-scale-in flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-green-600 text-[48px] font-bold">check_circle</span>
                </div>
                <h2 className="text-3xl font-black text-text-primary mb-3">Inquiry Sent!</h2>
                <p className="text-text-secondary font-medium mb-10 max-w-sm">
                    The owner of {property.title} has been notified. They will contact you on your provided phone number shortly.
                </p>
                <Link 
                    to="/" 
                    className="bg-text-primary text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:brightness-125 transition-all"
                >
                    Back to Home
                </Link>
            </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default ContactPage;
