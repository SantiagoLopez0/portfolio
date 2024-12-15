'use client';

import Link from 'next/link';
// import Image from 'next/image';
import { Poppins } from "next/font/google";
import styles from 'app/components/Header/header.module.css';

const poppins = Poppins({ subsets: ['latin'], weight: ["400","800"], });

const links = [
    { name: 'Resume', href: 'https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/view?usp=sharing', class: styles.headerOption},
    { name: "Let's Connect", href: 'mailto:asantiago0034@gmail.com', class: styles.headerCTA},
];


export const Header = () => {
    return(
        <>
        <header
            className={`${poppins.className} ${styles.headerContainer} fixed w-full top-0 z-20 mt-[15px]`}
        >
            <div className="max-w-[1000px] flex flex-col items-start justify-between px-[15px] py-24 mx-auto md:flex-row md:items-center bg-[#f4f4f4] rounded-2xl text-dark">
                {/* <Link className={`${styles.headerMain}`} href="mailto:asantiago0034@gmail.com">
                    asantiago0034@gmail.com
                </Link> */}
                <p className={`text-dark ${styles.logo}`}>Santiago</p>
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