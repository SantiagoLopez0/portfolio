'use client'

import Link from 'next/link';
import styles from './button.module.css';

export const Button = ({
    href,
    text
  }: {
    href: string,
    text: string
  }) => {
    return(
        <>
        <Link
            href={href}
            className={`bg-black ${styles.button}`}
            target="_blank"
        >
            {text}
        </Link>
        </>
    )
}