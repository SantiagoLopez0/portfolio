'use client'

import Link from 'next/link';
import styles from './button.module.css';

export const Button = ({
    href,
    text,
    theme,
  }: {
    href: string,
    text: string,
    theme: string,
  }) => {
    return(
        <>
        <Link
            href={href}
            className={
              `${styles.button} ${theme === 'dark' ? styles.button__dark : styles.button__light}`
            }
            target="_blank"
        >
            {text}
        </Link>
        </>
    )
}