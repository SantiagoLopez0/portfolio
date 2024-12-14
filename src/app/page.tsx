"use client"

import Image from "next/image";

export default function Home() {
  // const logos = [
  //   "/react-logo.svg",
  //   "/html5-logo.svg",
  //   "/javascript-logo.svg",
  //   "/css3-logo.svg",
  //   "/npm-logo.svg",
  //   "/git-logo.svg",
  //   "/github-logo.svg"
  // ]
  return (
    <>
    <main>
    <div className="container mx-auto px-4 h-[100vh] flex justify-center items-center mt-[100px] md:mt-[30px]">
      <div className="flex flex-col md:flex-row gap-[64px] justify-center items-center ">
        {/* Left Section */}
        <div>
          <Image
            src="/profile2.jpeg"
            alt="Profile"
            className="main-image"
            width={400}
            height={900}
          />
        </div>

        {/* Right Section */}
        <div className="max-w-[45%]">
          <h1 className="mb-[40px]">
            Hi, I’m Santiago
          </h1>
          <h2>
            Web Developer focused on
          </h2>
          <p className="main-text"><strong className="weight-bold">never stop learning.</strong></p>

          {/* Logos Section */}
          <div className="main-logos-container flex gap-4 mt-6">
            <div className="main-logo-col mb-4">
              <Image
                src="/nextjs.svg"
                alt="Next.js"
                title="Next.js"
                className="main-logo"
                width={64}
                height={64}
              />
            </div>
            <div className="main-logo-col mb-4">
              <Image
                src="/html5-logo.svg"
                alt="Html5"
                title="Html5"
                className="main-logo"
                width={64}
                height={64}
              />
            </div>
            <div className="main-logo-col mb-4">
              <Image
                src="/javascript-logo.svg"
                alt="Javascript"
                title="Javascript"
                className="main-logo"
                width={64}
                height={64}
              />
            </div>
            <div className="main-logo-col mb-4">
              <Image
                src="/css3-logo.svg"
                alt="Css3"
                title="Css3"
                className="main-logo"
                width={64}
                height={64}
              />
            </div>
            <div className="main-logo-col mb-4">
              <Image
                src="/webflow.svg"
                alt="Webflow"
                title="Webflow"
                className="main-logo"
                width={64}
                height={64}
              />
            </div>
            <div className="main-logo-col mb-4">
              <Image
                src="/git-logo.svg"
                alt="Git"
                title="Git"
                className="main-logo"
                width={64}
                height={64}
              />
            </div>
            <div className="main-logo-col mb-4">
              <Image
                src="/github-logo.svg"
                alt="Github"
                title="Github"
                className="main-logo"
                width={64}
                height={64}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
    </>
  )
}