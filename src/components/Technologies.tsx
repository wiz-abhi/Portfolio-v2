
import { TECHNOLOGIES } from "@/constants";
import { FaBootstrap } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

// Type for icon variants generator
const iconVariants = (duration: number): Variants => ({
  initial: { y: -5 },
  animate: {
    y: [5, -5],
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

// Type for each tech stack item
interface TechItem {
  icon?: React.ComponentType<{ className?: string }>;
  imageSlug?: string; // simpleicons slug to show SVG from CDN
  name: string;
  color?: string;
}

const Technologies: React.FC = () => {
  // Build the tech list from centralized constants
  const techStacks: TechItem[] = TECHNOLOGIES.map((t) => ({
    imageSlug: t.slug,
    name: t.name,
  }));

  return (
    <div className="border-b border-neutral-800 pb-12">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-10 text-center text-3xl font-bold"
      >
        Technologies
      </motion.h1>

      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto px-2"
      >
        {techStacks.map((tech, index) => (
          <motion.div
            key={index}
            variants={iconVariants((index % 5) + 2)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center justify-center"
          >
            <div className="rounded-lg border-2 border-neutral-800 p-4 bg-neutral-900 flex items-center justify-center w-[84px] h-[84px]">
              {tech.imageSlug ? (
                <img
                  src={`https://cdn.simpleicons.org/${tech.imageSlug}`}
                  alt={tech.name}
                  width={48}
                  height={48}
                />
              ) : null}
            </div>
            <span className="mt-2 text-base font-medium text-gray-300">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technologies;
