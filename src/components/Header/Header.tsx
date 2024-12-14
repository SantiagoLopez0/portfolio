'use client';

import Link from 'next/link';
// import Image from 'next/image';
import { Poppins } from "next/font/google";
import styles from 'app/components/Header/header.module.css';

const poppins = Poppins({ subsets: ['latin'], weight: ["400","800"], });

const links = [
    { name: 'Resume', href: '/contact', class: styles.headerOption},
    { name: "Let's Connect", href: '/contact', class: styles.headerCTA},
];


export const Header = () => {
    return(
        <>
        <header
            className={`${poppins.className} fixed w-full top-0 z-20 transition-colors px-4 duration-300 mt-[15px]`}
        >
            <div className="container flex flex-col items-start justify-between px-4 py-6 mx-auto md:flex-row md:items-center bg-[#f4f4f4] rounded-2xl text-dark">
                <Link className={`${styles.headerMain}`} href="mailto:asantiago0034@gmail.com">
                    asantiago0034@gmail.com
                </Link>
                <div className={`flex justify-end gap-10 ${styles.headerNavigation}`}>
                    {links.map((link) => {
                        return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={link.class}
                        >
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                        );
                    })}
                </div>
            </div>
        </header>
        </>
    )
}