"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    description: "A futuristic dashboard built with Next.js and Three.js elements.",
    tags: ["Next.js", "Three.js", "Tailwind"],
    link: "#",
    github: "#"
  },
  {
    title: "Neon Commerce",
    description: "E-commerce platform with immersive product interactions.",
    tags: ["React", "Stripe", "Framer Motion"],
    link: "#",
    github: "#"
  },
   {
    title: "Portfolio v1",
    description: "The first iteration of my personal portfolio.",
    tags: ["HTML", "SCSS", "JS"],
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  return (
     <section id="projects" className="min-h-screen py-20 px-4 flex flex-col justify-center relative z-10">
        <div className="max-w-6xl w-full mx-auto">
             <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-16 text-center text-white"
            >
                Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group relative p-6 rounded-2xl bg-card-bg border border-white/10 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-colors"
                    >
                         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                         
                         <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">{project.title}</h3>
                         <p className="text-gray-400 mb-6">{project.description}</p>
                         
                         <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-mono text-gray-300 bg-white/10 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                         </div>

                         <div className="flex gap-4">
                             <a href={project.github} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                 <Github size={18} /> Code
                             </a>
                             <a href={project.link} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                 <ExternalLink size={18} /> Demo
                             </a>
                         </div>
                    </motion.div>
                ))}
            </div>
        </div>
     </section>
  );
}
