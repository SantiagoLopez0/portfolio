import Image from 'next/image';
import { Tag } from 'app/components/Shared/Tag';
import styles from './about.module.css';

const skills = [
  'Next.js',
  'React',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS/SASS',
  'Webflow',
  'GSAP',
];

export const About = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.leftColumn}>
          <h2 className={styles.heading}>Developer focused on building clean websites</h2>

          <p className={styles.description}>
          I'm Santiago, a 25-year-old web developer based in Colombia. I build fast, polished websites — mostly on Webflow, sometimes in Next.js, always with a strong eye for design and detail. I work at the intersection of development, UI/UX, and AI-powered workflows, finding smarter ways to build better products. Focused on never stop learning!
          </p>

          <div className={styles.block}>
            <div className={styles.tagsRow}>
              {skills.map((skill) => (
                <Tag key={skill} text={skill} variant="default" />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.imageWrap}>
            <Image
              src="/profile2-bw.jpg"
              alt="Santiago López portrait"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
