"use client";

import Link from "next/link"
import { ResumeModal } from "../ResumeModal";
import { FaArrowUp } from 'react-icons/fa';

import styles from './footer.module.css'

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <footer className="pb-96 pt-0 md:pb-[128px] md:pt-[96px]">
            <h2 className="text-center mb-32">Contacts</h2>
            <div className="container flex flex-col justify-center gap-64">
                <div className="flex flex-col md:flex-row justify-center items-center gap-32 flex-wrap">
                    <Link
                        href="https://github.com/SantiagoLopez0"
                        className={`${styles.footerLink}`}
                        target="_blank"
                    >
                        Github
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/santiago-lopez-b18594193/"
                        className={`${styles.footerLink}`}
                        target="_blank"
                    >
                        LinkedIn
                    </Link>
                    <ResumeModal isButton={false} customClassName={styles.footerLink}/>
                    <Link
                        href="mailto:asantiago0034@gmail.com"
                        className={`${styles.footerLink}`}
                        target="_blank"
                    >
                        Email
                    </Link>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        onClick={scrollToTop}
                        className="bg-[#000] text-white p-4 rounded-full"
                    >
                        <FaArrowUp /> {/* Using Font Awesome arrow icon */}
                    </button>
                </div>
            </div>
        </footer>
    )
}