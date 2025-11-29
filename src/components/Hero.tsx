import { HERO_CONTENT, NAME, ROLE, RESUME_FILENAME, TECHNOLOGIES } from "../constants";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import resume from "../assets/projects/resume.pdf";
import { useState } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";

// Build rotating icon list from centralized TECHNOLOGIES (only showInHero entries)
const techSlugs = TECHNOLOGIES.filter((t) => t.showInHero).map((t) => t.slug);

const container = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

const Hero: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => setShowPreview((prev) => !prev);

  return (
    <div className="border-b border-neutral-900 pb-6 mt-20">  
      <div className="flex flex-wrap items-start justify-center lg:justify-between pt-10">

        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start px-6 sm:px-10 text-center lg:text-left mt-26">


          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="pb-6 text-4xl sm:text-5xl font-thin tracking-tight lg:text-7xl"
          >
            {NAME}
          </motion.h1>

          <motion.span
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-2xl sm:text-3xl tracking-tight text-transparent"
          >
            {ROLE}
          </motion.span>

          <motion.p
            variants={container(1)}
            initial="hidden"
            animate="visible"
            className="my-4 max-w-xl py-4 text-base sm:text-lg font-light tracking-wide leading-relaxed 
              bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent"
          >
            {HERO_CONTENT}
          </motion.p>

          {/* Resume Button */}
          <motion.button
            variants={container(1.5)}
            initial="hidden"
            animate="visible"
            onClick={togglePreview}
            className="mt-6 rounded-full border border-neutral-700 px-8 py-2 
            text-base font-medium transition-colors hover:bg-neutral-800 flex items-center gap-2 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

            <FileText size={18} />
            <span>My Resume</span>
          </motion.button>
        </div>

       {/* RIGHT SECTION */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end 
                p-4 sm:p-8
                mt-0 lg:-mt-16   /* shift UP */
                lg:-translate-x-16  /* shift LEFT on large screens */
            ">

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="
                  relative 
                  w-[280px] h-[280px]
                  sm:w-[350px] sm:h-[350px]
                  md:w-[420px] md:h-[420px]
                  lg:w-[500px] lg:h-[500px]
                  xl:w-[580px] xl:h-[580px]
                  flex items-center justify-center
                "
              >
                {/* Background Glow */}
                <div
                  className="absolute inset-0 -z-10 
                  bg-gradient-to-br from-pink-300/20 via-slate-500/20 to-purple-500/20 
                  blur-3xl rounded-full opacity-60"
                ></div>

                <IconCloud
                  images={techSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}`)}
                  radius={window.innerWidth < 480 ? 80 : window.innerWidth < 768 ? 100 : 120}
                  rotationSpeed={window.innerWidth < 480 ? 1.3 : 1.9}
                />
              </motion.div>
            </div>
      </div>

      {/* Resume Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
        >
          <div className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-lg bg-neutral-900 p-6">
            <button
              onClick={togglePreview}
              className="absolute right-4 top-4 rounded-full p-1 hover:bg-neutral-800"
            >
              ✕
            </button>

            <h2 className="mb-4 text-xl font-medium">Resume Preview</h2>

            <div className="aspect-[8.5/11] w-full bg-white">
              <embed src={resume} type="application/pdf" className="h-full w-full"/>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={togglePreview}
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-800"
              >
                Close
              </button>

              <a
                href={resume}
                // make the downloaded filename customizable
                download={
                  (NAME ? NAME.replace(/\s+/g, "_") + "_Resume.pdf" : RESUME_FILENAME)
                }
                className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-2 text-sm text-white"
              >
                Download
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;