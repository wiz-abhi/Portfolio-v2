import { ABOUT_TEXT, PROFILE_IMAGE } from "../constants";
import { motion } from "framer-motion";
import React from "react";
import { TypingText } from "./TypingText";

const About: React.FC = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="my-20 text-center text-4xl">
        About <span className="text-neutral-500">Me</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center lg:justify-between">
        {/* Left Section - Image */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end p-4 sm:p-8"
        >
          <div className="relative p-2 rounded-2xl bg-neutral-900 shadow-lg shadow-purple-500/30 overflow-hidden">
            {/* Glowing Animated Bubble Effect */}
            <div className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-r from-pink-400/10 via-purple-400/10 to-blue-400/10 rounded-2xl"></div>

            <motion.img
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1.02, rotate: 2 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl w-[300px] sm:w-[350px] lg:w-[400px]"
              src={PROFILE_IMAGE as string}
              alt="About Me"
            />
          </div>
        </motion.div>

        {/* Right Section - Text */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-start px-4 sm:px-8"
        >
          <p className="my-4 max-w-xl py-4 text-base sm:text-lg text-gray-300 font-light tracking-wide leading-relaxed bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent">
            <TypingText text={ABOUT_TEXT} speed={50} />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
