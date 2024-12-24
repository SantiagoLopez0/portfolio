'use client'
import Image from "next/image";
import styles from './skills.module.css';

export const SkillProgressBar = ({
    technology,
    percentage,
    logo
  }: {
    technology: string,
    percentage: number,
    logo: string
  }) => {
    return (
      <div className={`${styles.skillWrapper} flex gap-16 text-white relative`}>
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
            <p className="text-[#232121] font-light">
              {technology}
            </p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-[2px]">
            <div
              className="bg-[#232121] h-[2px] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className={`absolute mt-2 bg-black text-white z-10 ${styles.skillBarPopup}`}>
          {percentage}%
        </div>
      </div>
    )
  }