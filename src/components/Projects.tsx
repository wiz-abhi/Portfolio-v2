import { PROJECTS, TECHNOLOGIES } from "../constants";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link: string;
  repo?: string;
  technologies: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const Projects: React.FC = () => {
  return (
    <div className="border-b border-neutral-900 pb-10">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="my-20 text-center text-4xl font-extrabold"
      >
        Projects
      </motion.h1>

      <div className="flex flex-col gap-32">
        {(PROJECTS as ProjectItem[]).map((project, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className={`flex flex-col lg:flex-row items-center gap-12`}
          >
            {/* LEFT IMAGE SECTION */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-[450px] h-auto rounded-xl shadow-xl hover:scale-[1.02] 
                transition-all duration-500"
              />
            </motion.div>

            {/* RIGHT CONTENT SECTION */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex-1 lg:pr-10"
            >
              <h2 className="text-3xl font-bold text-purple-300 mb-4">
                {project.title}
              </h2>

              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                {project.description}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-4 mb-6 items-center">
                {project.link ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.link}
                    className="border border-purple-400 px-6 py-2 rounded-lg 
                    hover:bg-purple-500/20 transition text-purple-300 font-medium
                    flex items-center gap-2"
                  >
                    🔗 Live Demo
                  </a>
                ) : null}

                {/* Github icon-only button (no text) - shows only when repo exists */}
                {project.repo && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.repo}
                    aria-label={`${project.title} — GitHub repository`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition"
                  >
                    <FaGithub size={18} className="text-purple-300" />
                  </a>
                )}
              </div>

              {/* TECHNOLOGIES */}
              <div className="flex flex-wrap gap-2 items-center">
                {
                  // build a lookup map from TECHNOLOGIES for fast lookup
                  (() => {
                    const map = new Map<string, string>()
                    TECHNOLOGIES.forEach((t) => {
                      map.set(t.name.toLowerCase(), t.slug)
                      if (t.aliases) for (const a of t.aliases) map.set(a.toLowerCase(), t.slug)
                    })

                    return project.technologies.map((tech, idx) => {
                      const key = tech.toLowerCase().trim()
                      const slug = map.get(key) ?? null

                      return (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-2xl bg-neutral-900 text-purple-400 flex items-center gap-3 text-base border border-neutral-700 shadow-sm"
                        >
                          {slug ? (
                            <img
                              src={`https://cdn.simpleicons.org/${slug}`}
                              alt={`${tech} icon`}
                              width={20}
                              height={20}
                              className="rounded-sm"
                            />
                          ) : null}
                          <span className="leading-none">{tech}</span>
                        </span>
                      )
                    })
                  })()
                }
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
