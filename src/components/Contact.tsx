"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
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
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6 p-10 rounded-[2.5rem] glass-panel"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2">Name</label>
                    <input type="text" className="ios-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500" placeholder="John Doe" />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2">Email</label>
                    <input type="email" className="ios-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500" placeholder="john@example.com" />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-2">Message</label>
                    <textarea rows={4} className="ios-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500 resize-none" placeholder="Tell me about your project..." />
                </div>
                <button className="ios-btn w-full py-4 rounded-xl text-white font-bold tracking-wide mt-4">
                    Send Message
                </button>
            </motion.form>
        </div>
      </div>
    </section>
  );
}
