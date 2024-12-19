'use client';

import Image from "next/image";
import styles from 'app/components/Project/project.module.css';
import Link from 'next/link';

export const Project = ({
    name,
    image,
    technologies,
    description,
    link,

}:{
    name: string,
    image: string,
    description: string,
    technologies: string[],
    link: string,
}) => {
    const technologiesArray = [...technologies]
    return(
        <>
        <div className="w-full md:min-h-[400px] rounded-[30px] bg-[#232121] text-white grid grid-cols-1 md:grid-cols-2 md:gap-64">
            <div className={`md:ml-64 md:mt-64 md:flex items-end ${styles.projectImageWrapper}`}>
                <Image
                    src={image}
                    alt={name}
                    className={`${styles.projectImage} `}
                    width={400}
                    height={900}
                />
            </div>
            <div className="px-32 py-32 md:pr-64 md:py-64 flex flex-col justify-between">
                <div className="flex flex-col gap-[8px]">
                    <h2 className="text-[18px]">{name}</h2>
                    <div key="Technologies" className="flex flex-wrap">
                        {technologiesArray.map(tech =>{
                            return(
                                <>
                                <h3 className="text-[12px] leading-[27px] opacity-80" key={tech}>{tech}</h3>
                                {technologiesArray[technologiesArray.length - 1] === tech ? <span> </span>:<span>&nbsp; - &nbsp;</span>}
                                </>
                            )
                        })}
                    </div>
                    <p>{description}</p>
                </div>
                <div className="w-full flex justify-start mt-32">
                    {link !== '' ? <Link className={`${styles.projectLink} min-w-[105px] uppercase text-[14px]`} href={link} key={name} target="_blank">Show More&nbsp;&nbsp;<span className={`${styles.showMore}`}>+</span></Link> : null}
                </div>
            </div>
        </div>
        </>
    )
}