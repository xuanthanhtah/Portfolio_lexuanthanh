"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const skills = [
  { name: "React", icon: "⚛️", description: "Building interactive UIs with modern patterns." },
  { name: "Next.js", icon: "▲", description: "Full-stack apps with server components and ISR." },
  { name: "Three.js", icon: "🧊", description: "Creating immersive 3D experiences on the web." },
  { name: "TypeScript", icon: "📘", description: "Type-safe robust scalable codebases." },
  { name: "Tailwind CSS", icon: "🎨", description: "Rapid utility-first styling and design systems." },
  { name: "Node.js", icon: "🟢", description: "Scalable backend services and APIs." },
  { name: "GraphQL", icon: "◈", description: "Efficient data querying and manipulation." },
  { name: "Figma", icon: "🖌️", description: "UI/UX design and prototyping." },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative z-10">
       <div className="max-w-6xl w-full">
         <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-16 text-center text-white"
        >
          Skills & Expertise
        </motion.h2>

        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
             autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true} 
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper w-full py-12"
            breakpoints={{
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }}
        >
            {skills.map((skill, index) => (
                <SwiperSlide key={index} className="!w-[300px] md:!w-[350px]">
                     <div className="glass-panel h-[400px] p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                        <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            {skill.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{skill.name}</h3>
                        <p className="text-gray-300 leading-relaxed">
                            {skill.description}
                        </p>
                     </div>
                </SwiperSlide>
            ))}
        </Swiper>
       </div>
    </section>
  );
}
