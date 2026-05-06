import { LogoSlider } from 'app/components/Shared/LogoSlider/LogoSlider';
import styles from './whatIDo.module.css';

const sections = [
  {
    title: 'Webflow & JS Development',
    duration: 120,
    logos: [
      { src: '/sliders/web/css3-white.png', alt: 'CSS3' },
      { src: '/sliders/web/git-white.png', alt: 'Git' },
      { src: '/sliders/web/javascript-white.png', alt: 'JavaScript' },
      { src: '/sliders/web/nextjs-white.svg', alt: 'Next.js' },
      { src: '/sliders/web/react-white.png', alt: 'React' },
      { src: '/sliders/web/sass-white.png', alt: 'SASS' },
      { src: '/sliders/web/typescript-white.png', alt: 'TypeScript' },
      { src: '/sliders/web/webflow-white.png', alt: 'Webflow' },
      { src: '/sliders/web/finsweet.png', alt: 'Finsweet' },
      { src: '/sliders/web/gsap.png', alt: 'GSAP' },
    ],
  },
  {
    title: 'UI Design & Prototyping',
    duration: 60,
    logos: [
      { src: '/sliders/design/figma.png', alt: 'Figma' },
      { src: '/sliders/design/framer.webp', alt: 'Framer' },
      { src: '/sliders/design/lottiefiles.webp', alt: 'LottieFiles' },
      { src: '/sliders/design/notion.png', alt: 'Notion' },
      { src: '/sliders/design/unsplash.png', alt: 'Unsplash' },
    ],
  },
  {
    title: 'Automating With AI',
    duration: 60,
    logos: [
      { src: '/sliders/ai/claude.png', alt: 'Claude' },
      { src: '/sliders/ai/cursor.webp', alt: 'Cursor' },
      { src: '/sliders/ai/nano.png', alt: 'Nano' },
      { src: '/sliders/ai/gpt.png', alt: 'ChatGPT' },
    ],
  },
];

export const WhatIDo = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        {sections.map((section) => (
          <div key={section.title} className={styles.row}>
            <LogoSlider title={section.title} logos={section.logos} duration={section.duration} />
          </div>
        ))}
      </div>
    </section>
  );
};
