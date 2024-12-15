"use client"

import Image from 'next/image'

export const InfiniteLogoCarousel = () => {
  const logos = [
    "/nextjs.svg",
    "/html5-logo.svg",
    "/javascript-logo.svg",
    "/css3-logo.svg",
    "/webflow.svg",
    "/git-logo.svg",
    "/github-logo.svg"
  ]

  return (
    <div className="relative w-full overflow-hidden py-8 max-w-[100vw] max-h-[85px] md:max-h-[none]">
      <div className="absolute inset-0 z-10
        before:absolute before:left-0 before:top-0 before:w-1/6 before:h-full  
        after:absolute after:right-0 after:top-0 after:w-1/6 after:h-full "
      />
      <div className="inline-flex w-full animate-infinite-scroll main-logos-container">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[45px] h-[45px] mx-4 relative main-logo-col"
          >
            <Image  
              src={`${logo}`}
              alt={`Logo ${index + 1}`}
              fill
              className="object-contain main-logo"
            />
          </div>
        ))}
      </div>
    </div>
  )
}