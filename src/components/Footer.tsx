
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { NAME, SOCIAL_LINKS } from "@/constants";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-900 py-6 flex flex-col md:flex-row items-center justify-between px-6">
      {/* Left Side - Copyright */}
      <div className="flex items-center">
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} {NAME}. All rights reserved.
        </p>
      </div>

      {/* Right Side - Social Links */}
      <div className="flex items-center space-x-4 text-neutral-400">
        {SOCIAL_LINKS.map((s) => {
          // small map for icons (fall back to GitHub icon if not recognized)
          const map: Record<string, any> = {
            LinkedIn: FaLinkedin,
            GitHub: FaGithub,
            Instagram: FaInstagram,
            Twitter: FaTwitter,
            Email: FaEnvelope,
          };
          const Icon = map[s.name] ?? FaGithub;
          return (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 transition-colors duration-300"
            >
              <Icon size={24} />
            </a>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
