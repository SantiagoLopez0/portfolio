'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import { ResumeModal } from "app/components/Shared/ResumeModal";

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: 'https://www.linkedin.com/in/santiagolopez22/', external: true },
];

export const Header = () => {
  const [useScrolled, setUseScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setUseScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.headerContainer} ${useScrolled ? styles.scrolled : ''}`}
    >
      <div className={`container ${styles.headerInner}`}>
        <div className={styles.headerName}>Santiago <br/> López</div>

        <nav className={styles.navLinks} aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.navLink}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <ResumeModal isButton={true} customClassName="" />
      </div>
    </header>
  );
};