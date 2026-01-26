// import Link from "next/link";

interface CallToActionButtonProps {
  variant?: "outline" | "filled" | "shiny";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  href?: string;
  size?: "default" | "small";
  disabled?: boolean;
}

export default function CallToActionButton({
  variant = "outline",
  className = "",
  onClick,
  children = "CALL TO ACTION",
  type = "button",
  // href = "/contact-us",
  // href,
  size = "default",
  disabled = false,
}: CallToActionButtonProps) {
  const sizeClasses = size === "small"
    ? "w-[140px] md:w-[180px] h-[36px] md:h-[45px] rounded-full px-4 py-2 md:text-[13px] text-[11px]"
    : "w-[180px] md:w-[221px] h-[36px] md:h-[51px] rounded-full px-6 py-2 md:text-[15px] text-[11px]";

  const baseClasses = `${sizeClasses} font-graphik-light-weight-300 text-white transition-all duration-300 relative items-center justify-center z-50`;

  const variantClasses =
     variant === "outline"
    ? "border-2 border-white bg-transparent hover:border-transparent overflow-hidden"
    : variant === "filled"
    ? "bg-zinc-900 hover:bg-zinc-800 overflow-hidden"
    : "shiny-cta";

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        // style={{
        //   background: "linear-gradient(102.96deg, #EE66AD 0.02%, #758EF8 100.02%);",
        // }}
      />
    </>
  );

  // Add inline-flex as default if no display utility is in className
  // Check for any display utility classes (including responsive variants)
  const hasDisplayClass = /\b(hidden|flex|inline-flex|block|inline-block|grid|inline-grid|table|inline-table|contents|list-item)\b/.test(className);
  const displayClass = hasDisplayClass ? '' : 'inline-flex';

  // Temporary: Scroll to contact form section instead of navigating to /contact-us
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If type is submit, let the form handle it (don't prevent default or scroll)
    if (type === "submit") {
      if (onClick) {
        onClick();
      }
      return; // Let form submission happen naturally
    }
    
    // For non-submit buttons, prevent default and handle navigation
    e.preventDefault();
    if (onClick) {
      onClick();
    }

    // Check current pathname
    const currentPath = window.location.pathname;
    
    // If on mobile-app page, scroll to project-contact-form
    if (currentPath === '/mobile-app' || currentPath.startsWith('/mobile-app/'), currentPath === '/web-app' || currentPath.startsWith('/web-app/'), currentPath === '/logo-app' || currentPath.startsWith('/logo-app/')) {
      const projectContactForm = document.getElementById('project-contact-form');
      if (projectContactForm) {
        projectContactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    
    // If on home page or other pages, try to find contact-form-section
    const contactSection = document.getElementById('contact-form-section');
    if (contactSection) {
      // Section exists on current page, scroll to it
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Section doesn't exist on current page, navigate to home page contact section
      if (currentPath === '/') {
        // Already on home page but section not found, try scrolling anyway
        window.location.href = '/#contact-form-section';
      } else {
        // Navigate to home page contact section
        window.location.href = '/#contact-form-section';
      }
    }
  };

  // if (href) {
  //   return (
  //     <Link
  //       href={href}
  //       onClick={onClick}
  //       className={`${baseClasses} ${variantClasses} ${displayClass} ${className} group`}
  //     >
  //       {content}
  //     </Link>
  //   );
  // }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${displayClass} ${className} group ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {content}
    </button>
  );
}

