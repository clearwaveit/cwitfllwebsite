"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "./CallToActionButton";
import {
  DEFAULT_CONTACT_SUBMIT_BUTTON_TEXT,
  DEFAULT_CONTACT_SUCCESS_MESSAGE,
} from "@/app/lib/contact-form-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactFormProps {
  className?: string;
  submitButtonText?: string;
  successMessage?: string;
  fields?: ContactFormFieldConfig[];
}

type ContactFieldName = "fullName" | "email" | "phone" | "company" | "message";

export type ContactFormFieldConfig = {
  name: ContactFieldName;
  placeholder: string;
  required?: boolean;
};

function withRequiredIndicator(text: string | undefined, required: boolean | undefined): string | undefined {
  if (!text) return text;

  const normalizedText = text.replace(/\s*\*+\s*$/, "").trim();
  if (!normalizedText) return normalizedText;

  return required ? `${normalizedText} *` : normalizedText;
}

export default function ContactForm({
  className = "",
  submitButtonText = DEFAULT_CONTACT_SUBMIT_BUTTON_TEXT,
  successMessage = DEFAULT_CONTACT_SUCCESS_MESSAGE,
  fields,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLDivElement | null)[]>([]);
  const visibleFields = fields ?? [];

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
    phone?: string;
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

    const fieldMap = new Map(visibleFields.map((field) => [field.name, field]));

    if (fieldMap.get("fullName")?.required && !formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (fieldMap.get("email")?.required && !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (fieldMap.has("email") && formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (fieldMap.get("phone")?.required && !formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (fieldMap.get("company")?.required && !formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (fieldMap.get("message")?.required && !formData.message.trim()) {
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
          message: successMessage,
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

  if (!visibleFields.length) {
    return null;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2 xl:grid-cols-1 ${className}`}
    >
      {visibleFields.map((field, index) => {
        const placeholderText = withRequiredIndicator(field.placeholder, field.required) || "";

        if (field.name === "message") {
          return (
            <div key={field.name} className="lg:col-span-2 xl:col-span-1">
              <textarea
                ref={(el) => { inputRefs.current[index] = el; }}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={placeholderText}
                rows={4}
                className={`w-full h-[130px] md:h-[190px] px-4 py-4 md:px-6 md:py-4 rounded-[30px] bg-[#1a1a1a52] text-white placeholder:text-white placeholder:text-[16px] md:placeholder:text-[20px] border focus:outline-none transition-colors resize-none text-sm md:text-base ${errors.message ? "border-red-500" : "border-[#4E4E4E] focus:border-[#00d4aa]"}`}
                disabled={isSubmitting}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1 ml-4">{errors.message}</p>}
            </div>
          );
        }

        const inputType =
          field.name === "email" ? "email" :
          field.name === "phone" ? "tel" :
          "text";
        const value = formData[field.name];
        const error = errors[field.name as keyof typeof errors];
        const needsValidationStyle =
          field.name === "fullName" ||
          field.name === "email" ||
          field.name === "phone" ||
          field.name === "company";

        return (
          <div key={field.name}>
            <input
              ref={(el) => { inputRefs.current[index] = el; }}
              type={inputType}
              name={field.name}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholderText}
              className={`w-full h-[42px] md:h-[62px] px-4 py-4 md:px-6 md:py-4 rounded-full bg-[#1a1a1a52] text-white placeholder:text-white placeholder:text-[16px] md:placeholder:text-[20px] border focus:outline-none transition-colors text-sm md:text-base ${
                needsValidationStyle
                  ? error
                    ? "border-red-500"
                    : "border-[#4E4E4E] focus:border-[#00d4aa]"
                  : "border-[#4E4E4E] focus:border-[#00d4aa]"
              }`}
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-xs mt-1 ml-4">{error}</p>}
          </div>
        );
      })}

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
          className={`px-4 py-3 rounded-lg text-sm lg:col-span-2 xl:col-span-1 ${
            submitStatus.type === "success"
              ? "bg-[#00d4aa]/20 text-[#00d4aa] border border-[#00d4aa]/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <div ref={(el) => { inputRefs.current[visibleFields.length] = el; }} className="mt-2 md:mt-4 lg:col-span-2 xl:col-span-1">
        <CallToActionButton type="submit" variant="shiny" disabled={isSubmitting}>
          {isSubmitting ? "SENDING..." : submitButtonText}
        </CallToActionButton>
      </div>
    </form>
  );
}

