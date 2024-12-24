import { SkillProgressBar } from 'app/components/Home/Skills/SkillProgressBar';

import Image from "next/image";
import styles from './skills.module.css';

export const Skills = () => {
    return (
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
                        <SkillProgressBar technology="Next.js" percentage={50} logo="/nextjs-white.svg" />
                        <SkillProgressBar technology="React" percentage={40} logo="/react-white.png" />
                        <SkillProgressBar technology="JavaScript" percentage={70} logo="/javascript-white.png" />
                        <SkillProgressBar technology="TypeScript" percentage={65} logo="/typescript-white.png" />
                        <SkillProgressBar technology="HTML" percentage={90} logo="/html5-white.png" />
                        <SkillProgressBar technology="CSS3" percentage={90} logo="/css3-white.png" />
                        <SkillProgressBar technology="Webflow" percentage={80
                        } logo="/webflow-white.png" />
                        <SkillProgressBar technology="Git" percentage={65} logo="/git-white.png" />
                        <SkillProgressBar technology="Sass" percentage={65} logo="/sass-white.png" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mt-32">
                        <p className="text-[#232121]">
                            In addition to my main skills, I have experience in <strong>UX/UI</strong> design and prototyping with <strong>Figma</strong>,
                            working confidently with the <strong>Linux command terminal</strong>, and managing basic database operations.
                        </p>
                        <p className="text-[#232121]">
                            I also leverage AI tools like <strong>ChatGPT, Claude, and GitHub Copilot</strong> for professional prompt
                            generation and workflow optimization, enhancing efficiency and creativity in my projects.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}