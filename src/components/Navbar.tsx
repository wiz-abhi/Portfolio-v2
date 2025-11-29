import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";
import { SOCIAL_LINKS } from "@/constants";

import { Dock, DockIcon } from "./ui/dock";

const Navbar = () => {
  // icon map allows SOCIAL_LINKS from constants to remain simple (name + url)
  const iconsMap: Record<string, any> = {
    LinkedIn: FaLinkedin,
    GitHub: FaGithub,
    Twitter: FaTwitter,
    Email: FaEnvelope,
    Work: FaBriefcase,
  };

  return (
    <nav className="fixed top-4 right-4 z-[9999]">
      <TooltipProvider>
        <Dock direction="middle" className="scale-[0.85]">
          {SOCIAL_LINKS.map((item) => {
            const Icon = iconsMap[item.name] ?? FaBriefcase;
            return (
              <DockIcon key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={item.url}
                      aria-label={item.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-9 flex items-center justify-center rounded-full"
                    >
                      <Icon className="text-lg" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}
        </Dock>
      </TooltipProvider>
    </nav>
  );
};

export default Navbar;
