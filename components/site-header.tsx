"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation, siteConfig } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${siteConfig.name} home`}>
        <span className="brand-mark">SG</span>
        <span className="brand-name">SANSKAR / GUPTA</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item, index) => (
          <a key={item.href} href={item.href} className="nav-link">
            <span>0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#contact">
        Let&apos;s talk <span>↗</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={closeMenu}>
              <span>05</span> Let&apos;s talk
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
