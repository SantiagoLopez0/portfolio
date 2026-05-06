import Image from 'next/image';
import Link from 'next/link';
import { projects } from 'app/data/projects';
import { Tag } from 'app/components/Shared/Tag';
import styles from './work.module.css';

export const Work = () => {
  const featuredProjects = projects.filter((project) => project.featured === true);

  return (
    <section id="work" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.sectionTitle}>Selected Work</h2>

        <div className={styles.grid}>
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={project.url}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.imageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
                <div className={styles.overlay} aria-hidden />
              </div>

              <div className={styles.info}>
                <div className={styles.tagsRow}>
                  {project.tags.map((tag) => (
                    <Tag key={tag} text={tag} variant="default" />
                  ))}
                </div>
                <h4 className={styles.cardTitle}>{project.title}</h4>
                <p className={styles.description}>{project.description}</p>
                <span className={styles.viewSite}>View Site</span>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
};
