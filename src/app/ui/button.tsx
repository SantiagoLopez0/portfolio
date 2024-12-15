'use client'

import Link from 'next/link';

export const Button = ({
    href,
    color,
    text
  }: {
    href: string,
    color: string,
    text: string
  }) => {
    return(
        <>
        <Link
            href={href}
            className={`${color} globalButton`}
            target="_blank"
        >
            {text}
        </Link>
        </>
    )
}