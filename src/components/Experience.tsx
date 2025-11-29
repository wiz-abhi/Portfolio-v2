import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Experience: React.FC = () => {
  return (
    <div className="border-b border-neutral-900 pb-20">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="my-20 text-center text-4xl font-bold 
          bg-gradient-to-r from-purple-300 via-slate-300 to-blue-300 
          bg-clip-text text-transparent"
      >
        Experience
      </motion.h1>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 
          w-[3px] bg-gradient-to-b from-purple-700 via-purple-500/40 to-blue-600/20 
          rounded-full opacity-70">
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col gap-20">
          {(EXPERIENCES as ExperienceItem[]).map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: false, amount: 0.3 }}
                className={`relative flex flex-col md:flex-row items-center 
                  ${isLeft ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Glowing Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 
                  rounded-full bg-gradient-to-br from-purple-400 to-blue-400 
                  shadow-[0_0_15px_rgba(163,100,255,0.8)] border border-neutral-800">
                </div>

                {/* Experience Card */}
                <Card
                  className={`
                    w-full md:w-[45%] mt-10 md:mt-0
                    ${
                      isLeft
                        ? "md:mr-auto md:pr-8 text-left"
                        : "md:ml-auto md:pl-8 text-left"
                    }
                    bg-neutral-900/50 border border-neutral-800 shadow-xl 
                    backdrop-blur-xl hover:shadow-purple-500/20 transition-all
                  `}
                >
                  <CardContent className="p-6">
                    {/* YEAR */}
                    <div className="flex items-center gap-2 text-purple-300 text-sm mb-2">
                      <Calendar size={16} />
                      {exp.year}
                    </div>

                    {/* ROLE + COMPANY */}
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-1">
                      <Briefcase size={18} className="text-purple-400" />
                      {exp.role}
                    </h3>
                    <p className="text-purple-300 mb-3 font-medium">
                      {exp.company}
                    </p>

                    {/* DESCRIPTION */}
                    <p className="text-neutral-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* TECHNOLOGIES */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm rounded-full 
                            bg-neutral-800 border border-neutral-700 
                            text-purple-300 hover:bg-purple-800 hover:text-white 
                            transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
