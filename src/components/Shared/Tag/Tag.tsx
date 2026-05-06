import styles from './tag.module.css';

type TagVariant = 'default' | 'outline' | 'dark';

type TagProps = {
  text: string;
  variant?: TagVariant;
};

export const Tag = ({ text, variant = 'default' }: TagProps) => {
  const variantClass =
    variant === 'outline'
      ? styles.outline
      : variant === 'dark'
        ? styles.dark
        : styles.default;

  return <span className={`${styles.tag} ${variantClass}`}>{text}</span>;
};
