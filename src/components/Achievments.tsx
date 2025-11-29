import { cn } from "@/lib/utils";
import { ACHIEVEMENTS } from "@/constants";
import { Marquee } from "./ui/marquee";

// Split achievements into two scrolling rows
const firstRow = ACHIEVEMENTS.slice(0, Math.ceil(ACHIEVEMENTS.length / 2));
const secondRow = ACHIEVEMENTS.slice(Math.ceil(ACHIEVEMENTS.length / 2));

// Card Component
const AchievementCard = ({
  title,
  description,
  date,
}: {
  title: string;
  description?: string;
  date: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-full max-w-[520px] cursor-pointer overflow-hidden rounded-2xl border p-6 mx-auto",
        "border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/50 backdrop-blur-xl",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "transition-all shadow-lg"
      )}
    >
      {/* Title */}
      <figcaption className="mt-2 text-center text-lg font-semibold dark:text-white text-neutral-200">
        {title}
      </figcaption>

      {/* Description (text-only achievements) */}
      {description && (
        <p className="px-6 mt-4 text-center text-sm text-neutral-300">{description}</p>
      )}

      {/* Small Date */}
      <p className="text-center text-xs text-neutral-400 mt-3">{date}</p>
    </figure>
  );
};

// Main Component
export function Achievements() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
      <h2 className="my-20 text-center text-4xl font-extrabold">
        Achievements
      </h2>

      {/* First Row - display one card per row, oscillating left↔right */}
      <Marquee pauseOnHover alternate repeat={1} className="[--duration:8s]">
        {firstRow.map((item, index) => (
          <div className="w-full flex justify-center" key={index}>
            <AchievementCard {...item} />
          </div>
        ))}
      </Marquee>

      {/* Second Row - reverse start direction (right↔left) */}
      <Marquee pauseOnHover alternate reverse repeat={1} className="[--duration:8s]">
        {secondRow.map((item, index) => (
          <div className="w-full flex justify-center" key={index}>
            <AchievementCard {...item} />
          </div>
        ))}
      </Marquee>

      {/* Gradient Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-900"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-neutral-900"></div>
    </section>
  );
}

export default Achievements;
