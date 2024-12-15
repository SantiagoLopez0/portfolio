import Image from "next/image";
import { Metadata } from 'next';
import { InfiniteLogoCarousel }  from 'app/components/InfiniteLogoCarousel';

import {Button} from 'app/app/ui/button'

export const metadata: Metadata = {
  title: 'Santiago López',
  description: 'Santiago López - Web developer focused on never stop learning. ',
};

const SkillProgressBar = ({
  technology,
  percentage,
  logo
}: {
  technology: string,
  percentage: number,
  logo: string
}) => {
  return (
    <div className="flex gap-16">
      <div className="w-[90px] h-[90px] skillLogo">
        <Image
          src={logo}
          alt={technology}
          className="object-contain"
          width={400}
          height={900}
        />
      </div>
      <div className="flex flex-col gap-1 justify-center w-[45vw]">
        <div className="flex justify-between mb-1">
          <h3 className="text-gray-700">
            {technology} {percentage}%
          </h3>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-[5px]">
          <div
            className="bg-slate-400 h-[5px] rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
    <main>
    <div className="container h-[100vh] flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-32 md:justify-between w-full items-center mt-[90px]">
        {/* Left Section */}
        <div>
          <Image
            src="/profile.jpg"
            alt="Profile"
            className="main-image"
            width={400}
            height={900}
          />
        </div>

        {/* Right Section */}
        <div className="md:max-w-[50%] flex flex-col gap-[10px] items-center md:items-start">
          <h1 className="text-center md:text-left">
            Hi, I’m Santiago
          </h1>
          <h2 className="text-center md:text-left">
            Web Developer focused on <span className="main-text weight-bold">never stop learning.</span>
          </h2>

          {/* Logos Section */}
          <InfiniteLogoCarousel />
          
            <Button href='https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/view?usp=sharing' color='bg-[#FEAF75]' text='View my resume'/>
          
        </div>
      </div>
    </div>
    <section className="pb-64 md:pb-96">
      <div className="container flex flex-col justify-center">
        <h2 className="mb-32">My Skills</h2>
        <div className="flex flex-col gap-[32px]">
          <SkillProgressBar technology="Next.js" percentage={40} logo="/nextjs.svg" />
          <SkillProgressBar technology="HTML - CSS" percentage={90} logo="/html-css.svg" />
          <SkillProgressBar technology="JavaScript" percentage={60} logo="/javascript-logo.svg" />
          <SkillProgressBar technology="Webflow" percentage={85} logo="/webflow.svg" />
          <SkillProgressBar technology="Git" percentage={65} logo="/git-logo.svg" />
        </div>
      </div>
    </section>
    <section className="pb-64 md:pb-96">
      <div className="container flex flex-col justify-center">
        <h2 className="mb-32">My Works</h2>
        <div className="grid grid-cols-1">
          <div className="flex flex-col gap-2">
            <div className="w-[fit-content] h-[160px] flex shadow-lg">
              <Image
                src='/27zero.png'
                alt='27zero'
                className="object-cover rounded-lg projectImage shadow-lg"
                width={400}
                height={200}
              />
            </div>
            <div className="flex flex-col gap-16">
              <h3>27zero</h3>
              <p>Developed and launched a high-performing website for a marketing agency using Webflow. Responsible for end-to-end website development, including CMS configuration, creating pages based on provided designs, animations, and complete pages. Integrated visual assets and optimized graphics across static and CMS-driven pages, ensuring seamless functionality and a visually compelling user experience. Delivered a polished product aligned with the company's branding and marketing goals.</p>
              <Button href="https://www.27zero.agency/en" color="bg-purple" text="Visit Site"/>
            </div>
          </div>
          <span className="h-[1px] w-full my-32 bg-gray-200"></span>
          <div className="flex flex-col gap-2">
            <div className="w-[fit-content] h-[160px] flex shadow-lg">
              <Image
                src='/doctums.png'
                alt='Doctums'
                className="object-cover rounded-lg projectImage shadow-lg"
                width={400}
                height={200}
              />
            </div>
            <div className="flex flex-col gap-16">
              <h3>Doctums</h3>
              <p>Developed and launched a website for an educational consulting company using Webflow. Responsible for end-to-end website development, including CMS configuration, creating pages based on provided designs, animations, and complete pages. Integrated visual assets and optimized graphics across static and CMS-driven pages, ensuring seamless functionality and a visually compelling user experience. Delivered a polished product aligned with the company's branding and marketing goals.</p>
              <Button href="https://www.doctums.com/" color="bg-[#F5C43F]" text="Visit Site"/>
            </div>
          </div>
          <span className="h-[1px] w-full my-32 bg-gray-200"></span>
          <div className="flex flex-col gap-2">
            <div className="w-[fit-content] h-[160px] flex shadow-lg">
              <Image
                src='/student-first.png'
                alt='Student First'
                className="object-cover rounded-lg projectImage shadow-lg"
                width={400}
                height={200}
              />
            </div>
            <div className="flex flex-col gap-16">
              <h3>Student First</h3>
              <p>Developed a professional website for a client using Webflow, handling CMS configuration and creating pages based on provided designs. Ensured a clean, functional layout and seamless user experience aligned with the client’s goals.</p>
              <Button href="https://www.studentfirst.com/" color="bg-[#46B0DD]" text="Visit Site"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
    </>
  )
}