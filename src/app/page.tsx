import Image from "next/image";
import styles from 'app/app/ui/home.module.css';
import { Metadata } from 'next';
// import { InfiniteLogoCarousel }  from 'app/components/InfiniteLogoCarousel';

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
    <div className={`${styles.skillWrapper} flex gap-16 text-white`}>
      <div className={`max-w-[40px] h-[40px] ${styles.skillLogo}`}>
        <Image
          src={logo}
          alt={technology}
          className={`object-contain`}
          width={400}
          height={900}
        />
      </div>
      <div className="flex flex-col gap-[2px] justify-center w-[90%]">
        <div className="flex justify-between mb-[2px]">
          <p className="text-white font-extralight">
            {technology} {percentage}%
          </p>
        </div>
        <div className="w-full bg-gray-400 rounded-full h-[2px]">
          <div
            className="bg-white h-[2px] rounded-full transition-all duration-500 ease-in-out"
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
    <section className="h-[100vh] flex items-center pt-[80px]">
      <div className="container flex justify-center items-center">
        <div className="flex flex-col md:flex-row gap-32 md:gap-[128px] md:justify-center w-full items-center">
          {/* Left Section */}
          <div className="w-full md:max-w-[60%] flex flex-col gap-[10px] items-start">
            <h1 className={`${styles.mainTitle}`}>
              Hi, I’m Santiago
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
              <p className="text-left">
                Hi there!
              </p>
              <p className="text-left">
                I’m a web Developer focused on <span className={`${styles.subtitleBold}`}>never stop learning!</span>
              </p>
            </div>

            {/* Logos Section */}
            {/* <InfiniteLogoCarousel /> */}
            <div className="md:h-[90px] flex mt-16 md:mt-32">
              <Button href='https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/view?usp=sharing'  text='View my resume'/>
            </div>

          </div>

          {/* Right Section */}
          <div className={`${styles.mainImageContainer} w-full md:w-[35%]`}>
            <Image
              src="/profile.jpg"
              alt="Profile"
              className={`${styles.mainImage}`}
              width={400}
              height={900}
            />
          </div>
        </div>
      </div>
    </section>
    <section className={`${styles.skillsSection} py-64 md:py-96`}>
      <div className="container flex flex-col md:flex-row justify-left text-white gap-32 md:gap-64">
        <div className="w-full md:w-[45%]">
          <Image
              src="/skills.jpg"
              alt="My Skills"
              className={`${styles.hoverImage} rounded-[30px] h-[400px] md:h-[700px] w-full md:w-auto`}
              width={400}
              height={900}
            />
        </div>
        <div className="w-full md:max-w-[55%]">
          <h2 className="text-[16px] mb-32">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] w-full">
            <SkillProgressBar technology="Next.js" percentage={40} logo="/nextjs-white.svg" />
            <SkillProgressBar technology="React" percentage={40} logo="/react-white.png" />
            <SkillProgressBar technology="JavaScript" percentage={60} logo="/javascript-white.png" />
            <SkillProgressBar technology="TypeScript" percentage={60} logo="/typescript-white.png" />
            <SkillProgressBar technology="HTML" percentage={90} logo="/html5-white.png" />
            <SkillProgressBar technology="CSS3" percentage={90} logo="/css3-white.png" />
            <SkillProgressBar technology="Webflow" percentage={85} logo="/webflow-white.png" />
            <SkillProgressBar technology="Git" percentage={65} logo="/git-white.png" />
            <SkillProgressBar technology="Sass" percentage={65} logo="/sass-white.png" />
          </div>
        </div>
      </div>
    </section>
    <section className="py-64 md:py-96">
      <div className="container flex flex-col justify-center">
        <h2 className="text-[16px] mb-32">My Works</h2>
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
              <p>Developed and launched a high-performing website for a marketing agency using Webflow. Responsible for end-to-end website development, including CMS configuration, creating pages based on provided designs, animations, and complete pages. Integrated visual assets and optimized graphics across static and CMS-driven pages, ensuring seamless functionality and a visually compelling user experience. Delivered a polished product aligned with the company&lsquo;s branding and marketing goals.</p>
              <Button href="https://www.27zero.agency/en" text="Visit Site"/>
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
              <p>Developed and launched a website for an educational consulting company using Webflow. Responsible for end-to-end website development, including CMS configuration, creating pages based on provided designs, animations, and complete pages. Integrated visual assets and optimized graphics across static and CMS-driven pages, ensuring seamless functionality and a visually compelling user experience. Delivered a polished product aligned with the company&lsquo;s branding and marketing goals.</p>
              <Button href="https://www.doctums.com/"  text="Visit Site"/>
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
              <Button href="https://www.studentfirst.com/"  text="Visit Site"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
    </>
  )
}