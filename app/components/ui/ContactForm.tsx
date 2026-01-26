"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "./CallToActionButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    if (!formRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate each input field with stagger effect
      inputRefs.current.forEach((el, index) => {
        if (el) {
          gsap.set(el, { opacity: 0, y: 30 });
          tl.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }, index === 0 ? 0 : "<0.1");
        }
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`flex flex-col gap-5 md:gap-6 ${className}`}
    >
      {/* Name Input */}
      <div>
        <input
          ref={(el) => { inputRefs.current[0] = el; }}
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Tell us your name! *"
          className={`w-full h-[42px] md:h-[62px] px-4 py-4 md:px-6 md:py-4 rounded-full bg-[#1a1a1a52] text-white placeholder:text-white placeholder:text-[16px] md:placeholder:text-[20px] border focus:outline-none transition-colors text-sm md:text-base ${errors.fullName ? "border-red-500" : "border-[#4E4E4E] focus:border-[#00d4aa]"}`}
          disabled={isSubmitting}
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-4">{errors.fullName}</p>}
      </div>

      {/* Email Input */}
      <div>
        <input
          ref={(el) => { inputRefs.current[1] = el; }}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your email *"
          className={`w-full h-[42px] md:h-[62px] px-4 py-4 md:px-6 md:py-4 rounded-full bg-[#1a1a1a52] text-white placeholder:text-white placeholder:text-[16px] md:placeholder:text-[20px] border focus:outline-none transition-colors text-sm md:text-base ${errors.email ? "border-red-500" : "border-[#4E4E4E] focus:border-[#00d4aa]"}`}
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email}</p>}
      </div>

      {/* Phone Input */}
      <div>
        <input
          ref={(el) => { inputRefs.current[2] = el; }}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Your phone"
          className="w-full h-[42px] md:h-[62px] px-4 py-4 md:px-6 md:py-4 rounded-full bg-[#1a1a1a52] text-white placeholder:text-white placeholder:text-[16px] md:placeholder:text-[20px] border border-[#4E4E4E] focus:outline-none focus:border-[#00d4aa] transition-colors text-sm md:text-base"
          disabled={isSubmitting}
        />
      </div>

      {/* Company Input */}
      <div>
        <input
          ref={(el) => { inputRefs.current[3] = el; }}
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Your Company *"
          className={`w-full h-[42px] md:h-[62px] px-4 py-4 md:px-6 md:py-4 rounded-full bg-[#1a1a1a52] text-white placeholder:text-white placeholder:text-[16px] md:placeholder:text-[20px] border focus:outline-none transition-colors text-sm md:text-base ${errors.company ? "border-red-500" : "border-[#4E4E4E] focus:border-[#00d4aa]"}`}
          disabled={isSubmitting}
        />
        {errors.company && <p className="text-red-500 text-xs mt-1 ml-4">{errors.company}</p>}
      </div>

      {/* Message Textarea */}
      <div>
        <textarea
          ref={(el) => { inputRefs.current[4] = el; }}
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="What is your requirement? *"
          rows={4}
          className={`w-full h-[130px] md:h-[190px] px-4 py-4 md:px-6 md:py-4 rounded-[30px] bg-[#1a1a1a52] text-white placeholder:text-white placeholder:text-[16px] md:placeholder:text-[20px] border focus:outline-none transition-colors resize-none text-sm md:text-base ${errors.message ? "border-red-500" : "border-[#4E4E4E] focus:border-[#00d4aa]"}`}
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1 ml-4">{errors.message}</p>}
      </div>

      {/* Radio Buttons */}
      {/* <div className="flex gap-4 md:gap-6 flex-wrap">
        <label className="flex items-center gap-2 md:gap-3 cursor-pointer group">
          <input
            type="radio"
            name="contactType"
            value="meeting"
            checked={formData.contactType === "meeting"}
            onChange={handleRadioChange}
            className="w-4 h-4 md:w-5 md:h-5 appearance-none rounded-full border-2 border-[#00d4aa] checked:bg-[#00d4aa] checked:border-[#00d4aa] relative checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full transition-all flex-shrink-0"
          />
          <span className="text-white text-sm md:text-base font-light">
            I want to book a meeting
          </span>
        </label>

        <label className="flex items-center gap-2 md:gap-3 cursor-pointer group">
          <input
            type="radio"
            name="contactType"
            value="call"
            checked={formData.contactType === "call"}
            onChange={handleRadioChange}
            className="w-4 h-4 md:w-5 md:h-5 appearance-none rounded-full border-2 border-[#00d4aa] checked:bg-[#00d4aa] checked:border-[#00d4aa] relative checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full transition-all flex-shrink-0"
          />
          <span className="text-white text-sm md:text-base font-light">
            I want to book a call
          </span>
        </label>
      </div> */}

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            submitStatus.type === "success"
              ? "bg-[#00d4aa]/20 text-[#00d4aa] border border-[#00d4aa]/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <div ref={(el) => { inputRefs.current[5] = el; }} className="mt-2 md:mt-4">
        <CallToActionButton type="submit" variant="shiny" disabled={isSubmitting}>
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        </CallToActionButton>
      </div>
    </form>
  );
}

