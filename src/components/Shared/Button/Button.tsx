'use client'

import Link from 'next/link';
import styles from './button.module.css';

export const Button = ({
    href,
    text,
    theme,
    external,
  }: {
    href: string,
    text: string,
    theme: string,
    external?: boolean,
  }) => {
    return(
        <>
        <Link
            href={href}
            className={
              `${styles.button} ${theme === 'dark' ? styles.button__dark : styles.button__light}`
            }
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {text}
        </Link>
        </>
    )
}