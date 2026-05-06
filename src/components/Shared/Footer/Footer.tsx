"use client";

import { FaArrowUp } from 'react-icons/fa';

import styles from './footer.module.css'

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                © 2026 Santiago López
            </p>
            <button
                onClick={scrollToTop}
                className={styles.scrollToTop}                
            >
                <FaArrowUp /> {/* Using Font Awesome arrow icon */}
            </button>
        </footer>
    )
}