"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "../ui/CallToActionButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectContactFormProps {
  title?: string;
  className?: string;
}

export default function ProjectContactForm({
  title = "HAVE A PROJECT? LET'S TALK ABOUT IT!",
  className = "",
}: ProjectContactFormProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null)[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    company?: string;
    message?: string;
  }>({});

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate heading
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 30 });
        tl.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Animate form elements
      inputRefs.current.forEach((el, index) => {
        if (el) {
          gsap.set(el, { opacity: 0, y: 30 });
          tl.to(
            el,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            index === 0 ? "-=0.4" : "<0.1"
          );
        }
      });
    },
    sectionRef,
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
        // Auto-hide error message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Split title into two lines
  const titleLines = title.split("?");
  const firstLine = titleLines[0] + "?";
  const secondLine = titleLines.slice(1).join("?").trim();

  return (
    <section
      id="project-contact-form"
      ref={sectionRef}
      className={`relative min-h-screen bg-black py-20 md:py-32 overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto project-contact-form-content-container">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-[700] text-white text-center mb-12 md:mb-16 leading-tight"
          >
            <span className="block">{firstLine}</span>
            <span className="block">{secondLine}</span>
          </h2>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:gap-8"
          >
            {/* Input Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name Input */}
              <div>
                <input
                  ref={(el) => {
                    inputRefs.current[0] = el;
                  }}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className={`w-full h-[50px] md:h-[60px] px-4 md:px-6 rounded-lg bg-[#1a1a1a] text-white placeholder:text-white placeholder:text-[14px] md:placeholder:text-[16px] border focus:outline-none transition-colors text-sm md:text-base ${errors.fullName
                      ? "border-red-500"
                      : "border-[#4E4E4E] focus:border-white"
                    }`}
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <input
                  ref={(el) => {
                    inputRefs.current[1] = el;
                  }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full h-[50px] md:h-[60px] px-4 md:px-6 rounded-lg bg-[#1a1a1a] text-white placeholder:text-white placeholder:text-[14px] md:placeholder:text-[16px] border focus:outline-none transition-colors text-sm md:text-base ${errors.email
                      ? "border-red-500"
                      : "border-[#4E4E4E] focus:border-white"
                    }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <input
                  ref={(el) => {
                    inputRefs.current[2] = el;
                  }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full h-[50px] md:h-[60px] px-4 md:px-6 rounded-lg bg-[#1a1a1a] text-white placeholder:text-white placeholder:text-[14px] md:placeholder:text-[16px] border border-[#4E4E4E] focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                  disabled={isSubmitting}
                />
              </div>

              {/* Company Input */}
              <div>
                <input
                  ref={(el) => {
                    inputRefs.current[3] = el;
                  }}
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company"
                  className={`w-full h-[50px] md:h-[60px] px-4 md:px-6 rounded-lg bg-[#1a1a1a] text-white placeholder:text-white placeholder:text-[14px] md:placeholder:text-[16px] border focus:outline-none transition-colors text-sm md:text-base ${errors.company
                      ? "border-red-500"
                      : "border-[#4E4E4E] focus:border-white"
                    }`}
                  disabled={isSubmitting}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                ref={(el) => {
                  inputRefs.current[4] = el;
                }}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                rows={6}
                className={`w-full min-h-[150px] md:min-h-[180px] px-4 md:px-6 py-4 md:py-6 rounded-lg bg-[#1a1a1a] text-white placeholder:text-white placeholder:text-[14px] md:placeholder:text-[16px] border focus:outline-none transition-colors resize-none text-sm md:text-base ${errors.message
                    ? "border-red-500"
                    : "border-[#4E4E4E] focus:border-white"
                  }`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`px-4 py-3 rounded-lg text-sm ${submitStatus.type === "success"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <div ref={(el) => { inputRefs.current[5] = el as unknown as HTMLButtonElement; }}>
              <CallToActionButton type="submit" variant="shiny" disabled={isSubmitting}>
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </CallToActionButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

