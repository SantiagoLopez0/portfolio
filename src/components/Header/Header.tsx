'use client';

import Link from 'next/link';
// import Image from 'next/image';
import styles from 'app/components/Header/header.module.css';

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ['latin'], weight: ["400", "600","800", "200"], });

const links = [
    { name: 'My resume', href: 'https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/view?usp=sharing', class: styles.headerOption},
    { name: "Let's connect", href: 'mailto:asantiago0034@gmail.com', class: styles.headerCTA},
];


export const Header = () => {
    return(
        <>
        <header
            className={`${outfit.className} ${styles.headerContainer} fixed w-full top-0 z-20`}
        >
            <div className="flex flex-col items-start justify-between px-[25px] md:px-[45px] py-32 mx-auto md:flex-row md:items-center bg-[#F5F3F0] text-dark">
                {/* <Link className={`${styles.headerMain}`} href="mailto:asantiago0034@gmail.com">
                    asantiago0034@gmail.com
                </Link> */}
                <p className={`text-dark ${styles.logo}`}>Santiago<br />Web Developer</p>
                <div className={`flex justify-end gap-10 ${styles.headerNavigation}`}>
                    {links.map((link) => {
                        return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={link.class}
                            target="_blank"
                        >
                            <p className="">{link.name}</p>
                        </Link>
                        );
                    })}
                </div>
            </div>
        </header>
        </>
    )
}