import Image from 'next/image';
import styles from './logoSlider.module.css';

export type LogoSliderLogo = {
  src: string;
  alt: string;
};

type LogoSliderProps = {
  title: string;
  logos: LogoSliderLogo[];
  duration?: number;
};

export const LogoSlider = ({ title, logos, duration = 30 }: LogoSliderProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <div className={styles.loopContainer}>
        <div
          className={styles.track}
          style={{ '--duration': `${duration}s` } as React.CSSProperties}
        >
          <div className={styles.logos}>
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={50}
                className={styles.logo}
              />
            ))}
          </div>
          <div className={styles.logos} aria-hidden="true">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt=""
                width={160}
                height={50}
                className={styles.logo}
              />
            ))}
          </div>
          <div className={styles.logos} aria-hidden="true">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt=""
                width={160}
                height={50}
                className={styles.logo}
              />
            ))}
          </div>
          <div className={styles.logos} aria-hidden="true">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt=""
                width={160}
                height={50}
                className={styles.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
