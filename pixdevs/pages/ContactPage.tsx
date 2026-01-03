import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

const ContactPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        timeline: '',
        projectTypes: [] as string[],
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleProjectTypeChange = (type: string) => {
        setFormData(prev => ({
            ...prev,
            projectTypes: prev.projectTypes.includes(type)
                ? prev.projectTypes.filter(t => t !== type)
                : [...prev.projectTypes, type]
        }));
    };

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGddapwiVlO0vsTKgR0a01MmwvMLGNpteLFOJHvPVGb9Wh4TyjCavaKaXCR30lwP1i/exec';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Show success toast
            setShowToast(true);
            setFormData({ name: '', email: '', phone: '', company: '', timeline: '', projectTypes: [], message: '' });

            // Redirect to home after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const projectTypeOptions = [
        { id: 'uiux', label: 'UI/UX Design' },
        { id: 'automation', label: 'Automation' },
        { id: 'data', label: 'Data Analysis' },
        { id: 'fullstack', label: 'Full Stack' },
        { id: 'aiml', label: 'AI & ML / Gen AI' }
    ];

    const timelineOptions = [
        'ASAP',
        '1-2 months',
        '2-3 months',
        '3-6 months',
        'Flexible'
    ];

    return (
        <section className="relative min-h-screen w-full bg-background pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto w-full">

                {/* Bento Grid Layout */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

                    {/* Header Block - Main */}
                    <div className="col-span-1 md:col-span-8 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group reveal-on-scroll hover:border-zinc-700 transition-all duration-500">
                        {/* Content */}
                        <div className="relative z-10">
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 block group-hover:text-zinc-400 transition-colors duration-300">
                                Start a Project
                            </span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-[0.95] tracking-tight mb-6">
                                Let's Build <br />
                                <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors duration-500">Something Great</span>
                            </h1>
                            <p className="text-lg text-zinc-400 max-w-md leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                Tell us about your vision. The more details you share, the better we can understand your needs.
                            </p>
                        </div>

                        {/* Rotating Badge */}
                        <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 z-20">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <path
                                            id="contactTextPath"
                                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                            fill="transparent"
                                        />
                                        <text className="text-[11px] font-mono uppercase tracking-[0.2em] fill-zinc-400">
                                            <textPath href="#contactTextPath" startOffset="0%">
                                                Contact • Collaborate • Create • Connect •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/20 group-hover:shadow-white/40 transition-shadow duration-500">
                                    <Send className="w-5 h-5 text-black" />
                                </div>
                            </div>
                        </div>

                        {/* Gradient Accent */}
                        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-zinc-700/20 transition-colors duration-700" />
                    </div>

                    {/* CTA Badge Block */}
                    <div className="col-span-1 md:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 reveal-on-scroll">
                        <div className="flex justify-between items-start">
                            <h3 className="text-3xl font-display font-medium text-white leading-tight group-hover:translate-x-2 transition-transform duration-500">
                                Quick <br /> Response
                            </h3>
                            <div className="bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                <Send className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-12">
                            <p className="text-sm text-zinc-400 mb-4 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                We typically respond within 24 hours. For urgent inquiries, please mention it in your message.
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">Available Now</span>
                            </div>
                        </div>
                    </div>

                    {/* Your Details Block */}
                    <div className="col-span-1 md:col-span-6 bg-black border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 reveal-on-scroll hover:border-zinc-700 transition-all duration-500">
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 block">
                            Your Details
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'name', label: 'Full Name *', placeholder: 'John Doe', type: 'text', required: true },
                                { name: 'email', label: 'Email *', placeholder: 'john@company.com', type: 'email', required: true },
                                { name: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', type: 'tel', required: false },
                                { name: 'company', label: 'Company', placeholder: 'Acme Inc.', type: 'text', required: false }
                            ].map(field => (
                                <div key={field.name} className="relative group">
                                    <label className={`block text-sm mb-2 transition-colors duration-300 ${focusedField === field.name ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData] as string}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField(field.name)}
                                        onBlur={() => setFocusedField(null)}
                                        required={field.required}
                                        className={`w-full px-4 py-3.5 bg-zinc-900/50 border rounded-xl text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${focusedField === field.name
                                            ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.02]'
                                            : 'border-zinc-800 hover:border-zinc-700'
                                            }`}
                                        placeholder={field.placeholder}
                                    />
                                    {/* Focus indicator line */}
                                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-emerald-500 rounded-full transition-all duration-300 ${focusedField === field.name ? 'w-full opacity-100' : 'w-0 opacity-0'
                                        }`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Types Block */}
                    <div className="col-span-1 md:col-span-6 bg-zinc-800/80 border border-zinc-700 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden reveal-on-scroll hover:border-zinc-600 transition-all duration-500">
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6 block">
                            What do you need? *
                        </span>
                        <div className="flex flex-wrap gap-[35px]">
                            {projectTypeOptions.map((option, index) => (
                                <label
                                    key={option.id}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    className={`group flex items-center gap-3 px-5 py-3 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${formData.projectTypes.includes(option.label)
                                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                        : 'bg-zinc-900/50 border-zinc-700 hover:bg-zinc-900 hover:border-zinc-600 hover:shadow-lg'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.projectTypes.includes(option.label)}
                                        onChange={() => handleProjectTypeChange(option.label)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${formData.projectTypes.includes(option.label)
                                        ? 'bg-emerald-500 border-emerald-500 scale-110'
                                        : 'border-zinc-600 group-hover:border-zinc-500 group-hover:scale-105'
                                        }`}>
                                        {formData.projectTypes.includes(option.label) && (
                                            <svg className="w-3 h-3 text-white animate-[scale-in_0.2s_ease-out]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${formData.projectTypes.includes(option.label) ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'
                                        }`}>
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />
                    </div>

                    {/* Message Block */}
                    <div className="col-span-1 md:col-span-8 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 reveal-on-scroll hover:border-zinc-700 transition-all duration-500 group">
                        <span className={`text-xs font-mono uppercase tracking-widest mb-6 block transition-colors duration-300 ${focusedField === 'message' ? 'text-emerald-400' : 'text-zinc-500'}`}>
                            Project Details *
                        </span>
                        <div className="relative">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                required
                                rows={5}
                                className={`w-full px-4 py-3.5 bg-zinc-900/80 border rounded-xl text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 resize-none ${focusedField === 'message'
                                    ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                                    : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                                placeholder="Tell us about your project goals, target audience, specific features you need, and any inspiration or references..."
                            />
                            {/* Character count indicator */}
                            <div className={`absolute bottom-3 right-3 text-xs font-mono transition-colors duration-300 ${formData.message.length > 500 ? 'text-emerald-400' : 'text-zinc-600'
                                }`}>
                                {formData.message.length}/1000
                            </div>
                        </div>
                    </div>

                    {/* Timeline Block */}
                    <div className="col-span-1 md:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between reveal-on-scroll hover:border-zinc-700 transition-all duration-500 group">
                        <div>
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 block group-hover:text-zinc-400 transition-colors duration-300">
                                Timeline
                            </span>
                            <select
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 appearance-none cursor-pointer hover:border-zinc-700"
                            >
                                <option value="" className="bg-zinc-900">Select timeline...</option>
                                {timelineOptions.map(option => (
                                    <option key={option} value={option} className="bg-zinc-900">{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-6 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300" />
                            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">Flexible timelines available</span>
                        </div>
                    </div>

                    {/* Submit Button Block */}
                    <div className="col-span-1 md:col-span-12 reveal-on-scroll">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full bg-white hover:bg-zinc-100 text-black font-medium text-lg px-8 py-5 rounded-full transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-6 h-6 border-2 border-zinc-300 border-t-black rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Submit Project Brief
                                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>

            {/* Custom Keyframes Style */}
            <style>{`
                @keyframes scale-in {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                @keyframes slide-in {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes progress {
                    0% { width: 100%; }
                    100% { width: 0%; }
                }
            `}</style>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-50 animate-[slide-in_0.5s_ease-out]">
                    <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] max-w-md">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-semibold text-lg mb-1">Message Sent!</h4>
                                <p className="text-zinc-400 text-sm">Your project brief has been sent successfully. Redirecting to home...</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowToast(false);
                                    navigate('/');
                                }}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full animate-[progress_3s_linear]" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactPage;
