import { Button } from 'app/components/Shared/Button';
import styles from './contact.module.css';

export const Contact = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.topDivider} />

        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>Let&apos;s work together</h2>
            <p className={styles.description}>
              Open to freelance projects and full-time opportunities.
            </p>
          </div>

          <Button
            theme="dark"
            text="Get in touch"
            href="https://www.linkedin.com/in/santiagolopez22/"
            external
          />
        </div>
      </div>
    </section>
  );
};
