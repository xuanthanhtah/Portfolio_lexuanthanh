"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-4 flex items-center justify-center relative z-10">
      <div className="max-w-5xl w-full">
         <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-12 text-white"
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-1 gap-12 items-center">
            <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-2xl bg-card-bg border border-white/10 backdrop-blur-md shadow-xl"
            >
                <p className="text-lg leading-relaxed text-gray-300">
                    I am a passionate frontend developer who loves to bridge the gap between design and technology. 
                    I specialize in building performant, scalable, and visually compelling web applications.
                    <br/><br/>
                    With a strong foundation in modern frameworks and a keen eye for aesthetics, I create user experiences that leave a lasting impression.
                </p>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
