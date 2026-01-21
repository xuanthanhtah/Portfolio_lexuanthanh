"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-8xl font-bold text-white mb-6"
      >
        Creative Developer
      </motion.h1>
      <motion.p 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         className="mt-6 text-xl md:text-2xl text-gray-400 max-w-2xl"
      >
        Building immersive digital experiences with Next.js, Three.js, and Modern UI.
      </motion.p>
       <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10"
      >
        <button className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-bold tracking-wider">
          View Projects
        </button>
      </motion.div>
    </section>
  );
}
