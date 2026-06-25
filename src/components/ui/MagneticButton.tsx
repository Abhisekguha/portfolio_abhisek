"use client";

import { ReactNode, useRef } from "react";
import { gsap } from "@/lib/gsap";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
};

export function MagneticButton({ children, className = "", onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power2.out" });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  const shared = {
    ref,
    className: `relative inline-flex items-center justify-center gpu transition-shadow ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
  };

  if (href) {
    return (
      <a href={href} {...shared} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        <span className="absolute inset-0 rounded-full bg-electric/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        {children}
      </a>
    );
  }

  return (
    <button type="button" {...shared}>
      {children}
    </button>
  );
}
