'use client'

import Link from 'next/link';

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
            className={`bg-black globalButton`}
            target="_blank"
        >
            {text}
        </Link>
        </>
    )
}