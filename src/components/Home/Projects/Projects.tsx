import { Project } from "app/components/Shared/Project"

export const Projects = () => {
    return (
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
    )
}