"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, useTransition } from "react";
import { submitContactForm } from "@/actions/contactAction";

export default function Contact() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setStatus(null);
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus({ success: true });
        (document.getElementById("contact-form") as HTMLFormElement).reset();
      } else {
        setStatus({ error: result.error || "Something went wrong" });
      }
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 flex items-center justify-center relative z-10">
      <div className="max-w-4xl w-full">
         <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-16 text-center text-white"
        >
          Get in Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
            >
                <div>
                     <h3 className="text-2xl font-bold mb-6 text-white">Contact Info</h3>
                     <p className="text-gray-400 mb-8">
                         I&apos;m currently open to freelance opportunities and full-time positions. 
                         If you have a project in mind, let&apos;s chat!
                     </p>
                </div>
               
               <div className="space-y-6">
                   <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                       <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <Mail size={24} />
                       </div>
                       <span>hello@example.com</span>
                   </div>
                    <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                       <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <Phone size={24} />
                       </div>
                       <span>+1 234 567 890</span>
                   </div>
                    <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                       <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <MapPin size={24} />
                       </div>
                       <span>San Francisco, CA</span>
                   </div>
               </div>
            </motion.div>

            <motion.form 
                id="contact-form"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6 p-10 rounded-[2.5rem] glass-panel"
                action={handleSubmit}
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2" htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        required
                        className="ios-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500" 
                        placeholder="John Doe" 
                    />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2" htmlFor="email">Email</label>
                    <input 
                         type="email" 
                         name="email"
                         id="email"
                         required
                         className="ios-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500" 
                         placeholder="john@example.com" 
                    />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2" htmlFor="message">Message</label>
                    <textarea 
                        rows={4} 
                        name="message"
                        id="message"
                        required
                        className="ios-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500 resize-none" 
                        placeholder="Tell me about your project..." 
                    />
                </div>

                {status?.error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200">
                        {status.error}
                    </div>
                )}
                
                {status?.success && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-200">
                        Message sent successfully!
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isPending}
                    className="ios-btn w-full py-4 rounded-xl text-white font-bold tracking-wide mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Sending...' : 'Send Message'}
                </button>
            </motion.form>
        </div>
      </div>
    </section>
  );
}
