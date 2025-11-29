import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Mail, User, MessageSquare } from "lucide-react";
import { BorderBeam } from "./ui/border-beam";
import { NAME, SOCIAL_LINKS } from "@/constants";

interface FormDataType {
  name: string;
  email: string;
  message: string;
}

const fieldAnimation = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.18, duration: 0.5, ease: "easeOut" },
  }),
};

const Contact: React.FC = () => {
  const [formData, setState] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"" | "sending" | "success" | "error">("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/mblvbykd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setState({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="border-b border-neutral-900 pb-20">
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="my-10 text-center text-4xl font-bold bg-gradient-to-r 
          from-purple-300 via-slate-300 to-purple-400 bg-clip-text text-transparent"
      >
        Get in Touch
      </motion.h1>

      <div className="max-w-xl mx-auto px-4">
        <Card className="relative backdrop-blur-xl bg-neutral-900/50 border border-neutral-800 shadow-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Contact Me
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <motion.div custom={0} variants={fieldAnimation} initial="hidden" whileInView="visible">
                <Label htmlFor="name" className="text-gray-200 font-medium">Your Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-3 text-neutral-500 h-5 w-5" />
                  <Input
                    id="name"
                    name="name"
                    placeholder={NAME || "Your Name"}
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-neutral-800/40 border-neutral-700 text-white
                      focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* EMAIL */}
              <motion.div custom={1} variants={fieldAnimation} initial="hidden" whileInView="visible">
                <Label htmlFor="email" className="text-gray-200 font-medium">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-3 text-neutral-500 h-5 w-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={
                      SOCIAL_LINKS.find((s) => s.url?.startsWith("mailto:"))?.url?.replace("mailto:", "") || "example@gmail.com"
                    }
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-neutral-800/40 border-neutral-700 text-white
                      focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* MESSAGE */}
              <motion.div custom={2} variants={fieldAnimation} initial="hidden" whileInView="visible">
                <Label htmlFor="message" className="text-gray-200 font-medium">Message</Label>
                <div className="relative mt-2">
                  <MessageSquare className="absolute left-3 top-3 text-neutral-500 h-5 w-5" />
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="pl-10 bg-neutral-800/40 border-neutral-700 text-white resize-none
                      focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* BUTTON */}
              <motion.div custom={3} variants={fieldAnimation} initial="hidden" whileInView="visible">
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="relative w-full py-3 rounded-lg border border-neutral-700 
                            text-white text-lg font-medium overflow-hidden group 
                            bg-neutral-900 hover:bg-neutral-800 transition-all">

                  {/* Hover Gradient Overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r 
                                  from-pink-400/20 via-purple-400/20 to-blue-400/20
                                  opacity-0 group-hover:opacity-100 
                                  transition-opacity duration-300"></span>

                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>

              </motion.div>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-center text-green-400 font-medium">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-red-400 font-medium">
                  Failed to send. Try again.
                </p>
              )}
            </form>
          </CardContent>

          <BorderBeam duration={7} size={150} className="pointer-events-none" />
        </Card>
      </div>
    </div>
  );
};

export default Contact;
