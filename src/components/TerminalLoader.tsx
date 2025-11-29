import { useEffect } from 'react';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(onComplete, 500);
    }, 8500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950">
      {/* Background matching your portfolio theme */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
      </div>
      
      {/* Additional purple gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_300px,rgba(139,92,246,0.1),transparent)]"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Terminal Container - Perfectly Centered */}
      <div className="relative z-10 flex w-full items-center justify-center px-4">
        <Terminal 
          startOnView={true} 
          sequence={true}
          className="bg-black/90 backdrop-blur-md border-white/10 shadow-2xl shadow-purple-500/20 max-w-3xl w-full"
        >
          <TypingAnimation 
            duration={40}
            className="text-neutral-300"
          >
            &gt; npm run dev:portfolio
          </TypingAnimation>
          <AnimatedSpan className="text-green-400">
            ✔ Initializing React application.
          </AnimatedSpan>
          <AnimatedSpan className="text-green-400">
            ✔ Loading Tailwind CSS configuration.
          </AnimatedSpan>
          <AnimatedSpan className="text-green-400">
            ✔ Compiling TypeScript components.
          </AnimatedSpan>
          <AnimatedSpan className="text-green-400">
            ✔ Rendering Hero section.
          </AnimatedSpan>
          <AnimatedSpan className="text-green-400">
            ✔ Loading About & Experience data.
          </AnimatedSpan>
          <AnimatedSpan className="text-green-400">
            ✔ Fetching Projects showcase.
          </AnimatedSpan>
          <AnimatedSpan className="text-green-400">
            ✔ Initializing Technologies grid.
          </AnimatedSpan>
          <AnimatedSpan className="text-green-400">
            ✔ Setting up Contact form.
          </AnimatedSpan>
          <AnimatedSpan className="text-cyan-400">
            <span>ℹ Components loaded successfully:</span>
            <span className="block pl-4 text-cyan-300">Navbar • Hero • About • Projects • Contact</span>
          </AnimatedSpan>
          <TypingAnimation className="text-green-400 font-semibold" duration={50}>
            ✨ Portfolio initialized successfully!
          </TypingAnimation>
          <TypingAnimation className="text-neutral-400" duration={60}>
            Welcome to my portfolio...
          </TypingAnimation>
        </Terminal>
      </div>
    </div>
  );
}