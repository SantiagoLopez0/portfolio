"use client"

import Image from "next/image";
import styles from "./hero.module.css";
import { Button } from "app/components/Shared/Button";
import { ResumeModal } from "app/components/Shared/ResumeModal";


const keywords = ["Web", "Webflow", "Frontend"];

export const Hero = () => {
    // const [currentKeyword, setCurrentKeyword] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentKeyword((prevKeyword) => (prevKeyword + 1) % keywords.length);
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <section className="md:h-[100vh] flex items-center md:pt-[128px] pb-64 md:pb-0">
            <div className="container flex justify-center items-center">
                <div className="flex flex-col md:flex-row gap-32 md:gap-[128px] md:justify-center w-full items-center">
                    {/* Left Section */}
                    <div className="pt-[48px] md:pt-0 w-full h-[100vh] md:h-auto md:max-w-[60%] flex flex-col justify-center items-start gap-[10px]">
                        <h1 className={`${styles.mainTitle}`}>
                            {/* <span className={styles.animatedKeyword}>{keywords[currentKeyword]}</span><br /> Developer */}
                            {keywords[0]} Developer
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

                        <div className="md:h-[90px] flex flex-col md:flex-row mt-16 md:mt-32 gap-32">
                            {/* <Button href='https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/view?usp=sharing' text='View my resume' /> */}
                            <ResumeModal isButton={true} customClassName=""/>
                            <Button href='https://www.linkedin.com/in/santiago-lopez-b18594193/' text='LinkedIn' theme="dark"/>
                        </div>

                    </div>

                    {/* Right Section */}
                    <div className={`${styles.mainImageContainer} w-full md:w-[35%]`}>
                        <Image
                            src="/profile2-bw.jpg"
                            alt="Santiago"
                            className={`${styles.mainImage}`}
                            width={400}
                            height={900}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}