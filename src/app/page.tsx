'use client'

import Image from "next/image";
import { FaArrowUp } from 'react-icons/fa';
import styles from 'app/app/ui/home.module.css';

import { Project }  from 'app/components/Project';
import {Button} from 'app/app/ui/button'
import { SkillProgressBar } from 'app/app/ui/SkillProgressBar';
import Link from "next/link";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <main>
    <section className="md:h-[100vh] flex items-center pt-[128px] pb-64 md:pb-0">
      <div className="container flex justify-center items-center">
        <div className="flex flex-col md:flex-row gap-32 md:gap-[128px] md:justify-center w-full items-center">
          {/* Left Section */}
          <div className="w-full md:max-w-[60%] flex flex-col gap-[10px] items-start">
            <h1 className={`${styles.mainTitle}`}>
              Web Developer
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
              <p className="text-left">
                Hi there!<br />My name is Santiago and I’m 24 years old web developer with expertise in creating stunning, user-focused websites. 
                Whether I’m using no-code tools like Webflow or diving into code with Next.js, my goal is to craft seamless digital experiences.
              </p>
              <p className="text-left">
                I specialize in front-end development, blending strong UI/UX principles with innovative design to bring ideas to life. 
                Focused on <span className={`${styles.subtitleBold}`}>never stop learning!</span>
              </p>
            </div>

            {/* Logos Section */}
            {/* <InfiniteLogoCarousel /> */}
            <div className="md:h-[90px] flex flex-col md:flex-row mt-16 md:mt-32 gap-32">
              <Button href='https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/view?usp=sharing'  text='View my resume'/>
              <Button href='https://www.linkedin.com/in/santiago-lopez-b18594193/'  text='LinkedIn'/>
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
    <section className="pb-[96px] pt-[48px] md:pb-[128px] md:pt-[96px]">
      <div className="container flex flex-col justify-center">
        <h2 className="mb-32 text-center">My Experience</h2>
        <div className="w-full grid grid-cols-1 gap-[96px] md:gap-[128px]">
          <Project
            name="My Portfolio"
            image="/portfolio.png"
            technologies={["Next.js", "Tailwind", "Figma", "Git", "Github", "Vercel"]}
            description="I built this portfolio using Next.js 15, styled with Tailwind CSS and vanilla CSS3. The project showcases features like file-based routing, dynamic imagery, and custom dynamic components, leveraging React props and interfaces for flexibility. Before development, I created a Figma prototype to define the design system, including colors, fonts, and components. The project has a complete version control history with Git and GitHub, which is also integrated with Vercel for seamless deployment and hosting."
            link="https://github.com/SantiagoLopez0/portfolio.git"
          />
          <Project
            name="Luxury Presence"
            image="/luxury-presence.png"
            technologies={["Luxury Presence website creation tool", "HTML", "SASS", "JavaScript"]}
            description="I work as a full-time website builder, creating tailored websites for real estate agents, teams, and brokerages across the US. Using a no-code platform developed by my company, similar to Webflow, I model and customize sites while integrating CSS, HTML, and JS for advanced styling and custom elements. In this fully English-speaking role, I collaborate closely with my team, honing my skills in communication and teamwork. Every site I build follows UI/UX principles to ensure a visually stunning, client-focused design that’s easy to navigate and understand."
            link="https://theaguilargroup.realestate/"
          />
          <Project
            name="27zero"
            image="/27zero-home.png"
            technologies={["Webflow", "JavaScript", "Figma"]}
            description="I developed and launched a high-performing website for a marketing agency using Webflow. I handled the entire process, from setting up the CMS to building pages based on the provided designs, adding animations, and completing full sections. I also integrated visual assets and optimized graphics across both static and CMS-driven pages to ensure everything looked great and worked seamlessly. The final result? A polished website perfectly aligned with the agency's branding and marketing goals."
            link="https://www.27zero.agency/en"
          />
          <Project
            name="Doctums"
            image="/doctums.png"
            technologies={["Webflow", "JavaScript", "Figma"]}
            description="I developed and launched a website for an educational consulting company using Webflow. I managed the entire process, from setting up the CMS to building pages based on the provided designs, adding animations, and completing full sections. I also integrated visual assets and optimized graphics across both static and CMS-driven pages to ensure everything looked great and worked seamlessly. The final result was a polished website that perfectly matched the company’s branding and marketing goals."
            link="https://www.doctums.com/"
          />
          <Project
            name="Student First"
            image="/student-first.png"
            technologies={["Webflow", "JavaScript", "Figma"]}
            description="I created a professional website for a client using Webflow, managing the CMS configuration and building pages based on the provided designs. I focused on delivering a clean, functional layout and a seamless user experience that aligned perfectly with the client’s goals."
            link="https://www.studentfirst.com/"
          />
        </div>
      </div>
    </section>
    <section className={`${styles.skillsSection} pb-96 pt-[48px] md:pb-[128px] md:pt-[96px]`}>
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
          <h2 className="mb-32 text-[#232121]">My Skills</h2>
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
    </main>
    <footer className="pb-96 pt-0 md:pb-[128px] md:pt-[96px]">
        <h2 className="text-center mb-32">Contacts</h2>
        <div className="container flex flex-col justify-center gap-64">
          <div className="flex flex-col md:flex-row justify-center items-center gap-32 flex-wrap">
            <Link 
                href="https://github.com/SantiagoLopez0"
                className={`${styles.footerLink}`}
                target="_blank"
            >
              Github
            </Link>
            <Link 
                href="https://www.linkedin.com/in/santiago-lopez-b18594193/"
                className={`${styles.footerLink}`}
                target="_blank"
            >
              LinkedIn
            </Link>
            <Link 
                href="https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/view?usp=sharing"
                className={`${styles.footerLink}`}
                target="_blank"
            >
              Resume
            </Link>
            <Link 
                href="mailto:asantiago0034@gmail.com"
                className={`${styles.footerLink}`}
                target="_blank"
            >
              Email
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={scrollToTop}
              className="bg-[#000] text-white p-4 rounded-full"
            >
              <FaArrowUp /> {/* Using Font Awesome arrow icon */}
            </button>
          </div>
        </div>
      </footer>
    </>
  )
}